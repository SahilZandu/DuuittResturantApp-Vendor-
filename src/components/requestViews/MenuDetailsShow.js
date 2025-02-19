import {RFC_2822} from 'moment';
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
import {Surface} from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ImageBaseUrl} from '../../commons/AppImages';
import {fonts} from '../../theme/colors';
import CTA from '../cta/CTA';
import FullImage from '../FullImage';
import Spacer from '../Spacer';

let imgArray = [];
export default function MenuDetailsShow({item, navigation, closeSheet}) {
  const [fullImage, setFullImage] = useState(false);
  const [imageArray, setImageArray] = useState([]);
  const [imageUri, setImageUri] = useState([]);
  const [imageUriIndex, setimageUriIndex] = useState(0)

  useEffect(() => {
    if (item?.data?.length > 0) {
      imgArray = [];
      item?.data?.map((item, i) => {
        imgArray.push({uri: ImageBaseUrl + item?.image_name});
      });
      setImageArray([...imgArray]);
    }
  }, [fullImage]);

  const menuData = [
    {
      title: 'Menu Photos',
      value: imageArray,
      image: true,
      adminStatus: '11',
    },
    {
      title: 'Remarks',
      value: item?.data[0].remarks,
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

  const onPressImage = async (data, i) => {
   // await data?.splice(0, i);
    console.log("dd---",data)
    setimageUriIndex(i)
    setImageUri(data);
    setFullImage(true);
  };

  const RenderData = ({data}) => {
    return data?.value ? (
      <>
        {data?.adminStatus?.length > 0 && (
          <View style={styles.container}>
            {data?.image === false ? (
              <>
                <Text style={styles.titleText}>{data?.title} : </Text>

                <Text numberOfLines={3} style={styles.valueText}>
                  {data?.value}
                </Text>
              </>
            ) : (
              <View style={styles.imageView}>
                <Text style={styles.photosText}>{data?.title} :</Text>
                {data?.value?.map((itemData, i) => (
                  <TouchableOpacity
                    key={i}
                    activeOpacity={0.7}
                    style={{padding: 4}}
                    onPress={() => {
                      onPressImage(data?.value, i);
                    }}>
                    <Surface style={styles.surface} elevation={1}>
                      <Image
                        resizeMode="stretch"
                        style={styles.image}
                        source={{uri: itemData?.uri}}
                      />
                    </Surface>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        )}
      </>
    ) : null;
  };

  const onViewDetails = () => {
    closeSheet();
    setTimeout(() => {
      navigation.navigate('viewMenuRequest', {item: item});
    }, 300);
  };

  const newRequest = () => {
    closeSheet();

    setTimeout(() => {
      navigation.navigate('addMemuRequest', {item: item});
    }, 300);
  };

  return (
    <View>
      <View style={{height: imageArray?.length > 3 ? hp('47%') : hp('34%')}}>
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: hp('2%')}}
          style={{flex: 1}}>
          <TouchableOpacity activeOpacity={1}>
            {menuData?.map((itemdata, i) => (
              <View key={i}>
                <RenderData data={itemdata} />
              </View>
            ))}
          </TouchableOpacity>
        </ScrollView>
      </View>
      {item?.status === 'pending' && (
        <>
          <Spacer space={hp('4%')} />
          <CTA
            width={'100%'}
            title={'View Details'}
            onPress={() => {
              onViewDetails();
            }}
            isBottom={false}
          />
        </>
      )}
      {item?.status === 'rejected' && (
        <>
          <Spacer space={hp('4%')} />
          <CTA
            width={'100%'}
            title={'New Request'}
            onPress={() => {
              newRequest();
            }}
            isBottom={false}
          />
        </>
      )}
      <FullImage
        uri={ImageBaseUrl + item?.data[0].image_name}
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
    color: '#00000050',
    width: wp('31%'),
  },
  photosText: {
    fontSize: RFValue(12),
    fontFamily: fonts.medium,
    color: '#00000050',
    width: wp('70%'),
    marginBottom: hp('0.8%'),
  },
  valueText: {
    fontSize: RFValue(12),
    fontFamily: fonts.medium,
    color: '#000000',
    width: wp('60%'),
    lineHeight: 22,
  },
  imageView: {
    flexDirection: 'row',
    width: wp('95%'),
    flexWrap: 'wrap',
  },
  image: {
    height: hp('12%'),
    width: wp('28%'),
    borderRadius: 10,
  },
  surface: {
    height: hp('12%'),
    width: wp('28%'),
    padding: 4,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
