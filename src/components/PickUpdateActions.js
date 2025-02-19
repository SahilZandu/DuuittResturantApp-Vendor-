import React, {useCallback, useState,useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
  Alert,
  Linking,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {SvgXml} from 'react-native-svg';
import {appImagesSvg} from '../commons/AppImages';
import {
  NavigationHelpersContext,
  useFocusEffect,
} from '@react-navigation/native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { LaunchCamera, LaunchGallary } from './LaunchCameraGallery';
import { fonts } from '../theme/fonts/fonts';
import { useFormikContext } from 'formik';

export default function PickUpdateActions({onSelectUri, name}) {
  useFocusEffect(
    useCallback(() => {
      checkPermissions();
    }, []),
  );

  const {
    setFieldValue,
  } = useFormikContext();

  const onHandleGallery = async () => {
    const img = await LaunchGallary();
    console.log('result', img);
    if (img?.didCancel) {
      console.log('Gallary close');
    } else {
      onSelectUri(img?.assets[0]?.uri);
      setFieldValue(name, img?.assets[0]?.uri);
    }
  };

  const onHandleCamera = async () => {
    const img = await LaunchCamera();
    console.log('result', img);
    if (img?.didCancel) {
      console.log('Camera close');
    } else {
      onSelectUri(img?.assets[0]?.uri);
      setFieldValue(name, img?.assets[0]?.uri);
    }
  };

  // const requestGalleryPermission = async () => {
  //   const result = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
  //   if (result === PermissionsAndroid.RESULTS.GRANTED) {
  //     console.log('Gallery permission granted');
  //   } else {
  //     console.log('Gallery permission denied');
  //   }
  // };

  const checkPermissions = async () => {
      const cameraPermission = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      if (cameraPermission !== PermissionsAndroid.RESULTS.GRANTED) {
        requestCameraPermission();
      }
  };

  const requestCameraPermission = async () => {
    try {
     
        const result = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          // {
          //   title: 'Permission Denied',
          //   message: 'Please enable camera permission in settings to use this feature.',
          //   buttonPositive:"Ok",
          // }
        );
        console.log('result', result);
        if (result !== PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Camera permission denied');
          // Handle the denial of camera permission
          Alert.alert(
            'Permission Denied',
            'Please enable camera permission in settings to use this feature.',
            [
              {
                text: 'Cancel',
                style: 'cancel',
                onPress: () => {
                  onHandleCamera();
                },
              },
              {
                text: 'Open Settings',
                onPress: () => {
                  Linking.openSettings();
                },
              },
            ],
          );
        }
    } catch (error) {
      console.error('Error requesting camera permission:', error);
    }
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          onHandleCamera();
        }}
        style={{
          flexDirection: 'row',
          padding: 10,
          alignItems: 'center',
          marginLeft: hp('1%'),
          marginTop: '2%',
        }}>
        <SvgXml width={23} height={23} xml={appImagesSvg.cameraSvg} />
        <Text
          style={{
            fontSize: RFValue(14),
            fontFamily: fonts.medium,
            color: '#242424',
            marginLeft: '4%',
          }}>
          Camera
        </Text>
      </TouchableOpacity>
      <View
        style={{
          height: 2,
          backgroundColor: '#D9D9D9',
          marginTop: '2%',
          marginHorizontal: 20,
        }}
      />
      <TouchableOpacity
        onPress={() => {
          onHandleGallery();
        }}
        style={{
          flexDirection: 'row',
          padding: 10,
          alignItems: 'center',
          // width: wp('35%'),
          marginLeft: hp('1%'),
          marginTop: '3%',
        }}>
        <SvgXml width={23} height={23} xml={appImagesSvg.gallerySvg} />
        <Text
          style={{
            fontSize: RFValue(14),
            fontFamily: fonts.medium,
            color: '#242424',
            marginLeft: '4%',
          }}>
          Gallery
        </Text>
      </TouchableOpacity>
    </View>
  );
}
