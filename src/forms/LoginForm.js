import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import CTA from '../components/cta/CTA';
import { Formik, useFormikContext } from 'formik';
import { loginValidations } from './formsValidation/loginValidations';
import InputField from '../components/InputField';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Spacer from '../halpers/Spacer';
import { Strings } from '../translates/strings';
import { RFValue } from 'react-native-responsive-fontsize';
import { fonts } from '../theme/fonts/fonts';
import { colors } from '../theme/colors';
import { rootStore } from '../stores/rootStore';
import PopUp from '../components/appPopUp/PopUp';


const initialValues = {
  email: '',
  password: '',
  mobile: '',
};

const FormButton = ({ loading, onPress }) => {
  const { dirty, isValid, values } = useFormikContext();
  console.log('!(isValid && dirty)--', !(isValid && dirty));
  return (
    <CTA
      disable={!(isValid && dirty)}
      title={Strings.login}
      onPress={() => onPress(values)}
      loading={loading}
    />
  );
};

const LoginForm = ({ navigation, type }) => {
  const { login } = rootStore.authStore;

  const [loading, setLoading] = useState(false);
  const [secureTextEntry, setsecureTextEntry] = useState(true);
  const [isDeactive, setIsDeactive] = useState(false)

  const handleLogin = async values => {
    await login(values, type, navigation, handleLoading, onDeactiveAccount);
    console.log('values', values);
  };
  const handleLoading = v => {
    setLoading(v);
  };

  const onDeactiveAccount = () => {
    setIsDeactive(true);
  };

  const handleDeactiveAccount = () => {
    setIsDeactive(false);
    setTimeout(() => {
      navigation.navigate('customerSupport')
    }, 200);

  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={loginValidations(type)}>
      <View style={styles.main}>
        {type == 'Email' ? (
          <InputField
            autoCapitalize={'none'}
            textColor={colors.black}
            keyboardType="email-address"
            name={'email'}
            label={''}
            placeholder={'example@gmail.com'}
          />
        ) : (
          <InputField
            textColor={colors.black}
            keyboardType="number-pad"
            maxLength={10}
            // prefix={'+91'}
            name={'mobile'}
            label={''}
            placeholder={'Enter mobile number'}
          />
        )}

        {type == 'Email' && (
          <InputField
            textColor={colors.black}
            autoCapitalize={'none'}
            name={'password'}
            label={''}
            placeholder={'********'}
            secureTextEntry={secureTextEntry}
            onPressEye={() => setsecureTextEntry(!secureTextEntry)}
            rightIconName={!secureTextEntry ? 'eye' : 'eye-off'}
          />
        )}

        {type == 'Email' && (
          <View style={styles.forgotView}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('forgotPass');
              }}
              activeOpacity={0.8}
              style={styles.forgotTouch}>
              <Text style={styles.forgotText}>{Strings.forgotPassword}</Text>
            </TouchableOpacity>
          </View>
        )}

        <Spacer space={'12%'} />
        <FormButton loading={loading} onPress={handleLogin} />
        <PopUp
          visible={isDeactive}
          type={'continue'}
          onClose={() => setIsDeactive(false)}
          title={'Account Deactivated'}
          text={
            'Your account is currently deactivated. Please contact support team or log in again to reactivate your account.'
          }
          onDelete={handleDeactiveAccount}
        />
      </View>
    </Formik>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  main: {
    marginHorizontal: 30,
  },

  forgotView: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  forgotTouch: {
    width: wp('35%'),
    height: hp('4%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  forgotText: {
    fontSize: RFValue(12),
    fontFamily: fonts.bold,
    textAlign: 'right',
    color: colors.main,
  },
});
