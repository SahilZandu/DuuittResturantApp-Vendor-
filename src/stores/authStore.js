import { action, computed, decorate, observable, runInAction } from 'mobx';
import { rootStore } from './rootStore';
import { useToast } from '../halpers/useToast';
import { agent } from '../api/agents';
import RNRestart from 'react-native-restart';

export default class AuthStore {
  login = async (values, type, navigation, handleLoading,onDeactiveAccount) => {
    handleLoading(true);
    let requestData = {};
    if (type == 'Mobile') {
      requestData = {
        phone: Number(values?.mobile),
      };
    } else {
      requestData = {
        email: values?.email,
        password: values?.password,
      };
    }

    console.log('requestData:-', requestData);

    try {
      const res = await agent.login(requestData);
      console.log('Login API Res:', res);
      if (res?.statusCode == 200) {
        navigation.navigate('verifyOtp', { value: values, loginType: type });
        useToast(res.message, 1);
      } else {
        const message = res?.message ? res?.message : res?.data?.message;
        if (message == 'Your account is deactivated') {
          onDeactiveAccount();
        }
        useToast(message, 0);
      }
      handleLoading(false);
    } catch (error) {
      console.log('error:', error);
      if (error?.data?.message == 'Your account is deactivated') {
        onDeactiveAccount();
      }
      handleLoading(false);
      const m = error?.data?.message
        ? error?.data?.message
        : 'Something went wrong';
      useToast(m, 0);
    }
  };

  signUp = async (values, foundingdate, type, navigation, handleLoading) => {
    handleLoading(true);
    let location = { "coordinates": [values?.lng, values?.lat], "type": "Point" }
    let requestData = {
      name: values?.name,
      email: values?.email,
      phone: values?.mobile,
      // date_of_birth: foundingdate,
      date_of_founding: foundingdate,
      gender: values?.gender,
      profile_pic: "",
      restaurant_name: values?.restaurantName,
      password: "Test@123",
      location: location,
      address: values?.address
    };

    console.log('requestData:-signUp', requestData);

    try {
      const res = await agent.signUp(requestData);
      console.log('signUp API Res:', res);
      if (res?.statusCode == 200) {
        navigation.navigate('verifyOtp', { value: values, loginType: type });
        useToast(res.message, 1);
      } else {
        const message = res?.message ? res?.message : res?.data?.message;
        useToast(message, 0);
      }
      handleLoading(false);
    } catch (error) {
      console.log('error:signUp', error);
      handleLoading(false);
      const m = error?.data?.message
        ? error?.data?.message
        : 'Something went wrong';
      useToast(m, 0);
    }
  };

  verifyOtp = async (
    value,
    loginType,
    otp,
    navigation,
    handleLoading,
    onResendClear,
  ) => {
    handleLoading(true);
    let requestData = {};
    if (loginType == 'Mobile') {
      requestData = {
        username: value?.mobile,
        password: value?.mobile,
        phone: value?.mobile,
        otp: Number(otp),
        type: 'vendor',
      };
    } else if (loginType == 'Email') {
      requestData = {
        username: value?.email,
        password: value?.password ? value?.password : value?.email,
        email: value?.email,
        otp: Number(otp),
        type: 'vendor',
      };
    } else {
      requestData = {
        username: value?.email,
        password: value?.password ? value?.password : value?.email,
        email: value?.email,
        otp: Number(otp),
        type: 'vendor',
        api_type: 'update_password',
      };
    }

    console.log('request Data verifyOtp:-', requestData);
    // handleLoading(false);
    // return
    try {
      const res = await agent.verifyOtp(requestData);
      console.log('verifyOtp API Res:', res);

      if (res?.statusCode == 200) {
        useToast(res.message, 1);
        if (loginType == 'forgot') {
          navigation.navigate('setPass', { data: value });
        } else {
          const jwt = res?.data?.access_token;
          await rootStore.commonStore.setToken(jwt);
          await rootStore.commonStore.setAppUser(res?.data);
          navigation.navigate('dashboard', { screen: 'home' });
        }
        onResendClear();
      } else {
        const message = res?.message ? res?.message : res?.data?.message;
        useToast(message, 0);
      }
      handleLoading(false);
    } catch (error) {
      console.log('error:', error);
      handleLoading(false);
      const m = error?.data?.message
        ? error?.data?.message
        : 'Something went wrong';
      useToast(m, 0);
    }
  };

