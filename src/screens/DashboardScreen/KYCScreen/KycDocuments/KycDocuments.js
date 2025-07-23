import { CommonActions, useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useState, useCallback } from 'react';
import { Text, View } from 'react-native';
import { appImagesSvg } from '../../../../commons/AppImages';
import Header from '../../../../components/header/Header';
import TouchTextIcon from '../../../../components/TouchTextIcon';
import AppInputScroll from '../../../../halpers/AppInputScroll';
import handleAndroidBackButton from '../../../../halpers/handleAndroidBackButton';
import { rootStore } from '../../../../stores/rootStore';
import { styles } from './styles';
import PopUp from '../../../../components/appPopUp/PopUp';

export default function KycDocuments({ navigation }) {
  const { appUser,setToken,setAppUser } = rootStore.commonStore;
  const [appDetails, setAppDetails] = useState(appUser?.role === "vendor" ? appUser : appUser?.vendor);
 const [isLogout, setIsLogout] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const { appUser } = rootStore.commonStore;
      handleAndroidBackButton(navigation);
      setAppDetails(appUser?.role === "vendor" ? appUser : appUser?.vendor);
    }, []),
  );

  // console.log('appUser--++--', appUser);

  const kycInformation = [
    {
      id: '1',
      title: 'Bank Details',
      onPress: () => {
        navigation.navigate('bankDetails');
      },
      icon:
        appUser?.bankDetails?.length > 0
          ? appImagesSvg.greenTick
          : appImagesSvg.crossTick,
      show: true,
      disable: false,
      status:
        appDetails?.bank_detail?.account_number?.toString()?.length > 0
          ? appDetails?.bank_detail?.status
          : 'fill detail',
    },
    {
      id: '2',
      title: 'FSSAI Details',
      onPress: () => {
        navigation.navigate('fssaiDetails');
      },
      icon:
        appUser?.fssaiDetails?.length > 0
          ? appImagesSvg.greenTick
          : appImagesSvg.crossTick,
      show: true,
      disable: false,
      status:
        appDetails?.fssai_detail?.account_number?.toString()?.length > 0
          ? appDetails?.fssai_detail?.status
          : 'fill detail',
    },
    {
      id: '3',
      title: 'GST Details',
      onPress: () => {
        navigation.navigate('gstDetails');
      },
      icon:
        appUser?.gstDetails?.length > 0
          ? appImagesSvg.greenTick
          : appImagesSvg.crossTick,
      show: true,
      disable: false,
      status:
        appDetails?.gstn_detail?.gstn_number?.toString()?.length > 0
          ? appDetails?.gstn_detail?.status
          : 'fill detail',
    },
    {
      id: '4',
      title: 'PAN Card Details',
      onPress: () => {
        navigation.navigate('panCardDetails');
      },
      icon:
        appUser?.panCardDetails?.length > 0
          ? appImagesSvg.greenTick
          : appImagesSvg.crossTick,
      show: true,
      disable: false,
      status:
        appDetails?.pan_detail?.pan_number?.toString()?.length > 0
          ? appDetails?.pan_detail?.status
          : 'fill detail',
    },
  ];


  const handleLogout = async () => {
      let query = {
        user_id: appUser?._id,
      };
      await setToken(null);
      await setAppUser(null);
      setIsLogout(false)
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'auth' }],
        }),
      );
    }

  return (
    <View style={styles.container}>
      <Header
        backArrow={true}
        onPress={() => {
          navigation.goBack();
        }}
        title={'KYC Document'}
        bottomLine={1}
      />
      <AppInputScroll padding={true} keyboardShouldPersistTaps={'handled'}>
        <View style={styles.screen}>
          {kycInformation?.map(
            (item, index) =>
              item?.show && <TouchTextIcon item={item} index={index} />,
          )}
        </View>
      </AppInputScroll>
      <PopUp
      topIcon={true}
        visible={isLogout}
        type={'logout'}
        onClose={() => setIsLogout(false)}
        title={'Are you sure you want to log out?'}
        text={
          'You will be log out of your account. Do you want to continue?'
        }
        onDelete={handleLogout}
      />
    </View>
  );
}
