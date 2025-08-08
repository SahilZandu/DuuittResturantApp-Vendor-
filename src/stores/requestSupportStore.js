import { action, computed, decorate, observable, runInAction } from 'mobx';
import { agent } from '../api/agents';
import { useToast } from '../halpers/useToast';
import { rootStore } from './rootStore';
import { getUniqueId } from 'react-native-device-info';

export default class RequestSupportStore {
  requestHistData = [];

  getAdminRequestsAll = async (appUser, handleLoading) => {
    let requestData = {
      vendor_id: appUser?.role === "vendor" ? appUser?._id : appUser?.vendor?._id,
    };
    console.log('requestData--getAdminRequestsAll', requestData);
    // return
    try {
      const res = await agent.adminRequestsAll(requestData);
      console.log('getAdminRequestsAll API Res:', res);
      if (res?.statusCode == 200) {
        handleLoading(false);
        res?.data
          ? (this.requestHistData = res?.data)
          : (this.requestHistData = []);
        return res?.data;
      } else {
        handleLoading(false);
        this.requestHistData = [];
        return [];
      }
    } catch (error) {
      console.log('error:getAdminRequestsAll', error);
      handleLoading(false);
      return [];
    }
  };

  adminRequestsDelete = async (item, handleLoading) => {
    let requestData = {
      request_id: item?._id,
    };
    console.log('requestData--adminRequestsDelete', requestData);
    // handleLoading(false)
    // return
    try {
      const res = await agent.adminRequestsDelete(requestData);
      console.log('adminRequestsDelete API Res:', res);
      if (res?.statusCode == 200) {
        useToast(res.message, 1);
      } else {
        const message = res?.message ? res?.message : res?.data?.message;
        useToast(message, 0);
      }
      handleLoading(false);
    } catch (error) {
      console.log('error:adminRequestsDelete', error);
      handleLoading(false);
      const m = error?.data?.message
        ? error?.data?.message
        : 'Something went wrong';
      useToast(m, 0);
    }
  };

  getAdminInfo = async handleLoading => {
    try {
      const res = await agent.adminInfo();
      console.log('getAdminInfo API Res:', res);
      if (res?.statusCode == 200) {
        handleLoading(false);
        return res?.data;
      } else {
        handleLoading(false);
        return [];
      }
    } catch (error) {
      console.log('error:getAdminInfo', error);
      handleLoading(false);
      return [];
    }
  };

  getSupportInfo = async handleLoading => {
    try {
      const res = await agent.supportInfo();
      console.log('getSupportInfo API Res:', res);
      if (res?.statusCode == 200) {
        handleLoading(false);
        return res?.data;
      } else {
        handleLoading(false);
        return [];
      }
    } catch (error) {
      console.log('error:getSupportInfo', error);
      handleLoading(false);
      return [];
    }
  };


  getReqHistorybyFilters = async type => {
    const reqHistroy = this.requestHistData;

    if (type == 'all') {
      return this.requestHistData;
    } else if (type == 'approved') {
      const filterList = reqHistroy?.filter(element =>
        element?.status?.includes('approved'),
      );
      return filterList;
    } else if (type == 'pending') {
      const filterList = reqHistroy?.filter(element =>
        element?.status?.includes('pending'),
      );
      return filterList;
    } else if (type == 'declined') {
      const filterList = reqHistroy?.filter(element =>
        element?.status?.includes('declined'),
      );
      return filterList;
    } else {
      const filterList = reqHistroy?.filter(element =>
        element?.status?.includes(type?.toLowerCase()),
      );
      return filterList;
    }
  };

  restaurantMenuExtraAssets = async (
    imageArray,
    extraImage,
    remark,
    appUser,
    handleLoading,
    isSucess,
  ) => {
    handleLoading(true);
    var request = new FormData();

    await imageArray?.map((item, id) => {
      if (item?.uri?.startsWith('file')) {
        request.append('files', {
          uri: item?.uri,
          name: item?.fileName,
          type: item?.type,
        });
      }
    });

    await extraImage?.map((item, id) => {
      if (item?.uri?.startsWith('file')) {
        request.append('files', {
          uri: item?.uri,
          name: item?.fileName,
          type: item?.type,
        });
      }
    });

    request.append('restaurant_id', appUser?.restaurant?._id);
    request.append('remarks', remark);

    console.log(
      'request Data restaurantMenuExtraAssets:-',
      request,
      remark,
      imageArray,
    );

    // handleLoading(false);
    // return;

    try {
      const res = await agent.restaurantMenuExtraAssets(request);
      console.log('restaurantMenuExtraAssets API Res:', res);
      if (res?.statusCode == 200) {
        useToast(res.message, 1);
        isSucess();
      } else {
        const message = res?.message ? res?.message : res?.data?.message;
        useToast(message, 0);
      }
      handleLoading(false);
    } catch (error) {
      console.log('error:restaurantMenuExtraAssets', error);
      handleLoading(false);
      const m = error?.data?.message
        ? error?.data?.message
        : 'Something went wrong';
      useToast(m, 0);
    }
  };



  vendorManageProfile = async (values, handleLoading, isSuccess) => {
    let requestData = {
      // first_name:values?.firstName,
      // last_name:values?.lastName,
      // name: (values?.firstName || '') + ' ' + (values?.lastName || ''),
      name: values?.name,
      email: values?.email,
      phone: Number(values?.mobile)
    };
    console.log('requestData--vendorManageProfile', requestData);
    // handleLoading(false)
    // return
    try {
      const res = await agent.vendorManageProfile(requestData);
      console.log('vendorManageProfile API Res:', res);
      if (res?.statusCode == 200) {
        useToast(res?.message, 1);
        await rootStore.commonStore.setAppUser(res?.data ?? appUser);
        isSuccess()
      } else {
        const message = res?.message ? res?.message : res?.data?.message;
        useToast(message, 0);
      }
      handleLoading(false);
    } catch (error) {
      console.log('error:vendorManageProfile', error);
      handleLoading(false);
      const m = error?.data?.message
        ? error?.data?.message
        : 'Something went wrong';
      useToast(m, 0);
    }
  };

  saveVendorFcmToken = async (appUser, fcmToken) => {
    const deviceId = await getUniqueId();
    let requestData = {
      vendor_id: appUser?.role === "vendor" ? appUser?._id : appUser?.vendor?._id,
      device_id: deviceId,
      fcm_token: fcmToken
    };
    console.log('requestData--saveVendorFcmToken', requestData);
    // return
    try {
      const res = await agent.saveVendorFcmToken(requestData);
      console.log('saveVendorFcmToken API Res:', res);
      if (res?.statusCode == 200) {
        // useToast(res?.message, 1);
        await rootStore.commonStore.setAppUser(res?.data ?? appUser);
      } else {
        const message = res?.message ? res?.message : res?.data?.message;
        useToast(message, 0);
      }
    } catch (error) {
      console.log('error:saveVendorFcmToken', error);
      const m = error?.data?.message
        ? error?.data?.message
        : 'Something went wrong';
      useToast(m, 0);
    }
  };



}
