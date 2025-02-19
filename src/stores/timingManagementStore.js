import {action, computed, decorate, observable, runInAction} from 'mobx';
import {agent} from '../api/agents';
import {useToast} from '../halpers/useToast';
import {rootStore} from './rootStore';

export default class TimingManagementStore {
  addRestaurantTimings = async (
    data,
    appUser,
    activeTab,
    onRefresh,
    handleLoading,
    handelSaveButton,
    dayAll,
    otherday,
  ) => {
    handleLoading(true);
    //    let otherDays = {};
    // if (activeTab) {
    //    data?.forEach((item, index) => {
    //     otherDays[index + 1] = item; // Dynamically set keys
    //   });
    // }

    const timingData = {
      is_all_day: !activeTab,
      all_days: !activeTab
        ? {outlet_status: true, timings: data}
        : {outlet_status: true, timings: dayAll},
      specified: activeTab ? data : otherday,
    };

    let requestData = {
      restaurant_id: appUser?.restaurant?._id,
      timings: timingData,
    };

    console.log(
      'requestData--addRestaurantTimings',
      requestData,
      data,
      dayAll,
      otherday,
    );
    // handleLoading(false);
    // return
    try {
      const res = await agent.addRestaurantTimings(requestData);
      console.log('addRestaurantTimings API Res:', res);
      if (res?.statusCode == 200) {
        handleLoading(false);
        useToast(res.message, 1);
        await rootStore.commonStore.setAppUser(res?.data ?? appUser);
        onRefresh();
        handelSaveButton();
      } else {
        const message = res?.message ? res?.message : res?.data?.message;
        useToast(message, 0);
      }
      // handelSaveButton();
      handleLoading(false);
    } catch (error) {
      console.log('error:addRestaurantTimings', error);
      handleLoading(false);
      // handelSaveButton();
      const m = error?.data?.message
        ? error?.data?.message
        : 'Something went wrong';
      useToast(m, 0);
    }
  };

  deleteRestaurantTimings = async (
    item,
    index,
    appUser,
    activeTab,
    handleLoading,
    onRefresh,
  ) => {
    handleLoading(true);
    let requestData = {
      restaurant_id: appUser?.restaurant?._id,
      is_all_day: !activeTab,
      day_of_week: item?.days_of_week,
      index: index,
    };

    console.log('requestData--deleteRestaurantTimings', requestData, item);
    // handleLoading(false);
    // return
    try {
      const res = await agent.deleteRestaurantTimings(requestData);
      console.log('deleteRestaurantTimings API Res:', res);
      if (res?.statusCode == 200) {
        handleLoading(false);
        useToast(res.message, 1);
        await rootStore.commonStore.setAppUser(res?.data ?? appUser);
        onRefresh();
      } else {
        const message = res?.message ? res?.message : res?.data?.message;
        useToast(message, 0);
      }
      handleLoading(false);
    } catch (error) {
      console.log('error:deleteRestaurantTimings', error);
      handleLoading(false);
      const m = error?.data?.message
        ? error?.data?.message
        : 'Something went wrong';
      useToast(m, 0);
    }
  };

  updateRestaurantTimings = async (
    item,
    index,
    appUser,
    activeTab,
    onRefresh,
    handleLoading,
    onSuccess,
  ) => {
    handleLoading(true);
    let requestData = {
      restaurant_id: appUser?.restaurant?._id,
      is_all_day: !activeTab,
      day_of_week: item?.days_of_week,
      index: index,
      item: item,
    };

    console.log('requestData--updateRestaurantTimings', requestData, item);
    // handleLoading(false);
    // return
    try {
      const res = await agent.updateRestaurantTimings(requestData);
      console.log('updateRestaurantTimings API Res:', res);
      if (res?.statusCode == 200) {
        handleLoading(false);
        useToast(res.message, 1);
        await rootStore.commonStore.setAppUser(res?.data ?? appUser);
        onRefresh();
      } else {
        const message = res?.message ? res?.message : res?.data?.message;
        useToast(message, 0);
      }
      onSuccess();
      handleLoading(false);
    } catch (error) {
      console.log('error:updateRestaurantTimings', error);
      handleLoading(false);
      onSuccess();
      const m = error?.data?.message
        ? error?.data?.message
        : 'Something went wrong';
      useToast(m, 0);
    }
  };

  restaurantUpdateoOutletStatus = async (
    appUser,
    item,
    activeDay,
    onRefresh,
    handleToggleUpadteLoading,
  ) => {
    handleToggleUpadteLoading(true);
    let requestData = {
      restaurant_id: appUser?.restaurant?._id,
      day: activeDay,
      status: item,
    };

    console.log(
      'requestData--restaurantUpdateoOutletStatus',
      requestData,
      item,
      activeDay,
    );
    // handleToggleUpadteLoading(false);
    // return
    try {
      const res = await agent.restaurantUpdateoOutletStatus(requestData);
      console.log('restaurantUpdateoOutletStatus API Res:', res);
      if (res?.statusCode == 200) {
        useToast(res.message, 1);
        await rootStore.commonStore.setAppUser(res?.data ?? appUser);
        onRefresh();
      } else {
        const message = res?.message ? res?.message : res?.data?.message;
        useToast(message, 0);
      }
      handleToggleUpadteLoading(false);
    } catch (error) {
      console.log('error:restaurantUpdateoOutletStatus', error);
      handleToggleUpadteLoading(false);
      const m = error?.data?.message
        ? error?.data?.message
        : 'Something went wrong';
      useToast(m, 0);
    }
  };
  
}