  resendOtp = async (value, loginType, handleTimer, handleLoading) => {
    handleLoading(true);
    let requestData = {};
    if (loginType == 'Mobile') {
      requestData = {
        phone: value?.mobile,
      };
    } else {
      requestData = {
        email: value?.email,
      };
    }

    console.log('request Data resendOtp:-', requestData);
    // return
    try {
      const res = await agent.resendOtp(requestData);
      console.log('resendOtp API Res:', res);
      if (res?.statusCode == 200) {
        useToast(res.message, 1);
      } else {
        const message = res?.message ? res?.message : res?.data?.message;
        useToast(message, 0);
      }
      handleTimer();
      handleLoading(false);
    } catch (error) {
      console.log('error:', error);
      handleLoading(false);
      const m = error?.data?.message
        ? error?.data?.message
        : 'Something went wrong';
      useToast(m, 0);
    }
  };

  forgotPass = async (value, navigation, handleLoading) => {
    handleLoading(true);
    let requestData = {
      email: value?.email,
    };

    console.log('request Data forgotPass:-', requestData);
    // handleLoading(false);
    // return
    try {
      const res = await agent.forgetPass(requestData);
      console.log('forgotPass API Res:', res);
      if (res?.statusCode == 200) {
        useToast(res.message, 1);
        navigation.navigate('verifyOtp', { value: value, loginType: 'forgot' });
      } else {
        const message = res?.message ? res?.message : res?.data?.message;
        useToast(message, 0);
      }
      handleLoading(false);
    } catch (error) {
      console.log('error:', error);
      handleLoading(false);
      const m = error?.data?.message
        ? error?.data?.message
        : 'Something went wrong';
      useToast(m, 0);
    }
  };

  updatePassword = async (data, values, navigation, handleLoading) => {
    handleLoading(true);
    let requestData = {
      confirmPassword: values?.confirm,
      newPassword: values?.password,
      email: data?.email,
    };
    console.log('request Data updatePassword:-', requestData);
    // handleLoading(false)
    // return
    try {
      const res = await agent.updatePassword(requestData);
      console.log('updatePassword API Res:', res);
      if (res?.statusCode == 200) {
        useToast(res?.message, 1);
        navigation.navigate('login');
      } else {
        const message = res?.message ? res?.message : res?.data?.message;
        useToast(message, 0);
      }
      handleLoading(false);
    } catch (error) {
      console.log('error:', error);
      handleLoading(false);
      const m = error?.data?.message
        ? error?.data?.message
        : 'Something went wrong';
      useToast(m, 0);
    }
  };


  changePassword = async (values, navigation, handleLoading) => {
    handleLoading(true);
    let requestData = {
      oldPassword: values?.oldPassword,
      newPassword: values?.password,
      confirmPassword: values?.confirm,
    };
    console.log('request Data changePassword:-', requestData);
    // handleLoading(false)
    // return
    try {
      const res = await agent.changePassword(requestData);
      console.log('changePassword API Res:', res);
      if (res?.statusCode == 200) {
        useToast(res?.message, 1);
        navigation.goBack();
      } else {
        const message = res?.message ? res?.message : res?.data?.message;
        useToast(message, 0);
      }
      handleLoading(false);
    } catch (error) {
      console.log('error:changePassword', error);
      handleLoading(false);
      const m = error?.data?.message
        ? error?.data?.message
        : 'Something went wrong';
      useToast(m, 0);
    }
  };


