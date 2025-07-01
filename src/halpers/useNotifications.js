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

      await notifee.displayNotification(newa);



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
        console.log("detail.notification.data",detail.notification.data,data);
      }
    });
    return unsubscribe;
  }, []);


  // ✅ Handle Background & Killed App Touch Event

  useEffect(() => {
    const backgroundNotificationListener = Notifications.events().registerNotificationOpened((notification, completion) => {
      console.log("🔔 Notification Tapped (Foreground/Background):", notification);
      handleNotificationTap(notification);
      completion();
    });

    // 🔹 2. Handle notifications when the app is COMPLETELY CLOSED (killed)
    Notifications.getInitialNotification()
      .then(notification => {
        if (notification) {
          console.log("📩 App Launched from Notification (Killed State):", notification);
          handleNotificationTap(notification);
        }
      })
      .catch(err => console.error("Error getting initial notification:", err));

    return () => backgroundNotificationListener.remove(); // Cleanup
  }, []);

  // 🔹 3. Function to navigate based on notification type
  const handleNotificationTap = (notification) => {
    const data = notification?.payload; // Get notification data
    console.log("Navigating with data:", data);
  };

  return "Registered for Notifications";
}

