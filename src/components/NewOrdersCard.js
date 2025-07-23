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


export default function NewOrdersCard({ item, onViewDetails, onChangeStatus, acceptedItem, onCancelOrder, cancelItem }) {
  const [timerCount, setTimer] = useState(299);
console.log("item---NewOrdersCard",item);


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
      case 'cooking':
        return colors.colorFF915;
      case 'packing_processing':
        return colors.colorFC15;
      case 'ready_to_pickup':
        return colors.color0D15;
      default:
        return colors.colorFF915;
    }
  };

  const onChangeBTNTextColor = type => {
    switch (type) {
      case 'cooking':
        return colors.colorFF9;
      case 'packing_processing':
        return colors.colorFC;
      case 'ready_to_pickup':
        return colors.color0D;
      default:
        return colors.colorFF9;
    }
  };

  const onChangeBTNText = type => {
    switch (type) {
      case 'cooking':
        return 'Cooking';
      case 'packing_processing':
        return 'Order Packed';
      case 'ready_to_pickup':
        return 'Order Ready';
      // case 'picked':
      //   return 'Order Picked';
      default:
        return 'Cooking';
    }
  };

  const getChangeApiBtnStatus = type => {
    switch (type) {
      case 'cooking':
        return 'packing_processing';
      case 'packing_processing':
        return 'ready_to_pickup';
      case 'ready_to_pickup':
        return 'picked'; //completed discussion points
      default:
        return 'packing_processing';
    }
  };

  const onUpdateStatus = async (item) => {
    const status = await getChangeApiBtnStatus(item?.status);
    await onChangeStatus(item, status);
  }

  const onCancelOrderStatus = async (item) => {
    await onCancelOrder(item, 'cancelled');
  }

  return (
    <Surface elevation={2} style={styles.container}>
      <View style={styles.innerView}>
        <OrdersStatusComp item={item} />

        {item?.cart_items?.slice(0, 2)?.map((data, index) => {
          return <DishItemComp data={data} />;
        })}
        <BottomLine />
        <TotalBillComp item={item} />
        <Spacer space={'5%'} />
        <BTN
          bottomCheck={1}
          height={hp('4%')}
          labelColor={colors.main}
          backgroundColor={colors.white}
          title={item?.cart_items?.length > 2 ? "More Details" :'View Details'}
          textTransform={'capitalize'}
          onPress={onViewDetails}
        />

        <OrdersInstrucationsComp item={item} />

        <View style={styles.bottomBtnView}>
          <BTN
            disable={onChangeBTNText(item?.status) == "Order Ready"}
            labelColor={onChangeBTNTextColor(item?.status)}
            backgroundColor={onChangeBTNBackColor(item?.status)}
            borderColor={onChangeBTNBackColor(item?.status)}
            bottomCheck={2}
            width={wp('40')}
            height={hp('5.2%')}
            title={
              item?.status == 'cooking'
                ? `${item?.status} (${timerCount != 0 ? `${secondsToHms(timerCount)}` : '00:00'
                })`
                : onChangeBTNText(item?.status)
            }
            textTransform={'capitalize'}
            onPress={() => { onUpdateStatus(item) }}

            loading={acceptedItem?._id == item?._id}
          />
          <BTN
            disable={onChangeBTNText(item?.status) == "Order Ready"}
            labelColor={colors.main}
            backgroundColor={colors.white}
            bottomCheck={2}
            width={wp('40')}
            height={hp('5.2%')}
            title={'cancel'}
            textTransform={'capitalize'}
            onPress={() => {
              onCancelOrderStatus(item)
            }}
            loading={cancelItem?._id == item?._id}
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
    // height: hp('40%'),
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
