import React, {useCallback, useEffect, useState} from 'react';
import {Text, View, Pressable, StyleSheet, Alert} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {RFValue} from 'react-native-responsive-fontsize';
import {Badge} from 'react-native-paper';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import FlastListAnimated from './FlatListAnimated/FlastListAnimated';
// import AnimatedLoader from './AnimatedLoader/AnimatedLoader';
import Icon from 'react-native-vector-icons/Entypo';
import moment from 'moment';
import {fonts} from '../theme/fonts/fonts';
import {colors} from '../theme/colors';
import NewOrdersCardRequest from './NewOrdersCardRequest';

const NewOrders = ({
  visible,
  orders,
  onDetail,
  onDeclineOrder,
  onUpdateStatus,
  isdelete,
  onCookinTimeChnage,
  loading,
  navigation,
}) => {
  const [showDecline, setDeclinePopUp] = useState(false);
  const [declineData, setDeclineData] = useState(null);
  const [scroll, setScroll] = useState(true);
  const [update, setupdate] = useState(false);
  const [isAudioPlay, setIsAudioPlay] = useState('');
  const [orderRequest, setOrderRequest] = useState(orders);

  useEffect(() => {
    setOrderRequest(orders);
  }, [orders]);

  const Header = () => {
    return (
      <View style={styles.header}>
        <Text style={styles.title}>New Orders</Text>
        <Badge
          size={22}
          style={{
            backgroundColor: colors.green,
            fontFamily: fonts.medium,
            fontSize: RFValue(13),
            color: colors.white,
          }}>
          {orders?.length}
        </Badge>

        <Pressable
          style={{
            marginLeft: 'auto',
            marginRight: '5%',
            paddingLeft: '5%',
          }}
          onPress={() => navigation.goBack()}>
          <Icon name={'chevron-down'} size={25} color={colors.black} />
        </Pressable>
      </View>
    );
  };

  const onDecline = item => {
    setDeclineData(item);
    setDeclinePopUp(true);
  };

  const timerCheck = item => {
    const givenTimestamp = item?.order_date_time;
    const format = 'DD-MM-YYYY HH:mm:ss';

    // Parse the given timestamp
    const givenMoment = moment(givenTimestamp, format);

    // Get the current date and time
    const currentMoment = moment();

    // Calculate the difference in milliseconds
    const duration = moment.duration(currentMoment.diff(givenMoment));

    // Extract the difference in minutes
    const totalMinutes = duration.asMinutes();

    console.log('totalMinutes--', totalMinutes);

    if (totalMinutes < 5) {
      const newTime = 5 - totalMinutes;
      const newSeconds = newTime * 60;
      // Update the timerSecond state for the specific item
      item.timerSecond = newSeconds;
    } else {
      // Reset timer if time exceeds 5 minutes
      item.timerSecond = 0;
    }
  };

  const onCookingTimeChnage = useCallback(
    (data, time) => {
      console.log('Cooking time data, time:', data, time);
  
      // Create a new array and update the specific item
      const updatedOrderRequest = orderRequest.map((item) =>
        item?.trackingId === data?.trackingId
          ? { ...item, cookinTiming: time }
          : item
      );
  
      // Update the state
      setOrderRequest(updatedOrderRequest);
    },
    [orderRequest] // Include the `orderRequest` state in the dependency array
  );

  // const onCookingTimeChnage = (data, time) => {
  //   orderRequest?.map((item, i) => {
  //     if (item?.trackingId == data?.trackingId) {
  //       item.cookinTiming = time;
  //       return {...item};
  //     }
  //   });

  //   setOrderRequest([...orderRequest]);
  // };

  return (
    <View style={styles.mainView}>
      <View style={styles.subView}>
        <GestureHandlerRootView>
          <Header />
          {/* {loading ? (
            <AnimatedLoader type={'orders'} />
          ) : ( */}
          <FlastListAnimated
            scrollEnabled={scroll}
            items={orderRequest}
            id={'id'}
            isDeleted={isdelete}
            outAnimation={'fadeOutRight'}
            duration={900}
            rowItem={({item, index}) => {
              // timerCheck(item);
              return (
                <NewOrdersCardRequest
                  onCookingTimeChnage={
                    onCookingTimeChnage
                  }
                  // onDetail={()=>onDetail(item)}
                   onDetail={()=>{navigation.navigate('orderDetails',
                    {item:item,
                      onCookingTimeChnage:onCookingTimeChnage,
                    type:'NewOrderRequest'})}}
                  item={item}
                />
              );
            }}
          />
          {/* )} */}
        </GestureHandlerRootView>
      </View>
    </View>
  );
};

export default NewOrders;
const styles = StyleSheet.create({
  mainView: {
    height: hp('100%'),
    width: wp('100%'),
    backgroundColor: 'rgba(100, 100, 100, 0.8)',
    justifyContent: 'flex-end',
    paddingTop: '15%',
    position: 'absolute',
    top: 0,
    overflow: 'visible',
  },
  subView: {
    backgroundColor: 'white',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    flex: 1,
  },
  title: {
    fontSize: RFValue(16),
    fontFamily: fonts.bold,
    marginLeft: 16,
    marginRight: '2%',
    color: colors.black,
  },
  header: {
    backgroundColor: '#F8F8F8',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingVertical: '4%',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#EAEAEA',
    borderBottomWidth: 1,
  },
});
