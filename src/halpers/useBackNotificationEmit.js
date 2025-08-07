
import React from 'react';
import { DeviceEventEmitter } from 'react-native';
import DeviceInfo from 'react-native-device-info';

DeviceInfo.getUniqueId().then(uniqueId => {
  console.log('uniqueId--', uniqueId);
  global.unique_id = uniqueId;
});

function handleBackNotification(remoteMessage) {


  console.log('remoteMessage--==--', remoteMessage);
  if (remoteMessage?.data?.route === 'newOrder') {
    let newOrderData = JSON.parse(remoteMessage?.data?.notification_data ?? '{}');
    DeviceEventEmitter.emit('newOrder', newOrderData);
  }
  if (remoteMessage?.data?.route == 'cancelCustomer') {
    let cancelData = JSON.parse(remoteMessage?.data?.notification_data ?? '{}');
    console.log('cancel Customer notification', cancelData);
    DeviceEventEmitter.emit('cancelOrder', cancelData);
  }
  if (remoteMessage?.data?.route == 'orderStatusUpdate') {
    let orderStatusUpdate = JSON.parse(remoteMessage?.data?.notification_data ?? '{}');
    console.log('orderStatusUpdate notification', orderStatusUpdate);
    DeviceEventEmitter.emit('orderStatusUpdate', orderStatusUpdate);
  }
  if (remoteMessage?.data?.route == 'kycDetailsUpdate') {
    let kycStatusUpdate = JSON.parse(remoteMessage?.data?.notification_data ?? '{}');
    console.log('kycStatusUpdate notification', kycStatusUpdate);
    DeviceEventEmitter.emit('kycStatusUpdate', kycStatusUpdate);
  }
  if (remoteMessage?.data?.route == 'riderCancelFoodOrder') {
    let riderCancelFoodOrder = JSON.parse(remoteMessage?.data?.notification_data ?? '{}');
    console.log('riderCancelFoodOrder notification', riderCancelFoodOrder);
    DeviceEventEmitter.emit('cancelOrder', riderCancelFoodOrder);
  }

  if (remoteMessage?.data?.route == 'vendorBlockSuspend') {
    let vendorBlockSuspend = JSON.parse(remoteMessage?.data?.notification_data ?? '{}');
    console.log('vendorBlockSuspend notification', vendorBlockSuspend);
    DeviceEventEmitter.emit('vendorBlockSuspend', vendorBlockSuspend);
  }

  if (remoteMessage?.data?.route == 'restProfileUpdate') {
    let restProfileUpdate = JSON.parse(remoteMessage?.data?.notification_data ?? '{}');
    console.log('restProfileUpdate notification', restProfileUpdate);
    DeviceEventEmitter.emit('restProfileUpdate', restProfileUpdate);
  }



}

export default handleBackNotification;