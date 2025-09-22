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
import {
  ImageBaseUrlAsset,
  ImageBaseUrlOrg,
} from '../../commons/AppImages';
import {fonts} from '../../theme/colors';
import FullImage from '../FullImage';
import {Surface} from 'react-native-paper';
import {DateFormat} from '../../helpers/DateFormat';
import Spacer from '../Spacer';
import CTA from '../cta/CTA';

let imgArray = [];
export default function AddRestaurantDetailsShow({
  item,
  navigation,
  closeSheet,
}) {
  const [fullImage, setFullImage] = useState(false);
  const [imageArray, setImageArray] = useState([]);
  const [imageUri, setImageUri] = useState([]);

  useEffect(() => {
    if (item?.data?.org_asset?.file_name?.length > 0) {
      imgArray = [];
      item?.data?.org_asset?.file_name?.map((item, i) => {
        imgArray.push({uri: ImageBaseUrlAsset + item});
      });
      setImageArray([...imgArray]);
    }
  }, [fullImage]);

  const getRestaurantData = item => {
    let isDineIn = item.is_dinein_enable == '1' ? true : false;
    let isPickUp = item.is_pickup_enable == '1' ? true : false;

    if (isDineIn == true && isPickUp == true) {
      return 'Dine In/Pick Up';
    } else if (isDineIn == true) {
      return 'Dine In';
    } else if (isPickUp == true) {
      return 'Pick Up';
    }
  };

  const profileData = [
    {
      title: 'Restaurant Image',
      value: ImageBaseUrlOrg + item?.data?.add_org?.logo,
      image: true,
      adminStatus: '11',
      transform: 'none',
    },
    {
      title: 'Name',
      value: item?.data?.add_org?.name,
      image: false,
      adminStatus: '11',
      transform: 'none',
    },
    {
      title: 'Mobile Number',
      value: item?.data?.add_org?.contact_number,
      image: false,
      adminStatus: '11',
      transform: 'none',
    },
    {
      title: 'Email',
      value: item?.data?.add_org?.email,
      image: false,
      adminStatus: '11',
      transform: 'none',
    },
    {
      title: 'Address',
      value: item?.data?.add_org?.address,
      image: false,
      adminStatus: '11',
      transform: 'none',
    },
    {
      title: 'About',
      value: item?.data?.add_org?.description,
      image: false,
      adminStatus: '11',
      transform: 'none',
    },
    {
      title: 'Founded Date',
      value: DateFormat(item?.data?.add_org?.founded_date),
      image: false,
      adminStatus: '11',
      transform: 'none',
    },
    {
      title: 'Order Price',
      value: item?.data?.add_org?.minimum_order_amount,
      image: false,
      adminStatus: '11',
    },
    {
      title: 'Prepare Time',
      value: item?.data?.add_org?.order_prepare_time,
      image: false,
      adminStatus: '11',
      transform: 'none',
    },

    {
      title: 'Instructions',
      value: item?.data?.add_org?.direction_text,
      image: false,
      adminStatus: '11',
      transform: 'none',
    },
    {
      title: 'Direction Image',
      value: item?.data?.add_org?.direction_image
        ?  item?.data?.add_org?.direction_image
        : null,
      image: true,
      adminStatus: '11',
      transform: 'none',
    },
    {
      title: 'Veg / Non-Veg',
      value: item?.data?.add_org?.veg_nonveg,
      image: false,
      adminStatus: '11',
      transform: 'capitalize',
    },
    // {
    //   title: 'Vendor Type',
    //   value: item?.data?.add_org?.vendor_type,
    //   image: false,
    //   adminStatus: '11',
    //   transform: 'capitalize',
    // },
    // {
    //   title: 'Restaurant Type',
    //   value: getRestaurantData(item?.data?.add_org),
    //   image: false,
    //   adminStatus: '11',
    //   transform: 'capitalize',
    // },
    // {
    //   title: '24/7 Outlet Open',
    //   value: item?.data?.add_org?.outlet_open == 1 ? 'yes' : 'no',
    //   image: false,
    //   adminStatus: '11',
    //   transform: 'capitalize',
    // },
    {
      title: 'Admin Remarks',
      value: item?.remarks,
      image: false,
      adminStatus: item?.remarks,
      transform: 'none',
    },
  ];

  const onPressImage = async (uri, title) => {
    if (title === 'Restaurant Image') {
      setImageUri(uri);
      setFullImage(true);
    } else {
      setImageUri(uri);
      setFullImage(true);
    }
  };

  const RenderData = ({data, i}) => {
    return data?.value ? (
      <>
        {data?.adminStatus?.length > 0 && (
          <View style={styles.container}>
            <>
              <Text style={styles.titleText}>{data?.title} :</Text>
              {data?.image === false ? (
                <Text
                  style={[styles.valueText, {textTransform: data.transform}]}>
                  {data?.value}
                </Text>
              ) : (
                <Surface style={styles.surface} elevation={1}>
                  <TouchableOpacity
                    disabled={data?.value?.length > 0 ? false : true}
                    activeOpacity={0.7}
                    style={{padding: 4}}
                    onPress={() => {
                      onPressImage(data?.value, data?.title);
                    }}>
                    <Image
                      resizeMode="stretch"
                      style={styles.image}
                      source={{uri: data?.value}}
                    />
                  </TouchableOpacity>
                </Surface>
              )}
            </>
          </View>
        )}
      </>
    ) : null;
  };

  const onViewDetails = () => {
    closeSheet();
    setTimeout(() => {
      navigation.navigate('restaurentRequest');
    }, 300);
  };

  return (
    <View>
      <View style={{height: hp('62%')}}>
        <ScrollView
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
      {/* {item?.status === 'pending' && (
        <>
          <Spacer space={hp('4%')} />
          <CTA
            width={'100%'}
            title={'View Details'}
            onPress={() =>{onViewDetails()}}
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
    width: wp('32%'),
  },
  valueText: {
    fontSize: RFValue(12),
    fontFamily: fonts.medium,
    color: '#000000',
    width: wp('60%'),
    // marginTop:hp("1%")
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
    color: '#00000050',
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
