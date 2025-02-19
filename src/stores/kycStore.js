import {action, computed, decorate, observable, runInAction} from 'mobx';
import {agent} from '../api/agents';
import {useToast} from '../halpers/useToast';
import {rootStore} from './rootStore';

export default class KycStore {
  updateBankDetail = async (values, appUser, handleLoading, isSuccess) => {
    handleLoading(true);

    let bankData = {
      bank_name: values?.name,
      account_number: values?.account,
      ifsc_code: values?.ifsc,
      status: 'pending',
    };

    var request = new FormData();
    request.append('restaurant_id', appUser?.restaurant?._id);
    request.append('key', 'bank_detail');
    request.append('bank_detail', JSON.stringify(bankData));

    console.log('request Data updateKycDetail:-', request, values);

    // handleLoading(false);
    // return;

    try {
      const res = await agent.updateKycDetail(request);
      console.log('updateKycDetail API Res:', res);
      if (res?.statusCode == 200) {
        useToast(res.message, 1);
        await rootStore.commonStore.setAppUser(res?.data ?? appUser);
        isSuccess();
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

  updateFssaiDetail = async (
    values,
    expirydate,
    appUser,
    handleLoading,
    isSuccess,
  ) => {
    handleLoading(true);
    let fssaiData = {
      account_number: values?.number,
      expiration_date: expirydate,
      status: 'pending',
    };
    var request = new FormData();
    request.append('image', {
      uri: values?.file,
      name: 'fssai.png',
      type: 'image/png',
    });
    request.append('restaurant_id', appUser?.restaurant?._id);
    request.append('key', 'fssai_detail');
    request.append('fssai_detail', JSON.stringify(fssaiData));

    console.log('request Data updateFssaiDetail:-', request, values);

    // handleLoading(false);
    // return;

    try {
      const res = await agent.updateKycDetail(request);
      console.log('updateFssaiDetail API Res:', res);
      if (res?.statusCode == 200) {
        useToast(res.message, 1);
        await rootStore.commonStore.setAppUser(res?.data ?? appUser);
        isSuccess();
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

  updateGstDetail = async (
    values,
    expirydate,
    appUser,
    handleLoading,
    isSuccess,
  ) => {
    handleLoading(true);
    let gstData = {
      gstn_number: values?.number,
      expiration_date: expirydate,
      status: 'pending',
    };
    var request = new FormData();
    request.append('image', {
      uri: values?.file,
      name: 'gst.png',
      type: 'image/png',
    });
    request.append('restaurant_id', appUser?.restaurant?._id);
    request.append('key', 'gstn_detail');
    request.append('gstn_detail', JSON.stringify(gstData));

    console.log('request Data updateGstDetail:-', request, values);

    // handleLoading(false);
    // return;

    try {
      const res = await agent.updateKycDetail(request);
      console.log('updateGstDetail API Res:', res);
      if (res?.statusCode == 200) {
        useToast(res.message, 1);
        await rootStore.commonStore.setAppUser(res?.data ?? appUser);
        isSuccess();
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

  updatePanCardDetail = async (values, appUser, handleLoading, isSuccess) => {
    handleLoading(true);
    let panData = {
      pan_number: values?.number,
      status: 'pending',
    };
    var request = new FormData();
    request.append('image', {
      uri: values?.file,
      name: 'panCard.png',
      type: 'image/png',
    });
    request.append('restaurant_id', appUser?.restaurant?._id);
    request.append('key', 'pan_detail');
    request.append('pan_detail', JSON.stringify(panData));

    console.log('request Data updatePanCardDetail:-', request, values);

    // handleLoading(false);
    // return;

    try {
      const res = await agent.updateKycDetail(request);
      console.log('updatePanCardDetail API Res:', res);
      if (res?.statusCode == 200) {
        useToast(res.message, 1);
        await rootStore.commonStore.setAppUser(res?.data ?? appUser);
        isSuccess();
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
}
