import React from 'react';
import { rootStore } from "../stores/rootStore";

const Assign_Permissions = [
  { active: 1, name: 'Full Access' },
  { active: 1, name: 'Menu Management' },
  { active: 1, name: 'Menu Item in-stock / out of stock' },
  { active: 0, name: 'Store Online / Offline' },
  { active: 1, name: 'Manage Team members' },
  { active: 1, name: 'Payments' },
  { active: 1, name: 'Orders Management (Accept / Decline)' },
  { active: 0, name: 'Orders Management (Status update once accepted)' },
  { active: 1, name: 'Order History' },
  { active: 1, name: 'Offers' },
  { active: 1, name: 'Business Profile update' },
  {
    active: 1,
    name: 'Settings (feedback, FSSAI document, bank details, time management etc.)',
  },
];


const AppPermissionCheck = (screen, callback) => {
  if (screen === 'FullAccess' && Assign_Permissions[0]?.active === 1) {
    return callback('FullAppAccess');
  } else {
    if (screen === 'MenuManagement') {
      if (
        Assign_Permissions[1]?.active === 1 &&
        Assign_Permissions[2]?.active === 1
      ) {
        return callback('FullMenuAccess');
      } else if (Assign_Permissions[1]?.active === 1) {
        return callback('MenuAccess');
      } else if (Assign_Permissions[2]?.active === 1) {
        return callback('MenuStock');
      } else {
        return callback('NoAccess');
      }
    } else if (screen === 'stockOnOff') {
      if (Assign_Permissions[3]?.active === 1) {
        return callback('StockOnOffAccess');
      } else {
        return callback('NoAccess');
      }
    } else if (screen === 'ManageTeamMember') {
      if (Assign_Permissions[4]?.active === 1) {
        return callback('TeamMemberAccess');
      } else {
        return callback('NoAccess');
      }
    } else if (screen === 'Payment') {
      if (Assign_Permissions[5]?.active === 1) {
        return callback('PaymentAccess');
      } else {
        return callback('NoAccess');
      }
    } else if (screen === 'OrderAcceptDecline') {
      if (Assign_Permissions[6]?.active === 1) {
        return callback('OrderAcceptDeclineAccess');
      } else {
        return callback('NoAccess');
      }
    } else if (screen === 'OrderStatusUpdate') {
      if (Assign_Permissions[7]?.active === 1) {
        return callback('OrderStatusUpdateAccess');
      } else {
        return callback('NoAccess');
      }
    } else if (screen === 'OrderHistory') {
      if (Assign_Permissions[8]?.active === 1) {
        return callback('OrderHistoryAccess');
      } else {
        return callback('NoAccess');
      }
    } else if (screen === 'Offers') {
      if (Assign_Permissions[9]?.active === 1) {
        return callback('OffersAccess');
      } else {
        return callback('NoAccess');
      }
    } else if (screen === 'BusinessProfile') {
      if (Assign_Permissions[10]?.active === 1) {
        return callback('BusinessProfileAccess');
      } else {
        return callback('NoAccess');
      }
    } else if (screen === 'Setting') {
      if (Assign_Permissions[11]?.active === 1) {
        return callback('SettingAccess');
      } else {
        return callback('NoAccess');
      }
    } else {
      return callback('NoAccess');
    }
  }
};



const permissions = [
  {
    "active": true,
    "id": 1,
    "name": "Menu Management"
  },
  {
    "active": true,
    "id": 2,
    "name": "Menu Item in-stock / out of stock"
  },
  {
    "active": true,
    "id": 3,
    "name": "Store Online / Offline"
  },
  {
    "active": true,
    "id": 4,
    "name": "Manage Team members"
  },
  {
    "active": true,
    "id": 5,
    "name": "Payments"
  },
  {
    "active": true,
    "id": 6,
    "name": "Orders Management (Accept / Decline)"
  },
  {
    "active": true,
    "id": 7,
    "name": "Orders Management (Status update once accepted)"
  },
  {
    "active": true,
    "id": 8,
    "name": "Order History"
  },
  {
    "active": true,
    "id": 9,
    "name": "Offers"
  },
  {
    "active": true,
    "id": 10,
    "name": "Business Profile update"
  },
  {
    "active": true,
    "id": 11,
    "name": "Settings (feedback, FSSAI document, bank details, time management etc.)"
  },
  {
    "active": true,
    "id": 12,
    "name": "Product Management"
  }
];


const isScreenAccess = id => {
  const { appUser } = rootStore.commonStore;
  if (appUser?.role === 'vendor' || appUser?.role === 'manager') {
    return true;
  } else {
    if (appUser?.permissions?.length > 0) {
      const isResult = appUser?.permissions?.find(
        value => value?.id === id,
      );
      console.log("isResult++++++======", isResult)
      if (isResult) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
};

export { isScreenAccess, AppPermissionCheck };
