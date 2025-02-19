import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  DeviceEventEmitter
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import NewOrders from '../../../components/NewOrders';
import { orderArray } from '../../../stores/DummyData/Order';
import handleAndroidBackButton from '../../../halpers/handleAndroidBackButton';

// import NewOrders from '../components/NewOrders';

export default function NewOrder({navigation}) {
//   const {getNewOrder, declineOrder, updateStatus} = rootStore.orderStore;
  const [newOrder, setNewOrder] = useState(orderArray);
  const [isdone, setIsdone] = useState(null);
  const [loading, setLoading] = useState(true);


//   const getNewOrders = async () => {
//     const newOrders = await getNewOrder();
//     console.log('New Orders', newOrders);
//     if (newOrders && newOrders?.length != 0) {
//       setLoading(false);
//       setNewOrder(newOrders);
//     }
//     if (newOrders && newOrders?.length == 0) {
//       setLoading(false);
//       setNewOrder([]);
//       navigation.navigate('home')
//       // navigation.goBack();
//     }
//   };

  useFocusEffect(
    React.useCallback(() => {
      handleAndroidBackButton();
      setNewOrder(orderArray)
      // getNewOrders();
      // const intervalId = setInterval(() => {
      //   getNewOrders();
      //   console.log('timer running getNewOrders');
      // },10000);
    //  return () => clearInterval(intervalId);
    }, []),
  );

//   const handleSuccess = d => {
//     setIsdone(d);
//     getNewOrders();
//   };

//   const handleFailure = () =>{
//         getNewOrders();
//        }

  return (
    <View style={styles.screen}>
      <NewOrders
        navigation={navigation}
        loading={loading}
        isdelete={isdone}
        orders={newOrder}
        // onDetail={order => {
        //   navigation.navigate('orderDetails', {order});
        // }}
        onDeclineOrder={(data, reason) =>
          declineOrder(data, reason, handleSuccess)
        }
        onUpdateStatus={(item, status) =>
          updateStatus(item, status, handleSuccess,handleFailure)
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