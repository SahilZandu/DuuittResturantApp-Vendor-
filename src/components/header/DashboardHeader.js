import React, { useEffect, useState, useCallback } from 'react';
import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { SvgXml } from 'react-native-svg';
import { appImagesSvg, appImages } from '../../commons/AppImages';
import { colors } from '../../theme/colors';
import { fonts } from '../../theme/fonts/fonts';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Url from '../../api/Url';
import { rootStore } from '../../stores/rootStore';
import { getCurrentLocation, setCurrentLocation } from '../GetAppLocation';
import { useFocusEffect } from '@react-navigation/native';
import { getGeoCodes } from '../GeoCodeAddress';
import { Switch } from 'react-native-paper';
import RestaurantOnOffComp from '../RestaurantOnOffComp';
import ModalPopUpTouch from '../ModalPopUpTouch';
import CTA from '../cta/CTA';
import Spacer from '../../halpers/Spacer';
import { restaurantOnOff } from '../../stores/DummyData/Order';
import { isScreenAccess } from '../../halpers/AppPermission';

let geoLocation = {
  lat: null,
  lng: null,
};
const DashboardHeader = ({ navigation }) => {
  const { currentAddress } = rootStore.myAddressStore;
  const { restaurantOnlineStatus } = rootStore.authStore;
  const { appUser } = rootStore.commonStore;
  const [activateSwitch, setActivateSwitch] = useState(
    appUser?.restaurant?.is_online ?? false,
  );
  const [isStock, setIsStock] = useState(isScreenAccess(3));
  const [isModalOnOff, setIsModalOnOff] = useState(false);
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);

  const getLocation = type => {
    let d =
      type == 'lat'
        ? getCurrentLocation()?.latitude
        : getCurrentLocation()?.longitude;

    return d ? d : '';
  };
  const [address, setAddress] = useState(appUser?.restaurant?.address ?? "Please add the restaurant location first."
    // currentAddress?.address
  );
  const [isRefersh, setIsRefersh] = useState(false);
  //   const [geoLocation, setGeoLocation] = useState({
  //     lat: getLocation('lat'),
  //     lng: getLocation('lng'),
  //   });

  useFocusEffect(
    useCallback(() => {
      const { appUser } = rootStore.commonStore;
      setAddress(appUser?.restaurant?.address ?? 'Please add the restaurant location first.'
        //  currentAddress?.address
      );
      setActivateSwitch(appUser?.restaurant?.is_online ?? false);
      setCurrentLocation();
      setTimeout(() => {
        if (getLocation) {
          onUpdateLatLng();
          setIsRefersh(true);
        }
      }, 1000);
    }, [currentAddress]),
  );

  useEffect(() => {
    if (!currentAddress?.address) {
      setTimeout(() => {
        getCurrentAddress();
      }, 1500);
    }
  }, [isRefersh]);

  const onUpdateLatLng = () => {
    geoLocation = {
      lat: getLocation('lat'),
      lng: getLocation('lng'),
    };
    setIsRefersh(true);
    setTimeout(() => {
      setIsRefersh(false);
    }, 1000);
  };

  const getCurrentAddress = async () => {
    const addressData = await getGeoCodes(geoLocation?.lat, geoLocation?.lng);
    // console.log('addressData', addressData);
    setAddress(appUser?.restaurant?.address ?? "Please add the restaurant location first."
      // addressData?.address
    );
  };

  const onTogglePress = async () => {
    setReason('');
    setActivateSwitch(!activateSwitch);
    if (activateSwitch) {
      setIsModalOnOff(true);
    } else {
      onToggleUpdate(!activateSwitch);
    }
  };

  const RenderToggleOutlet = () => {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: hp('0.1%'),
          marginRight: '2%',
        }}>
        <Text
          style={{
            fontSize: RFValue(12),
            fontFamily: fonts.semiBold,
            color: colors.black,
          }}>
          {' '}
          {activateSwitch == true ? 'Online' : 'Offline'}{' '}
        </Text>
        <Switch
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
        />
      </View>
    );
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
    console.log('handleLoading---', v);
    setLoading(v);
  };

  const onSuccess = () => {
    const { appUser } = rootStore.commonStore;
    setIsModalOnOff(false);
    setActivateSwitch(appUser?.restaurant?.is_online ?? false);
  };

  return (
    <View
      style={{
        backgroundColor: colors.appBackground,
        borderBottomWidth: 1,
        borderBottomColor: colors.colorD9,
      }}>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: colors.backColorMain,
          alignItems: 'center',
          paddingBottom: '2%',
          marginTop: '1%',
          paddingHorizontal: 20,
        }}>
        <View
          style={{
            flex: 1,
            backgroundColor: colors.appBackground,
            marginRight: '1%',
          }}>
          <Text
            numberOfLines={1}
            style={{
              fontSize: RFValue(15),
              fontFamily: fonts.semiBold,
              color: colors.black,
              width: wp('62%'),
              textTransform:'capitalize'
            }}>
           {appUser?.restaurant?.name ?? "Home "} 
          </Text>
          <Text
            style={{
              fontSize: RFValue(10),
              fontFamily: fonts.regular,
              color: colors.colorA9,
              width: wp('65%'),
            }}
            numberOfLines={1}>
            {address ? address : ""
              // 'Your current address is not visible.'
            }
          </Text>
        </View>

        {isStock && <RenderToggleOutlet />}

        <TouchableOpacity
          hitSlop={{ top: 10, bottom: 10, left: 20, right: 20 }}
          onPress={() => {
            navigation.navigate('profile');
          }}
          activeOpacity={0.8}>
          <Image
            resizeMode="cover"
            style={{
              width: 36,
              height: 36,
              borderRadius: 100,
              borderColor: colors.main,
              borderWidth: 0.3,
            }}
            source={
              appUser?.restaurant?.banner?.length > 0
                ? { uri:appUser?.restaurant?.banner }
                : appImages.profileImage
            }
          />
        </TouchableOpacity>
      </View>
      <ModalPopUpTouch
        crossImage={true}
        isVisible={isModalOnOff}
        onClose={() => {
          setIsModalOnOff(false);
          setActivateSwitch(appUser?.restaurant?.is_online ?? false);
          setReason('');
        }}>
        <View style={styles.modalView}>
          <View style={styles.modalInnerView}>
            <RestaurantOnOffComp
              title={'Why you are going to offline?'}
              reasonData={reason}
              restaurantOnOff={restaurantOnOff}
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
              bottomCheck={1}
              loading={loading}
            />
          </View>
        </View>
      </ModalPopUpTouch>
    </View>
  );
};

export default DashboardHeader;

const styles = StyleSheet.create({
  modalView: {
    height: hp('62%'),
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalInnerView: {
    justifyContent: 'center',
    marginHorizontal: 20,
    paddingVertical: '5%',
  },
});
