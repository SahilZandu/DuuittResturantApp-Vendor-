import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
  FlatList,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import { Switch } from 'react-native-paper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import moment from 'moment';
import { RFValue } from 'react-native-responsive-fontsize';
import { SvgXml } from 'react-native-svg';
import SwitchTabs from './SwitchTabs';
import TimePicker from './TimePicker';
import DatePicker from 'react-native-date-picker';
import { useFocusEffect } from '@react-navigation/native';
import Header from '../../../components/header/Header';
import { colors } from '../../../theme/colors';
import { fonts } from '../../../theme/fonts/fonts';
import Spacer from '../../../halpers/Spacer';
import { appImagesSvg } from '../../../commons/AppImages';
import CTA from '../../../components/cta/CTA';
import { rootStore } from '../../../stores/rootStore';
import { Line } from '../../../halpers/Line';
import PopUp from '../../../components/appPopUp/PopUp';
import handleAndroidBackButton from '../../../halpers/handleAndroidBackButton';
import NoData from '../../../components/NoData';
import { useToast } from '../../../halpers/useToast';

let deleteid = '';
let indexValue = '';
let isDeleteIndex = '';

export default function RestaurantTime({ navigation }) {
  const { appUser } = rootStore.commonStore;
  const {
    addRestaurantTimings,
    deleteRestaurantTimings,
    updateRestaurantTimings,
    restaurantUpdateoOutletStatus,
  } = rootStore.timingManagementStore;
  let Days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  const [activateSwitch, setActivateSwitch] = useState(false);
  const [outletButton, setOutletButton] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [from, setFromDate] = useState(null);
  const [frompikcer, setFromPicker] = useState(false);
  const [topikcer, setToFromPicker] = useState(false);
  const [toDate, setToDate] = useState(null);
  const [enableSaveButton, setEnableSaveBUtton] = useState(false);
  const [activeTab, setactiveTab] = useState(
    appUser?.restaurant?.timings?.is_all_day == true ? false : true,
  );
  const [editSlot, setEditSlot] = useState(true);
  const [slotId, setSlotIdd] = useState('');
  const [isDelete, setIsDelete] = useState(false);
  const [am, setAm] = useState('');
  const [pm, setPm] = useState('');
  const [otherday, setOtherDay] = useState(
    appUser?.restaurant?.timings?.specified ?? [],
  );
  const [showActionButtons, setActionBUttons] = useState(false);
  const [dataUpdate, setDataUpdate] = useState(0);
  const [timeArray, setTimeArray] = useState(
    appUser?.restaurant?.timings?.is_all_day == true
      ? appUser?.restaurant?.timings?.all_days?.timings ?? []
      : appUser?.restaurant?.timings?.specified ?? [],
  );
  const [timeAddErrorMessage, setTimeAddErrorMessage] = useState('');
  const [activeDay, setActiveDay] = useState(0);
  const [checkEditIndex, setCheckEditIndex] = useState(0);
  const [isCheckBack, setIsCheckBack] = useState(false);
  const [dayAll, setDayAll] = useState(
    appUser?.restaurant?.timings?.all_days?.timings ?? [],
  );
  const [editLoading, setEditLoading] = useState(false);

  // console.log('otherday---dayAll,timeArray', otherday, dayAll, timeArray);

  const AddSlotRange = (from, toDate) => {
    const newTimeRange = {
      days_of_week: activeTab == false ? 0 : indexValue,
      open_times: from,
      close_time: toDate,
      // restaurant_id: appUser?.restaurant?._id,
      is_edit_delete: false,
    };
    let newArray = [...timeArray];
    // console.log('newArray---',[...timeArray]);
    newArray.push(newTimeRange);
    setTimeArray(newArray);
    filterSLots(newArray);
  };

  const dateFomat2 = d => {
    if (d) {
      var date = new Date(d);
      return moment(d, 'HHmmss').format('A');
    }
  };

  const convertTimeToDate = (timeString) => {
    const [hours, minutes] = timeString.split(':').map(Number);
    const now = new Date();

    const newDate = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      hours,
      minutes,
      0
    );

    return newDate;
  };

  useEffect(() => {
    handleAndroidBackButton(navigation);
    specificData(
      appUser,
      appUser?.restaurant?.timings?.is_all_day == true ? false : true,
    );
  }, [appUser]);

  const specificData = (userUpdatedData, isTabActive) => {
    console.log('userUpdatedData,isTabActive---', userUpdatedData, isTabActive);
    if (isTabActive) {
      let newTimeArray = [];
      userUpdatedData?.restaurant?.timings?.specified?.map((item, i) => {
        newTimeArray = newTimeArray.concat(item?.timings || []);
      });
      setTimeArray(newTimeArray);
    } else {
      setTimeArray(
        userUpdatedData?.restaurant?.timings?.all_days?.timings || [],
      );
    }
  };

  const filterSLots = timeArray => {
    // console.log('timeArray==', timeArray);
    const GetSlotRanage = timeArray?.filter(
      item => item?.days_of_week == '0' || item?.days_of_week == 0,
    );
    if (GetSlotRanage?.length > 0) {
      setDayAll(GetSlotRanage);
    }

    const mondayData = timeArray?.filter(
      item => item?.days_of_week == '1' || item?.days_of_week == 1,
    );

    slotfilter(mondayData, '1');

    const tuesdayData = timeArray?.filter(
      item => item?.days_of_week == '2' || item?.days_of_week == 2,
    );

    slotfilter(tuesdayData, '2');

    const wednesdayData = timeArray?.filter(
      item => item?.days_of_week == '3' || item?.days_of_week == 3,
    );

    slotfilter(wednesdayData, '3');

    const thursdayData = timeArray.filter(
      item => item?.days_of_week == '4' || item?.days_of_week == 4,
    );

    slotfilter(thursdayData, '4');

    const fridayData = timeArray.filter(
      item => item?.days_of_week == '5' || item?.days_of_week == 5,
    );
    slotfilter(fridayData, '5');

    const saturdayData = timeArray?.filter(
      item => item?.days_of_week == '6' || item?.days_of_week == 6,
    );
    slotfilter(saturdayData, '6');

    const sundayData = timeArray.filter(
      item => item?.days_of_week == '7' || item?.days_of_week == 7,
    );
    slotfilter(sundayData, '7');
  };

  const slotfilter = (Data, days) => {
    console.log('Data, days--', Data, days);
    if (Data?.length > 0) {
      otherday?.map((item, index) => {
        console.log('item,index', item, index);
        if (index + 1 == days) {
          item.timings = Data;
        }
        return { ...item };
      });
      // console.log('otherday---11', otherday, [...otherday]);
      setOtherDay([...otherday]);
    }
  };

  const timelistinglist = async appUser => {
    console.log('appUser--timelistinglist', appUser,
      "---00",
      appUser?.restaurant?.timings?.all_days,
      appUser?.restaurant?.timings?.all_days?.timings,
      "---11",
      appUser?.restaurant?.timings?.specified);

    try {
      setDayAll(
        appUser?.restaurant?.timings?.all_days?.timings ?? []
        // [{ "close_time": "16:44", "days_of_week": 0, "is_edit_delete": true, "open_times": "04:44", "restaurant_id": "6788fee87dcbadd89696ecc0" }]
      );
      setOtherDay(
        appUser?.restaurant?.timings?.specified ?? []
        // [
        //   {
        //     "title": 'Monday',
        //     "outlet_status": false,
        //     "timings": [{ "close_time": "16:44", "days_of_week": 1, "is_edit_delete": true, "open_times": "04:44", "restaurant_id": "6788fee87dcbadd89696ecc0" }]
        //   },
        //   {
        //     "title": 'Tuesday',
        //     "outlet_status": true,
        //     "timings": [{ "close_time": "16:44", "days_of_week": 2, "is_edit_delete": true, "open_times": "04:44", "restaurant_id": "6788fee87dcbadd89696ecc0" }]
        //   },
        //   {
        //     "title": 'Wednesday',
        //     "outlet_status": false,
        //     "timings": [{ "close_time": "16:44", "days_of_week": 3, "is_edit_delete": true, "open_times": "04:44", "restaurant_id": "6788fee87dcbadd89696ecc0" }]
        //   },
        //   {
        //     "title": 'Thursday',
        //     "outlet_status": false,
        //     "timings": [{ "close_time": "16:44", "days_of_week": 4, "is_edit_delete": true, "open_times": "04:44", "restaurant_id": "6788fee87dcbadd89696ecc0" }]
        //   },
        //   {
        //     "title": 'Friday',
        //     "outlet_status": false,
        //     "timings": [{ "close_time": "16:44", "days_of_week": 5, "is_edit_delete": true, "open_times": "04:44", "restaurant_id": "6788fee87dcbadd89696ecc0" }]
        //   },
        //   {
        //     "title": 'Saturday',
        //     "outlet_status": false,
        //     "timings": [{ "close_time": "16:44", "days_of_week": 6, "is_edit_delete": true, "open_times": "04:44", "restaurant_id": "6788fee87dcbadd89696ecc0" }]
        //   },
        //   {
        //     "title": 'Sunday',
        //     "outlet_status": false,
        //     "timings": [{ "close_time": "16:44", "days_of_week": 7, "is_edit_delete": true, "open_times": "04:44", "restaurant_id": "6788fee87dcbadd89696ecc0" }]
        //   }
        // ]
      );
      setIsDelete(false);
    } catch (error) {
      console.log('error--', error);
    }
  };

  const onRefresh = () => {
    const { appUser } = rootStore.commonStore;
    // console.log('timelistinglist-- appUser == ', appUser);
    timelistinglist(appUser);
  };

  const checkActiveTab = activeTab => {
    // activeTabCheck(activeTab, onRefresh);
  };

  const DeleteSlot = async (item, isDeleteIndex) => {
    // console.log('item, isDeleteIndex--', item, isDeleteIndex);
    if (item?.is_edit_delete == true) {
      await deleteRestaurantTimings(
        item,
        isDeleteIndex,
        appUser,
        activeTab,
        handleDeleteLoading,
        onRefresh,
      );
    } else {
      await onDeleteSlot(item, isDeleteIndex);
    }
  };

  const handleDeleteLoading = () => {
    setIsDelete(false);
  };

  const onDeleteSlot = async (item, isDeleteIndex) => {
    // console.log('item, isDeleteIndex', item, isDeleteIndex);
    if (activeTab == false) {
      await timeArray?.splice(isDeleteIndex, 1);
      await dayAll?.splice(isDeleteIndex, 1);
      setTimeArray(timeArray);
      setDayAll(dayAll);
      setIsDelete(false);
      useToast('Time slot deleted successfully.', 1);
    } else {
      const filterData = await timeArray?.filter((value, i) => {
        if (value?.days_of_week == item?.days_of_week) {
          if (
            (value?.open_times && value?.close_time) ==
            (item?.open_times && item?.close_time)
          ) {
            return !value;
          } else {
            return value;
          }
        }
        return value;
      });
      console.log('filterData', filterData, otherday[item?.days_of_week - 1]);
      await otherday[item?.days_of_week - 1]?.timings?.splice(isDeleteIndex, 1);
      setTimeArray([...filterData]);
      setOtherDay([...otherday]);
      // console.log(
      //   'timeArray===delete',
      //   timeArray,
      //   otherday,
      //   item,
      //   isDeleteIndex,
      //   otherday[item?.days_of_week]?.timings,
      // );
      setIsDelete(false);
      useToast('Time slot deleted successfully.', 1);
    }
  };

  const EditSlot = async (from, toDate, slotId, item) => {
    // console.log('from, toDate, slotId-----', from, toDate, slotId,item);
    let newItem = {
      ...item,
      open_times: from,
      close_time: toDate,
    };
    // console.log('newItem-----', newItem);
    await updateRestaurantTimings(
      newItem,
      slotId,
      appUser,
      activeTab,
      onRefresh,
      handleEditLoading,
      onSuccess,
    );
  };

  const handleEditLoading = v => {
    setEditLoading(v);
  };

  const onSuccess = () => {
    setShowPicker(false);
  };

  const updateOutletSlot = async (item, day, otherday) => {
    // console.log('updateOutletSlot item, day, otherday ', item, day, otherday);
    let outletStatus = true;
    const updatedOtherDay = otherday?.map((data, i) => {
      if (i == day - 1) {
        outletStatus = !data.outlet_status;
        return {
          ...data,
          outlet_status: !data.outlet_status,
        };
      }
      return data;
    });
    setOtherDay(updatedOtherDay);

    // console.log('Updated item with toggled status:', outletStatus);

    await restaurantUpdateoOutletStatus(
      appUser,
      outletStatus,
      day,
      onRefresh,
      handleToggleUpadteLoading,
    );
  };

  const handleToggleUpadteLoading = v => {
    console.log('v----', v);
  };

  // ======================= Add And Update Slot

  const toMinutes = time => {
    const [hours, minutes] = time?.split(':')?.map(Number);
    return hours * 60 + minutes;
  };

  const returnData = (from, toDate, isValid) => {
    console.log('from, toDate', from, toDate, isValid);
    if (toMinutes(from) < toMinutes(toDate)) {
      AddSlotRange(from, toDate);
      return (isValid = true);
    } else {
      setTimeAddErrorMessage('To time should be greater From time');
      return (isValid = false);
    }
  };

  const returnAddDayArray = (from, toDate, dayArray) => {
    return dayArray?.map((item, index) => {
      if (toMinutes(from) < toMinutes(toDate)) {
        if (from >= item?.open_times && from <= item?.close_time) {
          setTimeAddErrorMessage('This slot is already taken');
          return false;
        } else {
          if (toMinutes(toDate) >= toMinutes(item?.open_times)) {
            if (toMinutes(from) >= toMinutes(item?.close_time)) {
              AddSlotRange(from, toDate);
              return true;
            } else {
              setTimeAddErrorMessage('This slot is already taken');
              return false;
            }
          } else {
            AddSlotRange(from, toDate);
            return true;
          }
        }
      } else {
        setTimeAddErrorMessage('To time should be greater From time');
        return false;
      }
    });
  };

  const returnDataEdit = (from, toDate, isValid) => {
    //  console.log('from, toDate', from, toDate,toMinutes(from?.toString()) , toMinutes(toDate?.toString()),toMinutes(from?.toString()) < toMinutes(toDate?.toString()));

    if (toMinutes(from?.toString()) < toMinutes(toDate?.toString())) {
      // AddSlotRange(from, toDate);
      return (isValid = true);
    } else {
      setTimeAddErrorMessage('To time should be greater than From time');
      return (isValid = false);
    }
  };

  const returnEditAddDayArray = (from, toDate, dayArray, checkIndex) => {
    return dayArray?.map((item, index) => {
      if (dayArray?.length > 1) {
        if (index !== checkIndex) {
          if (toMinutes(from) < toMinutes(toDate)) {
            if (
              toMinutes(from) >= toMinutes(item?.open_times) &&
              toMinutes(from) <= toMinutes(item?.close_time)
            ) {
              setTimeAddErrorMessage('This slot is already taken');
              return false;
            } else {
              if (toMinutes(toDate) >= toMinutes(item?.open_times)) {
                if (toMinutes(from) >= toMinutes(item?.close_time)) {
                  return true;
                } else {
                  setTimeAddErrorMessage('This slot is already taken');
                  return false;
                }
              } else {
                return true;
              }
            }
          } else {
            setTimeAddErrorMessage('To time should be greater From time...');
            return false;
          }
        }
      } else {
        if (toMinutes(from) < toMinutes(toDate)) {
          return true;
        } else {
          setTimeAddErrorMessage('To time should be greater From time..');
          return false;
        }
      }
    });
  };

  const onConfirmAddSlotRange = (from, toDate) => {
    let isValid = false;
    let otherData = false;
    let allDayData = false;
    const newOtherday = otherday[activeDay - 1];
    if (newOtherday?.timings?.length > 0 && activeDay > 0) {
      otherData = returnAddDayArray(from, toDate, newOtherday?.timings);
      // console.log('otherData-----', otherData, checkEditIndex,activeDay);
      if (otherData[0] === true) {
        return (otherData = true);
      } else if (otherData[0] === false) {
        return (otherData = false);
      }
    } else if (dayAll?.length > 0 && activeDay == 0) {
      allDayData = returnAddDayArray(from, toDate, dayAll);
      // console.log('allDayData-----', allDayData, checkEditIndex,activeDay);
      if (allDayData[0] === true) {
        return (allDayData = true);
      } else if (allDayData[0] === false) {
        return (allDayData = false);
      }
    } else {
      isValid = returnData(from, toDate, isValid);
      if (isValid === true) {
        return (isValid = true);
      } else if (isValid === false) {
        return (isValid = false);
      }
    }
  };

  const onConfirmEditAddSlotRange = (from, toDate) => {
    // console.log('activeDay--onConfirmEditAddSlotRange', activeDay);
    let isValid = false;
    let otherData = false;
    let allDayData = false;
    const newOtherday = otherday[activeDay - 1];
    // console.log('newOtherday---', newOtherday);
    let newData = activeDay == 0 ? dayAll : newOtherday?.timings;
    // console.log('newOtherday---', newData, activeDay);
    // if (newOtherday?.timings?.length > 1 || dayAll?.length > 1) {
    if (newData?.length > 1) {
      if (newOtherday?.timings?.length > 0) {
        otherData = returnEditAddDayArray(
          from,
          toDate,
          newOtherday?.timings,
          checkEditIndex,
        );
        let newIndex = 0;
        newIndex = checkEditIndex == 0 ? 1 : 0;
        // console.log('otherData---', otherData, newIndex);
        if (otherData[newIndex] === true) {
          return (otherData = true);
        } else if (otherData[newIndex] === false) {
          return (otherData = false);
        }
      } else if (dayAll?.length > 0 && activeDay == 0) {
        allDayData = returnEditAddDayArray(
          from,
          toDate,
          dayAll,
          checkEditIndex,
        );

        const newIndex = checkEditIndex == 0 ? 1 : 0;
        if (allDayData[newIndex] === true) {
          return (allDayData = true);
        } else if (allDayData[newIndex] === false) {
          return (allDayData = false);
        }
      }
    } else {
      isValid = returnDataEdit(from, toDate, isValid);
      // console.log('isValid---', isValid);
      if (isValid === true) {
        return (isValid = true);
      } else if (isValid === false) {
        return (isValid = false);
      }
    }
  };

  useFocusEffect(
    useCallback(() => {
      handleAndroidBackButton(navigation);
      timelistinglist(appUser);
    }, [appUser]),
  );

  const checkTimer = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={showPicker}
        onRequestClose={() => {
          setShowPicker(false);
        }}>
        <View style={styles.modalContainer}>
          <View style={styles.modalSubConatiner}>
            <View style={styles.timeSlotContainer}>
              <Text style={styles.timeSlotText}>
                {!editSlot ? 'Edit ' : 'Add new '}time slot
              </Text>
              <Pressable
                onPress={() => setShowPicker(false)}
                style={styles.crossConatiner}>
                <SvgXml xml={appImagesSvg.crossIcon} />
              </Pressable>
            </View>
            <TimePicker
              onPress={() => {
                setFromPicker(true), setTimeAddErrorMessage('');
              }}
              onPressIn={() => {
                setFromPicker(true), setTimeAddErrorMessage('');
              }}
              text={'From:'}
              value={dateFomat(from)}
              timeZone={am ? am?.toString()?.toLowerCase() : 'am'}
            />
            <TimePicker
              onPress={() => {
                setToFromPicker(true), setTimeAddErrorMessage('');
              }}
              onPressIn={() => {
                setToFromPicker(true), setTimeAddErrorMessage('');
              }}
              text={'To'}
              value={dateFomat(toDate)}
              timeZone={pm ? pm?.toString()?.toLowerCase() : 'pm'}
            />
            {timeAddErrorMessage?.length > 0 && (
              <Text
                numberOfLines={1}
                style={{
                  fontSize: RFValue(12),
                  fontFamily: fonts.medium,
                  color: colors.colorCB,
                  marginHorizontal: 18,
                }}>
                {timeAddErrorMessage}
              </Text>
            )}

            <Spacer space={hp('3.5%')} />

            <View style={{ alignItems: 'center' }}>
              {editSlot == true ? (
                <CTA
                  disable={
                    (from && toDate !== null ? false : true) ||
                    timeAddErrorMessage?.length > 0
                  }
                  onPress={() => {
                    setEnableSaveBUtton(true);
                    const isValid = onConfirmAddSlotRange(from, toDate);
                    if (isValid) {
                      setShowPicker(false);
                    }
                  }}
                  title={'Add Time Slot'}
                  width={wp('92%')}
                />
              ) : (
                <CTA
                  onPress={() => {
                    const isValid = onConfirmEditAddSlotRange(from, toDate);
                    if (isValid) {
                      EditSlot(from, toDate, slotId, deleteid);
                    }
                  }}
                  loading={editLoading}
                  title={'Update Time Slot'}
                  width={wp('92%')}
                />
              )}
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const handleLoading = v => {
    setLoading(v);
  };

  const handelSaveButton = () => {
    setEnableSaveBUtton(false);
    setOutletButton(false);
    setIsCheckBack(false);
  };

  const addNewSlot = async data => {
    setLoading(true);
    setEnableSaveBUtton(true);
    // console.log('dayAll ,otherday---', dayAll, otherday);
    addRestaurantTimings(
      data,
      appUser,
      activeTab,
      onRefresh,
      handleLoading,
      handelSaveButton,
      dayAll,
      otherday,
    );
  };

  const toggleActive = (item, daysIndex, otherday) => {
    updateOutletSlot(item, daysIndex, otherday);
    setActiveDay(daysIndex);
  };

  const dateFomat1 = d => {
    if (d) {
      return moment(d, 'HHmmss').format('hh:mm a');
    } else {
      return '';
    }
  };
  const dateFomat = d => {
    if (d) {
      return moment(d, 'HHmmss').format('hh:mm');
    } else {
      return '';
    }
  };

  const specificTab = (item, index, daysIndex) => {
    console.log('index,item', index, item);
    return (
      <View>
        <Text style={styles.specificDataSlot}>Slot {index + 1}</Text>
        <View style={[styles.dateConatiner, { marginTop: hp('1%') }]}>
          <View style={styles.dateSubConatiner}>
            <Text style={styles.dateTextStart}>
              {dateFomat1(item?.open_times)}
            </Text>
            <Text style={styles.to}>to</Text>
            <Text style={styles.dateTextEnd}>
              {dateFomat1(item?.close_time)}
            </Text>
          </View>
        </View>
        <View style={styles.specificTabView}>
          {/* {item?.is_edit_delete === false ? null : ( */}
          <View style={styles.specificTabInnerView}>
            <TouchableOpacity
              onPress={() => {
                console.log('item deleteid', item, (deleteid = item));
                (deleteid = item), (isDeleteIndex = index);
                setIsDelete(true);
              }}
              style={styles.deleteConatiner}>
              <SvgXml xml={appImagesSvg.deleteIcon} />
              <Text> </Text>
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
            {item?.is_edit_delete === false ? null : (
              <TouchableOpacity
                onPress={() => {
                  setEditSlot(false);
                  setShowPicker(true), setAm(dateFomat2(item?.open_times));
                  setPm(dateFomat2(item?.close_time));
                  setFromDate(item?.open_times), setToDate(item?.close_time);
                  setSlotIdd(index);
                  setActiveDay(daysIndex);
                  setTimeAddErrorMessage('');
                  setCheckEditIndex(index);
                  deleteid = item;
                }}
                style={styles.editConatiner}>
                <SvgXml xml={appImagesSvg.editIcon} />
                <Text> </Text>
                <Text style={styles.editText}>Edit Slot</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  };

  const SlotList = ({ item, index }) => {
    console.log('index', item, index);
    if (item?.days_of_week == 0) {
      return (
        <View key={index?.toString()}>
          <Line mainStyle={{ width: wp('100%') }} />
          <View style={styles.slotListConatiner}>
            <Text style={styles.slotText}>Slot {index + 1}</Text>
            {/* {item?.is_edit_delete === false ? null : ( */}
            <TouchableOpacity
              onPress={() => {
                (deleteid = item), (isDeleteIndex = index);
                setIsDelete(true);
              }}
              style={styles.deleteTouchView}>
              <SvgXml xml={appImagesSvg.deleteIcon} />
              <Text> </Text>
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
            {/* // )} */}
          </View>
          <View style={styles.dateConatiner}>
            <View style={styles.dateSubConatiner}>
              <Text style={styles.dateTextStart}>
                {dateFomat1(item?.open_times)}
              </Text>
              <Text style={styles.to}>to</Text>
              <Text style={styles.dateTextEnd}>
                {dateFomat1(item?.close_time)}
              </Text>
            </View>
            {item?.is_edit_delete === false ? null : (
              <TouchableOpacity
                onPress={() => {
                  setEditSlot(false);
                  setShowPicker(true), setAm(dateFomat2(item?.open_times));
                  setPm(dateFomat2(item?.close_time));
                  deleteid = item;
                  setFromDate(item?.open_times), setToDate(item?.close_time);
                  setSlotIdd(index);
                  setActiveDay(0);
                  setTimeAddErrorMessage('');
                  setCheckEditIndex(index);
                }}
                style={styles.editConatiner}>
                <SvgXml xml={appImagesSvg.editIcon} />
                <Text> </Text>
                <Text style={styles.editText}>Edit Slot</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      );
    } else {
      return (
        <>
          <NoData message={'Data Not Found'} />
        </>
      );
    }
  };


  const slotsAdd = () => {
    if (dayAll?.length < 2 || dayAll?.length == 0) {
      return (
        <View>
          <Line mainStyle={{ width: wp('100%') }} />
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {dayAll?.length == 0 ? <Text style={styles.allDayTitle}>{"All Days"}</Text>
              : <Text style={styles.allDayTitle}>{''}</Text>}
            <TouchableOpacity
              onPress={() => {
                setEditSlot(true), setShowPicker(true);
                setFromDate(null), setToDate(null);
                setTimeAddErrorMessage('');
                setActiveDay(0);
              }}
              style={[styles.slotContainer, { width: wp('32%') }]}>
              <SvgXml
                width={14}
                height={14}
                xml={appImagesSvg.addWhite}
                style={{ marginRight: hp('0.2%') }}
              />
              <Text style={[styles.addnewSlot]}>Add New Slot</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      return <Line mainStyle={{ width: wp('100%') }} />;
    }
  };



  const daysSlot = item => {
    const daysIndex = item?.index + 1;
    return (
      <View key={item?.item?.id}>
        <Line mainStyle={{ width: wp('100%') }} />
        <View style={styles.otherDayView}>
          <View style={styles.otherDayTitleView}>
            {/* <Text style={styles.otherDayTitle}>{"item?.item?.title"}</Text> */}
            <Text style={styles.otherDayTitle}>{Days[daysIndex - 1]}</Text>
            {item?.item?.timings?.length > 0 ? (
              <View>
                {item?.item?.timings[0]?.is_edit_delete != false &&
                  item?.item?.timings[1]?.is_edit_delete != false ? (
                  <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <Switch
                      style={{
                        transform:
                          Platform.OS === 'ios'
                            ? [{ scaleX: 0.8 }, { scaleY: 0.7 }]
                            : [{ scaleX: 1 }, { scaleY: 0.9 }],
                        marginLeft: item?.item?.outlet_status ? "-1" : '3%',
                      }}
                      value={item?.item?.outlet_status == true}
                      trackColor={{ false: colors.colorE5, true: colors.main }}
                      thumbColor={colors.white}
                      ios_backgroundColor={colors.colorCB}
                      onValueChange={() =>
                        toggleActive(item, daysIndex, otherday)
                      }
                    />
                    <View style={{
                      paddingHorizontal: 5,
                      marginLeft: item?.item?.outlet_status ? "-1%" : '-5%',
                    }}>
                      <Text style={styles.otherDayToggle}>
                        {item?.item?.outlet_status == true
                          ? 'Outlet Open'
                          : 'Outlet Closed'}
                      </Text>
                    </View>
                  </View>
                ) : null}
              </View>
            ) : null}
          </View>
          {item?.item?.timings?.length < 2 && (
            <TouchableOpacity
              onPress={() => {
                indexValue = daysIndex;
                setActiveDay(daysIndex);
                setEditSlot(true), setShowPicker(true);
                setFromDate(null), setToDate(null), 
                setTimeAddErrorMessage('');
              }}
              style={[styles.slotContainer, { width: wp('29%') }]}>
              <SvgXml
                width={14}
                height={14}
                xml={appImagesSvg.addWhite}
                style={{ marginRight: hp('0.2%') }}
              />
              <Text style={styles.addnewSlot}>Add Timing</Text>
            </TouchableOpacity>
          )}
        </View>

        {item?.item?.timings?.length !== 0 &&
          item?.item?.timings?.map((innerItem, index) => {
            // console.log('innerItem, index',innerItem, index);
            return specificTab(innerItem, index, daysIndex);
          })}
      </View>
    );
  };



  const FooteComponet = () => {
    return <Line mainStyle={{ width: wp('100%') }} />;
  };
  return (
    <View style={styles.screen}>
      <Header
        backArrow={true}
        onPress={() => {
          navigation.goBack();
        }}
        title={'Timings'}
        bottomLine={1}
      />
      <Spacer space={hp('2%')} />
      <View style={{ flex: 0.9 }}>
        <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
          <View>
            <Text style={styles.timingText}>Select Timing</Text>
            <Spacer space={hp('2%')} />
            <View style={{ flexDirection: 'row', marginHorizontal: 16 }}>
              <SwitchTabs
                isActiveTab={() => {
                  checkActiveTab(activeTab);
                  setactiveTab(false);
                  setTimeArray([]);
                  setTimeout(() => {
                    specificData(appUser, false);
                    timelistinglist(appUser);
                  }, 200);
                  setTimeAddErrorMessage('');
                  setActiveDay(0);
                }}
                Icon={
                  activeTab ? appImagesSvg.unCheckBox : appImagesSvg.checkBox
                }
                text={'All Days'}
              />
              <SwitchTabs
                isActiveTab={() => {
                  checkActiveTab(activeTab);
                  setactiveTab(true);
                  setTimeArray([]);
                  setTimeout(() => {
                    specificData(appUser, true);
                    timelistinglist(appUser);
                  }, 200);
                  setTimeAddErrorMessage('');
                }}
                marginLeft={hp('1.5%')}
                Icon={
                  activeTab ? appImagesSvg.checkBox : appImagesSvg.unCheckBox
                }
                text={'Specific Days'}
              />
            </View>
            <Spacer space={hp('2%')} />
            <Text style={styles.selectTiming}>Select Timings</Text>

            {activeTab == false ? (
              <FlatList
                scrollEnabled={false}
                bounces={false}
                style={{ marginTop: '1%' }}
                data={dayAll}
                keyExtractor={item => item?.id}
                renderItem={SlotList}
                ListFooterComponent={slotsAdd()}
              />
            ) : (
              <FlatList
                scrollEnabled={false}
                bounces={false}
                data={otherday}
                keyExtractor={item => item?.id}
                renderItem={daysSlot}
                ListFooterComponent={FooteComponet()}
              />
            )}
          </View>
          {showPicker && checkTimer()}

          {frompikcer && (
            <DatePicker
              modal
              mode="time"
              open={frompikcer}
              date={from ? convertTimeToDate(from) : new Date()}
              is24Hour={true}
              is24hourSource="locale"
              onConfirm={from => {
                const time = from?.toTimeString();
                const newTime = moment(time, 'HHmm').format('HH:mm');
                setAm(dateFomat2(newTime));
                setFromDate(newTime?.toString());
                setFromPicker(false);
              }}
              onCancel={() => {
                setFromPicker(false);
              }}
            />
          )}

          {topikcer && (
            <DatePicker
              modal
              mode="time"
              open={topikcer}
              date={toDate ? convertTimeToDate(toDate) : new Date()}
              is24Hour={true}
              onConfirm={toDate => {
                const time = toDate?.toTimeString();
                const newTime = moment(time, 'HHmm').format('HH:mm');
                setToDate(newTime?.toString());
                setPm(dateFomat2(newTime));
                setToFromPicker(false);
              }}
              onCancel={() => {
                setToFromPicker(false);
              }}
            />
          )}
          <PopUp
            topIcon={true}
            visible={isDelete}
            onClose={() => setIsDelete(false)}
            title={'You are about to delete an time slot'}
            type={'delete'}
            text={'This will delete your time slot are your sure?'}
            onDelete={() => {
              DeleteSlot(deleteid, isDeleteIndex);
            }}
          />
        </ScrollView>
      </View>
      {activateSwitch == true ? (
        <CTA
          loading={loading}
          disable={outletButton}
          width={wp('90%')}
          onPress={() => {
            setActionBUttons(true);
          }}
          bottomCheck={10}
          isBottom={true}
          title="Save"
        />
      ) : (
        <CTA
          loading={loading}
          disable={outletButton ? false : enableSaveButton ? false : true}
          width={wp('90%')}
          onPress={() => {
            if (timeArray?.length > 0) {
              setActionBUttons(true);
              activeTab == false ? addNewSlot(dayAll) : addNewSlot(otherday);
            } else {
              Alert.alert(
                '',
                'In case, restaurant not available 24/7, please add time slot based on restaurant timing.',
              );
            }
          }}
          bottomCheck={10}
          isBottom={true}
          title="Save"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.appBackground,
    flex: 1,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  Outlet: {
    fontSize: RFValue(14),
    fontFamily: fonts.medium,
    color: colors.black,
  },
  timingText: {
    marginHorizontal: 16,
    color: colors.black,
    fontSize: RFValue(14),
    fontFamily: fonts.medium,
    // marginTop: hp('1.5%'),
  },
  allDayTitle: {
    flex: 1,
    fontSize: RFValue(14),
    fontFamily: fonts.bold,
    color: colors.main,
    marginLeft: 20
  },
  slotContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: hp('0.8%'),
    borderRadius: 5,
    backgroundColor: colors.main,
    marginTop: '1%',
  },
  addnewSlot: {
    fontSize: RFValue(12),
    fontFamily: fonts.medium,
    color: colors.white,
  },

  modalContainer: {
    width: wp('100%'),
    height: hp('100%'),
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalSubConatiner: {
    width: wp('100%'),
    backgroundColor: colors.white,
    borderTopRightRadius: 15,
    borderTopRightRadius: 15,
    paddingBottom: '5%',
  },
  timeSlotContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    alignItems: 'center',
    marginVertical: 16,
    justifyContent: 'space-between',
  },
  timeSlotText: {
    fontSize: RFValue(15),
    fontFamily: fonts.medium,
    color: colors.black,
  },
  crossConatiner: {
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(203, 47, 47, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  slotListConatiner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginBottom: hp('1%'),
    marginTop: '2%',
  },
  deleteTouchView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  slotText: {
    fontFamily: fonts.semiBold,
    fontSize: RFValue(15),
    color: colors.color33,
    width: wp('60%'),
  },
  deleteText: {
    color: 'rgba(203, 47, 47, 1)',
    fontSize: RFValue(12),
    fontFamily: fonts.medium,
  },
  specificDataSlot: {
    fontSize: RFValue(15),
    fontFamily: fonts.semiBold,
    marginLeft: 16,
    color: colors.color33,
  },
  specificTabView: {
    marginLeft: 10,
    marginRight: 16,
    marginTop: hp('1%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  specificTabInnerView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  dateConatiner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
  },
  dateSubConatiner: {
    flexDirection: 'row',
    width: wp('60%'),
    alignItems: 'center',
  },
  dateTextStart: {
    maxWidth: wp('23%'),
    fontFamily: fonts.medium,
    fontSize: RFValue(12),
    color: colors.color90,
    justifyContent: 'flex-start',
  },
  dateTextEnd: {
    width: wp('23%'),
    fontFamily: fonts.medium,
    fontSize: RFValue(12),
    color: colors.color90,
  },
  to: {
    width: wp('10%'),
    textAlign: 'center',
    fontFamily: fonts.medium,
    fontSize: RFValue(12),
    color: colors.color90,
  },
  deleteConatiner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    justifyContent: 'flex-end',
    marginRight: 15,
  },
  deleteText: {
    color: colors.colorCB,
    fontSize: RFValue(12),
    fontFamily: fonts.medium,
  },
  editConatiner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(13, 113, 205, 0.1)',
    borderRadius: 5,
    padding: 5,
    justifyContent: 'flex-end',
  },
  editText: {
    color: 'rgba(13, 113, 205, 1)',
    fontSize: RFValue(12),
    fontFamily: fonts.medium,
  },
  selectTiming: {
    marginHorizontal: 16,
    fontSize: RFValue(14),
    fontFamily: fonts.medium,
    color: 'rgba(0, 0, 0, 1)',
  },
  otherDayView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  otherDayTitleView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    alignItems: 'center',
    marginTop: '1%',
  },
  otherDayTitle: {
    fontSize: RFValue(14),
    fontFamily: fonts.bold,
    color: colors.main,
  },
  otherDayToggle: {
    fontSize: RFValue(10),
    fontFamily: fonts.medium,
    color: colors.color8F,
    // alignSelf: 'center',
  },
});