  // getUser = async () => {
  //   const {setAppUser} = rootStore.commonStore;
  //   try {
  //     const res = await agent.getUser();
  //     console.log('getUser API Res:', res);
  //     if (res?.data?.status == 'success') {
  //       setAppUser(res?.data?.data?.user);
  //       return res?.data?.data?.user;
  //     } else {
  //       setAppUser(null);
  //       return {};
  //     }
  //   } catch (error) {
  //     console.log('error:', error);
  //   }
  // };

  // addDeviceToken = async token => {
  //   const requestData = {
  //     device_token: token,
  //   };

  //   try {
  //     const res = await agent.addDeviceToken(requestData);
  //     console.log('addDeviceToken API Res:', res);
  //   } catch (error) {
  //     console.log('error:', error);
  //   }
  // };

  restaurantProfile = async (
    values,
    updateLogo,
    assetImageArray,
    foundingdate,
    appUser,
    handleLoading,
    isSuccess,
  ) => {
    handleLoading(true);
    var request = new FormData();
    let location = { "coordinates": [values?.lng, values?.lat], "type": "Point" }
    request.append('restaurant_id', appUser?.restaurant?._id);
    request.append('name', values?.restaurantName);
    request.append('about', values?.about);
    request.append('address', values?.address);
    request.append('landmark', values?.landMark);
    request.append('phone', Number(values?.phone));
    request.append('email', values?.email);
    request.append('date_of_founding', foundingdate);
    request.append('veg_non_veg', values?.itemType);
    request.append('minimum_order_value', values?.minimunPrice);
    request.append('is_online', values?.isOnline);
    request.append('minimum_order_preparation_time', values?.prepareTime);
    request.append('location', JSON.stringify(location));
    request.append('gst_percentage', Number(values?.gst_percentage) ?? 0);
    request.append('restaurant_charge', Number(values?.restaurant_charge) ?? 0);


    // request.append('lat', values?.lat?.toString());
    // request.append('lng', values?.lng?.toString());

    if (updateLogo == '') {
      // if (updateLogo == '') {
      console.log('No add image');
      // } else {
      //   request.append('logo', {
      //     uri: getUriCover(),
      //     name: 'image',
      //     type: 'image/jpeg',
      //   });
      // }
    } else {
      request.append('banner', {
        uri: updateLogo,
        name: 'image',
        type: 'image/jpeg',
      });
    }

    // await values?.assetsFixed?.map((item, id) => {
    //   request.append('assets', item);
    // });

    await assetImageArray?.map((item, id) => {
      if (item?.uri?.startsWith('file')) {
        request.append('files', {
          uri: item?.uri,
          name: item?.fileName,
          type: item?.type,
        });
      }
    });

    console.log(
      'request Data restaurantProfile:-',
      request,
      values,
      // updateLogo,
      // assetImageArray,
    );

    // handleLoading(false);
    // return;

    try {
      const res = await agent.restaurantProfile(request);
      console.log('restaurantProfile API Res:', res);
      if (res?.statusCode == 200) {
        useToast(res.message, 1);
        // await rootStore.commonStore.setAppUser(res?.data ?? appUser);
        isSuccess();
      } else {
        const message = res?.message ? res?.message : res?.data?.message;
        useToast(message, 0);
      }
      handleLoading(false);
    } catch (error) {
      console.log('error:restaurantProfile', error);
      handleLoading(false);
      const m = error?.data?.message
        ? error?.data?.message
        : 'Something went wrong';
      useToast(m, 0);
    }
  };



  restaurantOnlineStatus = async (reason, activateSwitch, appUser, handleLoading, onSuccess) => {
    handleLoading(true);
    let requestData = {
      restaurant_id: appUser?.restaurant?._id,
      is_online: activateSwitch,
      reason_to_offline: reason,
    };
    console.log('request Data  restaurantOnlineStatus:-', requestData, appUser);
    // handleLoading(false)
    // return
    try {
      const res = await agent.restaurantOnlineStatus(requestData);
      console.log('restaurantOnlineStatus API Res:', res);
      if (res?.statusCode == 200) {
        useToast(res?.message, 1);
        await rootStore.commonStore.setAppUser(res?.data ?? appUser);
      } else {
        const message = res?.message ? res?.message : res?.data?.message;
        useToast(message, 0);
      }
      handleLoading(false);
      onSuccess();
    } catch (error) {
      console.log('error: restaurantOnlineStatus', error);
      handleLoading(false);
      onSuccess();
      const m = error?.data?.message
        ? error?.data?.message
        : 'Something went wrong';
      useToast(m, 0);
    }
  };


