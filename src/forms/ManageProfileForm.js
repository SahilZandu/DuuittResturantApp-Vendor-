import React, { useCallback, useState } from 'react';
import { Text, View, KeyboardAvoidingView } from 'react-native';
import CTA from '../components/cta/CTA';
import { Formik, useFormikContext } from 'formik';
import { Strings } from '../translates/strings';
import { rootStore } from '../stores/rootStore';
import AppInputScroll from '../halpers/AppInputScroll';
import { manageProfileValidations } from './formsValidation/manageProfileValidations';
import { useFocusEffect } from '@react-navigation/native';
import handleAndroidBackButton from '../halpers/handleAndroidBackButton';
import FieldInput from '../components/FieldInput';

const FormButton = ({ loading, onPress }) => {
  const { dirty, isValid, values } = useFormikContext();
  return (
    <CTA
      disable={!(isValid && dirty)}
      title={Strings?.save}
      onPress={() => onPress(values)}
      loading={loading}
      isBottom={true}
      bottomCheck={20}
      width={'90%'}
    />
  );
};

const ManageProfileForm = ({ navigation }) => {
  const { vendorManageProfile } = rootStore.requestSupportStore;
  const { appUser } = rootStore.commonStore;
  console.log("appUser--ManageProfileForm", appUser);
  const [loading, setLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({
    name: appUser?.name ?? '',
    mobile: appUser?.phone?.toString() ?? '',
    email: appUser?.email ?? '',
  });
  const [update, setUpdate] = useState(true);

  useFocusEffect(
    useCallback(() => {
      handleAndroidBackButton(navigation);
    }, []),
  );

  const handleSetPass = async values => {
    console.log('values', values);
    await vendorManageProfile(values, handleLoading, isSuccess)
    // navigation.goBack();
  };

  const handleLoading = v => {
    setLoading(v);
  };

  const isSuccess = () => {
    const { appUser } = rootStore.commonStore;
    setUpdate(false);
    setTimeout(() => {
      setInitialValues({
        name: appUser?.name ?? '',
        mobile: appUser?.phone?.toString() ?? '',
        email: appUser?.email ?? '',
      });
      setUpdate(true);
    }, 20);
  };

  if (update == true) {
    return (
      <Formik
        initialValues={initialValues}
        validationSchema={manageProfileValidations()}>
        <KeyboardAvoidingView behavior={'padding'} style={{ flex: 1 }}>
          <AppInputScroll padding={true} keyboardShouldPersistTaps={'handled'}>
            <View
              style={{
                marginHorizontal: 20,
                justifyContent: 'center',
                marginTop: '5%',
              }}>
              <FieldInput
                autoCapitalize={'none'}
                name={'name'}
                inputLabel={'Name'}
                placeholder={'Enter your full name'}
              />
              <FieldInput
                autoCapitalize={'none'}
                name={'mobile'}
                keyboardType="number-pad"
                inputLabel={'Phone Number'}
                placeholder={'Enter phone number'}
              />
              <FieldInput
                autoCapitalize={'none'}
                keyboardType="email-address"
                name={'email'}
                inputLabel={'Email Address'}
                placeholder={'Enter email address'}
              />
            </View>
          </AppInputScroll>
          <FormButton loading={loading} onPress={handleSetPass} />
        </KeyboardAvoidingView>
      </Formik>
    );
  } else {
    return null;
  }
};

export default ManageProfileForm;
