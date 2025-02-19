import moment, {RFC_2822} from 'moment';
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {Surface} from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { fonts } from '../../theme/fonts/fonts';
import Spacer from '../../halpers/Spacer';
import CTA from '../cta/CTA';
import Url from '../../api/Url';
import { appImages } from '../../commons/AppImages';
import FullImage from '../FullImage';
import FullPdf from '../FullPdf';
import { DateFormat } from '../../halpers/DateFormat';
import { colors } from '../../theme/colors';

export default function FssaiDeatilsShow({item, navigation, closeSheet}) {
  const [fullPdf, setFullPdf] = useState(false);
  const [pdfIndicator, setPdfIndicator] = useState(true);
  const [fullImage, setFullImage] = useState(false);
  const [imageUri, setImageUri] = useState(null);

  useEffect(() => {
    setImageUri(Url?.Image_Url + item?.vendor?.fssai_detail?.image);
  }, []);

  const FssaiData = [
    {
      title: 'FSSAI Document',
      value: item?.vendor?.fssai_detail?.image,
      image: true,
      pdf: item?.vendor?.fssai_detail?.image?.toString()?.endsWith('pdf'),
      adminStatus: '11',
    },

    {
      title: 'FSSAI Number',
      value: item?.vendor?.fssai_detail?.account_number,
      image: false,
      adminStatus: '11',
    },
    {
      title: 'Expiration Date',
      value:DateFormat(new Date(item?.vendor?.fssai_detail?.expiration_date)),
      image: false,
      adminStatus: '11',
    },
    {
      title: 'Admin Remarks',
      value: item?.remarks,
      image: false,
      adminStatus: item?.remarks,
    },
  ];

  const RenderData = ({data}) => {
    return data?.value ? (
      <>
        {data?.adminStatus?.length > 0 && (
          <View style={styles.container}>
            <Text style={styles.titleText}>{data?.title} :</Text>
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
                        source={appImages.pdfPicture}
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
                        source={{uri: Url?.Base_Url + data?.value}}
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
      navigation.navigate('Fssai');
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
            {FssaiData?.map((itemdata, i) => (
              <View key={i}>
                <RenderData data={itemdata} />
              </View>
            ))}
          </TouchableOpacity>
        </ScrollView>
      </View>
      {/* {item?.status === 'pending' && (
        <>
          <Spacer space={hp('4%')} />
          <CTA
            width={'100%'}
            title={'View Details'}
            onPress={() => {
              onViewDetails();
            }}
            isBottom={false}
            bottomCheck={0}
          />
        </>
      )} */}
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
      <FullImage
        uri={imageUri}
        visible={fullImage}
        onRequestClose={() => setFullImage(false)}
      />
      <FullPdf
        pdfIndicator={pdfIndicator}
        uri={imageUri}
        visible={fullPdf}
        onRequestClose={() => {
          setFullPdf(false), setPdfIndicator(true);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: hp('3%'),
  },
  titleText: {
    fontSize: RFValue(12),
    fontFamily: fonts.medium,
    color:colors.black50,
    width: wp('34%'),
  },
  valueText: {
    fontSize: RFValue(12),
    fontFamily: fonts.medium,
    color:colors.black,
    width: wp('50%'),
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
