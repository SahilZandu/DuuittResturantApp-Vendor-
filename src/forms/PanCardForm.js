import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Formik, useFormikContext } from 'formik';
import { RFValue } from 'react-native-responsive-fontsize';
import { colors } from '../theme/colors';
import { useFocusEffect } from '@react-navigation/native';
import { rootStore } from '../stores/rootStore';
import UploadImages from '../components/UploadFiles';
import HintText from '../components/HintText';
import { fonts } from '../theme/fonts/fonts';
import CTA from '../components/cta/CTA';
import ProductInput from '../components/addMenu/ProductInput';
import AppInputScroll from '../halpers/AppInputScroll';
import Url from '../api/Url';
import handleAndroidBackButton from '../halpers/handleAndroidBackButton';
import { panCardValidation } from './formsValidation/panCardValidation';
import Spacer from '../halpers/Spacer';
import PendingReqView from '../components/PendingReqView';
import UploadFilesCameraGallery from '../components/UploadFilesCameraGallery';

let fileName = '';

export default function PanCardForm({ form, navigation }) {
  const { updatePanCardDetail } = rootStore.kycStore;
  const { appUser } = rootStore.commonStore;
  const [loading, setLoading] = useState(false);
  const [update, setUpdate] = useState(true);
  const [isPendingReq, setIsPendingReq] = useState(
    appUser?.role === "vendor" ?
      appUser?.pan_detail?.status == 'pending' ? true : false
      : appUser?.vendor?.pan_detail?.status == 'pending' ? true : false,
  );
  const [isSubmited, setSubmited] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const [initialValues, setInitialValues] = useState({
    file:
      appUser?.role === "vendor" ? appUser?.pan_detail?.image?.length > 0
        ? Url?.Image_Url + appUser?.pan_detail?.image
        : ''
        : appUser?.vendor?.pan_detail?.image?.length > 0
          ? Url?.Image_Url + appUser?.vendor?.pan_detail?.image
          : '',
    number: appUser?.role === "vendor" ?
      appUser?.pan_detail?.pan_number
      : appUser?.vendor?.pan_detail?.pan_number ?? '',
    doctype: form,
  });
  const [declineReqReason, setDeclineReqReason] = useState(
    appUser?.role === "vendor" ?
      appUser?.pan_detail?.status == 'declined' ? true : false :
      appUser?.vendor?.pan_detail?.status == 'declined' ? true : false,
  );

  useFocusEffect(
    useCallback(() => {
      handleAndroidBackButton(navigation);
    }, []),
  );

  useEffect(() => {
    if (appUser) {
      getDocumentDetails(appUser?.role === "vendor" ? appUser : appUser?.vendor);
    }
  }, [appUser]);

  const getDocumentDetails = async user => {
    let a = initialValues;
    if (user?.pan_detail?.image?.length > 0) {
      a.file = Url?.Image_Url + user?.pan_detail?.image;
      a.number = user?.pan_detail?.pan_number;
      setInitialValues(a);
    }
    setUpdate(false);
    setTimeout(() => {
      setUpdate(true);
    }, 50)
  };

  const handleLoading = v => {
    setLoading(v);
  };

  const isSuccess = () => {
    setUpdate(false);
    navigation?.goBack();
    setTimeout(() => {
      setUpdate(true);
    }, 100)
  };

  const hanldePanAdd = async values => {
    console.log('values', values);
    setInProgress(false);
    await updatePanCardDetail(values, appUser, handleLoading, isSuccess);
  };

  const FormButton = ({ }) => {
    const { isValid, dirty, values } = useFormikContext();
    console.log('values', values);
    if (values?.file.includes('file')) {
      fileName = values?.filename;
      fileType = 'image/jpeg';
      fileUri = values?.file;
    }
    return (
      <CTA
        width={'91%'}
        disable={!(isValid && dirty)}
        title={'Save'}
        onPress={() => hanldePanAdd(values)}
        loading={loading}
        isBottom={true}
      />
    );
  };

  const onSetDocSize = size => {
    console.log('hahahahaha--', size);
  };

  if (update) {
    return (
      <Formik
        initialValues={initialValues}
        validationSchema={panCardValidation()}>
        <View style={styles.screen}>
          {isPendingReq && (
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
                  ? appUser?.pan_detail?.reason
                  : appUser?.vendor?.pan_detail?.reason
                }`
              }
            />
          )}
          <KeyboardAvoidingView
            style={{
              flex: 1,
              opacity: isPendingReq ? 0.6 : 1,
              pointerEvents: isPendingReq ? 'none' : 'auto',
            }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <AppInputScroll Pb={'25%'} keyboardShouldPersistTaps={'handled'}>
              <View>
                <ProductInput
                  boxStyle={{ borderRadius: 50 }}
                  autoCapitalize="characters"
                  title={'PAN Card Number'}
                  name={'number'}
                  placeholder={'Enter your doc number'}
                  maxLength={12}
                  onChange={() => setInProgress(true)}
                />
                <Text style={styles.fileSizeText}>
                  File maximum size is 10MB
                </Text>

                <UploadFilesCameraGallery
                  name={'file'}
                  filename={'filename'}
                  docImageUri={initialValues?.file}
                  docFileName={fileName}
                  onDocSize={onSetDocSize}
                  onChange={() => setInProgress(true)}
                />
                <Spacer space={'-3%'} />
              </View>
              <HintText
                hint={
                  'Please enter your PAN card number and upload a clear picture of your PAN card for verification. Ensure that the document is legible and includes your photograph, name, and PAN details. This information is crucial for accurate verification. Thank you!'
                }
              />
            </AppInputScroll>
          </KeyboardAvoidingView>
          <FormButton />
        </View>
      </Formik>
    );
  } else {
    return null;
  }
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.appBackground,
  },
  textstyle: {
    fontSize: RFValue(14),
    fontFamily: fonts.regular,
    color: colors.color8F,
  },
  saveButton: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
  fileSizeText: {
    marginTop: '3%',
    color: colors.color33,
    fontFamily: fonts.regular,
    fontSize: RFValue(13),
    marginBottom: '2%',
  },
});
