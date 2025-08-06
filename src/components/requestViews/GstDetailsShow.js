import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Surface} from 'react-native-paper';
import { fonts } from '../../theme/fonts/fonts';
import Url from '../../api/Url';
import { appImages } from '../../commons/AppImages';
import CTA from '../cta/CTA';
import Spacer from '../../halpers/Spacer';
import FullPdf from '../FullPdf';
import FullImage from '../FullImage';
import { DateFormat } from '../../halpers/DateFormat';
import { colors } from '../../theme/colors';
export default function GstDetailsShow({item, navigation, closeSheet}) {
  const [fullPdf, setFullPdf] = useState(false);
  const [pdfIndicator, setPdfIndicator] = useState(true);
  const [fullImage, setFullImage] = useState(false);
  const [imageUri, setImageUri] = useState(null);
  
  useEffect(() => {
    setImageUri(Url?.Image_Url + item?.vendor?.gstn_detail?.image);
  }, []);

  const gstData = [
    {
      title: 'GST File',
      value: item?.vendor?.gstn_detail?.image,
      image: true,
      pdf:item?.vendor?.gstn_detail?.image?.toString()?.endsWith('pdf'),
      adminStatus: '11',
    },
    {
      title: 'GST Document',
      value: item?.vendor?.gstn_detail?.gstn_number,
      image: false,
      adminStatus: '11',
    },
   
    {
      title: 'Expiration Date',
      value: DateFormat(new Date(item?.vendor?.gstn_detail?.expiration_date)),
      image: false,
      adminStatus: '11',
    },
    {
      title: 'Admin Remarks',
      value: item?.reason,
      image: false,
      adminStatus: item?.reason,
    },
  ];

  const RenderData = ({data}) => {
    return data?.value ? (
      <>
        {data?.adminStatus?.length > 0 && (
          <View style={styles.cantainer}>
            <Text style={styles.titleText}>{data?.title} : </Text>
            {data?.image === false ? (
              <Text style={styles.valueText}>{data?.value}</Text>
            ) : (
              <>
                {data?.pdf == true ? (
                  <Surface style={styles.surface} elevation={1}>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => {
                        setFullPdf(true);
                        setTimeout(() => {
                          setPdfIndicator(false);
                        }, 1000);
                      }}>
                      <Image
                        resizeMode="contain"
                        style={styles.image}
                        source= {appImages?.pdfPicture}
                      />
                    </TouchableOpacity>
                  </Surface>
                ) : (
                  <Surface style={styles.surface} elevation={1}>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => {
                        setFullImage(true);
                      }}>
                      <Image
                        resizeMode='cover'
                        style={styles.image}
                        source={{uri: Url?.Image_Url + data?.value}}
                      />
                    </TouchableOpacity>
                  </Surface>
                )}
              </>
            )}
          </View>
        )}
      </>
    ) : null;
  };

  const onViewDetails = () => {
    closeSheet();
    setTimeout(() => {
      navigation.navigate('gst');
    }, 300);
  };

  return (
    <View>
      <View style={{height: hp('29%')}}>
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: hp('2%')}}
          style={{flex: 1}}>
          <TouchableOpacity activeOpacity={1}>
            {gstData?.map((itemdata, i) => (
              <View key={i}>
                <RenderData data={itemdata} />
              </View>
            ))}
          </TouchableOpacity>
        </ScrollView>
      </View>
      {item?.status === 'rejected' && (
        <>
          <Spacer space={hp('4%')} />
          <CTA
            width={'100%'}
            title={'New Request'}
            onPress={() => {
              onViewDetails();
            }}
            isBottom={false}
            bottomCheck={0}
          />
        </>
      )}
      <FullPdf
        pdfIndicator={pdfIndicator}
        uri={imageUri}
        visible={fullPdf}
        onRequestClose={() => {
          setFullPdf(false), setPdfIndicator(true);
        }}
      />
      <FullImage
        uri={imageUri}
        visible={fullImage}
        onRequestClose={() => setFullImage(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  cantainer: {
    flexDirection: 'row',
    marginTop: hp('3%'),
  },
  titleText: {
    fontSize: RFValue(12),
    fontFamily: fonts.medium,
    color: colors.black50,
    width: wp('34%'),
  },
  valueText: {
    fontSize: RFValue(12),
    fontFamily: fonts.medium,
    color:colors.black,
    width: wp('55%'),
  },
  image: {
    height: hp('8%'),
    width: wp('22%'),
    borderRadius: 10,
  },
  surface: {
    height: hp('8%'),
    width: wp('22%'),
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
