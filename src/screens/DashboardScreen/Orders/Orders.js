import React, { useCallback, useEffect, useState } from 'react';
import { Image, PermissionsAndroid, Platform, Text, View } from 'react-native';
import DashboardHeader from '../../../components/header/DashboardHeader';
import Tabs from '../../../components/Tabs';
import { orderArray } from '../../../stores/DummyData/Order';
import { styles } from './styles';
import NewOrdersCard from '../../../components/NewOrdersCard';
import { appImages } from '../../../commons/AppImages';
import OrderIndicator from '../../../components/orders/OrderIndicator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import FlastListAnimated from '../../../components/FlatListAnimated/FlastListAnimated';
import moment from 'moment';
import { rootStore } from '../../../stores/rootStore';
import { useFocusEffect } from '@react-navigation/native';
import handleAndroidBackButton from '../../../halpers/handleAndroidBackButton';
import KYCDocumentPopUp from '../../../components/appPopUp/KYCDocumentPopup';
import messaging from '@react-native-firebase/messaging';
import { useNotifications } from '../../../halpers/useNotifications';
import notifee, {
  AndroidImportance,
  AndroidCategory,
  EventType,
} from '@notifee/react-native';


let tabs = [
  { id: 0, text: 'All Orders', count: 0 },
  { id: 1, text: 'Preparing', count: 0 },
  { id: 2, text: 'Picked Up', count: 0 },
  { id: 3, text: 'Ready', count: 0 },
];

let defaultType = "All Orders"

