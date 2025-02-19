import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  KeyboardAvoidingView,
  Text,
  Alert,
  StyleSheet,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Formik, useFormikContext} from 'formik';
import FieldInput from '../components/FieldInput';
import AppInputScroll from '../halpers/AppInputScroll';
import CTA from '../components/cta/CTA';
import {rootStore} from '../stores/rootStore';
import {colors} from '../theme/colors';
import ProductDropDown from '../components/TeamMemberCard/ProductDropDown';
import PermissionTag from '../components/TeamMemberCard/PermissionTag';
import handleAndroidBackButton from '../halpers/handleAndroidBackButton';
import {useFocusEffect} from '@react-navigation/native';
import {addTeamMemberValidations} from './formsValidation/addTeamMemberValidations';

const listArray = [
  {
    id: 1,
    name: 'manager',
    active: true,
    permissions: [
      {
        id: 1,
        active: true,
        name: 'Menu Management',
      },
      {
        id: 2,
        active: true,
        name: 'Menu Item in-stock / out of stock',
      },
      {
        id: 3,
        active: true,
        name: 'Store Online / Offline',
      },
      {
        id: 4,
        active: true,
        name: 'Manage Team members',
      },
      {
        id: 5,
        active: true,
        name: 'Payments',
      },
      {
        id: 6,
        active: true,
        name: 'Orders Management (Accept / Decline)',
      },
      {
        id: 7,
        active: true,
        name: 'Orders Management (Status update once accepted)',
      },
      {
        id: 8,
        active: true,
        name: 'Order History',
      },
      {
        id: 9,
        active: true,
        name: 'Offers',
      },
      {
        id: 10,
        active: true,
        name: 'Business Profile update',
      },
      {
        id: 11,
        active: true,
        name: 'Settings (feedback, FSSAI document, bank details, time management etc.)',
      },
      {
        id: 12,
        active: true,
        name: 'Product Management',
      },
    ],
  },
  {
    id: 2,
    active: true,
    name: 'accounts',
    permissions: [
      {
        id: 5,
        active: true,
        name: 'Payments',
      },
    ],
  },
  {
    id: 3,
    active: true,
    name: 'cook',
    permissions: [
      {
        id: 6,
        active: true,
        name: 'Orders Management (Accept / Decline)',
      },
      {
        id: 7,
        active: true,
        name: 'Orders Management (Status update once accepted)',
      },
      {
        id: 8,
        active: true,
        name: 'Order History',
      },
    ],
  },
  {
    id: 4,
    active: true,
    name: 'custom',
    permissions: [],
  },
];

const permissionsArray = [
  {
    id: 1,
    active: false,
    name: 'Menu Management',
  },
  {
    id: 2,
    active: false,
    name: 'Menu Item in-stock / out of stock',
  },
  {
    id: 3,
    active: false,
    name: 'Store Online / Offline',
  },
  {
    id: 4,
    active: false,
    name: 'Manage Team members',
  },
  {
    id: 5,
    active: false,
    name: 'Payments',
  },
  {
    id: 6,
    active: false,
    name: 'Orders Management (Accept / Decline)',
  },
  {
    id: 7,
    active: false,
    name: 'Orders Management (Status update once accepted)',
  },
  {
    id: 8,
    active: false,
    name: 'Order History',
  },
  {
    id: 9,
    active: false,
    name: 'Offers',
  },
  {
    id: 10,
    active: false,
    name: 'Business Profile update',
  },
  {
    id: 11,
    active: false,
    name: 'Settings (feedback, FSSAI document, bank details, time management etc.)',
  },
  {
    id: 12,
    active: false,
    name: 'Product Management',
  },
];

let assign_PermissionArray = [];

