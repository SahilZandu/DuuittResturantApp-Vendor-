import React, {useEffect, useState} from 'react';
import {View, Text, Pressable, Image} from 'react-native';
import {appImagesSvg} from '../commons/AppImages';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {SvgXml} from 'react-native-svg';
import CTA from './cta/CTA';
import {RFValue} from 'react-native-responsive-fontsize';
import DocumentPicker from 'react-native-document-picker';
import {useFormikContext} from 'formik';
import FullImage from './FullImage';
import FullPdf from './FullPdf'
import Spacer from '../halpers/Spacer';
import {fonts} from '../theme/fonts/fonts';
import {colors} from '../theme/colors';

export default function UploadFiles(props) {
  const {
    name,
    filename,
    docCheck,
    docImageUri,
    docFileName,
    onDocSize,
    onChange,
  } = props;

  const {setFieldValue} = useFormikContext();
  const [imageUri, setImageUri] = useState(null);
  const [fileName, setFileName] = useState('');
  const [checktype, setCheckType] = useState('');
  const [fullImage, setFullImage] = useState(false);
  const [fullPdf, setFullPdf] = useState(false);
  const [pdfIndicator, setPdfIndicator] = useState(true);

  // console.log("docFileName-------------",docCheck,docImageUri,docFileName)

  useEffect(() => {
    setTimeout(() => {
      if (docImageUri?.length > 0 || docImageUri === '') {
        setImageUri(docImageUri);
        setFileName(docFileName);
        setCheckType(docCheck);
      }
    }, 300);
  }, [docCheck, docImageUri, docFileName]);

  const selectOneFile = async () => {
    //Opening Docdsument Picker for selection of one file
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
      });
      // console.log("res----Document ",res);
      setFileName(res[0]?.name);
      setImageUri(res[0]?.uri);
      setFieldValue(name, res[0]?.uri);
      setFieldValue(filename, res[0]?.name);
      setCheckType(res[0]?.type);

      if (res[0]?.size / 1024000 < 10) {
        onDocSize(false);
      } else {
        onDocSize(true);
      }
      if (onChange) {
        onChange();
      }
    } catch (err) {
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        console.log('Canceled from single doc picker');
        //If user canceled the document selection
        // alert('Canceled from single doc picker');
      } else {
        //For Unknown Error
        console.log("err---",err);
        // alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  return (
    <>
      <Pressable
        style={{
          borderRadius: 10,
          borderWidth: 1.5,
          borderColor: colors.colorD9,
          borderStyle: 'dashed',
          zIndex: 0,
          marginTop: '2%',
          alignItems: 'center',
          paddingTop: '4%',
        }}>
        {imageUri ? (
          <View style={{alignItems: 'center'}}>
            {checktype === 'application/pdf' && imageUri ? (
              <Pressable
                onPress={() => {
                  setFullPdf(true);
                  setTimeout(() => {
                    setPdfIndicator(false);
                  }, 1000);
                }}>
                <SvgXml xml={appImagesSvg.pdfIcon} width={60} height={60} />
              </Pressable>
            ) : (
              <Pressable
                onPress={() => {
                  setFullImage(true);
                }}>
                <Image
                  source={{uri: imageUri}}
                  style={{width: wp('86%'), height: hp('20%'), borderRadius: 4}}
                />
              </Pressable>
            )}
            {/* <Text
              numberOfLines={1}
              style={{
                marginHorizontal: '22%',
                fontFamily: fonts.bold,
                fontSize: RFValue(12),
                color: colors.colorDC,
                marginTop: '3%',
                textAlign: 'center',
              }}>
              {fileName}
            </Text> */}
          </View>
        ) : (
          <View style={{alignItems: 'center'}}>
            <SvgXml xml={appImagesSvg.upload} />
            <Text
              style={{
                fontFamily: fonts.medium,
                fontSize: RFValue(14),
                color: colors.colorDC,
              }}>
              Upload files here
            </Text>
          </View>
        )}
        <Spacer space={hp('3%')} />
        <CTA
          height={hp('5%')}
          onPress={() => selectOneFile()}
          title="Browse Files"
          width={wp('70%')}
        />
      </Pressable>
      <FullPdf
       pdfIndicator={pdfIndicator}
        uri={imageUri}
        visible={fullPdf}
        onRequestClose={() =>{setFullPdf(false),setPdfIndicator(true)}}
       />
      <FullImage
        uri={imageUri}
        visible={fullImage}
        onRequestClose={() => setFullImage(false)}
      />
    </>
  );
}
