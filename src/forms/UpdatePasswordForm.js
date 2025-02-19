import React, {useCallback, useState} from 'react';
import {Text, View, KeyboardAvoidingView} from 'react-native';
import CTA from '../components/cta/CTA';
import {Formik, useFormikContext} from 'formik';
import InputField from '../components/InputField';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {rootStore} from '../stores/rootStore';
import {colors} from '../theme/colors';
import AppInputScroll from '../halpers/AppInputScroll';
import {updatePasswordValidations} from './formsValidation/updatePasswordValidations';
import { useFocusEffect } from '@react-navigation/native';
import handleAndroidBackButton from '../halpers/handleAndroidBackButton';



const UpdatePasswordForm = ({navigation}) => {
  const {changePassword} = rootStore.authStore;
  const {appUser}= rootStore.commonStore;
  const [loading, setLoading] = useState(false);
  const [secureTextEntry, setsecureTextEntry] = useState(true);
  const [secureTextEntry2, setsecureTextEntry2] = useState(true);
  const [secureTextEntry3, setsecureTextEntry3] = useState(true);
  const [initialValues, setInitialValues] = useState({
    oldPassword: '',
    password: '',
    confirm: '',
  });

  useFocusEffect(
    useCallback(()=>{
     handleAndroidBackButton(navigation)
    },[])
  )

  const FormButton = ({loading, onPress}) => {
    const {dirty, isValid, values} = useFormikContext();
    return (
      <CTA
        disable={!(isValid && dirty)}
        title={'Update'}
        onPress={() => onPress(values)}
        loading={loading}
        isBottom={true}
        bottomCheck={20}
        width={'90%'}
      />
    );
  };

  const handleSetPass = async (values) => {
    console.log('values', values);
    await changePassword(values,navigation,handleLoading)
  };

  const handleLoading = v => {
    setLoading(v);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={updatePasswordValidations()}>
      <KeyboardAvoidingView behavior={'padding'} style={{flex: 1}}>
        <AppInputScroll padding={true} keyboardShouldPersistTaps={'handled'}>
          <View
            style={{
              marginHorizontal: 20,
              justifyContent: 'center',
              marginTop: '5%',
            }}>
            <InputField
              textColor={colors.black}
              autoCapitalize={'none'}
              name={'oldPassword'}
              inputLabel={'Old Password'}
              placeholder={'********'}
              secureTextEntry={secureTextEntry}
              onPressEye={() => setsecureTextEntry(!secureTextEntry)}
              rightIconName={!secureTextEntry ? 'eye' : 'eye-off'}
            />
            <InputField
              textColor={colors.black}
              autoCapitalize={'none'}
              name={'password'}
              inputLabel={'New Password'}
              placeholder={'********'}
              secureTextEntry={secureTextEntry2}
              onPressEye={() => setsecureTextEntry2(!secureTextEntry2)}
              rightIconName={!secureTextEntry2 ? 'eye' : 'eye-off'}
            />
            <InputField
              textColor={colors.black}
              autoCapitalize={'none'}
              name={'confirm'}
              inputLabel={'Confirm New Password'}
              placeholder={'********'}
              secureTextEntry={secureTextEntry3}
              onPressEye={() => setsecureTextEntry3(!secureTextEntry3)}
              rightIconName={!secureTextEntry3 ? 'eye' : 'eye-off'}
            />
          </View>
        </AppInputScroll>
        <FormButton loading={loading} onPress={handleSetPass} />
      </KeyboardAvoidingView>
    </Formik>
  );
};

export default UpdatePasswordForm;
