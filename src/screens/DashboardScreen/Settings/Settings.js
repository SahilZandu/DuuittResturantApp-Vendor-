import React, { useEffect, useState, useCallback } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  DeviceEventEmitter,
  Platform,
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import { useFocusEffect, CommonActions } from '@react-navigation/native';
import { Surface, Switch } from 'react-native-paper';
import { fetch } from '@react-native-community/netinfo';
import AppInputScroll from '../../../halpers/AppInputScroll';
import Spacer from '../../../halpers/Spacer';
import handleAndroidBackButton from '../../../halpers/handleAndroidBackButton';
import Url from '../../../api/Url';
import NoInternet from '../../../components/NoInternet';
import { rootStore } from '../../../stores/rootStore';
import { appImagesSvg } from '../../../commons/AppImages';
import { styles } from './styles';
import Header from '../../../components/header/Header';
import { colors } from '../../../theme/colors';
import { RFValue } from 'react-native-responsive-fontsize';
import { fonts } from '../../../theme/fonts/fonts';
import ModalPopUpTouch from '../../../components/ModalPopUpTouch';
import RestaurantOnOffComp from '../../../components/RestaurantOnOffComp';
import CTA from '../../../components/cta/CTA';
import KYCDocumentPopUp from '../../../components/appPopUp/KYCDocumentPopup';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { getGeoCodes } from '../../../components/GeoCodeAddress';
import { isScreenAccess } from '../../../halpers/AppPermission';
import PopUp from '../../../components/appPopUp/PopUp';
import PopUpInProgess from '../../../components/appPopUp/PopUpInProgess';

const restaurantOnOff = [
  {
    id: 0,
    title: 'Out of Stock',
  },
  {
    id: 1,
    title: 'Over Capacity',
  },
  {
    id: 2,
    title: 'Staffing Issues',
  },
  {
    id: 3,
    title: 'Closed for Maintenance',
  },
  {
    id: 4,
    title: 'Special Events or Holidays',
  },
  {
    id: 5,
    title: 'Other',
  },
];

