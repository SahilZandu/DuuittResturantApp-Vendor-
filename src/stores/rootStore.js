import {createContext} from 'react';
import AuthStore from './authStore';
import CommonStore from './commonStore';
import KycStore from './kycStore';
import MenuStore from './menuStore';
import MyAddressStore from './myAddressStore';
import RequestSupportStore from './requestSupportStore';
import TeamManagementStore from './teamManagementStore';
import TimingManagementStore from './timingManagementStore';


export const rootStore = {
  authStore: new AuthStore(),
  commonStore: new CommonStore(),
  myAddressStore: new MyAddressStore(),
  menuStore:new MenuStore(),
  teamManagementStore:new TeamManagementStore(),
  kycStore : new KycStore(),
  timingManagementStore: new TimingManagementStore(),
  requestSupportStore: new RequestSupportStore()
};
export const RootStoreContext = createContext(rootStore);
