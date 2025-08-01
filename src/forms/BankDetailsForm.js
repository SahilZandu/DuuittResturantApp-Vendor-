import React, { useCallback, useState } from 'react';
import { View, KeyboardAvoidingView, StyleSheet } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { Formik, useFormikContext } from 'formik';
import FieldInput from '../components/FieldInput';
import AppInputScroll from '../halpers/AppInputScroll';
import CTA from '../components/cta/CTA';
import { rootStore } from '../stores/rootStore';
import { colors } from '../theme/colors';
import handleAndroidBackButton from '../halpers/handleAndroidBackButton';
import { useFocusEffect } from '@react-navigation/native';
import { bankValidations } from './formsValidation/bankValidations';
import PendingReqView from '../components/PendingReqView';
import HintText from '../components/HintText';
import Spacer from '../halpers/Spacer';

export default function BankDetailsForm({ navigation }) {
  const { appUser } = rootStore.commonStore;
  const { updateBankDetail } = rootStore.kycStore;
  const [loading, setLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({
    name: appUser?.role === "vendor" ? appUser?.bank_detail?.bank_name :
      appUser?.vendor?.bank_detail?.bank_name ?? '',
    account: appUser?.role === "vendor" ? appUser?.bank_detail?.account_number : appUser?.vendor?.bank_detail?.account_number ?? '',
    ifsc: appUser?.role === "vendor" ? appUser?.bank_detail?.ifsc_code : appUser?.vendor?.bank_detail?.ifsc_code ?? '',
  });
  const [update, setUpdate] = useState(true);
  const [pendingReq, setPendingReq] = useState(
    appUser?.role === "vendor" ?
      appUser?.bank_detail?.status == 'pending' ? true : false :
      appUser?.vendor?.bank_detail?.status == 'pending' ? true : false,
  );
  const [isSubmited, setSubmited] = useState(false);
  const [declineReqReason, setDeclineReqReason] = useState(
    appUser?.role === "vendor" ?
      appUser?.bank_detail?.status == 'declined' ? true : false :
      appUser?.vendor?.bank_detail?.status == 'declined' ? true : false,
  );

  console.log("appUser---Bank", appUser);


  const handleSaveAndNext = async values => {
    await updateBankDetail(values, appUser, handleLoading, isSuccess);
  };

  const isSuccess = () => {
    const { appUser } = rootStore.commonStore;
    setUpdate(false);
    navigation?.goBack();
    setTimeout(() => {
      setUpdate(true);
    }, 100);
  };

  const handleLoading = v => {
    setLoading(v);
  };

  const AddFormBtn = () => {
    const { dirty, isValid, values } = useFormikContext();
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
    }, []),
  );

  if (update) {
    return (
      <Formik
        initialValues={initialValues}
        validationSchema={bankValidations()}>
        <View style={styles.container}>
          {pendingReq && (
            <PendingReqView
              // onPress={() =>
              //   navigation.navigate('requestHistory', {
              //     id: initialValues?.serial_no,
              //   })
              // }
              text={
                (isSubmited
                  ? 'Your request submitted successfully! Now you '
                  : 'You ') +
                "can't place update bank detail request as the previous request is under review."
              }
            />
          )}
          {declineReqReason && (
            <PendingReqView
              text={
                `Reason : ${appUser?.role === 'vendor'
                  ? appUser?.bank_detail?.reason
                  : appUser?.vendor?.bank_detail?.reason
                }`
              }
            />
          )}
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <AppInputScroll
              Pb={'20%'}
              padding={true}
              keyboardShouldPersistTaps={'handled'}>
              <View
                style={[
                  styles.innerMainView,
                  {
                    marginTop: pendingReq ? '2%' : '5%',
                    opacity: pendingReq ? 0.6 : 1,
                    pointerEvents: pendingReq ? 'none' : 'auto',
                  },
                ]}>
                <FieldInput
                  inputLabel={'Name'}
                  placeholder={'Enter your name'}
                  name={'name'}
                  maxLength={40}
                />
                <FieldInput
                  inputLabel={'Account Number'}
                  placeholder={'Enter your account number'}
                  name={'account'}
                  keyboardType={'numeric'}
                  maxLength={16}
                />
                <FieldInput
                  autoCapitalize="characters"
                  inputLabel={'IFSC Code'}
                  placeholder={'Enter bank IFSC code'}
                  name={'ifsc'}
                  maxLength={15}
                />
                <Spacer space={'4%'} />
                <HintText
                  hint={
                    'Please enter your bank details for verification. Ensure that the information provided is accurate and legible. This information is crucial for successful verification. Thank you!'
                  }
                />
              </View>
            </AppInputScroll>
          </KeyboardAvoidingView>
          <View style={styles.bottomBtn}>
            <AddFormBtn />
          </View>
        </View>
      </Formik>
    );
  } else {
    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.appBackground,
  },
  innerMainView: {
    flex: 1,
    marginHorizontal: 20,
  },
  bottomBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.appBackground,
    height: hp('8%'),
    position: 'absolute',
    bottom: 0.1,
    width: wp('100%'),
  },
});