  deleteAssetImage = async (appUser, id) => {
    let requestData = {
      restaurantId: appUser?.restaurant?._id,
      index: id,
    };
    console.log('request Data  deleteAssetImage:-', requestData);
    // return
    try {
      const res = await agent.deleteAssetImage(requestData);
      console.log(' deleteAssetImage API Res:', res);
      if (res?.statusCode == 200) {
        useToast(res?.message, 1);
        await rootStore.commonStore.setAppUser(res?.data ?? appUser);
        return res
      } else {
        const message = res?.message ? res?.message : res?.data?.message;
        useToast(message, 0);
        return []
      }
    } catch (error) {
      console.log('error: deleteAssetImage', error);
      const m = error?.data?.message
        ? error?.data?.message
        : 'Something went wrong';
      useToast(m, 0);
      return res?.data
    }
  };


  userLogout = async (handleLoading, isSuccess, onError) => {
    handleLoading(true)
    try {
      const res = await agent.logout();
      console.log('userLogout Res :', res);
      if (res?.statusCode == 200) {
        useToast(res?.message, 1);
        handleLoading(false);
        isSuccess()
      } else {
        const message = res?.message ? res?.message : res?.data?.message;
        useToast(message, 0);
        handleLoading(false);
        onError()
      }
    } catch (error) {
      console.log('error userLogout:', error);
      handleLoading(false);
      onError()
      const m = error?.data?.message
        ? error?.data?.message
        : 'Something went wrong';
      useToast(m, 0);
      return []
    }
  };


  deleteVendor = async (handleLoading, isSuccess, onError) => {
    handleLoading(true)
    try {
      const res = await agent.deleteVendor();
      console.log('deleteVendor Res :', res);
      if (res?.statusCode == 200) {
        useToast(res?.message, 1);
        handleLoading(false);
        isSuccess()
      } else {
        const message = res?.message ? res?.message : res?.data?.message;
        useToast(message, 0);
        handleLoading(false);
        onError()
      }
    } catch (error) {
      console.log('error deleteVendor:', error);
      handleLoading(false);
      onError()
      const m = error?.data?.message
        ? error?.data?.message
        : 'Something went wrong';
      useToast(m, 0);
    }
  };



  getAppUser = async (appUser) => {
    let requestData = {
      vendor_id: appUser?.role === "vendor" ? appUser?._id : appUser?.vendor?._id
    };
    console.log('getAppUser requestData', requestData);
    try {
      const res = await agent.getAppUser(requestData);
      console.log('getAppUser Res :', res);
      if (res?.statusCode == 200) {
        useToast(res?.message, 1);
        await rootStore.commonStore.setAppUser(res?.data ?? appUser);
        return res?.data
      } else {
        const message = res?.message ? res?.message : res?.data?.message;
        useToast(message, 0);
        return {}
      }
    } catch (error) {
      console.log('error getAppUser:', error);
      const m = error?.data?.message
        ? error?.data?.message
        : 'Something went wrong';
      useToast(m, 0);
      return {}
    }
  };



  logoutWithRestart = async () => {
    // const deviceId = await getUniqueId();
    const { setAppUser, setToken, appUser } = rootStore.commonStore;
    // var request = {
    //   device_id: deviceId,
    // };
    // try {
    //   const res = await agent.logout(request);
    //   console.log('logOut Res : ', res);
    // } catch (error) {
    //   console.log('eror:', error);
    // }
    await setAppUser(null);
    await setToken(null);
    RNRestart.restart();
  };


}
