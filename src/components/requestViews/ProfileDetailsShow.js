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
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Surface} from 'react-native-paper';
import {fonts} from '../../theme/fonts/fonts';
import CTA from '../cta/CTA';
import Spacer from '../../halpers/Spacer';
import FullImage from '../FullImage';
import Url from '../../api/Url';
import {DateFormat} from '../../halpers/DateFormat';
import {colors} from '../../theme/colors';

let imgArray = [];
export default function ProfileDetailsShow({item, navigation, closeSheet}) {
  const [fullImage, setFullImage] = useState(false);
  const [imageArray, setImageArray] = useState([]);
  const [imageUri, setImageUri] = useState([]);
  const [imageUriOne, setImageUriOne] = useState('');
  const [imageUriIndex, setimageUriIndex] = useState(0);

  // console.log('item==== profile', item, imageArray);

  useEffect(() => {
    if (item?.data?.org_asset?.file_name?.length > 0) {
      imgArray = [];
      item?.data?.org_asset?.file_name?.map((item, i) => {
        imgArray.push({uri: Url?.Image_UrlAsset + item});
      });
      setImageArray([...imgArray]);
    }
  }, [fullImage]);

  const profileData = [
    {
      title: 'Profile Picture',
      // value: item?.data?.logo_image_name
      //   ? Url?.Image_Url + item?.data?.logo_image_name
      //   : null,
      value: item?.data?.logo_image_name,
      image: true,
      adminStatus: '11',
    },
    {
      title: 'Name',
      value: item?.data?.name,
      image: false,
      adminStatus: '11',
    },
    {
      title: 'Address',
      value: item?.data?.address,
      image: false,
      adminStatus: '11',
    },
    {
      title: 'About',
      value: item?.data?.description,
      image: false,
      adminStatus: '11',
    },
    {
      title: 'Date of Founding',
      value: DateFormat(new Date()),
      image: false,
      adminStatus: '11',
    },
    {
      title: 'Minimun Order Value',
      value: item?.data?.minimum_order_amount,
      image: false,
      adminStatus: '11',
    },
    {
      title: 'Preparation time',
      value: item?.data?.order_prepare_time,
      image: false,
      adminStatus: '11',
    },

    {
      title: 'Direction Instructions',
      value: item?.data?.direction_text,
      image: false,
      adminStatus: '11',
    },
    {
      title: 'Route Picture',
      value: item?.data?.org?.dir_image
        ? Url?.ImageDirectionImage + item?.data?.dir_image
        : null,
      image: true,
      adminStatus: '11',
    },
    {
      title: 'Assests',
      value: imageArray?.length > 0 ? imageArray : null,
      image: true,
      adminStatus: '11',
    },
    {
      title: 'Admin Remarks',
      value: item?.remarks,
      image: false,
      adminStatus: item?.remarks,
    },
  ];

  const onPressImage = async (data, i, uri) => {
    //  await data?.splice(0, i);
    setimageUriIndex(i);
    setImageUri(data);
    setFullImage(true);
    if (uri?.length > 0) {
      setImageUriOne(uri);
    }
  };

  const RenderData = ({data, i}) => {
    return data?.value ? (
      <>
        {data?.adminStatus?.length > 0 && (
          <View style={styles.container}>
            {data?.title === 'Assests' ? (
              <View style={styles.assestView}>
                <Text style={styles.asstesText}>{data?.title} :</Text>
                {data?.value?.map((item, i) => (
                  <TouchableOpacity
                    key={i}
                    style={{padding: 4}}
                    onPress={() => {
                      onPressImage(data?.value, i, '');
                    }}>
                    <Surface style={styles.assestSurface} elevation={1}>
                      <Image
                        resizeMode="stretch"
                        style={styles.asstesImage}
                        source={{uri: item?.uri}}
                      />
                    </Surface>
                  </TouchableOpacity>
                ))}
              </View>
            ) : (
              <>
                <Text style={styles.titleText}>{data?.title} :</Text>
                {data?.image === false ? (
                  <Text style={styles.valueText}>{data?.value}</Text>
                ) : (
                  <Surface style={styles.surface} elevation={1}>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      style={{padding: 4}}
                      onPress={() => {
                        onPressImage([], 0, data?.value);
                      }}>
                      <Image
                        resizeMode="stretch"
                        style={styles.image}
                        // source={{uri: data?.value}}
                        source={data?.value}
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
      navigation.navigate('profile');
    }, 300);
  };

  return (
    <View>
      <View style={{height: hp('53%')}}>
        <ScrollView
          nestedScrollEnabled
          bounces={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: hp('5%')}}
          style={{flex: 1}}>
          <TouchableOpacity activeOpacity={1}>
            {profileData?.map((itemdata, i) => (
              <View key={i}>
                <RenderData data={itemdata} i={i} />
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
      <FullImage
        uri={imageUriOne}
        visible={fullImage}
        onRequestClose={() => setFullImage(false)}
        multiImage={imageUri}
        imageIndex={imageUriIndex}
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
    color: colors.black50,
    width: wp('30%'),
  },
  valueText: {
    fontSize: RFValue(12),
    fontFamily: fonts.medium,
    color: colors.black,
    width: wp('60%'),
  },
  assestView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: wp('95%'),
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
  asstesImage: {
    height: hp('12%'),
    width: wp('28%'),
    borderRadius: 10,
  },
  asstesText: {
    fontSize: RFValue(12),
    fontFamily: fonts.medium,
    color: colors.black50,
    width: wp('75%'),
    marginBottom: hp('0.8%'),
  },
  assestSurface: {
    height: hp('12%'),
    width: wp('28%'),
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
