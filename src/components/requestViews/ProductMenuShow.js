import {RFC_2822} from 'moment';
import React, {useState} from 'react';
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
import {ImageBaseUrlProduct} from '../../commons/AppImages';
import {fonts} from '../../theme/colors';
import CTA from '../cta/CTA';
import FullImage from '../FullImage';
import Spacer from '../Spacer';

export default function ProductMenuShow({item, navigation, closeSheet}) {
  const [fullImage, setFullImage] = useState(false);

  const productData = [
    {
      title: 'Product Image',
      value: item?.data?.image_name,
      image: true,
      adminStatus: '11',
    },
    {
      title: 'Product Name',
      value: item?.data?.product_name,
      image: false,
      adminStatus: '11',
    },
    {
      title: 'Product Price',
      value: item?.data?.selling_price,
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
            <Text style={styles.titleText}>{data?.title} : </Text>
            {data?.image === false ? (
              <Text numberOfLines={1} style={styles.valueText}>
                {data?.value}
              </Text>
            ) : (
              <Surface style={styles.surface} elevation={1}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    setFullImage(true);
                  }}>
                  <Image
                    resizeMode="contain"
                    style={styles.image}
                    source={{uri: ImageBaseUrlProduct + data?.value}}
                  />
                </TouchableOpacity>
              </Surface>
            )}
          </View>
        )}
      </>
    ) : null;
  };

  const onViewDetails = () => {
    closeSheet();
    setTimeout(() => {
      navigation.navigate('tab1');
    }, 300);
  };

  return (
    <View>
      <View style={{height: hp('30%')}}>
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: hp('2%')}}
          style={{flex: 1}}>
          <TouchableOpacity activeOpacity={1}>
            {productData?.map((itemdata, i) => (
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
            disable={true}
            isBottom={false}
            bottomCheck={0}
          />
        </>
      )} */}
      <FullImage
        uri={ImageBaseUrlProduct + item?.data?.image_name}
        visible={fullImage}
        onRequestClose={() => setFullImage(false)}
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
    width: wp('34%'),
  },
  valueText: {
    fontSize: RFValue(12),
    fontFamily: fonts.medium,
    color: '#000000',
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
