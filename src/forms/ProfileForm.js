import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import RBSheet from '@lunalee/react-native-raw-bottom-sheet';
import { Formik, useFormikContext } from 'formik';
import { SvgXml } from 'react-native-svg';
import { RFValue } from 'react-native-responsive-fontsize';
import PickUpdateActions from '../components/PickUpdateActions';
import { appImagesSvg, appImages } from '../commons/AppImages';
import { fonts } from '../theme/fonts/fonts';
import { colors } from '../theme/colors';
import FieldInput from '../components/FieldInput';
import InputFieldMultiLine from '../components/InputFieldMultiLine';
import AppInputScroll from '../halpers/AppInputScroll';
import ProductType from '../components/addMenu/ProductType';
import CTA from '../components/cta/CTA';
import Spacer from '../halpers/Spacer';
import { rootStore } from '../stores/rootStore';
import AssetsImages from '../components/AssetsImages';
import { useFocusEffect } from '@react-navigation/native';
import handleAndroidBackButton from '../halpers/handleAndroidBackButton';
import ProductInput from '../components/addMenu/ProductInput';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import { DateFormat } from '../halpers/DateFormat';
import AddressInput from '../components/AddressInput';
import { restaurantProfileValidations } from './formsValidation/restaurantProfileValidations';
import Url from '../api/Url';
import PendingReqView from '../components/PendingReqView';
import { ScreenBlockComponent } from '../components/ScreenBlockComponent/ScreenBlockComponent';
import { isScreenAccess } from '../halpers/AppPermission';

