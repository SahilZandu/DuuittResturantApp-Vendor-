import React, { useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Formik, useFormikContext } from 'formik';
import { RFValue } from 'react-native-responsive-fontsize';
import { useFocusEffect } from '@react-navigation/native';
import { rootStore } from '../stores/rootStore';
import DatePicker from 'react-native-date-picker';
import ProductInput from '../components/addMenu/ProductInput';
import { docValidations } from './formsValidation/docValidations';
import moment from 'moment';
import UploadFiles from '../components/UploadFiles';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts/fonts';
import CTA from '../components/cta/CTA';
import Url from '../api/Url';
import AppInputScroll from '../halpers/AppInputScroll';
import HintText from '../components/HintText';
import Spacer from '../halpers/Spacer';
import { DateFormat, checkDocExpire } from '../halpers/DateFormat';
import handleAndroidBackButton from '../halpers/handleAndroidBackButton';
import PendingReqView from '../components/PendingReqView';

let fileName = '';
let fileType = '';
let fileUri = '';
let dateStart = new Date();

export default function DocumentForm({ form, navigation, hint }) {
  const { updateFssaiDetail, updateGstDetail } = rootStore.kycStore;
  const { appUser } = rootStore.commonStore;
  const [loading, setLoading] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [expirydate, setExpirydate] = useState(
    appUser?.role === "vendor" ? appUser?.fssai_detail?.expiration_date : appUser?.vendor?.fssai_detail?.expiration_date ?? '',
  );
  const [isRefersh, setIsRefersh] = useState(false);
  const [update, setUpdate] = useState(true);
  const [docSize, setDocSize] = useState(false);
  const [isPendingReq, setIsPendingReq] = useState(
    form == 'fssai'
      ? appUser?.role === "vendor" ? appUser?.fssai_detail?.status == 'pending'
        ? true
        : false
        : appUser?.vendor?.fssai_detail?.status == 'pending'
          ? true
          : false
       : appUser?.role === "vendor" ? appUser?.gstn_detail?.status == 'pending'
        ? true
        : false
        : appUser?.vendor?.gstn_detail?.status == 'pending'
          ? true
          : false
  );
  const [docExpired, setDocExpired] = useState(false);
  const [isSubmited, setSubmited] = useState(false);
  const [inProgress, setInProgress] = useState(false);

  const [initialValues, setinitialValues] = useState({
    file:
      form == 'fssai'
        ? appUser?.role === "vendor" ? appUser?.fssai_detail?.image?.length > 0
          ? Url?.Image_Url + appUser?.fssai_detail?.image
          : ''
          : appUser?.vendor?.fssai_detail?.image?.length > 0
          ? Url?.Image_Url + appUser?.vendor?.fssai_detail?.image
          : ''
         : appUser?.role === "vendor" ?  appUser?.gstn_detail?.image?.length > 0
          ? Url?.Image_Url + appUser?.gstn_detail?.image
          : ''
          : appUser?.vendor?.gstn_detail?.image?.length > 0
          ? Url?.Image_Url + appUser?.vendor?.gstn_detail?.image
          : '',
    number:
      form == 'fssai'
        ? appUser?.role === "vendor" ?  appUser?.fssai_detail?.account_number :  appUser?.vendor?.fssai_detail?.account_number  ?? ''
        :appUser?.role === "vendor" ?  appUser?.gstn_detail?.gstn_number  :appUser?.vendor?.gstn_detail?.gstn_number ?? '',
    expirationDate:
      form == 'fssai'
        ?appUser?.role === "vendor" ?  DateFormat(appUser?.fssai_detail?.expiration_date) : DateFormat(appUser?.vendor?.fssai_detail?.expiration_date) ?? ''
        : appUser?.role === "vendor" ? DateFormat(appUser?.gstn_detail?.expiration_date) :  DateFormat(appUser?.vendor?.gstn_detail?.expiration_date) ?? '',
    doctype: form,
    filename: '',
    id: '',
    serial_no: '',
  });

  useFocusEffect(
    useCallback(() => {
      handleAndroidBackButton(navigation);
      fileName = '';
      fileType = '';
      fileUri = '';
      dateStart = new Date();
      dateStart.setDate(dateStart.getDate() + 2);
      // console.log("dateStart----",dateStart)
    }, [isRefersh]),
  );

  const getDocType = type => {
    switch (type) {
      case '8':
        return 'fssai';
      case '7':
        return 'gst';
      default:
        return type;
    }
  };

  const onSetDocSize = size => {
    setDocSize(size);
  };

  const dateFormat = d => {
    var date = new Date(d);
    const expirydate1 = moment(date).format('YYYY-MM-DD');
    setExpirydate(expirydate1);
    return DateFormat(date);
  };

  const handleLoading = v => {
    setLoading(v);
  };

  const isSuccess = () => {
    setSubmited(true);
    setIsRefersh(true);
    setUpdate(false);
    navigation?.goBack();
    setTimeout(() => {
      setUpdate(true);
    }, 100)

  };

  const hanldeGstFssaiAdd = async (values, expirydate) => {
    console.log('values,expirydate', values, expirydate);
    setInProgress(false);
    if (form == 'fssai') {
      await updateFssaiDetail(
        values,
        expirydate,
        appUser,
        handleLoading,
        isSuccess,
      );
    } else {
      await updateGstDetail(
        values,
        expirydate,
        appUser,
        handleLoading,
        isSuccess,
      );
    }
  };

  const FormButton = ({ }) => {
    const { isValid, dirty, values } = useFormikContext();

    if (values?.file.includes('file')) {
      fileName = values?.filename;
      fileType = values?.file?.includes('pdf')
        ? 'application/pdf'
        : 'image/jpeg';
      fileUri = values?.file;
    }

    return (
      <CTA
        width={'91%'}
        disable={!(isValid && dirty) || docSize}
        title={'Save'}
        onPress={() => hanldeGstFssaiAdd(values, expirydate)}
        loading={loading}
        isBottom={true}
      />
    );
  };

  const DatePickeButton = ({ }) => {
    const { setFieldValue } = useFormikContext();
    return (
      <DatePicker
        modal
        mode="date"
        minimumDate={dateStart}
        open={showPicker}
        date={dateStart}
        onConfirm={date => {
          setShowPicker(false);
          setFieldValue('expirationDate', dateFormat(date));
        }}
        onCancel={() => {
          setShowPicker(false);
        }}
      />
    );
  };

  if (update) {
    return (
      <Formik
        initialValues={initialValues}
        validationSchema={docValidations(form)}>
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
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <AppInputScroll Pb={'25%'} keyboardShouldPersistTaps={'handled'}>
              <View
                style={{
                  opacity: isPendingReq ? 0.6 : 5,
                  pointerEvents: isPendingReq ? 'none' : 'auto',
                }}>
                <ProductInput
                  autoCapitalize="characters"
                  boxStyle={{ borderRadius: 50 }}
                  title={form == 'fssai' ? 'FSSAI Number' : 'GST Number'}
                  name={'number'}
                  placeholder={'Enter your doc number'}
                  maxLength={20}
                  onChange={() => setInProgress(true)}
                  keybordeType={form == 'fssai' ? 'numeric' : 'default'}
                />
                <ProductInput
                  boxStyle={{ borderRadius: 50 }}
                  isTouchInput
                  onPress={() => {
                    Keyboard.dismiss(), setShowPicker(true);
                    setInProgress(true);
                  }}
                  placeholder={'Enter expiration date'}
                  editable={false}
                  title={'Expiration Date'}
                  name={'expirationDate'}
                  value={initialValues.expirationDate}
                />
                {docExpired && (
                  <Text style={{ color: 'red', marginTop: '2%' }}>
                    {form == 'fssai' ? 'FSSAI' : 'GST'} licence has been
                    expired, please RENEW to avoid service termination.
                  </Text>
                )}

                {docSize === true ? (
                  <Text
                    numberOfLines={1}
                    style={[styles.fileSizeText, { color: colors.red }]}>
                    Your file size greater than 10 mb choose another file
                  </Text>
                ) : (
                  <Text style={styles.fileSizeText}>
                    File maximum size is 10MB
                  </Text>
                )}
                <UploadFiles
                  name={'file'}
                  filename={'filename'}
                  docCheck={
                    initialValues?.file?.includes('pdf')
                      ? 'application/pdf'
                      : 'image/jpeg'
                  }
                  docImageUri={initialValues?.file}
                  docFileName={fileName}
                  onDocSize={onSetDocSize}
                  onChange={() => setInProgress(true)}
                />
                <Spacer space={'-3%'} />
              </View>
              <HintText hint={hint} />
            </AppInputScroll>
          </KeyboardAvoidingView>
          <FormButton />
          <DatePickeButton />
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
    marginTop: '4%',
    color: colors.color33,
    fontFamily: fonts.regular,
    fontSize: RFValue(13),
  },
});
