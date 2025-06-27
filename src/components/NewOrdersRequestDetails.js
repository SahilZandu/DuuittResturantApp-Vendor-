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
import DishItemComp from './DishItemComp';
import TotalBillComp from './TotalBillComp';
import OrdersInstrucationsComp from './OrderInstructionsComp';
import OrdersWithoutStatusComp from './OrderWithoutStatusComp';
import CookingTime from './orders/CookingTime';
import AppInputScroll from '../halpers/AppInputScroll';

export default function NewOrdersRequestDetails({item, onCookingTimeChnage}) {
  const [timerCount, setTimer] = useState(299);
  const [update, setupdate] = useState(false);

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

  return (
    <View style={styles.container}>
      <AppInputScroll
        Pb={'40%'}
        padding={true}
        keyboardShouldPersistTaps={'handled'}>
        <View style={styles.innerView}>
          <OrdersWithoutStatusComp item={item} />
          {item?.cart_items?.map((data, index) => {
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
          backgroundColor: colors.white,
          width: wp('100%'),
          paddingHorizontal: '6%',
        }}>
        <CookingTime order={item} onChnage={onCookingTimeChnage} />
        {/* <View style={styles.bottomBtnView}>
          <BTN
            disable={timerCount != 0 ? false : true}
            labelColor={colors.green}
            backgroundColor={colors.green15}
            borderColor={colors.green15}
            bottomCheck={2}
            width={wp('42')}
            height={hp('5.2%')}
            title={`Accept Order (${
              timerCount != 0 ? `${secondsToHms(timerCount)}` : '00:00'
            })`}
            textTransform={'capitalize'}
          />
          <BTN
            labelColor={colors.main}
            backgroundColor={colors.white}
            bottomCheck={2}
            width={wp('42')}
            height={hp('5.2%')}
            title={'Reject'}
            textTransform={'capitalize'}
          />
        </View> */}
        <Spacer space={'5%'} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    // alignSelf: 'center',
    borderRadius: 10,
    marginTop: '1%',
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
