import React, {useEffect, useState} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {Surface} from 'react-native-paper';
import {colors} from '../theme/colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import BottomLine from '../halpers/BottomLine';
import Spacer from '../halpers/Spacer';
import BTN from './cta/BTN';
import OrdersStatusComp from './OrderStatusComp';
import DishItemComp from './DishItemComp';
import TotalBillComp from './TotalBillComp';
import OrdersInstrucationsComp from './OrderInstructionsComp';
import AppInputScroll from '../halpers/AppInputScroll';

export default function NewOrdersCardDetails({item}) {
  const [timerCount, setTimer] = useState(299);

  useEffect(() => {
    setTimer(item?.timerSecond);
  }, [item?.timerSecond]);

  useEffect(() => {
    let interval = setInterval(() => {
      setTimer(lastTimerCount => {
        lastTimerCount <= 1 && clearInterval(interval);
        return lastTimerCount - 1;
      });
    }, 1000); //each count lasts for a second
    //cleanup the interval on complete
    return () => clearInterval(interval);
  }, []);

  const secondsToHms = d => {
    d = Number(d);

    var m = Math.floor((d % 3600) / 60);
    var s = Math.floor((d % 3600) % 60);

    // var mDisplay = m > 0 ? m + (m == 1 ? ' : ' : ' : ') : '';
    // var sDisplay = s > 0 ? s + (s == 1 ? '' : '') : '0';

    var mDisplay = m > 0 ? (m < 10 ? '0' + m : m) + ' : ' : '00 : ';
    var sDisplay = s > 0 ? s + (s == 1 ? '' : '') : '0';

    let newSDisplay = sDisplay;
    if (sDisplay < 10) {
      newSDisplay = 0 + sDisplay;
    }
    return mDisplay + newSDisplay;
  };

  const onChangeBTNBackColor = type => {
    switch (type) {
      case 'Preparing':
        return colors.colorFF915;
      case 'Packing':
        return colors.colorFC15;
      case 'Ready To Pickup':
        return colors.color0D15;
      default:
        return colors.colorFF915;
    }
  };

  const onChangeBTNTextColor = type => {
    switch (type) {
      case 'Preparing':
        return colors.colorFF9;
      case 'Packing':
        return colors.colorFC;
      case 'Ready To Pickup':
        return colors.color0D;
      default:
        return colors.colorFF9;
    }
  };

  const onChangeBTNText = type => {
    switch (type) {
      case 'Preparing':
        return 'Order Ready';
      case 'Packing':
        return 'Order Packed';
      case 'Ready To Pickup':
        return 'Order Picked';
      default:
        return 'Order Ready';
    }
  };

  return (
    <View style={styles.container}>
      <AppInputScroll
        Pb={'40%'}
        padding={true}
        keyboardShouldPersistTaps={'handled'}>
        <View style={styles.innerView}>
          <OrdersStatusComp item={item} />

          {item?.dishArray?.map((data, index) => {
            return <DishItemComp data={data} />;
          })}
          <BottomLine />
          <TotalBillComp item={item} />
          <OrdersInstrucationsComp item={item} />
        </View>
      </AppInputScroll>
      <View
        style={{
          position: 'absolute',
          bottom: 0.1,
          alignSelf: 'center',
          backgroundColor: 'white',
          width: wp('100%'),
          paddingHorizontal: '6%',
        }}>
        <View style={styles.bottomBtnView}>
          <BTN
            labelColor={onChangeBTNTextColor(item?.status)}
            backgroundColor={onChangeBTNBackColor(item?.status)}
            borderColor={onChangeBTNBackColor(item?.status)}
            bottomCheck={2}
            width={wp('42')}
            height={hp('5.2%')}
            title={
              item?.status == 'Preparing'
                ? `Order Ready (${
                    timerCount != 0 ? `${secondsToHms(timerCount)}` : '00:00'
                  })`
                : onChangeBTNText(item?.status)
            }
            textTransform={'capitalize'}
          />
          <BTN
            labelColor={colors.main}
            backgroundColor={colors.white}
            bottomCheck={2}
            width={wp('42')}
            height={hp('5.2%')}
            title={'cancel'}
            textTransform={'capitalize'}
          />
        </View>
        <Spacer space={'5%'} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: '5%',
  },
  innerView: {
    justifyContent: 'center',
    marginHorizontal: '5%',
    paddingVertical: '4%',
  },
  bottomBtnView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '6%',
  },
});