export default function ProfileForm({ navigation }) {
  const { restaurantProfile } = rootStore.authStore;
  const { appUser } = rootStore.commonStore;
  const refRBSheet = useRef(null);
  let dateStart = new Date();

  const [imageValidations, setImageValidations] = useState('');
  const [loading, setLoading] = useState(false);
  const [profileImageLoad, setProfileImageLoad] = useState(false)
  const [initialValues, setInitialValues] = useState({
    image: Url?.Image_Url + appUser?.restaurant?.banner ?? '',
    assetsFixed: appUser?.restaurant?.assets ?? [],
    assets: appUser?.restaurant?.assets ?? [],
    restaurantName: appUser?.restaurant?.name ?? '',
    about: appUser?.restaurant?.about ?? '',
    landMark: appUser?.restaurant?.landmark ?? '',
    address: appUser?.restaurant?.address ?? '',
    lng: appUser?.restaurant?.location?.coordinates[0] ?? '',
    lat: appUser?.restaurant?.location?.coordinates[1] ?? '',
    phone: appUser?.restaurant?.phone?.toString() ?? '',
    email: appUser?.restaurant?.email ?? '',
    dateOfFounding: appUser?.restaurant?.date_of_founding ? DateFormat(appUser?.restaurant?.date_of_founding) : '',
    itemType: appUser?.restaurant?.veg_non_veg ?? 'veg',
    minimunPrice: appUser?.restaurant?.minimum_order_value?.toString() ?? '',
    prepareTime: appUser?.restaurant?.minimum_order_preparation_time?.toString() ?? '',
    isOnline: appUser?.restaurant?.is_online ?? true,
  });
  const [foundingdate, setFoundingdate] = useState(
    appUser?.restaurant?.date_of_founding ?? '',
  );

  const [isProfileScreen, setIsProfileScreen] = useState(isScreenAccess(10));

  const [assetImages, setAssetImages] = useState(
    appUser?.restaurant?.assets ?? [],
  );
  const [imageLogo, setImageLogo] = useState(
    Url?.Image_Url + appUser?.restaurant?.banner ?? '',
  );
  const [update, setUpdate] = useState(true);
  const [isDone, setDone] = useState(false);
  const [showPicker, setShowPicker] = useState(false);

  const [keyboardHeight, setKeyboardHeight] = useState('5%');
  const [isPendingReq, setIsPendingReq] = useState(
    false,
    // appUser?.restaurant?.status == 'completed' ? false : true,
  );
  const [isSubmited, setSubmited] = useState(false);

  const dateFormat = d => {
    var date = new Date(d);
    const founding = moment(date).format('YYYY-MM-DD');
    setFoundingdate(founding);
    return DateFormat(date);
  };

  useFocusEffect(
    useCallback(() => {
      handleAndroidBackButton(navigation);
    }, []),
  );

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardHeight('80%');
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardHeight('5%');
      },
    );

    // Cleanup listeners
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  console.log('appUser==', appUser);

  const onChangeImage = uri => {
    // console.log('uri--', uri);
    setImageLogo(uri);
    refRBSheet.current.close();
  };

  const handleSaveAndNext = async values => {
    await restaurantProfile(
      values,
      imageLogo,
      assetImages,
      foundingdate,
      appUser,
      handleLoading,
      isSuccess,
    );
  };

  const handleLoading = v => {
    setLoading(v);
  };

  const isSuccess = () => {
    const { appUser } = rootStore.commonStore;
    console.log('yes00==', appUser);
    setUpdate(false);
    setInitialValues({
      image: Url?.Image_Url + appUser?.restaurant?.banner ?? '',
      assetsFixed: appUser?.restaurant?.assets ?? [],
      assets: appUser?.restaurant?.assets ?? [],
      restaurantName: appUser?.restaurant?.name ?? '',
      about: appUser?.restaurant?.about ?? '',
      landMark: appUser?.restaurant?.landmark ?? '',
      address: appUser?.restaurant?.address ?? '',
      lng: appUser?.restaurant?.location?.coordinates[0] ?? '',
      lat: appUser?.restaurant?.location?.coordinates[1] ?? '',
      phone: appUser?.restaurant?.phone?.toString() ?? '',
      email: appUser?.restaurant?.email ?? '',
      dateOfFounding: appUser?.restaurant?.date_of_founding ? DateFormat(appUser?.restaurant?.date_of_founding) : '',
      itemType: appUser?.restaurant?.veg_non_veg ?? 'veg',
      minimunPrice: appUser?.restaurant?.minimum_order_value?.toString() ?? '',
      prepareTime: appUser?.restaurant?.minimum_order_preparation_time?.toString() ?? '',
      isOnline: appUser?.restaurant?.is_online ?? true,
    });
    setImageLogo(Url?.Image_Url + appUser?.restaurant?.banner ?? '');
    setAssetImages(appUser?.restaurant?.assets ?? []);
    setUpdate(true);
  };

  const AddProductBtn = () => {
    const { dirty, isValid, values } = useFormikContext();
    // console.log('dirty', dirty, values);
    console.log('values---', values);
    return (
      <CTA
        width={wp('90%')}
        title={'Update'}
        disable={!(dirty && isValid)}
        onPress={() => handleSaveAndNext(values)}
        loading={loading}
      />
    );
  };

  const getOrgImages = org => {
    console.log('org--', org);
    // return org?.assets;
  };

  const onAssetImage = data => {
    setAssetImages(data);
  };

  const refreshOrg = async () => {
    setDone(true);
    setTimeout(() => {
      setDone(false);
      isSuccess();
    }, 10);
  };



  const DatePickeButton = ({ }) => {
    const { setFieldValue } = useFormikContext();
    return (
      <DatePicker
        modal
        mode="date"
        maximumDate={dateStart}
        open={showPicker}
        date={dateStart}
        onConfirm={date => {
          setShowPicker(false);
          setFieldValue('dateOfFounding', dateFormat(date));
        }}
        onCancel={() => {
          setShowPicker(false);
        }}
      />
    );
  };

  if (update == true) {
    return (
      <View style={{ flex: 1 }} pointerEvents={loading ? 'none' : null} >
        <Formik
          initialValues={initialValues}
          validationSchema={restaurantProfileValidations()}>
          <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: colors.appBackground }}
            behavior={Platform.OS === 'ios' ? 'padding' : null}>
            {!isProfileScreen ? (
              <ScreenBlockComponent />
            ) : (
              <AppInputScroll
                Pb={keyboardHeight}
                padding={true}
                keyboardShouldPersistTaps={'handled'}>
                {isPendingReq && (
                  <PendingReqView
                    // onPress={() =>
                    //   navigation.navigate('requestHistory', {
                    //     id: initialValues?.serial_no,
                    //   })
                    // }
                    text={
                      (isSubmited
                        ? 'Your request submitted successfully! Now you '
                        : 'You ') +
                      "can't place update bank detail request as the previous request is under review."
                    }
                  />
                )}
                <View
                  style={[
                    styles.main,
                    {
                      opacity: isPendingReq ? 0.6 : 1,
                      pointerEvents: isPendingReq ? 'none' : 'auto',
                    },
                  ]}>
                  <View
                    style={[
                      styles.logoImageView,
                      {
                        marginTop: isPendingReq == true ? '3%' : 0,
                      },
                    ]}>
                    <View style={styles.logoImageInnerView}>
                      {profileImageLoad && (
                        <ActivityIndicator
                          size='large'
                          color={colors.green}
                          style={styles.profileLoader}
                        />

                      )}
                      <Image
                        resizeMode="cover"
                        style={styles.logoImage}
                        source={
                          imageLogo?.length > 0
                            ? { uri: imageLogo }
                            : appImages.restaurantDummyImage
                        }
                        onLoadStart={() => setProfileImageLoad(true)}
                        onLoadEnd={() => setProfileImageLoad(false)}
                      />
                    </View>
                    <View style={styles.changePhotoView}>
                      <TouchableOpacity
                        onPress={() => {
                          refRBSheet.current.open();
                        }}
                        activeOpacity={0.8}
                        style={styles.changePhotoTouch}>
                        <SvgXml
                          width={20}
                          height={20}
                          xml={appImagesSvg.cameraSvgWhite}
                        />
                        <Text style={styles.changeCoverText}>
                          Change Cover Photo
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.innerView}>
                    <View style={styles.inputMainView}>
                      <AssetsImages
                        name={'assets'}
                        //   isPending={org?.update_profile || isPendingReq ? true : false}
                        images={initialValues?.assets}
                        onClickAssetImage={onAssetImage}
                        onDeleteImages={() => refreshOrg()}
                      />
                      <FieldInput
                        inputLabel={'Restaurant Name'}
                        placeholder={'Enter your restaurant name'}
                        name={'restaurantName'}
                      />
                      <InputFieldMultiLine
                        inputLabel={'About'}
                        placeholder={'Enter restaurant Bio'}
                        name={'about'}
                      // value={initialValues?.about}
                      />
                      <AddressInput
                        // isPending={isPendingReq}
                        title={'Restaurant Address'}
                        name={'address'}
                      />
                      <FieldInput
                        inputLabel={'Near landmark'}
                        placeholder={'Enter your land mark address'}
                        name={'landMark'}
                      />
                      <FieldInput
                        inputLabel={'Phone Number'}
                        placeholder={'Enter phone number'}
                        keyboardType={'number-pad'}
                        name={'phone'}
                        maxLength={10}
                      />
                      <FieldInput
                        autoCapitalize={'none'}
                        inputLabel={'Email Address'}
                        placeholder={'Enter email address'}
                        name={'email'}
                        keyboardType={'email-address'}
                      />
                      <ProductInput
                        boxStyle={{ borderRadius: 50 }}
                        isTouchInput
                        onPress={() => {
                          Keyboard.dismiss(),
                            setTimeout(() => {
                              setShowPicker(true);
                            }, 100);
                        }}
                        editable={false}
                        title={'Date of Founding'}
                        name={'dateOfFounding'}
                        placeholder={'select date'}
                      />
                      <ProductType
                        title={'Item type'}
                        name={'itemType'}
                        value={initialValues.itemType}
                      />

                      <FieldInput
                        inputLabel={'Minimum Order Value'}
                        placeholder={'Enter your minimum price'}
                        name={'minimunPrice'}
                        keyboardType={'numeric'}
                        maxLength={6}
                      />
                      <FieldInput
                        inputLabel={'Minimum order preparation time (in minutes)'}
                        placeholder={'Enter preparing time'}
                        name={'prepareTime'}
                        keyboardType={'numeric'}
                        maxLength={4}
                      />
                    </View>
                  </View>
                  <Spacer space={'15%'} />
                  {<AddProductBtn />}
                  <RBSheet
                    height={hp('22%')}
                    ref={refRBSheet}
                    closeOnDragDown={true}
                    closeOnPressMask={true}
                    keyboardAvoidingViewEnabled={
                      Platform.OS == 'ios' ? true : false
                    }
                    customStyles={{
                      wrapper: {
                        backgroundColor: 'rgba(52, 52, 52, 0.8)',
                      },
                      container: {
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                      },
                    }}>
                    <PickUpdateActions
                      name={'image'}
                      onSelectUri={onChangeImage}
                    />
                  </RBSheet>
                  {<DatePickeButton />}
                </View>
              </AppInputScroll>
            )}
          </KeyboardAvoidingView>
        </Formik>
      </View>
    );
  } else {
    return null;
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
  },
  logoImageView: {
    justifyContent: 'center',
    marginTop: 0,
  },
  logoImageInnerView: {
    height: hp('21%'),
    width: wp('100%'),
  },
  logoImage: {
    height: hp('21%'),
    width: wp('100%'),
  },
  changePhotoView: {
    position: 'absolute',
    right: '5%',
    bottom: '2%',
  },
  changePhotoTouch: {
    backgroundColor: colors.color8050,
    flexDirection: 'row',
    paddingVertical: '4%',
    paddingHorizontal: '3%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 10,
  },
  changeCoverText: {
    fontSize: RFValue(11),
    fontFamily: fonts.semiBold,
    color: colors.white,
  },
  innerView: {
    marginTop: hp('-2%'),
    backgroundColor: colors.appBackground,
    borderRadius: 20,
    borderTopWidth: 1,
    borderColor: colors.colorD9,
  },
  inputMainView: {
    marginHorizontal: 20,
    marginTop: '1%',
  },
  profileLoader: {
    marginTop: hp('5%')

  }
});
