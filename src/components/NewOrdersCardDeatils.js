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
import OrdersStatusComp from './OrderStatusComp';
import DishItemComp from './DishItemComp';
import TotalBillComp from './TotalBillComp';
import OrdersInstrucationsComp from './OrderInstructionsComp';
import AppInputScroll from '../halpers/AppInputScroll';
import { currencyFormat } from '../halpers/currencyFormat';
import { RFValue } from 'react-native-responsive-fontsize';
import { Line } from '../halpers/Line';
import { fonts } from '../theme/fonts/fonts';

export default function NewOrdersCardDetails({ item }) {
  const [timerCount, setTimer] = useState(299);

  useEffect(() => {
    setTimer(item?.timerSecond);
  }, [item?.timerSecond]);

  console.log("item---NewOrdersCardDetails", item);


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


  let amountArray = [
    {
      name: 'Item total',
      amount: item?.billing_detail?.after_discount_sub_amt ? item?.billing_detail?.after_discount_sub_amt : item?.billing_detail?.item_sub_total_amount ?? 0,
    },
    {
      name: 'Restaurant Charges',
      amount: item?.billing_detail?.restaurant_charge_amount ?? 0,
    },
    {
      name: 'Management Charges',
      amount: item?.billing_detail?.distance_fee ?? 0,
    },
    {
      name: 'Packing Charges',
      amount:item?.billing_detail?.packing_fee ?? item?.packing_fee ?? 0,
    },
    {
      name: 'Plateform Fee',
      amount: item?.billing_detail?.platform_fee ?? 0,
    },
    {
      name: 'GST Charges',
      amount: item?.billing_detail?.gst_fee ?? item?.billing_detail?.tax_amount ?? 0,
    },
    {
      name: 'Discount',
      amount: item?.billing_detail?.discount ?? item?.billing_detail?.discount ?? 0,
    },
    {
      name: 'Delivery Charges',
      amount: item?.billing_detail?.delivery_fee ?? 0,
    },

    {
      name: 'Grand Total',
      amount: item?.billing_detail?.total_amount ?? item?.total_amount ?? 0,
    },




  ]


  return (
    <View style={styles.container}>
      <AppInputScroll
        Pb={'40%'}
        padding={true}
        keyboardShouldPersistTaps={'handled'}>
        <View style={styles.innerView}>
          <OrdersStatusComp item={item} />

          {item?.cart_items?.map((data, index) => {
            return <DishItemComp data={data} />;
          })}
          <BottomLine />
          <View style={{ marginTop: '2%' }}>
            {amountArray?.map((data, i) => {
              return (
                <>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: '4%' }}>
                    <Text style={{ flex: 1, fontSize: i == amountArray?.length - 1 ? RFValue(16) : RFValue(13), fontFamily: fonts.medium, color: colors.color8F }}>{data?.name}</Text>
                    <Text style={{ fontSize: RFValue(16), fontFamily: fonts.medium, color: colors.black }}>{currencyFormat(data?.amount)}</Text>
                  </View>
                  {i == amountArray?.length - 2 && <BottomLine />}
                </>
              )
            })}
          </View>
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
        {/* <View style={styles.bottomBtnView}>
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
        </View> */}
        {/* <Spacer space={'5%'} /> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.appBackground,
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
