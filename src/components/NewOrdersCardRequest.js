import React, { useEffect, useState } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Surface } from 'react-native-paper';
import { colors } from '../theme/colors';
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

export default function NewOrdersCardRequest({
  item,
  onCookingTimeChnage,
  onDetail,
  onDeclineOrder,
  onUpdateStatus,
  acceptedData,
  declineData
}) {
  const [timerCount, setTimer] = useState(299);
  const [update, setupdate] = useState(false);

  console.log("acceptedData,declineData", acceptedData, declineData);


  useEffect(() => {
       setTimer(item?.timerSecond?? 299);
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
    <Surface elevation={2} style={styles.container}>
      <View style={styles.innerView}>
        <OrdersWithoutStatusComp item={item} />

        {item?.cart_items?.map((data, index) => {
          console.log("data--cart_items", data);
          return (<DishItemComp data={data} />);
        })}
        <BottomLine />
        <TotalBillComp item={item} />
        <Spacer space={'5%'} />

        <BTN
          onPress={onDetail}
          bottomCheck={1}
          height={hp('4%')}
          labelColor={colors.main}
          backgroundColor={colors.white}
          title={'View Details'}
          textTransform={'capitalize'}
        />

        <OrdersInstrucationsComp item={item} />
        <CookingTime order={item} onChnage={onCookingTimeChnage} />
        <View style={styles.bottomBtnView}>
          <BTN
            disable={timerCount != 0 ? false : true}
            labelColor={colors.green}
            backgroundColor={colors.green15}
            borderColor={colors.green15}
            bottomCheck={2}
            width={wp('40')}
            height={hp('5.2%')}
            title={`Accept(${timerCount != 0 ? `${secondsToHms(timerCount)}` : '00:00'
              })`}
            textTransform={'capitalize'}
            onPress={() => { onUpdateStatus(item) }}
            loading={acceptedData?._id == item?._id}
          />
          <BTN
            labelColor={colors.main}
            backgroundColor={colors.white}
            bottomCheck={2}
            width={wp('40')}
            height={hp('5.2%')}
            title={'Reject'}
            textTransform={'capitalize'}
            onPress={() => { onDeclineOrder(item) }}
            loading={declineData?._id == item?._id}
          />
        </View>
      </View>
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    shadowColor: Platform.OS == 'ios' ? colors.black50 : colors.black, // You can customize shadow color
    backgroundColor: colors.white,
    alignSelf: 'center',
    borderRadius: 10,
    width: wp('92%'),
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
