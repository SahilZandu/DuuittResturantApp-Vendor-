import {colors} from '../theme/colors';

const primaryScreens = ['splash'];

const authScreens = ['login','register', 'forgotPass', 'setPass', 'verifyOtp', 'test'];

const DashbordScreens = [
  'home',
  'tab1',
  'tab2',
  'tab3',
  'tab4',
  'newOrder',
  'orderDetails',
  'addItems',
  'feedback',
  'help',
  'orderHistory',
  'orderHistoryDetails',
  'updatePassword',
  'manageProfile',
  'customerSupport',
  'notification',
  'teamMembers',
  'addEditTeamMembers',
  'kycDocuments',
  'bankDetails',
  'fssaiDetails',
  'gstDetails',
  'panCardDetails',
  'requestHistory',
  'profile',
  'restaurantTime',
  'reports',
  'addMemuRequest',
  'addVariantPrice',
];

export function setBarColor(screen) {
  if (primaryScreens.includes(screen)) {
    return colors.main;
  } else if (authScreens?.includes(screen)) {
    return colors.appBackground;
  } else if (DashbordScreens?.includes(screen)) {
    return colors.appBackground;
  } else {
    return colors.appBackground;
  }
}

export function setStatusBar(screen) {
  if (primaryScreens.includes(screen)) {
    return 'light-content';
  } else if (authScreens?.includes(screen)) {
    return 'dark-content';
  } else if (DashbordScreens?.includes(screen)) {
    return 'dark-content';
  } else {
    return 'dark-content';
  }
}