let geoLocation = {
  lat: null,
  lng: null,
};
export default function SideMenu({ navigation }) {
  const { setToken, setAppUser, appUser } = rootStore.commonStore;
  const { restaurantOnlineStatus, getAppUser, userLogout, deleteVendor } = rootStore.authStore;
  const { currentAddress } = rootStore.myAddressStore
  const { checkTeamRolePermission } = rootStore.teamManagementStore;
  const { orderAccpetedList } = rootStore.orderStore;
  console.log('appUser--', appUser);
  const [initialValues, setInitialValues] = useState({
    image: '',
    name: '',
    email: '',
    phone: '',
  });
  const getLocation = type => {
    let d =
      type == 'lat'
        ? getCurrentLocation()?.latitude
        : getCurrentLocation()?.longitude;

    return d ? d : '';
  };
  const [internet, setInternet] = useState(true);
  const [activateSwitch, setActivateSwitch] = useState(
    appUser?.restaurant?.is_online ?? false,
  );
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [isModalOnOff, setIsModalOnOff] = useState(false);
  const [address, setAddress] = useState(appUser?.restaurant?.address ?? "Please add the restaurant location first."
    //  currentAddress?.address 
  )
  const [restName, setRestName] = useState(appUser?.restaurant?.name ?? '')
  const [isStock, setIsStock] = useState(isScreenAccess(3));
  const [isProfileScreen, setIsProfileScreen] = useState(isScreenAccess(10))
  const [isOrdersScreen, setIsOrdersScreen] = useState(isScreenAccess(8))
  const [isTeamsScreen, setIsTeamsScreen] = useState(isScreenAccess(4))
  const [isSettingsScreen, setIsSettingsScreen] = useState(isScreenAccess(11))
  const [isLogout, setIsLogout] = useState(false);
  const [appDetails, setAppDetails] = useState(appUser)
  const [isProgress, setIsProgress] = useState(false)
  const [isPendingOrder, setIsPendingOrder] = useState(orderAccpetedList ?? [])


  useEffect(() => {
    DeviceEventEmitter.addListener('tab4', event => {
      // console.log('event----tab1', event);
      if (event != 'noInternet') {
      }
      setInternet(event == 'noInternet' ? false : true);
      console.log('internet event');
    });
  }, []);
  const checkInternet = () => {
    fetch().then(state => {
      setInternet(state.isInternetReachable);
    });
  };

  useFocusEffect(
    useCallback(() => {
      const { appUser } = rootStore.commonStore;
      const { orderAccpetedList } = rootStore.orderStore;
      setIsPendingOrder(orderAccpetedList);
      setAppDetails(appUser)
      handleAndroidBackButton(navigation);
      if (appUser?.role !== "vendor") {
        onCheckTeamRolePermission()
      }
      setRestName(appUser?.restaurant?.name ?? '')
      setAddress(appUser?.restaurant?.address ?? currentAddress?.address ?? '')
      onUpdateUserInfo();
      checkInternet();
      setActivateSwitch(appUser?.restaurant?.is_online ?? false);
      if ((!currentAddress?.address && !appUser?.restaurant?.address)) {
        onAddressUpdate();
      }
    }, [currentAddress]),
  );


  const getAppUserData = async () => {
    const userData = await getAppUser(appUser)
    // console.log("userData--", userData);
    if (userData?._id?.length > 0) {
      setAppDetails(userData)
    } else {
      setAppDetails(appUser)
    }
  }

  useEffect(() => {
    const subscription = DeviceEventEmitter.addListener('kycStatusUpdate', data => {
      // console.log('kycStatusUpdate Order data -- ', data);
      getAppUserData();
    });
    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    const subscription = DeviceEventEmitter.addListener('vendorBlockSuspend', data => {
      // console.log('vendorBlockSuspend update ', data);
      getAppUserData();
    });
    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    const subscription = DeviceEventEmitter.addListener('restProfileUpdate', data => {
      // console.log('Profile update ', data);
      getAppUserData();
    });
    return () => {
      subscription.remove();
    };
  }, []);


  const onCheckTeamRolePermission = async () => {
    const res = await checkTeamRolePermission(appUser);
    console.log("res --- ", res);
  }

  const onAddressUpdate = () => {
    geoLocation = {
      lat: appUser?.restaurant?.location?.coordinates[0] ?? getLocation('lat'),
      lng: appUser?.restaurant?.location?.coordinates[1] ?? getLocation('lng'),
    };
    setTimeout(() => {
      getCurrentAddress();
    }, 2000)
  }

  const getCurrentAddress = async () => {
    const addressData = await getGeoCodes(geoLocation?.lat, geoLocation?.lng);
    // console.log('addressData', addressData);
    setAddress(addressData?.address);
  };

  const onUpdateUserInfo = () => {
    const { appUser } = rootStore.commonStore;
    console.log('appUser--11', appUser);
    setInitialValues({
      image: Url?.Image_Url + appUser?.profile_pic,
      name: appUser?.name,
      email: appUser?.email,
      phone: appUser?.phone?.toString(),
    });
  };



  const settingOptions = [
    {
      id: 0,
      title: 'Restaurant Profile',
      onPress: () => {
        navigation.navigate('profile');
      },
      icon: appImagesSvg.restaurantProfileIcon,
      show: isProfileScreen ? true : false,
      disable: false,
    },
    {
      id: 1,
      title: 'Order History',
      onPress: () => {
        navigation.navigate('orderHistory');
      },
      icon: appImagesSvg.orderHistoryIcon,
      show: isOrdersScreen ? true : false,
      disable: false,
    },
    // {
    //   id: 2,
    //   title: 'Menu Request',
    //   onPress: () => {
    //     navigation.navigate('addMemuRequest');
    //   },
    //   icon: appImagesSvg.menuRequestIcon,
    //   show: isSettingsScreen ? true : false,
    //   disable: false,
    // },
    {
      id: 3,
      title: 'Team Members',
      onPress: () => {
        navigation.navigate('teamMembers');
      },
      icon: appImagesSvg.teamMemberIcon,
      show: isTeamsScreen ? true : false,
      disable: false,
    },
    {
      id: 4,
      title: 'Timings',
      onPress: () => {
        navigation.navigate('restaurantTime');
      },
      icon: appImagesSvg.timingIcon,
      show: isSettingsScreen ? true : false,
      disable: false,
    },
    {
      id: 5,
      title: 'KYC Documents',
      onPress: () => {
        navigation.navigate('kycDocuments');
      },
      icon: appImagesSvg.kycDoucmentIcon,
      show: isSettingsScreen ? true : false,
      disable: false,
    },
    {
      id: 6,
      title: 'Request History',
      onPress: () => {
        navigation.navigate('requestHistory');
      },
      icon: appImagesSvg.requestHistoryIcon,
      show: isSettingsScreen ? true : false,
      disable: false,
    },
    {
      id: 7,
      title: 'Reports',
      onPress: () => {
        navigation.navigate('reports');
      },
      icon: appImagesSvg.reportIcon,
      show: isSettingsScreen ? true : false,
      disable: false,
    },
    // {
    //   id: 8,
    //   title: 'Password Update',
    //   onPress: () => {
    //     navigation.navigate('updatePassword');
    //   },
    //   icon: appImagesSvg.passwordUpdateIcon,
    //   show: true,
    //   disable: false,
    // },
    {
      id: 9,
      title: 'Manage Profile',
      onPress: () => {
        navigation.navigate('manageProfile');
      },
      icon: appImagesSvg.manageProfileIcon,
      show: true,
      disable: false,
    },
    {
      id: 10,
      title: 'Customer Support',
      onPress: () => {
        navigation.navigate('customerSupport');
      },
      icon: appImagesSvg.customerSupportIcon,
      show: true,
      disable: false,
    },
    {
      id: 11,
      title: 'Help',
      onPress: () => {
        navigation.navigate('help');
      },
      icon: appImagesSvg.helpSvg,
      show: true,
      disable: false,
    },
    {
      id: 12,
      title: 'Send feedback',
      onPress: () => {
        navigation.navigate('feedback');
      },
      icon: appImagesSvg.sendFeedback,
      show: isSettingsScreen ? true : false,
      disable: false,
    },

    {
      id: 13,
      title: 'Notification Settings',
      onPress: () => {
        navigation.navigate('notification');
      },
      icon: appImagesSvg.notificationIcon,
      show: isSettingsScreen ? true : false,
      disable: false,
    },
    {
      id: 14,
      title: 'About',
      onPress: () => {
        navigation.navigate('about');
      },
      icon: appImagesSvg.aboutSvg,
      show: isSettingsScreen ? true : false,
      disable: false,
    },

    {
      id: 15,
      title: 'Logout',
      onPress: async () => {
        // setIsLogout(true);
        if ((isPendingOrder?.length > 0 || orderAccpetedList?.length > 0)) {
          setIsProgress(true)
        } else {
          setIsLogout(true);
        }

      },
      icon: appImagesSvg.logOutSvg,
      show: true,
      disable: false,
    },
  ];
  const onTogglePress = async () => {
    setReason('');
    setActivateSwitch(!activateSwitch);
    if (activateSwitch) {
      setIsModalOnOff(true);
    } else {
      onToggleUpdate(!activateSwitch);
    }
  };

  const onToggleUpdate = async switchToggle => {
    await restaurantOnlineStatus(
      reason,
      switchToggle,
      appUser,
      handleLoading,
      onSuccess,
    );
  };

  const handleLoading = v => {
    // console.log('handleLoading---', v);
    setLoading(v);
  };

  const onSuccess = () => {
    const { appUser } = rootStore.commonStore;
    setIsModalOnOff(false);
    setActivateSwitch(appUser?.restaurant?.is_online ?? false);
  };


  const handleLogout = async () => {

    await userLogout(handleLogoutLoading, isSuccess, onError);

    // await setToken(null);
    // await setAppUser(null);
    // setIsLogout(false)
    // navigation.dispatch(
    //   CommonActions.reset({
    //     index: 0,
    //     routes: [{ name: 'auth' }],
    //   }),
    // );
  }



  const handleLogoutLoading = (v) => {
    console.log("v--", v);
    if (v === false) {
      setIsLogout(false);
    }
  }

  const isSuccess = async () => {
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

  const onError = () => {
    setIsLogout(false);
  }


  return (
    <View style={styles.container}>
      <Header title={'Settings'} bottomLine={1} />
      <View
        style={styles.restNameAddresStatusView}>
        <View style={styles.restInnerNameAddresStatusView}>
          <View style={styles.restInnerNameStatus}>
            <Text
              numberOfLines={2}
              style={styles.restNameText}>
              {restName ?? appUser?.restaurant?.name ?? ''}
            </Text>
            {isStock && <Text
              style={styles.restStatusText}>
              {activateSwitch ? 'Online' : 'Offline'}
            </Text>}
          </View>
          <View
            style={styles.restAddressToggleView}>
            <Text
              numberOfLines={2}
              style={styles.restAddressText}>
              {address ?? ''}
            </Text>
            {isStock && <Switch
              style={{
                transform:
                  Platform.OS === 'ios'
                    ? [{ scaleX: 0.8 }, { scaleY: 0.7 }]
                    : [{ scaleX: 1 }, { scaleY: 0.9 }],
              }}
              value={activateSwitch}
              trackColor={{ false: colors.red, true: colors.green }}
              thumbColor={activateSwitch ? colors.white : colors.white}
              onValueChange={() => {
                onTogglePress();
              }}
            />}
          </View>
        </View>
      </View>
      {internet == false ? (
        <NoInternet />
      ) : (
        <>
          <AppInputScroll
            Pb={'60%'}
            padding={true}
            keyboardShouldPersistTaps={'handled'}>
            <View>
              <View style={styles.userDetailsView}></View>
              <Spacer space={'3%'} />
              <View style={styles.renderItemContainer}>
                {settingOptions?.map(
                  (item, index) =>
                    item?.show && (
                      <TouchableOpacity
                        activeOpacity={0.8}
                        disabled={item?.disable}
                        onPress={item?.onPress}
                        key={index}
                        style={styles.touchRender}>
                        <View style={styles.renderView}>
                          <SvgXml height={22} width={22} xml={item?.icon} />
                          <Text style={styles.title}>{item?.title}</Text>
                          {item?.title != 'Logout' && (
                            <SvgXml
                              height={22}
                              width={22}
                              style={{ marginLeft: 'auto' }}
                              xml={appImagesSvg.rightArrow}
                            />
                          )}
                        </View>
                        {item?.title != 'Logout' && (
                          <View style={styles.bottomLineView} />
                        )}
                      </TouchableOpacity>
                    ),
                )}
              </View>
              {/* <TouchableOpacity
                onPress={() => { onDeletePopUp() }}
                activeOpacity={0.8}
                hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                style={styles.deleteAccountView}>
                <Text style={styles.deleteAccountText}>Delete Account</Text>
              </TouchableOpacity> */}
            </View>
          </AppInputScroll>
        </>
      )}

      <ModalPopUpTouch
        crossImage={true}
        isVisible={isModalOnOff}
        onClose={() => {
          setIsModalOnOff(false);
          setActivateSwitch(!activateSwitch);
          setReason('');
        }}>
        <View style={styles.modalView}>
          <View style={styles.modalInnerView}>
            <RestaurantOnOffComp
              title={'Why you are going to offline?'}
              restaurantOnOff={restaurantOnOff}
              reasonData={reason}
              pressOnOff={item => {
                setReason(item?.title);
              }}
            />
            <Spacer space={'8%'} />
            <CTA
              title={'Submit'}
              textTransform={'capitalize'}
              onPress={() => {
                onToggleUpdate(activateSwitch);
              }}
              disable={reason?.length > 0 ? false : true}
              bottomCheck={1}
              loading={loading}
            />
          </View>
        </View>
      </ModalPopUpTouch>
      {(appDetails?.role === "vendor" ?
        appDetails?.is_kyc_completed == false
        : appDetails?.vendor?.is_kyc_completed == false) &&
        <KYCDocumentPopUp
          appUserData={appDetails?.role === "vendor" ? appDetails : appDetails?.vendor}
          navigation={navigation} />
      }
      <PopUp
        // onPressBack={() => setIsLogout(false)}
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

      <PopUpInProgess
        topIcon={true}
        CTATitle={'Cancel'}
        visible={isProgress}
        type={'warning'}
        onClose={() => setIsProgress(false)}
        title={`You can't logout account`}
        text={
          `You can't logout your account while your order is being processed.`
        }
      />

    </View>
  );
}
