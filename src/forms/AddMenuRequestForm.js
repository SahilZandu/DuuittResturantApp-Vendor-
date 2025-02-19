import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Formik, useFormikContext} from 'formik';
import {RFValue} from 'react-native-responsive-fontsize';
import {colors} from '../theme/colors';
import CTA from '../components/cta/CTA';
import {addMenuRequestValidation} from './formsValidation/addMenuRequestValidation';
import MenuImage from '../components/menuGallery/MenuImage';
import HintText from '../components/HintText';
import {fonts} from '../theme/fonts/fonts';
import AppInputScroll from '../halpers/AppInputScroll';
import InputFieldMultiLine from '../components/InputFieldMultiLine';
import {rootStore} from '../stores/rootStore';

let tempRemark = '';

export default function AddMenuRequestForm({navigation}) {
  const {restaurantMenuExtraAssets} = rootStore.requestSupportStore;
  const {appUser} = rootStore.commonStore;
  const [loading, setLoading] = useState(false);
  const [imageArray, setImageArray] = useState([]);
  const [extraImage, setExtraImage] = useState([]);
  const [initialValues, setinitialValues] = useState({
    remark: '',
  });
  const [isSubmited, setSubmited] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const [refersh, setRefersh] = useState(true);

  const onAddMemuRequest = values => {
    // console.log("values--",values?.remark)
    sendMenuRequest(values?.remark);
  };

  const sendMenuRequest = async remark => {
    console.log('remark,imageArray', remark, imageArray);
    setLoading(true);
    await restaurantMenuExtraAssets(
      imageArray,
      extraImage,
      remark,
      appUser,
      handleLoading,
      isSucess,
    );
  };

  const handleLoading = v => {
    setLoading(v);
  };

  const isSucess = () => {
    setSubmited(true);
    setRefersh(false);
    setTimeout(() => {
      setRefersh(true);
    }, 20);
  };

  // const handleNetworkError = e => {
  //   if (e == 'networkError') {
  //     sendMenuRequest(tempRemark);
  //   }
  // };

  const FormButton = ({}) => {
    const {isValid, dirty, values} = useFormikContext();
    // console.log('values', values, !(isValid && dirty));
    return (
      <CTA
        width={'98%'}
        disable={imageArray?.length > 0 ? false : true}
        title={'Submit'}
        onPress={() => onAddMemuRequest(values)}
        loading={loading}
        isBottom={true}
      />
    );
  };

  const onMenuImage = data => {
    console.log('tri', data);
    setImageArray(data);
    if (data?.length > 0) {
      setInProgress(true);
    }
  };

  if (refersh == true) {
    return (
      <Formik
        initialValues={initialValues}
        validationSchema={addMenuRequestValidation()}>
        <View style={styles.screen}>
          <AppInputScroll
            Pb={'20%'}
            padding={true}
            keyboardShouldPersistTaps={'handled'}>
            <View>
              {<MenuImage onClickMenuImage={onMenuImage} />}
              <InputFieldMultiLine
                maxLength={350}
                inputLabel={'Remarks'}
                name={'remark'}
                placeholder={'Enter your remark'}
                value={initialValues.remark}
              />
            </View>
            <HintText
              hint={
                'Add images and enter remarks notes for add your menu item and wait for admin approval. we will notify you the when admin approve your request then you will see your item in your menu.'
              }
            />
          </AppInputScroll>
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
    marginHorizontal: 20,
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
  fileHereText: {
    fontFamily: fonts.medium,
    fontSize: RFValue(14),
    color: colors.colorDC,
  },
});
