import React, {useEffect, useState, useCallback} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  DeviceEventEmitter,
  Platform,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {useFocusEffect} from '@react-navigation/native';
import {CommonActions} from '@react-navigation/native';
import {Surface, Switch} from 'react-native-paper';
import {fetch} from '@react-native-community/netinfo';
import AppInputScroll from '../../../halpers/AppInputScroll';
import Spacer from '../../../halpers/Spacer';
import handleAndroidBackButton from '../../../halpers/handleAndroidBackButton';
import Url from '../../../api/Url';
import NoInternet from '../../../components/NoInternet';
import {rootStore} from '../../../stores/rootStore';
import {appImagesSvg} from '../../../commons/AppImages';
import {styles} from './styles';
import Header from '../../../components/header/Header';
import {colors} from '../../../theme/colors';
import {RFValue} from 'react-native-responsive-fontsize';
import {fonts} from '../../../theme/fonts/fonts';
import ModalPopUpTouch from '../../../components/ModalPopUpTouch';
import RestaurantOnOffComp from '../../../components/RestaurantOnOffComp';
import CTA from '../../../components/cta/CTA';
import KYCDocumentPopUp from '../../../components/appPopUp/KYCDocumentPopup';

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

export default function SideMenu({navigation}) {
  const {setToken, setAppUser, appUser} = rootStore.commonStore;
  const {restaurantOnlineStatus} = rootStore.authStore;
  console.log('appUser--', appUser);
  const [initialValues, setInitialValues] = useState({
    image: '',
    name: '',
    email: '',
    phone: '',
  });
  const [internet, setInternet] = useState(true);
  const [activateSwitch, setActivateSwitch] = useState(
    appUser?.restaurant?.is_online ?? false,
  );
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [isModalOnOff, setIsModalOnOff] = useState(false);
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
      const {appUser} = rootStore.commonStore;
      handleAndroidBackButton(navigation);
      onUpdateUserInfo();
      checkInternet();
      setActivateSwitch(appUser?.restaurant?.is_online ?? false);
    }, []),
  );

  const onUpdateUserInfo = () => {
    const {appUser} = rootStore.commonStore;
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
      show: true,
      disable: false,
    },
    {
      id: 1,
      title: 'Order History',
      onPress: () => {
        navigation.navigate('orderHistory');
      },
      icon: appImagesSvg.orderHistoryIcon,
      show: true,
      disable: false,
    },
    {
      id: 2,
      title: 'Menu Request',
      onPress: () => {
        navigation.navigate('addMemuRequest');
      },
      icon: appImagesSvg.menuRequestIcon,
      show: true,
      disable: false,
    },
    {
      id: 3,
      title: 'Team Members',
      onPress: () => {
        navigation.navigate('teamMembers');
      },
      icon: appImagesSvg.teamMemberIcon,
      show: true,
      disable: false,
    },
    {
      id: 4,
      title: 'Timings',
      onPress: () => {
        navigation.navigate('restaurantTime');
      },
      icon: appImagesSvg.timingIcon,
      show: true,
      disable: false,
    },
    {
      id: 5,
      title: 'KYC Documents',
      onPress: () => {
        navigation.navigate('kycDocuments');
      },
      icon: appImagesSvg.kycDoucmentIcon,
      show: true,
      disable: false,
    },
    {
      id: 6,
      title: 'Request History',
      onPress: () => {
        navigation.navigate('requestHistory');
      },
      icon: appImagesSvg.requestHistoryIcon,
      show: true,
      disable: false,
    },
    {
      id: 7,
      title: 'Reports',
      onPress: () => {
        navigation.navigate('reports');
      },
      icon: appImagesSvg.reportIcon,
      show: true,
      disable: false,
    },
    {
      id: 8,
      title: 'Password Update',
      onPress: () => {
        navigation.navigate('updatePassword');
      },
      icon: appImagesSvg.passwordUpdateIcon,
      show: true,
      disable: false,
    },
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
      show: true,
      disable: false,
    },

    {
      id: 13,
      title: 'Notification Settings',
      onPress: () => {
        navigation.navigate('notification');
      },
      icon: appImagesSvg.notificationIcon,
      show: true,
      disable: false,
    },

    {
      id: 14,
      title: 'Logout',
      onPress: async () => {
        let query = {
          user_id: appUser?._id,
        };
        await setToken(null);
        await setAppUser(null);
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'auth'}],
          }),
        );
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
    const {appUser} = rootStore.commonStore;
    setIsModalOnOff(false);
    setActivateSwitch(appUser?.restaurant?.is_online ?? false);
  };

  return (
    <View style={styles.container}>
      <Header title={'Settings'} bottomLine={1} />
      <View
        style={{
          justifyContent: 'center',
          backgroundColor: colors.colorD80,
          paddingVertical: '3%',
        }}>
        <View style={{marginHorizontal: 20, justifyContent: 'center'}}>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                flex: 1,
                fontSize: RFValue(14),
                fontFamily: fonts.semiBold,
                color: colors.black,
              }}>
              Suraya Fast Food
            </Text>
            <Text
              style={{
                fontSize: RFValue(12),
                fontFamily: fonts.medium,
                color: colors.black,
              }}>
              {activateSwitch ? 'Online' : 'Offline'}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: '0.1%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                flex: 1,
                fontSize: RFValue(11),
                fontFamily: fonts.regular,
                color: colors.colorA9,
              }}>
              Phase 5, Sector 59, Sahibzada Ajit...{' '}
            </Text>
            <Switch
              style={{
                transform:
                  Platform.OS === 'ios'
                    ? [{scaleX: 0.8}, {scaleY: 0.7}]
                    : [{scaleX: 1}, {scaleY: 0.9}],
              }}
              value={activateSwitch}
              trackColor={{false: colors.colorAF, true: colors.main}}
              thumbColor={activateSwitch ? colors.white : colors.white}
              onValueChange={() => {
                onTogglePress();
              }}
            />
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
                              style={{marginLeft: 'auto'}}
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
      {/* {appUser?.is_kyc_completed !== true &&
        <KYCDocumentPopUp
          appUserData={appUser}
          navigation={navigation} />} */}
    </View>
  );
}
