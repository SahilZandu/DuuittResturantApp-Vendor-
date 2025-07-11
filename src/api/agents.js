import Url from './Url';
import axios from 'axios';
import { rootStore } from '../stores/rootStore';
import RNRestart from 'react-native-restart';
import { Alert } from 'react-native';

const Base_Url = Url.Base_Url;

axios.defaults.baseURL = Base_Url;

axios.interceptors.request.use(
  config => {
    config.timeout = 10000;
    const token = rootStore.commonStore.token;
    console.log("token----", token)
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);


axios.interceptors.response.use(
  response => {
    const statusCode = response?.data?.statusCode;

    console.log('✅ Axios Response:', response, statusCode);

    if (statusCode === 404 || statusCode === 400) {
      return Promise.reject(response); // treat it as an error
    }

    if (statusCode === 401) {
      // rootStore.dashboardStore.saveFcmToken(null)
      // rootStore.commonStore.setToken(null);
      // rootStore.commonStore.setAppUser(null);
      // RNRestart.restart();
      rootStore.authStore.logoutWithRestart();
      return Promise.reject(response);
    }
    if (statusCode === 403) {
      // Alert.alert(
      //   'Alert',
      //   'Your account permissions has been updated. Please login again.',
      //   [
      //     {
      //       text: 'OK',
      //       onPress: () => {
      //         rootStore.authStore.logoutWithRestart();
      //       },
      //     },
      //   ],
      // );
      return Promise.reject(response);
    }

    return response;
  },
  error => {
    console.log('❌ Axios Error:', error);

    if (error.message === 'Network Error' && !error.response) {
      return Promise.reject(error);
    }

    if (error.code === 'ECONNABORTED') {
      return Promise.reject(new Error('Network/Server timeout error'));
    }

    const status = error?.response?.status || error?.statusCode;

    if (status === 404 || status === 400) {
      return Promise.reject(error.response || error);
    }

    if (status === 401) {
      rootStore.authStore.logoutWithRestart();
      return Promise.reject(error.response || error);
    }

    if (status === 403) {
      // Alert.alert(
      //   'Alert',
      //   'Your account permissions has been updated. Please login again.',
      //   [
      //     {
      //       text: 'OK',
      //       onPress: () => {
      //         rootStore.authStore.logoutWithRestart();
      //       },
      //     },
      //   ],
      // );
      return Promise.reject(error.response || error);
    }

    return Promise.reject(error);
  },
);



// axios.interceptors.response.use(undefined, error => {
//   if (error.message === 'Network Error' && !error.response) {
//     throw error;
//   }

//   if (error.code && error.code === 'ECONNABORTED')
//     throw 'Network/Server timeout error';

//   const { status } = error.response;
//   if (status === 404) {
//     throw error.response;
//   }

//   if (status === 400) {
//     console.log(status);
//     throw error.response;
//   }

//   if (status === 401) {
//     rootStore.authStore.logoutWithRestart();
//     throw error.response;
//   }
//   if (status === 403) {
//     Alert.alert(
//       'Alert',
//       'Your account permissions has been updated. Please login again.',
//       [
//         {
//           text: 'OK',
//           onPress: () => {
//             rootStore.authStore.logoutWithRestart();
//           },
//         },
//       ],
//       // {cancelable: false}
//     );
//     throw error.response;
//   }


//   throw error;
// });



const responseBody = response => response.data;

export const agent = {
  login: body => requests.post(Url.login, body),
  verifyOtp: body => requests.post(Url.verifyOtp, body),
  resendOtp: body => requests.post(Url.resendOtp, body),
  forgetPass: body => requests.post(Url.forgetPass, body),
  updatePassword: body => requests.post(Url.updatePassword, body),
  changePassword: body => requests.post(Url.changePassword, body),
  restaurantOnlineStatus: body => requests.post(Url.restaurantOnlineStatus, body),

  addProduct: body => requests.postForm(Url.addProduct, body),
  getMenuItem: body => requests.post(Url.menuItem, body),
  updateFoodItem: body => requests.postForm(Url.updateFoodItem, body),
  deleteFoodItem: body => requests.post(Url.deleteFoodItem, body),
  updateStatusMenuItem: body => requests.post(Url.updateStatusMenuItem, body),
  getMenuGroup: (body) => requests.post(Url.menuGroupItem, body),
  addMenuGroup: body => requests.post(Url.addMenuGroup, body),
  updateMenuGroup: body => requests.post(Url.updateMenuGroup, body),
  deleteMenuGroup: body => requests.post(Url.deleteMenuGroup, body),
  updateStatusMenuGroup: body => requests.post(Url.updateStatusMenuGroup, body),
  getFoodItemOfGroup: body => requests.post(Url.getFoodItemOfGroup, body),
  addGroupFoodItem: body => requests.post(Url.addGroupFoodItem, body),
  categoryItemDelete: body => requests.post(Url.categoryItemDelete, body),
  categoryGroupItemDelete: body => requests.post(Url.categoryGroupItemDelete, body),
  allDishItem: body => requests.get(Url.allDishItem, body),



  addTeamMember: body => requests.post(Url.addTeamMember, body),
  getTeamMember: body => requests.post(Url.getTeamMember, body),
  updateTeamMember: body => requests.post(Url.updateTeamMember, body),
  deleteTeamMember: body => requests.post(Url.deleteTeamMember, body),
  updateStatusTeamMember: body => requests.post(Url.updateStatusTeamMember, body),


  updateKycDetail: body => requests.postForm(Url.updateKycDetail, body),

  restaurantProfile: body => requests.postForm(Url.restaurantProfile, body),

  addRestaurantTimings: body => requests.post(Url.addRestaurantTimings, body),
  updateRestaurantTimings: body => requests.post(Url.updateRestaurantTimings, body),
  deleteRestaurantTimings: body => requests.post(Url.deleteRestaurantTimings, body),
  restaurantUpdateoOutletStatus: body => requests.post(Url.restaurantUpdateoOutletStatus, body),


  adminRequestsAll: (body) => requests.get(Url.adminRequestsAll + `?vendor_id=${body?.vendor_id}`),
  adminRequestsDelete: body => requests.post(Url.adminRequestsDelete, body),

  adminInfo: () => requests.get(Url.adminInfo),

  restaurantMenuExtraAssets: body => requests.postForm(Url.restaurantMenuExtraAssets, body),
  vendorManageProfile: body => requests.post(Url.vendorManageProfile, body),

  deleteAssetImage: body => requests.post(Url.deleteAssetImage, body),
  teamRolePermission: body => requests.post(Url.teamRolePermission, body),

  getWaitingOrder: body => requests.post(Url.getWaitingOrder, body),
  getOrderByStatus: body => requests.post(Url.getOrderByStatus, body),
  updateOrderStatus: body => requests.post(Url.updateOrderStatus, body),

  getAllOffers: (body) => requests.post(Url.allOffers ,body),
  acceptDeclineOffer: (body) => requests.post(Url.acceptDeclineOffer ,body),
  



};

const requests = {
  get: url => axios.get(url).then(responseBody),
  post: (url, body) => axios.post(url, body).then(responseBody),
  // put: (url, body) => axios.put(url, body).then(responseBody),
  // del: (url) => axios.delete(url).then(responseBody),
  postForm: (url, formData) => {
    return axios
      .post(url, formData, {
        headers: { 'content-type': 'multipart/form-data' },
      })
      .then(responseBody);
  },
};


