
import React from 'react';
import DeviceInfo from 'react-native-device-info';

DeviceInfo.getUniqueId().then(uniqueId => {
  console.log('uniqueId--', uniqueId);
  global.unique_id = uniqueId;
});

function handleBackNotification(remoteMessage) {
 
  
  console.log('remoteMessage--==--', remoteMessage);
 

}

export default handleBackNotification;