export default function Orders({ navigation }) {
  const { appUser } = rootStore.commonStore;
  useNotifications(navigation)
  const { checkTeamRolePermission } = rootStore.teamManagementStore;
  const { getAccpetdOrderList, updateOrderStatus } = rootStore.orderStore;
  const [orderList, setOrderList] = useState(
    // orderArray
    []
  );
  const [orderListFilter, setOrderListFilter] = useState(
    // orderArray
    []
  );

  const [acceptedItem, setAcceptedItem] = useState({})
  const [cancelItem, setCancelItem] = useState({})
  const [loading, setLoading] = useState(false)
  const [showOrderLength, setShowOrderLength] = useState({
    all: 0,
    preparing: 0,
    pickedUp: 0,
    ready: 0
  })



  const timerCheck = item => {
    const givenTimestamp = new Date().getTime();
    const format = 'DD-MM-YYYY HH:mm:ss';
    // Parse the given timestamp
    const givenMoment = moment(givenTimestamp, format);

    // Get the current date and time
    const currentMoment = moment();
    // console.log("givenTimestamp---",givenTimestamp,givenMoment,currentMoment)
    // Calculate the difference in milliseconds
    const duration = moment.duration(currentMoment.diff(givenMoment));

    // Extract the difference in minutes
    const totalMinutes = duration.asMinutes();

    console.log('totalMinutes--', totalMinutes, item?.cooking_time, item);

    if (totalMinutes < Number(item?.cooking_time)) {
      const newTime = Number(item?.cooking_time) - totalMinutes;
      const newSeconds = newTime * 60;
      // const newSeconds = 2 * 60;
      // Update the timerSecond state for the specific item
      item.timerSecond = newSeconds;
    } else {
      item.timerSecond = 0;
    }
  };
  const onCookingTimeChnage = () => {
    console.log('onCookingTimeChnage');
  };

  useFocusEffect(
    useCallback(() => {
      handleAndroidBackButton();
      getAccpetdOrderListData();
      if (appUser?.role !== "vendor") {
        onCheckTeamRolePermission()
      }
      checkNotificationPer();
      requestNotificationPermission()
      initFCM();
    }, [appUser]),
  );


  const checkNotificationPer = () => {
    notifee.setBadgeCount(0).then(() => console.log('Badge count removed'));
  };


  async function requestNotificationPermission() {
    if (Platform.OS === 'android') {
      // Android 13+
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
          {
            title: 'Notification Permission',
            message:
              'This app needs notification permissions to send you alerts.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Notification permission granted');
        } else {
          console.log('Notification permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  }


  const initFCM = async () => {
    await requestUserPermission();
  };

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
      await registerForRemoteMessages();
    }
  };
  const registerForRemoteMessages = async () => {
    try {
      await messaging().registerDeviceForRemoteMessages();
      console.log('Device registered for remote messages.');
      getToken();
    } catch (error) {
      console.log('Error registering device for remote messages:', error);
    }
  };

  const getToken = async () => {
    try {
      const token = await messaging().getToken();
      console.log('FCM Token:', token);
      // if (token) {
      //   setTimeout(() => {
      //     let request = {
      //       user_id: appUser?._id,
      //       fcm_token: token,
      //       user_type: 'rider'
      //     };
      //     saveFcmToken(token);
      //     socketServices.emit('update-fcm-token', request)
      //   }, 1000);
      // }
    } catch (error) {
      console.log('Error getting token:', error);
    }
  };



  const getAccpetdOrderListData = async () => {
    const res = await getAccpetdOrderList(appUser, handleLoading)
    if (res?.length > 0) {
      setOrderList(res)
      setOrderListFilter(res)
      const prepareOrder = res?.filter((item) => {
        return item?.status == 'cooking'
      })
      const pickedUpOrder = res?.filter((item) => {
        return item?.status == "packing_processing"
      })
      const readyOrder = res?.filter((item) => {
        return item?.status == 'ready_to_pickup'
      })
      tabs = [
        { id: 0, text: 'All Orders', count: res?.length },
        { id: 1, text: 'Preparing', count: prepareOrder?.length },
        { id: 2, text: 'Picked Up', count: pickedUpOrder?.length },
        { id: 3, text: 'Ready', count: readyOrder?.length },
      ];
      setShowOrderLength({
        all: res?.length,
        preparing: prepareOrder?.length,
        pickedUp: pickedUpOrder?.length,
        ready: readyOrder?.length
      })
    }
    else {
      setOrderList([])
      setOrderListFilter([])
      tabs = [
        { id: 0, text: 'All Orders', count: 0 },
        { id: 1, text: 'Preparing', count: 0 },
        { id: 2, text: 'Picked Up', count: 0 },
        { id: 3, text: 'Ready', count: 0 },
      ];
      setShowOrderLength({
        all: 0,
        preparing: 0,
        pickedUp: 0,
        ready: 0
      })
    }

  }

  const handleLoading = (v) => {
    setLoading(v)
  }



  const onCheckTeamRolePermission = async () => {
    const res = await checkTeamRolePermission(appUser);
    // console.log("res --- ", res);

  }

  const onChangeStatus = async (item, status) => {
    console.log("item, status---onChangeStatus", item, status);
    setAcceptedItem(item)
    // setTimeout(()=>{
    //   setAcceptedItem({});
    // },2000)
    await updateOrderStatus(item, status, handleSuccess, handleFailure);

  }

  const handleSuccess = d => {

    getAccpetdOrderListData();
    setCancelItem({})
    setAcceptedItem({})
  };

  const handleFailure = () => {
    getAccpetdOrderListData();
    setCancelItem({})
    setAcceptedItem({})
  }


  const onCancelOrder = async (item, status) => {
    console.log("item, status---onCancelOrder", item, status);
    setCancelItem(item)
    await updateOrderStatus(item, status, handleSuccess, handleFailure);

  }

  const getFilterStatus = type => {
    switch (type) {
      case 'Preparing':
        return 'cooking';
      case 'Picked Up':
        return 'packing_processing';
      case 'Ready':
        return 'ready_to_pickup';
      default:
        return 'All Orders';
    }
  };

  const onPressTabTouch = (data) => {
    let res = getFilterStatus(data)
    defaultType = data
    if (data === "All Orders") {
      setOrderList(orderListFilter)
    } else {
      const resFilter = orderListFilter?.filter((item) => {
        return item?.status == res
      })
      setOrderList(resFilter)
    }
  }


  return (
    <View style={styles.container}>
      <DashboardHeader navigation={navigation} />
      <>
        <View style={{ flex: 1 }}>
          {orderList?.length > 0 ? (
            <View>
              <Tabs tabs={tabs} isCount={true} tabPress={onPressTabTouch} />
              <View style={styles.innerView}>
                <GestureHandlerRootView style={{ flex: 0 }}>
                  {/* {loading ? (
            <AnimatedLoader type={'orders'} />
          ) : ( */}
                  <FlastListAnimated
                    paddingBottom={'60%'}
                    scrollEnabled={true}
                    items={orderList}
                    id={'_id'}
                    outAnimation={'fadeOutRight'}
                    duration={900}
                    rowItem={({ item, index }) => {
                      timerCheck(item);
                      return (
                        <NewOrdersCard
                          acceptedItem={acceptedItem}
                          cancelItem={cancelItem}
                          item={item}
                          onViewDetails={() => {
                            navigation.navigate('orderDetails', {
                              item: item,
                              onCookingTimeChnage: onCookingTimeChnage,
                              type: 'NewOrders',
                            });
                          }}
                          onChangeStatus={onChangeStatus}
                          onCancelOrder={onCancelOrder}
                        />
                      );
                    }}
                  />
                  {/* )} */}
                </GestureHandlerRootView>
              </View>
            </View>
          ) : (
            <View style={styles.receiveOrderView}>
              <Image
                // resizeMode={'contain'}
                style={{ width: 120, height: 120 }}
                source={appImages.cookingGif}
              />
              <Text style={styles.receiveHoursText}>
                We have received 245+ Orders In 1 Hour
              </Text>
              <Text style={styles.bePatientText}>
                Be patient you will start receiving orders soon
              </Text>
            </View>
          )}
        </View>
        <OrderIndicator
          navigation={navigation}
          isHashOrders={s => console.log('s', s)}
        />
        {(appUser?.role === "vendor" ?
          appUser?.is_kyc_completed == true
          : appUser?.vendor?.is_kyc_completed == true) &&
          <KYCDocumentPopUp
            appUserData={appUser?.role === "vendor" ? appUser : appUser?.vendor}
            navigation={navigation} />}

      </>

    </View>
  );
}
