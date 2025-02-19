import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Pressable,
  StyleSheet,
  Dimensions,
  Platform,
  TouchableOpacity,
  // Modal
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {SvgXml} from 'react-native-svg';
import {Switch} from 'react-native-paper';
import moment from 'moment';
import Modal from 'react-native-modal';
import {useFormikContext} from 'formik';
import {fonts} from '../../theme/fonts/fonts';
import {colors} from '../../theme/colors';
import OpenProductDayList from '../../screens/DashboardScreen/Menu/AddProduct/OpenProductDayList';
import {Line} from '../../halpers/Line';
import AddItem from '../cta/AddItem';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

const {height} = Dimensions.get('window');

const icon = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
<g id="timer_FILL0_wght400_GRAD0_opsz24 1">
<path id="Vector" d="M6.75 2.25V0.75H11.25V2.25H6.75ZM8.25 10.5H9.75V6H8.25V10.5ZM9 16.5C8.075 16.5 7.203 16.322 6.384 15.966C5.5655 15.6095 4.85 15.125 4.2375 14.5125C3.625 13.9 3.1405 13.1845 2.784 12.366C2.428 11.547 2.25 10.675 2.25 9.75C2.25 8.825 2.428 7.953 2.784 7.134C3.1405 6.3155 3.625 5.6 4.2375 4.9875C4.85 4.375 5.5655 3.89075 6.384 3.53475C7.203 3.17825 8.075 3 9 3C9.775 3 10.5188 3.125 11.2313 3.375C11.9438 3.625 12.6125 3.9875 13.2375 4.4625L14.2875 3.4125L15.3375 4.4625L14.2875 5.5125C14.7625 6.1375 15.125 6.80625 15.375 7.51875C15.625 8.23125 15.75 8.975 15.75 9.75C15.75 10.675 15.572 11.547 15.216 12.366C14.8595 13.1845 14.375 13.9 13.7625 14.5125C13.15 15.125 12.4345 15.6095 11.616 15.966C10.797 16.322 9.925 16.5 9 16.5ZM9 15C10.45 15 11.6875 14.4875 12.7125 13.4625C13.7375 12.4375 14.25 11.2 14.25 9.75C14.25 8.3 13.7375 7.0625 12.7125 6.0375C11.6875 5.0125 10.45 4.5 9 4.5C7.55 4.5 6.3125 5.0125 5.2875 6.0375C4.2625 7.0625 3.75 8.3 3.75 9.75C3.75 11.2 4.2625 12.4375 5.2875 13.4625C6.3125 14.4875 7.55 15 9 15Z" fill="#1D721E"/>
</g>
</svg>`;

const swipe = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
<g id="sync_alt_FILL0_wght400_GRAD0_opsz24 1">
<path id="Vector" d="M5.83329 17.5L1.66663 13.3333L5.83329 9.16667L7.02079 10.3333L4.85413 12.5H17.5V14.1667H4.85413L7.02079 16.3333L5.83329 17.5ZM14.1666 10.8333L12.9791 9.66667L15.1458 7.5H2.49996V5.83333H15.1458L12.9791 3.66667L14.1666 2.5L18.3333 6.66667L14.1666 10.8333Z" fill="#8F8F8F"/>
</g>
</svg>`;

let fortime = '';

let DayArray = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

