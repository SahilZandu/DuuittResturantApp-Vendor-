import { action, computed, decorate, observable, runInAction } from 'mobx';
import { agent } from '../api/agents';
import { useToast } from '../halpers/useToast';

export default class MenuStore {
  menuItems = [];
  menuGroups = [];
  groupAddedData = [];
  allDishItem = [];


  getMenuItems = async (appUser, handleLoading) => {
    let requestData = {
      restaurant_id: appUser?.restaurant?._id,
    };
    try {
      const res = await agent.getMenuItem(requestData);
      console.log('getMenuItems API Res:', res);
      if (res?.statusCode == 200) {
        handleLoading(false);
        res?.data ? (this.menuItems = res?.data) : (this.menuItems = []);
        return res?.data;
      } else {
        handleLoading(false);
        this.menuItems = [];
        return [];
      }
    } catch (error) {
      console.log('error:', error);
      handleLoading(false);
      return [];
    }
  };

  addProduct = async (values, appUser, handleLoading, navigation) => {
    handleLoading(true);

    var request = new FormData();
    request.append('image', {
      uri: values?.image,
      name: 'menu.png',
      type: 'image/png',
    });
    request.append('name', values?.dishName);
    request.append('restaurant_id', appUser?.restaurant?._id);
    request.append('tag', values?.tag);
    request.append('veg_nonveg', values?.itemType);
    request.append('dish_category_id', values?.dishType);
    request.append('status', true);
    request.append('in_stock', true);
    request.append('selling_price', Number(values?.sellingPrice));
    request.append('base_price', Number(values?.sellingPrice));
    request.append('recomended', values?.recommended == 1 ? true : false);
    request.append('description', values?.description);
    request.append('product_timing', values?.time);
    request.append('product_type', values?.productType);

    request.append('variants', JSON.stringify([]));
    request.append('combinations', JSON.stringify([]));

    if (values?.addons?.length > 0) {
      request.append('addon', JSON.stringify(values?.addons));
    } else {
      request.append('addon', JSON.stringify([]));
    }


    console.log('request Data addProduct:-', request, values);

    // handleLoading(false);
    // return;

    try {
      const res = await agent.addProduct(request);
      console.log('addProduct API Res:', res);
      if (res?.statusCode == 200) {
        useToast(res.message, 1);
        navigation.goBack();
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

  updateProduct = async (values, appUser, handleLoading, navigation) => {
    handleLoading(true);
    var request = new FormData();
    request.append('image', {
      uri: values?.image,
      name: 'menu.png',
      type: 'image/png',
    });
    request.append('name', values?.dishName);
    request.append('restaurant_id', appUser?.restaurant?._id);
    request.append('tag', values?.tag);
    request.append('veg_nonveg', values?.itemType);
    request.append('status', values?.status);
    request.append('in_stock', values?.inStock);
    request.append('selling_price', Number(values?.sellingPrice));
    request.append('base_price', Number(values?.sellingPrice));
    request.append('recomended', values?.recommended == 1 ? true : false);
    request.append('description', values?.description);
    request.append('dish_item_id', values?.foodItemId);
    request.append('product_timing', values?.time);
    request.append('product_type', values?.variants?.length > 0 ? "variable" : 'simple' ?? values?.productType);
    request.append('dish_category_id', values?.dishType);

    request.append('variants', JSON.stringify([]));
    request.append('combinations', JSON.stringify([]));
    if (values?.addons?.length > 0) {
      request.append('addon', JSON.stringify(values?.addons));
    } else {
      request.append('addon', JSON.stringify([]));
    }

    console.log('request Data updateProduct:-', request, values);

    // handleLoading(false);
    // return;

    try {
      const res = await agent.updateFoodItem(request);
      console.log('updateProduct API Res:', res);
      if (res?.statusCode == 200) {
        useToast(res.message, 1);
        navigation.goBack();
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

  addProductWithVariants = async (
    values,
    combination,
    appUser,
    navigation,
    handleLoading,
  ) => {
    console.log(
      'addProductWithVariants data coming.. ',
      values,
      combination,
      appUser,
      navigation,
      handleLoading,
    );
    handleLoading(true);
    var request = new FormData();
    request.append('image', {
      uri: values?.image,
      name: 'menu.png',
      type: 'image/png',
    });
    request.append('name', values?.dishName);
    request.append('restaurant_id', appUser?.restaurant?._id);
    request.append('tag', values?.tag);
    request.append('veg_nonveg', values?.itemType);
    request.append('status', values?.status ?? true);
    request.append('in_stock', values?.inStock ?? true);
    request.append('selling_price', Number(values?.sellingPrice));
    request.append('base_price', Number(values?.sellingPrice));
    request.append('recomended', values?.recommended == 1 ? true : false);
    request.append('description', values?.description);
    request.append('product_timing', values?.time);
    request.append('product_type', values?.variants?.length > 0 ? "variable" : values?.productType);
    request.append('dish_category_id', values?.dishType);
    if (values?.foodItemId?.length > 0) {
      request.append('dish_item_id', values?.foodItemId);
    }
    // if (addProductListobject) {
    //   request.append(
    //     'variants',
    //     JSON.stringify(addProductListobject),
    //   );
    // }
    if (values?.variants?.length > 0) {
      request.append('variants', JSON.stringify(values?.variants));
    }

    // Only append combinations if it is not null or undefined
    if (combination) {
      request.append('combinations', JSON.stringify(combination));
    }
    if (values?.addons?.length > 0) {
      request.append('addon', JSON.stringify(values?.addons));
    } else {
      request.append('addon', JSON.stringify([]));
    }

    if (values?.timing?.length > 0) {
      request.append('partial_product_timings', JSON.stringify(values?.timing));
    }

    console.log('addProductWithVariants request', request);

    try {
      const res = await agent.addProduct(request);
      console.log('addProductWithVariants res : ', res);
      if (res?.statusCode == 200) {
        useToast(res?.message, 1);
        navigation.navigate('tab1');
      } else {
        const message = res?.message ? res?.message : res?.data?.message;
        useToast(message, 0);
      }
      handleLoading(false);
    } catch (error) {
      handleLoading(false);
      console.log('addProductWithVariants erorr:', error);
      useToast('Something wrong please try again leter!.', 0);
    }
  };

  updateProductWithVariants = async (
    values,
    combination,
    appUser,
    navigation,
    handleLoading,
  ) => {
    console.log(
      'updateProductWithVariants data coming.. ',
      values,
      combination,
      appUser,
      navigation,
      handleLoading,
    );
    handleLoading(true);
    var request = new FormData();
    request.append('image', {
      uri: values?.image,
      name: 'menu.png',
      type: 'image/png',
    });
    request.append('name', values?.dishName);
    request.append('restaurant_id', appUser?.restaurant?._id);
    request.append('tag', values?.tag);
    request.append('veg_nonveg', values?.itemType);
    request.append('status', values?.status ?? true);
    request.append('in_stock', values?.inStock ?? true);
    request.append('selling_price', Number(values?.sellingPrice));
    request.append('base_price', Number(values?.sellingPrice));
    request.append('recomended', values?.recommended == 1 ? true : false);
    request.append('description', values?.description);
    request.append('product_timing', values?.time);
    request.append('product_type', values?.variants?.length > 0 ? "variable" : values?.productType);
    request.append('dish_category_id', values?.dishType);
    if (values?.foodItemId?.length > 0) {
      request.append('dish_item_id', values?.foodItemId);
    }
    if (values?.variants?.length > 0) {
      request.append('variants', JSON.stringify(values?.variants));
    } else {
      request.append('variants', JSON.stringify([]));
    }
    // Only append combinations if it is not null or undefined
    if (combination?.length > 0) {
      request.append('combinations', JSON.stringify(combination));
    } else {
      request.append('combinations', JSON.stringify([]));
    }

    if (values?.addons?.length > 0) {
      request.append('addon', JSON.stringify(values?.addons));
    } else {
      request.append('addon', JSON.stringify([]));
    }

    if (values?.timing?.length > 0) {
      request.append('partial_product_timings', JSON.stringify(values?.timing));
    }

    console.log('update ProductWithVariants request', request);

    try {
      const res = await agent.updateFoodItem(request);
      console.log('update ProductWithVariants res : ', res);
      if (res?.statusCode == 200) {
        useToast(res?.message, 1);
        navigation.navigate('tab1');
      } else {
        const message = res?.message ? res?.message : res?.data?.message;
        useToast(message, 0);
      }
      handleLoading(false);
    } catch (error) {
      handleLoading(false);
      console.log('update ProductWithVariants erorr:', error);
      useToast('Something wrong please try again leter!.', 0);
    }
  };

  deleteFoodItem = async (
    appUser,
    item,
    index,
    handleLoading,
    onSuccessMenuDelete,
  ) => {
    let requestData = {
      restaurant_id: appUser?.restaurant?._id,
      dish_item_id: item?._id,
    };
    console.log('requestData--deleteFoodItem', requestData);
    try {
      const res = await agent.deleteFoodItem(requestData);
      console.log('deleteFoodItem API Res:', res);
      if (res?.statusCode == 200) {
        handleLoading(false);
        useToast(res.message, 1);
        onSuccessMenuDelete();
      } else {
        const message = res?.message ? res?.message : res?.data?.message;
        useToast(message, 0);
        onSuccessMenuDelete();
      }
      handleLoading(false);
    } catch (error) {
      console.log('error:', error);
      handleLoading(false);
      onSuccessMenuDelete();
      const m = error?.data?.message
        ? error?.data?.message
        : 'Something went wrong';
      useToast(m, 0);
    }
  };

  updateStatusMenuItem = async (data, status, appUser, handleLoading) => {
    handleLoading(true);
    let requestData = {
      restaurant_id: appUser?.restaurant?._id,
      food_item_id: data?._id,
      in_stock: status,
    };

    console.log('requestData--updateStatusMenuGroup', requestData);
    // handleLoading(false);
    // return
    try {
      const res = await agent.updateStatusMenuItem(requestData);
      console.log('updateStatusMenuGroup API Res:', res);
      if (res?.statusCode == 200) {
        useToast(res.message, 1);
        handleLoading(false);
        return res;
      } else {
        const message = res?.message ? res?.message : res?.data?.message;
        useToast(message, 0);
        handleLoading(false);
        return [];
      }
    } catch (error) {
      console.log('error:', error);
      handleLoading(false);
      const m = error?.data?.message
        ? error?.data?.message
        : 'Something went wrong';
      useToast(m, 0);
      return [];
    }
  };

  getMenuGroup = async (appUser, handleLoading) => {
    let requestData = {
      restaurant_id: appUser?.restaurant?._id,
    };
    try {
      const res = await agent.getMenuGroup(requestData);
      console.log('getMenuGroup API Res:', res);
      if (res?.statusCode == 200) {
        handleLoading(false);
        res?.data ? (this.menuGroups = res?.data) : (this.menuGroups = []);
        return res?.data;
      } else {
        handleLoading(false);
        this.menuGroups = [];
        return [];
      }
    } catch (error) {
      console.log('error:', error);
      handleLoading(false);
      return [];
    }
  };

  addMenuGroup = async (
    seacrh,
    groupActive,
    appUser,
    handleLoading,
    navigation,
  ) => {
    handleLoading(true);
    let requestData = {
      restaurant_id: appUser?.restaurant?._id,
      name: seacrh,
      status: groupActive,
    };

    console.log('requestData--addMenuGroup', requestData);
    // handleLoading(false);
    // return
    try {
      const res = await agent.addMenuGroup(requestData);
      console.log('addMenuGroup API Res:', res);
      if (res?.statusCode == 200) {
        useToast(res.message, 1);
        navigation.goBack();
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

  deleteGroupItem = async (
    appUser,
    item,
    index,
    handleLoading,
    onSuccessGroupDelete,
  ) => {
    let requestData = {
      restaurant_id: appUser?.restaurant?._id,
      category_id: item?._id,
    };
    try {
      const res = await agent.deleteMenuGroup(requestData);
      console.log('deleteGroupItem API Res:', res);
      if (res?.statusCode == 200) {
        handleLoading(false);
        useToast(res?.message, 1);
        onSuccessGroupDelete();
      } else {
        const message = res?.message ? res?.message : res?.data?.message;
        useToast(message, 0);
        onSuccessGroupDelete();
      }
      handleLoading(false);
    } catch (error) {
      console.log('error:', error);
      handleLoading(false);
      onSuccessGroupDelete();
      const m = error?.data?.message
        ? error?.data?.message
        : 'Something went wrong';
      useToast(m, 0);
    }
  };

  updateMenuGroup = async (
    seacrh,
    data,
    groupActive,
    appUser,
    handleLoading,
    navigation,
  ) => {
    handleLoading(true);

    let requestData = {
      restaurant_id: appUser?.restaurant?._id,
      name: seacrh,
      category_id: data?._id,
      status: groupActive,
    };

    console.log('requestData--updateMenuGroup', requestData);
    // handleLoading(false);
    // return
    try {
      const res = await agent.updateMenuGroup(requestData);
      console.log('updateMenuGroup API Res:', res);
      if (res?.statusCode == 200) {
        useToast(res.message, 1);
        navigation.goBack();
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

  updateStatusMenuGroup = async (data, groupActive, appUser, handleLoading) => {
    handleLoading(true);
    let requestData = {
      restaurant_id: appUser?.restaurant?._id,
      category_id: data?._id,
      status: groupActive,
    };

    console.log('requestData--updateStatusMenuGroup', requestData);
    // handleLoading(false);
    // return
    try {
      const res = await agent.updateStatusMenuGroup(requestData);
      console.log('updateStatusMenuGroup API Res:', res);
      if (res?.statusCode == 200) {
        useToast(res.message, 1);
        handleLoading(false);
        return res;
      } else {
        const message = res?.message ? res?.message : res?.data?.message;
        useToast(message, 0);
        handleLoading(false);
        return [];
      }
    } catch (error) {
      console.log('error:', error);
      handleLoading(false);
      const m = error?.data?.message
        ? error?.data?.message
        : 'Something went wrong';
      useToast(m, 0);
      return [];
    }
  };

  getFoodItemOfGroup = async (data, appUser, handleLoading) => {
    let requestData = {
      restaurant_id: appUser?.restaurant?._id,
      category_id: data?._id,
    };
    try {
      const res = await agent.getFoodItemOfGroup(requestData);
      console.log('getFoodItemOfGroup API Res:', res);
      if (res?.statusCode == 200) {
        handleLoading(false);
        res?.data
          ? (this.groupAddedData = res?.data?.fooditems)
          : (this.groupAddedData = []);
        return res?.data?.fooditems;
      } else {
        handleLoading(false);
        this.groupAddedData = [];
        return [];
      }
    } catch (error) {
      console.log('error:getFoodItemOfGroup', error);
      handleLoading(false);
      return [];
    }
  };

  addGroupFoodItem = async (
    appUser,
    data,
    foodItemArray,
    handleLoading,
    navigation,
  ) => {
    handleLoading(true);
    let requestData = {
      restaurant_id: appUser?.restaurant?._id,
      category_id: data?._id,
      dish_item_id: foodItemArray,
      // food_item_id: foodItemArray,
    };
    console.log('requestData---', requestData);

    try {
      const res = await agent.addGroupFoodItem(requestData);
      console.log('addGroupFoodItem API Res:', res);
      if (res?.statusCode == 200) {
        useToast(res?.message, 1);
        navigation.goBack();
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

  categoryItemDelete = async (
    appUser,
    data,
    item,
    handleLoading,
    onSuccess,
  ) => {
    let requestData = {
      restaurant_id: appUser?.restaurant?._id,
      food_item_id: item?._id,
      category_id: data?._id,
    };
    console.log('categoryItemDelete--', requestData, data, item, appUser);
    try {
      const res = await agent.categoryItemDelete(requestData);
      console.log('categoryItemDelete API Res:', res);
      if (res?.statusCode == 200) {
        handleLoading(false);
        useToast(res?.message, 1);
      } else {
        const message = res?.message ? res?.message : res?.data?.message;
        useToast(message, 0);
      }
      onSuccess();
      handleLoading(false);
    } catch (error) {
      console.log('error:categoryItemDelete', error);
      handleLoading(false);
      onSuccess();
      const m = error?.data?.message
        ? error?.data?.message
        : 'Something went wrong';
      useToast(m, 0);
    }
  };


  categoryGroupItemDelete = async (
    appUser,
    data,
    item,
    index,
    handleLoading,
    onSuccess,
  ) => {
    let requestData = {
      restaurant_id: appUser?.restaurant?._id,
      category_id: data?._id,
      dish_item_id: item?._id,
      // food_item_id: item?._id,
      // index: index

    };
    console.log('categoryGroupItemDelete--', requestData, data, item, appUser, index);
    try {
      const res = await agent.categoryGroupItemDelete(requestData);
      console.log('categoryGroupItemDelete API Res:', res);
      if (res?.statusCode == 200) {
        handleLoading(false);
        useToast(res?.message, 1);
      } else {
        const message = res?.message ? res?.message : res?.data?.message;
        useToast(message, 0);
      }
      onSuccess();
      handleLoading(false);
    } catch (error) {
      console.log('error:categoryGroupItemDelete', error);
      handleLoading(false);
      onSuccess();
      const m = error?.data?.message
        ? error?.data?.message
        : 'Something went wrong';
      useToast(m, 0);
    }
  };

  getAllDishItem = async (appUser, handleLoading) => {
    let requestData = {
      // restaurant_id: appUser?.restaurant?._id,
    };
    console.log('getAllDishItem requestData -- ', requestData);
    try {
      const res = await agent.allDishItem(requestData);
      console.log('getAllDishItem API Res:', res);
      if (res?.statusCode == 200) {
        handleLoading(false);
        res?.data ? (this.allDishItem = res?.data) : (this.allDishItem = []);
        return res?.data;
      } else {
        handleLoading(false);
        this.allDishItem = [];
        return [];
      }
    } catch (error) {
      console.log('error:getAllDishItem', error);
      handleLoading(false);
      return [];
    }
  };

  setAllDishItem = async (data) => {
    this.allDishItem = data ?? [];
  }
}
