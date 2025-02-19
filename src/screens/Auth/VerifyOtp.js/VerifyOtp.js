import React, {useEffect, useState} from 'react';
import {View, KeyboardAvoidingView, Keyboard} from 'react-native';
import {Strings} from '../../../translates/strings';
import Spacer from '../../../halpers/Spacer';
import CTA from '../../../components/cta/CTA';
import AppInputScroll from '../../../halpers/AppInputScroll';
import OtpInput from '../../../components/OtpInput';
import ResendOtp from '../../../components/ResendOtp';
import {styles} from './styles';
import Header from '../../../components/header/Header';
import {rootStore} from '../../../stores/rootStore';
import AuthScreenContent from '../../../components/AuthScreenContent';

export default function VerifyOtp({navigation, route}) {
  const {verifyOtp} = rootStore.authStore;
  const {value, loginType} = route.params;
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState(null);
  const [clearValue, setClearValue] = useState(false);
  const [mobileEmail, setMobileEmail] = useState(value);
  const [clearData, setClearData] = useState(false);

  // console.log('value,loginType', value, loginType);

  useEffect(() => {
    setOtp('');
    setClearValue(!clearValue);
    if (value) {
      setMobileEmail(value);
    }
  }, [value]);

  const handleTextChange = t => {
    // console.log('triger handle change:-', t);
    setOtp(t);
    if (t?.length == 4) {
      handleVerify(t);
    }
  };

  const FormButton = ({loading, onPress}) => {
    return (
      <CTA
        disable={otp?.length != 4}
        title={Strings.verify}
        onPress={() => {
          onPress(otp);
        }}
        loading={loading}
        theme={'primary'}
        isBottom={true}
      />
    );
  };

  const handleVerify = async otpValue => {
    Keyboard.dismiss();
    await verifyOtp(
      mobileEmail,
      loginType,
      otpValue,
      navigation,
      handleLoading,
      onResendClear,
    );
  };

  const handleLoading = v => {
    setLoading(v);
  };

  const onResendClear = async () => {
    console.log('resend');
    setOtp('');
    setClearData(!clearData);
  };

  return (
    <View style={styles.screen}>
      <Header
        onPress={() => {
          navigation.goBack();
        }}
        backArrow={true}
      />
      <KeyboardAvoidingView
        style={styles.keyboradView}
        behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <AppInputScroll
          pb={0}
          padding={true}
          keyboardShouldPersistTaps={'handled'}>
          <View style={styles.mainContainer}>
            <AuthScreenContent
              marginTop={'25%'}
              title={Strings.verification}
              subTitle={`${Strings.otpVerificationText} ${
                loginType == 'Mobile'
                  ? Strings.phoneNumber
                  : Strings.emailAddress
              } ${
                loginType == 'Mobile' ? mobileEmail?.mobile : mobileEmail?.email
              }`}
            />

            <Spacer space={'2%'} />
            <OtpInput
              clearData={clearData}
              handleTextChange={handleTextChange}
            />
            <Spacer space={'5%'} />
            <ResendOtp
              value={mobileEmail}
              type={loginType}
              onResendClear={onResendClear}
              handleLoading={handleLoading}
            />
            <View style={{marginTop: '30%'}}>
              <FormButton loading={loading} onPress={handleVerify} />
            </View>
          </View>
        </AppInputScroll>
      </KeyboardAvoidingView>
    </View>
  );
}
