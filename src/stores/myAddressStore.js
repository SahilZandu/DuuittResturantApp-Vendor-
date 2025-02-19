import {action, computed, decorate, observable, runInAction} from 'mobx';

export default class MyAddressStore {
  
  currentAddress = {};

  setCurrentAddress = async data => {
    this.currentAddress = data;
  };
}
