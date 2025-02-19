import React, {useState, useEffect} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {appImagesSvg} from '../../commons/AppImages';
import {SvgXml} from 'react-native-svg';
import OrderId from '../orders/OrderId';
import OrderDetail from '../orders/OrderDetails';
import CookingTime from '../orders/CookingTime';
import DeclineOrder from '../orders/DeclineOrder';
import CardItems from '../orders/CardItems';
import OrderStatus from '../orders/OrderStatus';
import SwipeButton from '../swipeButton/SwipeButton';
import Instructions from '../orders/Instructions';
import moment from 'moment';
import {colors} from '../../theme/colors';
import {fonts} from '../../theme/fonts/fonts';
import Spacer from '../../halpers/Spacer';
import {
  StatusCTABG,
  statusCTATitle,
  statusCTATitleColor,
} from '../../halpers/StatusCTA';
import { DotView } from '../../halpers/DotView';
import { Line } from '../../halpers/Line';

export default function Card({
  item,
  onDetail,
  handleUpdateStatus,
  onDecline,
  onSwipeFail,
  onSwipeStart,
  onSwipeSuccess,
  onCookinTimeChnage,
  audio,
  setAudio,
}) {
  const [process, setProcess] = useState(false);
  const [animationCount, setCount] = useState(0);
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

  // console.log("timerSecond---",item?.timerSecond)

  const CheckoutButton = () => {
    return (
      <View
        style={{
          width: 55,
          height: 55,
          backgroundColor: StatusCTAColor(item.status),
          borderRadius: 27.5,
          justifyContent: 'center',
          alignItems: 'center',
          shadowColor: StatusCTAColor(item.status),
          shadowOpacity: 0.54,
          shadowRadius: 8,
          shadowOffset: {
            height: 4,
            width: 4,
          },
          elevation: 10,
        }}>
        <SvgXml xml={appImagesSvg.rightIcon} fill="#FFF" />
      </View>
    );
  };

  return (
    <View pointerEvents={timerCount > 0 ? 'auto' : 'none'} style={styles.card}>
      <Pressable onPress={onDetail}>
        <OrderId item={item} />
        <OrderDetail item={item} />
        <OrderStatus status={item?.status} item={item} />
        <DotView />
        <CardItems item={item} isExpand={true} />
        {/* {item?.order_items.length >= 4 && (
          <Text>{item?.order_items.length - 3} More Items</Text>
        )} */}
      </Pressable>
      <Instructions order={item} audio={audio} setAudio={setAudio} />
      {item?.status == 'waiting_for_confirmation' && (
        <CookingTime order={item} onChnage={onCookinTimeChnage} />
      )}

      {timerCount > 0 && (
        <SwipeButton
          containerStyles={{borderRadius: 22, marginTop: '6%'}}
          height={40}
          onSwipeFail={() => {
            onSwipeFail();
            setProcess(false);
          }}
          onSwipeStart={() => {
            onSwipeStart();
            setProcess(true), setCount(1);
          }}
          onSwipeSuccess={() => {
            onSwipeSuccess();
            handleUpdateStatus(),
              setTimeout(() => {
                setProcess(false);
              }, 1500);
          }}
          shouldResetAfterSuccess={true}
          resetAfterSuccessAnimDelay={1500}
          railBackgroundColor={StatusCTABG(item?.status)}
          railFillBackgroundColor={StatusCTABG(item?.status)}
          railStyles={{borderRadius: 27.5}}
          thumbIconComponent={CheckoutButton}
          thumbIconStyles={{borderRadius: 27.3}}
          thumbIconWidth={50}
          // title={process ? 'Updating...' : statusCTATitle(item?.status)}
          title={statusCTATitle(item?.status)}
          iterationCount={animationCount}
          titleColor={statusCTATitleColor(item?.status)}
        />
      )}

      <Spacer space={'4%'} />
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        {/* <Text style={styles.timerText}>Order accept timer - </Text> */}
        {timerCount > 0 ? (
          <>
            {/* {timerCount <= 59  ? <Text style={styles.timerText}> {timerCount != 0 ? `00:${secondsToHms(timerCount)}` :'00:00'} </Text>
      : */}
            <Text style={styles.timerText}>
              {' '}
              {timerCount != 0 ? `${secondsToHms(timerCount)}` : '00:00'}
            </Text>
            {/* } */}
          </>
        ) : (
          <>
            {item?.status == 'waiting_for_confirmation' && (
              <Text style={styles.orderAcceptText}>
                Your order accept time is over so you can't accept your order
              </Text>
            )}
          </>
        )}
      </View>
      {timerCount > 0 && (
        <DeclineOrder
          orderStatus={item?.status}
          onDecline={() => onDecline(item)}
        />
      )}
      <Line />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    paddingTop: '4%',
    paddingHorizontal: '5%',
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: '0.5%',
  },
  timeText: {
    color: '#8F8F8F',
    fontSize: RFValue(9),
    fontFamily: fonts.Regular,
  },
  idText: {
    color: '#808080',
    fontSize: RFValue(13),
    fontFamily: fonts.Regular,
    lineHeight: 22,
    width: '60%',
  },
  orderName: {
    color: colors.main,
    fontFamily: fonts.bold,
    fontSize: RFValue(10),
    lineHeight: 22,
    marginBottom: '1%',
  },
  statusView: {
    paddingVertical: '2%',
    paddingHorizontal: '3%',
    borderRadius: 5,
  },
  statusText: {
    color: colors.whiteBackground,
    fontSize: RFValue(9),
    fontFamily: fonts.Regular,
  },
  amount: {
    fontSize: RFValue(12),
    fontFamily: fonts.semiBold,
  },
  itemText: {
    fontSize: RFValue(10),
    fontFamily: fonts.bold,
  },
  statusBox: {
    backgroundColor: '#D9D9D9',
    borderRadius: 5,
  },
  status: {
    color: '#333333',
    fontSize: RFValue(10),
    fontFamily: fonts.Regular,
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 5,
  },
  orderAcceptText: {
    fontSize: RFValue(15),
    fontFamily: fonts.medium,
    color: '#CB2F2F',
    textAlign: 'center',
  },
  timerText: {
    color: '#0D71CD',
    fontSize: RFValue(14),
    fontFamily: fonts.bold,
  },
});
