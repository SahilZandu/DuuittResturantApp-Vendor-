import React, {useCallback,useState} from 'react';
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
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import moment from 'moment';
import {RFValue} from 'react-native-responsive-fontsize';
import {SvgXml} from 'react-native-svg';
import DatePicker from 'react-native-date-picker';
import {useFocusEffect} from '@react-navigation/native';
import { fonts } from '../../../../theme/fonts/fonts';
import { colors } from '../../../../theme/colors';
import { appImagesSvg } from '../../../../commons/AppImages';
import CTA from '../../../../components/cta/CTA';
import { Line } from '../../../../halpers/Line';
import PopUp from '../../../../components/appPopUp/PopUp';
import handleAndroidBackButton from '../../../../halpers/handleAndroidBackButton';
import { useToast } from '../../../../halpers/useToast';
import TimePicker from './TimePicker';
import Spacer from '../../../../halpers/Spacer';

let deleteid = '';
let indexValue = '';
let isDeleteIndex = '';

export default function OpenProductDayList({
  navigation,
  handleVisible,
  setShowTiming,
  showTiming
}) {
  // const {appOrg} = rootStore.commonStore;
  // const {addSlot, DeleteSlott, EditSLott, timelisting} =
  //   rootStore.timemangement;
  const [loading, setLoading] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [from, setFromDate] = useState(null);
  const [frompikcer, setFromPicker] = useState(false);
  const [topikcer, setToFromPicker] = useState(false);
  const [toDate, setToDate] = useState(null);
  const [activeTab, setactiveTab] = useState(true);
  const [editSlot, setEditSlot] = useState(true);
  const [slotItem, setSlotItem] = useState('');
  const [isDelete, setIsDelete] = useState(false);
  const [slotStatus, setSlotStatus] = useState('');
  const [am, setAm] = useState('');
  const [pm, setPm] = useState('');
  const [otherday, setOtherDay] = useState([]);
  const [timeArray, setTimeArray] = useState(showTiming);
  const [timeAddErrorMessage, setTimeAddErrorMessage] = useState('');
  const [activeDay, setActiveDay] = useState(0);
  const [checkEditIndex, setCheckEditIndex] = useState(0);
  // const [isCheckBack, setIsCheckBack] = useState(false);
  const [dayAll, setDayAll] = useState([]);
  const [editLoading, setEditLoading] = useState(false);

  handleAndroidBackButton(navigation);

  const AddSlotRange = (from, toDate) => {
    const newTimeRange = {
      days_of_week: activeTab == false ? 0 : indexValue,
      open_times: from,
      close_time: toDate,
      // org_id: appOrg.id,
      org_id: '1',
      isEditDelete: false,
    };

    const newArray = [...timeArray];
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

  const filterSLots = timeArray => {
    console.log('timeArray==', timeArray);
    if (timeArray?.length > 0) {
      let newAddValue = timeArray?.filter(
        value => value?.isEditDelete == false,
      );
    }

    const mondayData = timeArray?.filter(item => item?.days_of_week == '1');

    slotfilter(mondayData, '1');

    const tuesdayData = timeArray?.filter(item => item?.days_of_week == '2');

    slotfilter(tuesdayData, '2');

    const wednesdayData = timeArray?.filter(item => item?.days_of_week == '3');

    slotfilter(wednesdayData, '3');

    const thursdayData = timeArray.filter(item => item?.days_of_week == '4');

    slotfilter(thursdayData, '4');

    const fridayData = timeArray.filter(item => item?.days_of_week == '5');
    slotfilter(fridayData, '5');

    const saturdayData = timeArray?.filter(item => item?.days_of_week == '6');
    slotfilter(saturdayData, '6');

    const sundayData = timeArray.filter(item => item?.days_of_week == '7');
    slotfilter(sundayData, '7');
  };

  const slotfilter = (Data, days) => {
    if (Data?.length > 0) {
      otherday?.map(item => {
        if (item?.id == days) {
          item.data = Data;
        }
        return {...item};
      });

      setOtherDay([...otherday]);
    }
  };
  const timelistinglist = async () => {
    try {
      // const filter = await timelisting();
      const filter = timeArray ;
      setTimeArray(filter);
      setShowTiming(filter);
      const mondayData = filter?.filter(
        item => item?.days_of_week == '1',
      );
      console.log('filter----1', filter);

      const newMondayData = {
        id: 1,
        title: 'Monday',
        data: mondayData,
        outletStatus: mondayData?.length > 0 ? mondayData[0]?.status : 0,
      };

      const tuesdayData = filter?.filter(
        item => item?.days_of_week == '2',
      );
      // console.log('filter----2', tuesdayData);

      const newTuesdayData = {
        id: 2,
        title: 'Tuesday',
        data: tuesdayData,
        outletStatus: tuesdayData?.length > 0 ? tuesdayData[0]?.status : 0,
      };

      const wednesdayData = filter?.filter(
        item => item?.days_of_week == '3',
      );
      const newWednesdayData = {
        id: 3,
        title: 'Wednesday',
        data: wednesdayData,
        outletStatus: wednesdayData?.length > 0 ? wednesdayData[0]?.status : 0,
      };

      const thursdayData = filter?.filter(
        item => item?.days_of_week == '4',
      );
      const newThursdayData = {
        id: 4,
        title: 'Thursday',
        data: thursdayData,
        outletStatus: thursdayData?.length > 0 ? thursdayData[0]?.status : 0,
      };

      const fridayData = filter?.filter(
        item => item?.days_of_week == '5',
      );
      const newFridayData = {
        id: 5,
        title: 'Friday',
        data: fridayData,
        outletStatus: fridayData?.length > 0 ? fridayData[0]?.status : 0,
      };

      const staurdayData = filter?.filter(
        item => item?.days_of_week == '6',
      );
      const newStaurdayData = {
        id: 6,
        title: 'Saturday',
        data: staurdayData,
        outletStatus: staurdayData?.length > 0 ? staurdayData[0]?.status : 0,
      };

      const sundayData = filter?.filter(
        item => item?.days_of_week == '7',
      );

      const newSundayData = {
        id: 7,
        title: 'Sunday',
        data: sundayData,
        outletStatus: sundayData?.length > 0 ? sundayData[0]?.status : 0,
      };

      setOtherDay([
        newMondayData,
        newTuesdayData,
        newWednesdayData,
        newThursdayData,
        newFridayData,
        newStaurdayData,
        newSundayData,
      ]);

      setIsDelete(false);
    } catch (error) {}
  };

  const onRefresh = () => {
    timelistinglist();
  };

  const DeleteSlot = async (item, isDeleteIndex) => {
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
      // console.log('filterData', filterData);
      await otherday[item?.days_of_week - 1]?.data?.splice(isDeleteIndex, 1);
      setTimeArray([...filterData]);
      setShowTiming([...filterData]);
      setOtherDay([...otherday]);
      setIsDelete(false);
      useToast('s', 'Time slot deleted successfully.');

  };
  // console.log('editSlot-----', editSlot);
  const EditSlot = (from, toDate, slotItem) => {

    console.log("from, toDate, slotItem",from, toDate, slotItem)
        
  const updateSlot =  timeArray?.map((item ,i)=>{

    if(item?.days_of_week == slotItem?.days_of_week){
      item.open_times= from
      item.close_time= toDate
      
    }
    return{...item}

    })
    onSuccess();

    console.log("updateSlot",updateSlot)
    
    // EditSLott(
    //   from,
    //   toDate,
    //   slotItem,
    //   activeDay,
    //   onRefresh,
    //   handleEditLoading,
    //   onSuccess,
    // );
  };

  const handleEditLoading = v => {
    setEditLoading(v);
  };

  const onSuccess = () => {
    setShowPicker(false);
  };

  // ======================= Add And Update Slot

  const returnData = (from, toDate, isValid) => {
    // console.log('from, toDate', from, toDate);
    if (from < toDate) {
      AddSlotRange(from, toDate);
      return (isValid = true);
    } else {
      setTimeAddErrorMessage('To time should be greater From time');
      return (isValid = false);
    }
  };

  const returnAddDayArray = (from, toDate, dayArray) => {
    return dayArray?.map((item, index) => {
      if (from < toDate) {
        if (from >= item?.open_times && from <= item?.close_time) {
          setTimeAddErrorMessage('This slot is already taken');
          return false;
        } else {
          if (toDate >= item?.open_times) {
            if (from >= item?.close_time) {
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
    // console.log('from, toDate', from, toDate);
    if (from < toDate) {
      // AddSlotRange(from, toDate);
      return (isValid = true);
    } else {
      setTimeAddErrorMessage('To time should be greater From time');
      return (isValid = false);
    }
  };

  const returnEditAddDayArray = (from, toDate, dayArray, checkIndex) => {
    return dayArray?.map((item, index) => {
      if (dayArray?.length > 1) {
        if (index !== checkIndex) {
          if (from < toDate) {
            if (from >= item?.open_times && from <= item?.close_time) {
              setTimeAddErrorMessage('This slot is already taken');
              return false;
            } else {
              if (toDate >= item?.open_times) {
                if (from >= item?.close_time) {
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
            setTimeAddErrorMessage('To time should be greater From time');
            return false;
          }
        }
      } else {
        if (from < toDate) {
          return true;
        } else {
          setTimeAddErrorMessage('To time should be greater From time');
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
    if (newOtherday?.data?.length > 0 && activeDay > 0) {
      otherData = returnAddDayArray(from, toDate, newOtherday?.data);
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
    let isValid = false;
    let otherData = false;
    let allDayData = false;
    const newOtherday = otherday[activeDay - 1];
    if (newOtherday?.data?.length > 1 || dayAll?.length > 1) {
      if (newOtherday?.data?.length > 0) {
        otherData = returnEditAddDayArray(
          from,
          toDate,
          newOtherday?.data,
          checkEditIndex,
        );
        let newIndex = 0;
        newIndex = checkEditIndex == 0 ? 1 : 0;

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
      if (isValid === true) {
        return (isValid = true);
      } else if (isValid === false) {
        return (isValid = false);
      }
    }
  };

  // ======================

  // Set Timer Modal

  useFocusEffect(
    useCallback(() => {
      timelistinglist();
    }, []),
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
                  color: '#CB2F2F',
                  marginHorizontal: 18,
                }}>
                {timeAddErrorMessage}
              </Text>
            )}

            <Spacer space={hp('3.5%')} />

            <View style={{alignItems: 'center'}}>
              {editSlot == true ? (
                <CTA
                  // disable={
                  //   (from && toDate !== null ? false : true) ||
                  //   timeAddErrorMessage?.length > 0
                  // }
                  onPress={() => {
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
                      EditSlot(from, toDate, slotItem, slotStatus);
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
  const handelSaveButton = () => {
    handleVisible(false);
    setShowTiming(timeArray);
    // setIsCheckBack(false);
  };

  const addNewSlot = async data => {
    let specificTab = [];
    specificTab = data.filter(item => item.days_of_week != '0');
    // setLoading(true);
    handelSaveButton()
    // addSlot(data, onRefresh, handleLoading, handelSaveButton);
  };

  const specificTab = (item, index, daysIndex) => {
    // console.log('index', index);
    return (
      <View>
        <View style={[styles.dateConatiner, {marginTop: hp('1%')}]}>
          <View style={styles.dateSubConatiner}>
            <Text style={styles.dateTextStart}>
              {dateFomat1(item.open_times)}
            </Text>
            <Text style={styles.to}>to</Text>
            <Text style={styles.dateTextEnd}>
              {dateFomat1(item.close_time)}
            </Text>
          </View>
        </View>
        <View style={styles.editView}>
          <View style={styles.editViewInner}>
            <TouchableOpacity
              onPress={() => {
                (deleteid = item), (isDeleteIndex = index);
                setIsDelete(true);
              }}
              style={styles.deleteConatiner}>
              <SvgXml xml={appImagesSvg.deleteIcon} />
              <Text> </Text>
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
            {/* {item?.isEditDelete === false ? null : ( */}
              <TouchableOpacity
                onPress={() => {
                  setEditSlot(false);
                  setShowPicker(true), setAm(dateFomat2(item.open_times));
                  setPm(dateFomat2(item.close_time));
                  setFromDate(item.open_times), setToDate(item.close_time);
                  setSlotItem(item);
                  setActiveDay(daysIndex);
                  setTimeAddErrorMessage('');
                  setCheckEditIndex(index);
                }}
                style={styles.editConatiner}>
                <SvgXml xml={appImagesSvg.editIcon} />
                <Text> </Text>
                <Text style={styles.editText}>Edit Slot</Text>
              </TouchableOpacity>
            {/* )} */}
          </View>
        </View>
      </View>
    );
  };

  const daysSlot = item => {
    const daysIndex = item?.index + 1;
    return (
      <View key={item?.item?.id}>
        <Line />
        <View style={styles.daysSlotMainView}>
          <View style={styles.daysSlotInnerView}>
            <Text style={styles.titleText}>{item?.item?.title}</Text>
          </View>
          {item?.item?.data?.length < 1 && (
            <TouchableOpacity
              onPress={() => {
                indexValue = daysIndex;
                setActiveDay(daysIndex);
                setEditSlot(true), setShowPicker(true);
                setFromDate(null), setToDate(null), setTimeAddErrorMessage('');
              }}
              style={[styles.slotContainer]}>
              <SvgXml
                xml={appImagesSvg.greenPlusBtn}
                style={{marginRight: hp('0.6%')}}
              />
              <Text style={styles.addnewSlot}>Add Timing</Text>
            </TouchableOpacity>
          )}
        </View>
        {item?.item?.data?.length !== 0 &&
          item?.item?.data?.map((innerItem, index) =>
            specificTab(innerItem, index, daysIndex),
          )}
      </View>
    );
  };

  const FooteComponet = () => {
    return <Line />;
  };

  return (
    <View style={styles.screen}>
      <View>
        <View style={styles.selectTimingView}>
          <Text style={styles.selectTiming}>Select Timing</Text>
          <TouchableOpacity
            onPress={() => {
              handleVisible(false);
            }}
            style={styles.cancelBTNPress}>
            <SvgXml xml={appImagesSvg?.popUpclose} />
          </TouchableOpacity>
        </View>
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: '30%'}}>
          <View>
            <FlatList
              scrollEnabled={false}
              bounces={false}
              data={otherday}
              keyExtractor={item => item?.id}
              renderItem={daysSlot}
              ListFooterComponent={FooteComponet()}
            />
          </View>
          {showPicker && checkTimer()}

          {frompikcer && (
            <DatePicker
              modal
              mode="time"
              open={frompikcer}
              date={new Date()}
              // is24hourSource="locale"
              // locale="en_GB"
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
              date={new Date()}
              // is24hourSource="locale"
              // locale="en_GB"
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

      <CTA
        loading={loading}
        // disable={timeArray?.length > 0 ? false : true}
        width={wp('90%')}
        onPress={() => {
          if (timeArray?.length > 0) {
            addNewSlot(otherday);
          } else {
            Alert.alert('', 'Please add time slot based on restaurant timing.');
          }
        }}
        bottomCheck={20}
        isBottom={true}
        title="Save"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    height: hp('80%'),
    backgroundColor: colors.whiteBackground,
    borderTopLeftRadius: 10, // Optional: for rounded corners
    borderTopRightRadius: 10, // Optional: for rounded corners
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
    marginTop: hp('1.5%'),
  },
  slotContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    alignItems: 'center',
    padding: hp('0.8%'),
    borderRadius: 5,
    backgroundColor: 'rgba(29, 114, 30, 0.1)',
  },
  addnewSlot: {
    fontSize: RFValue(12),
    fontFamily: fonts.medium,
    color: colors.main,
  },

  modalContainer: {
    width: wp('100%'),
    height: hp('100%'),
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalSubConatiner: {
    width: wp('100%'),
    backgroundColor: '#fff',
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
  },
  slotText: {
    fontFamily: fonts.bold,
    fontSize: RFValue(16),
    color: colors.main,
    width: wp('60%'),
  },
  deleteText: {
    color: 'rgba(203, 47, 47, 1)',
    fontSize: RFValue(12),
    fontFamily: fonts.medium,
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
    fontSize: RFValue(14),
    color: colors.black,
    justifyContent: 'flex-start',
  },
  dateTextEnd: {
    width: wp('23%'),
    fontFamily: fonts.medium,
    fontSize: RFValue(14),
    color: colors.black,
  },
  to: {
    width: wp('10%'),
    textAlign: 'center',
    fontFamily: fonts.medium,
    fontSize: RFValue(14),
    color: colors.black,
  },
  deleteConatiner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    justifyContent: 'flex-end',
    marginRight: 15,
  },
  deleteText: {
    color: '#CB2F2F',
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
    flex: 1,
    marginHorizontal: 16,
    fontSize: RFValue(14),
    fontFamily: fonts.medium,
    color: 'rgba(0, 0, 0, 1)',
  },
  cancelBTNPress: {
    backgroundColor: 'rgba(203, 47, 47, 0.15)',
    height: 28,
    width: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    right: 15,
  },
  editView: {
    marginLeft: 10,
    marginRight: 16,
    marginTop: hp('1%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  editViewInner: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  daysSlotMainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  daysSlotInnerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    alignItems: 'center',
  },
  titleText: {
    fontSize: RFValue(14),
    fontFamily: fonts.bold,
    color: colors.main,
  },
  selectTimingView: {
    flexDirection: 'row',
    marginTop: '3%',
    marginBottom: '1%',
  },
});