const ProductTiming = ({
  name,
  value,
  title,
  nameArray,
  valueArray,
  setTimingButton,
}) => {
  const {values, handleChange, setFieldValue} = useFormikContext();
  const [isAllTime, setISAllTime] = useState(
    value == 'full_time' ? true : false,
  );
  const [visible, setVisible] = useState(false);
  const [showTiming, setShowTiming] = useState(valueArray);

  console.log('showTiming', showTiming, valueArray);

  const TimeFormat = d => {
    if (d) {
      return moment(d, 'HHmmss').format('hh:mm a');
    } else {
      return '';
    }
  };

  const sortTimingData = timeSlotAry => {
    return timeSlotAry?.sort((a, b) => {
      // First, compare by days_of_week
      if (a.days_of_week < b.days_of_week) return -1;
      if (a.days_of_week > b.days_of_week) return 1;
    });
  };

  useEffect(() => {
    if (showTiming?.length > 0) {
      setFieldValue(name, 'partial_time');
      setISAllTime(false);
      setFieldValue(nameArray, sortTimingData(showTiming));
    } else {
      setFieldValue(name, 'full_time');
      setFieldValue(nameArray, []);
      setISAllTime(true);
    }
  }, [showTiming, visible]);

  const CustomizeTiming = () => {
    let addMore = showTiming?.length;
    return (
      <View style={styles.customizeTimeView}>
        <View style={styles.mainViewAddMore}>
          <Text style={styles.paticulorText}>Set Particolur Day</Text>
          <AddItem
            imageNotShow={addMore == 0 ? false : true}
            title={addMore == 0 ? 'Add' : 'View All'}
            onAdd={() => {
              setVisible(!visible);
            }}
          />
        </View>
      </View>
    );
  };

  const ItemSwitch = () => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          setISAllTime(!isAllTime);
          if (isAllTime) {
            setVisible(!visible);
          } else {
            setFieldValue(nameArray, []);
            setShowTiming([]);
          }
        }}
        style={styles.switchBtnView}>
        <Switch
          // disabled
          value={isAllTime}
          color={colors.main}
          style={{
            transform:
              Platform.OS === 'ios'
                ? [{scaleX: 0.8}, {scaleY: 0.7}]
                : [{scaleX: 1}, {scaleY: 0.9}],
          }}
          onValueChange={() => {
            setISAllTime(!isAllTime);
            if (isAllTime) {
              setVisible(!visible);
            } else {
              setFieldValue(nameArray, []);
              setShowTiming([]);
            }
          }}
        />
        <Text style={[styles.title, {fontFamily: fonts.semiBold}]}>
          All Time
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{marginTop: '5%'}}>
      <Text style={styles.title}>{title}</Text>
      <ItemSwitch />
      {!isAllTime && <CustomizeTiming />}
      {!isAllTime && showTiming?.length > 0 && (
        <>
          {showTiming?.slice(0, 1)?.map((item, i) => {
            return (
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                  setVisible(!visible);
                }}>
                <View style={{marginTop: '2%'}}>
                  <Text style={styles.dayText}>
                    {DayArray[Number(item?.days_of_week) - 1]}
                  </Text>
                  <View style={styles.fromtoView}>
                    <Text style={styles.formText}>
                      {TimeFormat(item?.open_times)}
                    </Text>
                    <SvgXml xml={swipe} />
                    <Text style={styles.toText}>
                      {TimeFormat(item?.close_time)}
                    </Text>
                  </View>
                  <Line />
                </View>
              </TouchableOpacity>
            );
          })}
        </>
      )}

      <Modal
        isVisible={visible}
        onBackdropPress={() => setVisible(false)}
        style={{justifyContent: 'flex-end', margin: 0}} // This aligns the modal to the bottom
      >
        <OpenProductDayList
          isVisible={visible}
          handleVisible={setVisible}
          setShowTiming={setShowTiming}
          showTiming={showTiming}
        />
      </Modal>
    </View>
  );
};

export default ProductTiming;

const styles = StyleSheet.create({
  title: {
    color: colors.black,
    fontFamily: fonts.semiBold,
    fontSize: RFValue(12),
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: '6%',
    marginTop: '3%',
  },
  customizeTimeView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '3%',
    // justifyContent: 'space-between',
  },
  switchBtnView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '3%',
    width: wp('30%'),
  },
  dayText: {
    fontSize: RFValue(15),
    fontFamily: fonts.medium,
    color: colors.green,
  },
  fromtoView: {
    flexDirection: 'row',
    marginTop: '2%',
    alignItems: 'center',
  },
  formText: {
    fontSize: RFValue(15),
    fontFamily: fonts.medium,
    marginRight: 10,
  },
  toText: {
    fontSize: RFValue(15),
    fontFamily: fonts.medium,
    marginLeft: 10,
  },
  mainViewAddMore: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paticulorText: {
    flex: 1,
    fontSize: RFValue(14),
    fontFamily: fonts.medium,
    color: colors.green,
  },
  addMoreText: {
    fontSize: RFValue(14),
    fontFamily: fonts.medium,
    color: colors.green,
    marginRight: '2%',
  },
});
