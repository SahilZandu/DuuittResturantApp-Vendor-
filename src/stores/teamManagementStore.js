import {action, computed, decorate, observable, runInAction} from 'mobx';
import {agent} from '../api/agents';
import {useToast} from '../halpers/useToast';

export default class TeamManagementStore {
  teamMembers = [];

  addTeamMember = async (value, appUser, handleLoading, navigation) => {
    handleLoading(true);
    let roleData = {
      id: value?.rolesObject?.id,
      name: value?.rolesObject?.name,
      active: value?.rolesObject?.active,
    };

    let requestData = {
      restaurant_id: appUser?.restaurant?._id,
      first_name: value?.firstName,
      last_name: value?.lastName,
      phone: Number(value?.phone),
      email: value?.email,
      roles: roleData,
      permissions: value?.permission,
      is_active:true
    };

    console.log('requestData--', requestData);
    // return
    try {
      const res = await agent.addTeamMember(requestData);
      console.log('addTeamMember API Res:', res);
      if (res?.statusCode == 200) {
        handleLoading(false);
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

  getTeamMember = async (appUser, handleLoading) => {
    let requestData = {
      restaurant_id: appUser?.restaurant?._id,
    };

    console.log('requestData--', requestData);
    // return
    try {
      const res = await agent.getTeamMember(requestData);
      console.log('getTeamMember API Res:', res);
      if (res?.statusCode == 200) {
        handleLoading(false);
        res?.data ? (this.teamMembers = res?.data) : (this.teamMembers = []);
        return res?.data;
      } else {
        handleLoading(false);
        this.teamMembers = [];
        return res?.data;
      }
    } catch (error) {
      console.log('error:', error);
      handleLoading(false);
    }
  };

  updateTeamMember = async (value, appUser, handleLoading, navigation) => {
    handleLoading(true);
    let roleData = {
      id: value?.rolesObject?.id,
      name: value?.rolesObject?.name,
      active: value?.rolesObject?.active,
    };
    let requestData = {
      restaurant_id: appUser?.restaurant?._id,
      first_name: value?.firstName,
      last_name: value?.lastName,
      phone: Number(value?.phone),
      email: value?.email,
      roles: roleData,
      permissions: value?.permission,
      team_member_id: value?.id,
    };

    console.log('requestData--', requestData);
    // return
    try {
      const res = await agent.updateTeamMember(requestData);
      console.log('updateTeamMember API Res:', res);
      if (res?.statusCode == 200) {
        handleLoading(false);
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

  deleteTeamMember = async (appUser, item, handleLoading, onSuccessDelete) => {
    handleLoading(true);
    let requestData = {
      restaurant_id: appUser?.restaurant?._id,
      team_member_id: item?._id,
    };

    console.log('requestData--', requestData);
    // return
    try {
      const res = await agent.deleteTeamMember(requestData);
      console.log('deleteTeamMember API Res:', res);
      if (res?.statusCode == 200) {
        useToast(res.message, 1);
        onSuccessDelete();
      } else {
        const message = res?.message ? res?.message : res?.data?.message;
        useToast(message, 0);
        onSuccessDelete();
      }
      handleLoading(false);
    } catch (error) {
      console.log('error:', error);
      handleLoading(false);
      onSuccessDelete();
      const m = error?.data?.message
        ? error?.data?.message
        : 'Something went wrong';
      useToast(m, 0);
    }
  };

  updateStatusTeamMember = async (item,status,handleLoading) => {
    handleLoading(true);
    let requestData = {
      team_member_id: item?._id,
      is_active:status
    };

    console.log('requestData--', requestData);
    // return
    try {
      const res = await agent.updateStatusTeamMember(requestData);
      console.log('updateStatusTeamMember API Res:', res);
      if (res?.statusCode == 200) {
        useToast(res.message, 1);
        handleLoading(false);
        return res ;
      } else {
        const message = res?.message ? res?.message : res?.data?.message;
        useToast(message, 0);
        handleLoading(false);
        return []
      }
     
    } catch (error) {
      console.log('error:', error);
      handleLoading(false);
      const m = error?.data?.message
        ? error?.data?.message
        : 'Something went wrong';
      useToast(m, 0);
      return []
    }
  };

}
