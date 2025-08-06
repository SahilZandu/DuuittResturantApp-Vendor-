import React from 'react';
import BankDetailsShow from '../requestViews/BankDetailsShow';
import PanCardDetailsShow from '../requestViews/PanCardDetailsShow';
import GstDetailsShow from '../requestViews/GstDetailsShow';
import FssaiDetailsShow from '../requestViews/FssaiDetailsShow';
import ProfileDetailsShow from '../requestViews/ProfileDetailsShow';
// import ProductPictureShow from '../requestViews/ProductPictureShow';
// import ProductMenuShow from '../requestViews/ProductMenuShow';
// import MenuDetailsShow from '../requestViews/MenuDetailsShow';
// import AddRestaurantDetailsShow from '../requestViews/AddRestaurantDetailsShow';
// import AddProductItemShow from '../requestViews/AddProductItemShow';

export const RenderDetailsItem = (navigation, item, closeBtnRBSheet) => {
  // console.log('item Render Details Item', item);
  switch (item?.type) {
    case 'restaurant_profile':
      return (
        <ProfileDetailsShow
          item={item}
          navigation={navigation}
          closeSheet={closeBtnRBSheet}
        />
      );

    case 'bank_detail':
      return (
        <BankDetailsShow
          item={item}
          navigation={navigation}
          closeSheet={closeBtnRBSheet}
        />
      );

    case 'pan_detail':
      return (
        <PanCardDetailsShow
          item={item}
          navigation={navigation}
          closeSheet={closeBtnRBSheet}
        />
      );
    case 'gstn_detail':
      return (
        <GstDetailsShow
          item={item}
          navigation={navigation}
          closeSheet={closeBtnRBSheet}
        />
      );
    case 'fssai_detail':
      return (
        <FssaiDetailsShow
          item={item}
          navigation={navigation}
          closeSheet={closeBtnRBSheet}
        />
      );
    //   case  'finance_details_update':
    //     return (<BankDetailsShow item={item} navigation={navigation} closeSheet={closeBtnRBSheet}/>);
    // case 'menu':
    //   return (<MenuDetailsShow item={item} navigation={navigation} closeSheet={closeBtnRBSheet}/>);
    // case 'delete_product':
    //   return (<ProductMenuShow item={item} navigation={navigation} closeSheet={closeBtnRBSheet}/>);
    // case 'product_picture_update':
    //   return (<ProductPictureShow item={item} navigation={navigation} closeSheet={closeBtnRBSheet} />);
    // case 'add_org_request':
    //     return (<AddRestaurantDetailsShow item={item} navigation={navigation} closeSheet={closeBtnRBSheet}/>);
    //     case 'add_product':
    //       return (<AddProductItemShow item={item} navigation={navigation} closeSheet={closeBtnRBSheet}/>)
    default:
      return null;
  }
};