export default function AddEditTeamMembersForm({navigation, item, type}) {
  const {addTeamMember, updateTeamMember} = rootStore.teamManagementStore;
  const {appUser} = rootStore.commonStore;
  const [loading, setLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({
    firstName: item?.first_name ?? '',
    lastName: item?.last_name ?? '',
    phone: item?.phone?.toString() ?? '',
    email: item?.email ?? '',
    selectRole: item?.roles?.id ?? '',
    rolesObject: item?.roles ?? {},
    permission: item?.permissions ?? [],
    id: item?._id ?? '',
    isAction: 'false',
  });
  const [assign_Permissions, setAssign_Permissions] =
    useState(permissionsArray);
  const [list, setList] = useState(listArray);
  const [isSectedAllValue, setIsSectedAllValue] = useState(false);
  const [update, setUpdate] = useState(false);

  console.log('appUser==', appUser);

  const handleSaveAndNext = async values => {
    console.log('values--', values);
    if (type == 'add') {
      await addTeamMember(values, appUser, handleLoading, navigation);
    } else {
      await updateTeamMember(values, appUser, handleLoading, navigation);
    }
  };

  const handleLoading = v => {
    setLoading(v);
  };

  const AddFormBtn = () => {
    const {dirty, isValid, values} = useFormikContext();
    console.log('dirty', dirty, values);
    console.log('values---', values);
    setInitialValues(values);
    return (
      <CTA
        width={wp('92%')}
        title={'Submit'}
        disable={!(dirty && isValid)}
        onPress={() => handleSaveAndNext(values)}
        loading={loading}
        bottomCheck={0.5}
      />
    );
  };

  useFocusEffect(
    useCallback(() => {
      handleAndroidBackButton(navigation);
      setAssign_Permissions(permissionsArray);
      assign_PermissionArray = permissionsArray;
    }, [permissionsArray]),
  );

  useEffect(() => {
    if (list?.length > 0) {
      setTimeout(() => {
        list?.map((data, i) => {
          if (data?.id == item?.roles?.id) {
            // console.log('item----- ', item);
            seletedPermissionUpdateAuto(item);
          }
        });
      }, 200);
    }
  }, [list, item]);

  const seletedPermissionUpdateAuto = permission => {
    console.log('permission---1', permission);
    if (permission?.permissions?.length > 11) {
      setIsSectedAllValue(true);
    } else {
      setIsSectedAllValue(false);
    }

    if (permission?.roles?.name == 'custom') {
      console.log('custom data ---- ', item, item?.roles?.name);
      const updatedPermissions = assign_PermissionArray?.map(item => {
        const isPermissionFound = permission?.permissions?.find(
          value => value?.id == item?.id,
        );

        // Use a new object to avoid mutating the original `item`
        return {
          ...item,
          active: isPermissionFound ? true : false,
        };
      });

      console.log('Updated Permissions custom:', updatedPermissions);
      setAssign_Permissions(updatedPermissions);
    } else {
      const updatedPermissions = assign_PermissionArray?.map(item => {
        const isPermissionFound = permission?.permissions?.find(
          value => value?.id == item?.id,
        );

        // Use a new object to avoid mutating the original `item`
        return {
          ...item,
          active: isPermissionFound ? true : false,
        };
      });

      // Log the updated array
      console.log('Updated Permissions no custom:', updatedPermissions);

      // Update state with the new array
      setAssign_Permissions(updatedPermissions);
    }
  };

  const seletedPermissionUpdate = permission => {
    console.log(
      'permission---,assign_Permissions',
      permission,
      assign_Permissions,
    );
    if (permission?.permissions?.length >= assign_Permissions?.length) {
      setIsSectedAllValue(true);
    } else {
      setIsSectedAllValue(false);
    }

    const updatedPermissions = assign_PermissionArray?.map(item => {
      const isPermissionFound = permission?.permissions?.find(
        value => value?.id == item?.id,
      );
      // console.log('isPermissionFound--',isPermissionFound,item);
      return {
        ...item,
        active: isPermissionFound ? true : false,
      };
    });

    console.log('updatedPermissions', updatedPermissions);
    setAssign_Permissions(updatedPermissions);
  };

  const seletedUpdateClick = itemArray => {
    console.log('itemArray', itemArray);
    const newCustomValue = {
      id: 4,
      name: 'custom',
      active: true,
      permissions: [...itemArray],
    };

    seletedPermissionUpdate(newCustomValue);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={addTeamMemberValidations()}>
      <View style={{flex: 1}}>
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <AppInputScroll
            Pb={'60%'}
            padding={true}
            keyboardShouldPersistTaps={'handled'}>
            <View style={styles.InputView}>
              <FieldInput
                inputLabel={'First Name'}
                placeholder={'Enter first Name'}
                name={'firstName'}
              />
              <FieldInput
                inputLabel={'Last Name'}
                placeholder={'Enter last Name'}
                name={'lastName'}
              />
              <FieldInput
                inputLabel={'Phone Number'}
                placeholder={'Enter phone number'}
                name={'phone'}
                keyboardType={'phone-pad'}
                maxLength={10}
              />
              <FieldInput
               autoCapitalize={'none'}
                inputLabel={'Email Address'}
                placeholder={'Enter email address'}
                name={'email'}
                keyboardType={'email'}
                maxLength={40}
              />
              <ProductDropDown
                name={'selectRole'}
                title={'Select Role'}
                value={initialValues.selectRole}
                listObject={list}
                onSelectItem={seletedPermissionUpdate}
                selectedObject={'rolesObject'}
              />
              {initialValues?.selectRole != '' && (
                <PermissionTag
                  isAssign_Permissions
                  name={'permission'}
                  value={initialValues.permission}
                  title={'Assign Permissions'}
                  list={assign_Permissions}
                  onClickItem={seletedUpdateClick}
                  isSectedAllValue={isSectedAllValue}
                />
              )}
            </View>
          </AppInputScroll>
        </KeyboardAvoidingView>
        <View style={styles.bottomBTNView}>
          <AddFormBtn />
        </View>
      </View>
    </Formik>
  );
}

const styles = StyleSheet.create({
  InputView: {
    flex: 1,
    marginTop: '5%',
    marginHorizontal: 20,
  },
  bottomBTNView: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.appBackground,
    height: hp('8%'),
    position: 'absolute',
    bottom: 0.1,
    width: wp('100%'),
  },
});
