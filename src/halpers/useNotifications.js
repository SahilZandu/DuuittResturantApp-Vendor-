import React, { useEffect } from 'react';
import { Notifications } from 'react-native-notifications';
import messaging from '@react-native-firebase/messaging';
import { DeviceEventEmitter } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import notifee, {
  AndroidImportance,
  AndroidCategory,
  EventType,
  AndroidVisibility,
} from '@notifee/react-native';

let data = {};

export function useNotifications(navigation) {

  // // ✅ Handle Foreground Notifications (App Open)
  // useEffect(() => {
  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     console.log("Foreground Notification:", remoteMessage);

  //     data = remoteMessage?.data;
  //     // data = {
  //     //   "customData": "value"
  //     // }
  //     // global.notificationData = remoteMessage?.data;
  //     console.log('--------------------', remoteMessage?.data);
  //     // Display local notification in foreground

  //     Notifications.postLocalNotification({
  //       title: remoteMessage.notification.title,
  //       body: remoteMessage.notification.body,
  //       sound: "default",
  //       silent: false,
  //       data: remoteMessage.data,
  //       android: {
  //         priority: "high", // 🔹 Required for heads-up notification on Android
  //         importance: "high", // 🔹 Makes sure it's visible
  //         autoCancel: true,
  //         asForegroundService: true,
  //       },
  //     });

  //     // Notifications.postLocalNotification({
  //     //   title: remoteMessage.notification.title,
  //     //   body: remoteMessage.notification.body,
  //     //   sound: "default",
  //     //   silent: false,
  //     //   data: data,
  //     //   android: {
  //     //     priority: "high", // 🔹 Required for heads-up notification on Android
  //     //     importance: "high", // 🔹 Makes sure it's visible
  //     //     autoCancel: true,
  //     //     asForegroundService: true,
  //     //   },
  //     // });


  //   });

  //   return unsubscribe;
  // }, []);

  // // ✅ Handle Foreground Touch Event
  // useEffect(() => {
  //   const foregroundNotificationListener = Notifications.events().registerNotificationReceivedForeground(
  //     (notification, completion) => {
  //       console.log("User tapped foreground notification:", notification.payload);

  //       Notifications.postLocalNotification({
  //         title: notification.title || "New Notification",
  //         body: notification.body || "You have a new message!",
  //         sound: "default",
  //         payload: notification.payload,
  //         silent: false, // Ensure notification makes a sound
  //         category: "default",
  //         android: {
  //           priority: "high", // 🔹 Required for heads-up notification on Android
  //           importance: "high", // 🔹 Makes sure it's visible
  //           autoCancel: true,
  //           asForegroundService: true,
  //         },
  //       });
  //       //   title: notification.title,
  //       //   body: notification.body,
  //       //   sound: "default",
  //       //   payload: notification.payload,
  //       // });

  //       completion({ alert: true, sound: true, badge: false });
  //     });
  //   // 🔹 2. Handle taps when the app is in foreground or background
  //   Notifications.events().registerNotificationOpened((notification, completion) => {
  //     console.log("🔔 Notification Tapped:", notification);
  //     handleNotificationTap(notification);
  //     completion();
  //   });

  //   return () => foregroundNotificationListener.remove(); // Cleanup
  // }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      const channelId = await notifee.createChannel({
        id: 'duuittvender.com',
        name: 'duuitt',
        importance: AndroidImportance.HIGH,
        sound: 'default',
        vibration: true,
        lights: true,
        vibrationPattern: [300, 500],
        showBadge: true
      });

      (remoteMessage.notification.android = {
        channelId: channelId,
        // importance: AndroidImportance.HIGH,
        // smallIcon: 'ic_stat_notification',
        // largeIcon: '@mipmap/ic_launcher',
        // color: '#000000', // You can change this hex color to match your app's theme
        // pressAction: {
        //   id: 'default',
        // },
        // showTimestamp: true,
        // visibility: AndroidVisibility.PUBLIC,
      })
      console.log('forground notification:', remoteMessage);
      const newa = remoteMessage.notification;
      data = remoteMessage?.data;

      // await notifee.displayNotification(newa);

      if (remoteMessage?.data?.route == 'newOrder') {
        let newOrderData = JSON.parse(remoteMessage?.data?.notification_data ?? {});
        console.log('newOrder notification', newOrderData);
        DeviceEventEmitter.emit('newOrder', newOrderData);
        await notifee.displayNotification(newa);
      }
      if (remoteMessage?.data?.route == 'cancelCustomer') {
        let cancelData = JSON.parse(remoteMessage?.data?.notification_data ?? {});
        console.log('cancelOrder notification', cancelData);
        DeviceEventEmitter.emit('cancelOrder', cancelData);
        await notifee.displayNotification(newa);
      }
      if (remoteMessage?.data?.route == 'orderStatusUpdate') {
        let orderStatusUpdate = JSON.parse(remoteMessage?.data?.notification_data ?? {});
        console.log('orderStatusUpdate notification', orderStatusUpdate);
        DeviceEventEmitter.emit('orderStatusUpdate', orderStatusUpdate);
        await notifee.displayNotification(newa);
      }

      if (remoteMessage?.data?.route == 'kycDetailsUpdate') {
        let kycStatusUpdate = JSON.parse(remoteMessage?.data?.notification_data ?? {});
        console.log('kycStatusUpdate notification', kycStatusUpdate);
        DeviceEventEmitter.emit('kycStatusUpdate', kycStatusUpdate);
        await notifee.displayNotification(newa);
      }


    });

    return unsubscribe;
  }, []);

  // Handle Foreground Touch Event

  useEffect(() => {
    const unsubscribe = notifee.onForegroundEvent(({ type, detail }) => {
      if (type === EventType.PRESS) {
        console.log(
          'User pressed notification onForegroundEvent',
          detail,
          detail.notification,
        );
        detail.notification.data = data;
        // detail.notification.data = global.notificationData ?? data;
        console.log("detail.notification.data", detail.notification.data, data);

        if (detail?.notification?.data?.route === 'newOrder') {
          let newOrderData = JSON.parse(detail.notification?.data?.notification_data ?? '{}');
          DeviceEventEmitter.emit('newOrder', newOrderData);
          navigation.navigate('tab3');
        }
        if (detail?.notification?.data?.route == 'cancelCustomer') {
          let cancelData = JSON.parse(detail.notification?.data?.notification_data ?? '{}');
          console.log('cancel Customer notification', cancelData);
          DeviceEventEmitter.emit('cancelOrder', cancelData);
          navigation.navigate('tab3');
        }
        if (detail?.notification?.data?.route == 'orderStatusUpdate') {
          let orderStatusUpdate = JSON.parse(detail.notification?.data?.notification_data ?? '{}');
          console.log('orderStatusUpdate notification', orderStatusUpdate);
          DeviceEventEmitter.emit('orderStatusUpdate', orderStatusUpdate);
          navigation.navigate('tab3');
        }
        if (detail?.notification?.data?.route == 'kycDetailsUpdate') {
          let kycStatusUpdate = JSON.parse(detail.notification?.data?.notification_data ?? {});
          console.log('kycStatusUpdate notification', kycStatusUpdate);
          DeviceEventEmitter.emit('kycStatusUpdate', kycStatusUpdate);
          navigation.navigate('tab3');
        }

      }
    });
    return unsubscribe;
  }, []);


  // ✅ Handle Background & Killed App Touch Event

  useEffect(() => {
    const backgroundNotificationListener = Notifications.events().registerNotificationOpened((notification, completion) => {
      console.log("🔔 Notification Tapped (Foreground/Background):", notification);
      handleNotificationTap(notification, navigation);
      completion();
    });

    // 🔹 2. Handle notifications when the app is COMPLETELY CLOSED (killed)
    Notifications.getInitialNotification()
      .then(notification => {
        if (notification) {
          console.log("📩 App Launched from Notification (Killed State):", notification);
          handleNotificationTap(notification, navigation);
        }
      })
      .catch(err => console.error("Error getting initial notification:", err));

    return () => backgroundNotificationListener.remove(); // Cleanup
  }, []);

  // 🔹 3. Function to navigate based on notification type
  const handleNotificationTap = (notification, navigation) => {
    console.log("Navigating with data:", notification);

    const route = notification?.payload?.route;
    console.log("route---", route);
    if (route === 'newOrder') {
      let newOrderData = JSON.parse(notification?.payload?.notification_data ?? '{}');
      DeviceEventEmitter.emit('newOrder', newOrderData);
      navigation.navigate('tab3');
    }
    if (route == 'cancelCustomer') {
      let cancelData = JSON.parse(notification?.payload?.notification_data ?? '{}');
      console.log('cancel Customer notification', cancelData);
      DeviceEventEmitter.emit('cancelOrder', cancelData);
      navigation.navigate('tab3');
    }
    if (route == 'orderStatusUpdate') {
      let orderStatusUpdate = JSON.parse(notification?.payload?.notification_data ?? '{}');
      console.log('orderStatusUpdate notification', orderStatusUpdate);
      DeviceEventEmitter.emit('orderStatusUpdate', orderStatusUpdate);
      navigation.navigate('tab3');
    }
    if (route == 'kycDetailsUpdate') {
      let kycStatusUpdate = JSON.parse(notification?.payload?.notification_data ?? {});
      console.log('kycStatusUpdate notification', kycStatusUpdate);
      DeviceEventEmitter.emit('kycStatusUpdate', kycStatusUpdate);
      navigation.navigate('tab3');
    }


  };

  return "Registered for Notifications";
}

