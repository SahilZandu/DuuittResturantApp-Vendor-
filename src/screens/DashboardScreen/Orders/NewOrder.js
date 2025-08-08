import React, { useCallback, useEffect, useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  DeviceEventEmitter,
  Alert
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import NewOrders from '../../../components/NewOrders';
import { orderArray } from '../../../stores/DummyData/Order';
import handleAndroidBackButton from '../../../halpers/handleAndroidBackButton';
import { rootStore } from '../../../stores/rootStore';

// import NewOrders from '../components/NewOrders';

export default function NewOrder({ navigation }) {
  const { getNewOrder, updateOrderStatus, } = rootStore.orderStore;
  const { appUser } = rootStore.commonStore;
  const [newOrder, setNewOrder] = useState(
    []
    // orderArray
  );
  const [isdone, setIsdone] = useState(null);
  const [loading, setLoading] = useState(true);
  const [acceptedData, setAcceptedData] = useState({})
  const [declineData, setDeclineData] = useState({})


  const getNewOrders = async () => {
    const newOrders = await getNewOrder(appUser);
    console.log('New Orders', newOrders);
    if (newOrders && newOrders?.length > 0) {
      setLoading(false);
      setNewOrder(newOrders);
    }
    else {
      setLoading(false);
      setNewOrder([]);
      navigation.navigate('home');
      // navigation.goBack();
    }
  };

  useFocusEffect(
    useCallback(() => {
      handleAndroidBackButton();
      // setNewOrder(orderArray);
      getNewOrders();
      const intervalId = setInterval(() => {
        getNewOrders();
        console.log('timer running getNewOrders');
      }, 60000);
      return () => clearInterval(intervalId);
    }, []),
  );


  useEffect(() => {
    const subscription = DeviceEventEmitter.addListener('newOrder', data => {
      console.log('cancel Order data -- ', data);
      getNewOrders();
    });
    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    const subscription = DeviceEventEmitter.addListener('cancelOrder', data => {
      console.log('cancel Order data -- ', data);
      getNewOrders();
    });
    return () => {
      subscription.remove();
    };
  }, []);


  const handleSuccess = d => {
    setIsdone(d);
    getNewOrders();
    setDeclineData({})
    setAcceptedData({})
  };

  const handleFailure = () => {
    getNewOrders();
    setDeclineData({})
    setAcceptedData({})
  }


  const onDeclineOrder = async (item) => {
    setDeclineData(item)
    // Alert.alert('decline')
    // setTimeout(() => {
    //   setDeclineData({})
    // }, 3000)
    await updateOrderStatus(item, 'declined', handleSuccess, handleFailure);
  }


  const onAccpededOrder = async (item) => {
    setAcceptedData(item)
    // Alert.alert('accepted')
    // setTimeout(() => {
    //   setAcceptedData({})
    // }, 3000)
    await updateOrderStatus(item, 'cooking', handleSuccess, handleFailure)
  }




  return (
    <View style={styles.screen}>
      <NewOrders
        navigation={navigation}
        loading={loading}
        isdelete={isdone}
        orders={newOrder}
        acceptedData={acceptedData}
        declineData={declineData}
        // onDetail={order => {
        //   navigation.navigate('orderDetails', {order});
        // }}
        onDeclineOrder={(item) =>
          onDeclineOrder(item)
          // declineOrder(data, reason, handleSuccess)
        }
        onUpdateStatus={(item) =>

          // updateStatus(item, status, handleSuccess, handleFailure)
          onAccpededOrder(item)
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'rgba(100, 100, 100, 0.8)',
  },
});