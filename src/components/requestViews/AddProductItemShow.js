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
  ImageBaseUrlProduct,
} from '../../commons/AppImages';
import {fonts} from '../../theme/colors';
import CTA from '../cta/CTA';
import FullImage from '../FullImage';
import {Surface} from 'react-native-paper';
import Spacer from '../Spacer';
import moment from 'moment';

let DayOfWeeks = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export default function AddProductItemShow({item, navigation, closeSheet}) {
  const [fullImage, setFullImage] = useState(false);
  const [imageUriOne, setImageUriOne] = useState('');

  console.log('item--AddProductItemShow', item);

  const sortTimingData = timeSlotAry => {
    return timeSlotAry?.sort((a, b) => {
      // First, compare by days_of_week
      if (a.days_of_week < b.days_of_week) return -1;
      if (a.days_of_week > b.days_of_week) return 1;
    });
  };

  const profileData = [
    {
      title: 'Product Picture',
      value: item?.data?.product_pic
        ? ImageBaseUrlProduct + item?.data?.product_pic
        : null,
      image: true,
      adminStatus: '11',
    },
    {
      title: 'Title',
      value: item?.data?.title,
      image: false,
      adminStatus: '11',
    },
    {
      title: 'Description',
      value: item?.data?.description,
      image: false,
      adminStatus: '11',
    },
    {
      title: 'Selling_Price',
      value: item?.data?.selling_price,
      image: false,
      adminStatus: '11',
    },
    {
      title: 'Base_Price',
      value: item?.data?.base_price,
      image: false,
      adminStatus: '11',
    },
    {
      title: 'Item_Type',
      value: item?.data?.veg_non_veg,
      image: false,
      adminStatus: '11',
    },
    // {
    //   title: 'Product_Type',
    //   value:item?.data?.product_type,
    //   image: false,
    //   adminStatus: '11',
    // },
    {
      title: 'Product_Timing',
      value: item?.data?.product_timing,
      image: false,
      adminStatus: '11',
    },

    {
      title: 'Tag',
      value: item?.data?.tag,
      image: false,
      adminStatus: '11',
    },

    {
      title: 'Product_Varient',
      value:
        item?.data?.product_varient_groups?.length > 0
          ? item?.data?.product_varient_groups
          : null,
      image: false,
      adminStatus: '11',
    },
    {
      title: 'Combination',
      value:
        item?.data?.combination?.length > 0 ? item?.data?.combination : null,
      image: false,
      adminStatus: '11',
    },
    {
      title: 'Timing',
      value:
        item?.data?.partial_product_timings?.length > 0
          ? sortTimingData(item?.data?.partial_product_timings)
          : null,
      image: false,
      adminStatus: '',
    },
    {
      title: 'addons',
      value:
        item?.data?.product_addon_groups?.length > 0
          ? item?.data?.product_addon_groups
          : null,
      image: false,
      adminStatus: '',
    },

    {
      title: 'Admin Remarks',
      value: item?.remarks,
      image: false,
      adminStatus: item?.remarks,
    },
  ];

  const onPressImage = async uri => {
    setFullImage(true);
    if (uri?.length > 0) {
      setImageUriOne(uri);
    }
  };

  const dateFomat = d => {
    if (d) {
      return moment(d, 'HHmmss').format('hh:mm a');
    } else {
      return '';
    }
  };

  const RenderData = ({data, i}) => {
    // console.log("data---",data)
    return data?.value ? (
      <>
        {data?.adminStatus?.length > 0 ? (
          <View style={styles.container}>
            {data?.title === 'Product_Varient' ||
            data?.title === 'Combination' ? (
              <View style={{marginTop: '-2%'}}>
                {data?.title === 'Product_Varient' ? (
                  <>
                    {data?.value?.map((value, index) => {
                      // console.log("value,index111",value,index)
                      return (
                        <View
                          style={{
                            flexDirection: 'row',
                            marginTop: index == 0 ? 0 : '5%',
                          }}>
                          <Text style={styles.titleText}>
                            Varient {index + 1} :
                          </Text>
                          <Text style={styles.valueText}>{value?.name}</Text>
                        </View>
                      );
                    })}
                  </>
                ) : (
                  <View style={{flexDirection: 'column'}}>
                    <Text style={styles.titleText}>Combination :</Text>
                    <View
                      style={{
                        width: wp('63.5%'),
                        // height:hp('10%'),
                        marginLeft: wp('26%'),
                        marginTop: '-5%',
                        borderWidth: 1,
                        borderRadius: 10,
                        borderColor: '#646464',
                        //  padding:10 ,
                      }}>
                      {data?.value?.map((value, index) => {
                        // console.log("value,index",value,index)
                        return (
                          <View
                            style={{
                              flexDirection: 'row',
                              marginTop:'4%',
                            }}>
                            <View
                              style={{
                                flexDirection: 'row',
                                borderBottomWidth:
                                  data?.value?.length - 1 == index ? 0 : 0.2,
                                marginTop: index == 0 ? '2%' : '1%',
                              }}>
                              <Text
                                style={[
                                  styles.valueText,
                                  {marginBottom: '4%', marginLeft: '3%'},
                                ]}>
                                {' '}
                                {value?.first_gp} - {value?.second_gp} {'  '} Rs{' '}
                                {value?.price}
                              </Text>
                            </View>
                          </View>
                        );
                      })}
                    </View>
                  </View>
                )}
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
                        onPressImage(data?.value);
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
            )}
          </View>
        ) : (
          <>
            {data?.title === 'Timing' ? (
              <>
                <View style={{flexDirection: 'column', marginTop: '5%'}}>
                  <Text style={styles.titleText}>Timing :</Text>
                  <View
                    style={{
                      width: wp('63.5%'),
                      marginLeft: wp('26%'),
                      marginTop: '-5%',
                      borderWidth: 1,
                      borderRadius: 10,
                      borderColor: '#646464',
                    }}>
                    {data?.value?.map((item, i) => {
                      console.log('item--', item);
                      return (
                        <View
                          style={{
                            flexDirection: 'row',
                            marginTop: '4%',
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              borderBottomWidth:
                                data?.value?.length - 1 == i ? 0 : 0.2,
                              marginTop: '1%',
                            }}>
                            <Text
                              style={{
                                fontSize: RFValue(12),
                                fontFamily: fonts.medium,
                                color: '#000000',
                                marginBottom: i == 0 ? '4%' : '3%',
                                marginLeft: '3%',
                              }}>
                              {DayOfWeeks[Number(item?.days_of_week) - 1]}{' '}
                            </Text>
                            <Text style={styles.valueText}>
                              {' '}
                              {dateFomat(item?.open_times)} -{' '}
                              {dateFomat(item?.close_time)}
                            </Text>
                          </View>
                        </View>
                      );
                    })}
                  </View>
                </View>
              </>
            ) : (
              <>
                <View style={{flexDirection: 'column', marginTop: '5%'}}>
                  <Text style={styles.titleText}>Addons :</Text>
                  <View
                    style={{
                      width: wp('63.5%'),
                      marginLeft: wp('26%'),
                      marginTop: '-5%',
                      borderWidth: 1,
                      borderRadius: 10,
                      borderColor: '#646464',
                    }}>
                  {data?.value?.map((item, i) => {
                    console.log('item--', item);
                    return (
                      <View
                        style={{
                         
                        }}>
                           <View
                            style={{
                              borderBottomWidth:
                                data?.value?.length - 1 == i ? 0 : 0.2,
                                 marginTop: '2%',
                            }}>
                        <Text
                          style={{
                            fontSize: RFValue(12),
                            fontFamily: fonts.medium,
                            color: '#000000',
                            marginTop:'2%',
                            marginLeft:'3%'
                          }}>
                          {item.title}{' '}
                        </Text>
                      
                          {item?.addonprod.map((data, index) => {
                            return (
                              <View style={{flexDirection: 'row',marginLeft:'3%',marginTop:'3%',
                              marginBottom:item?.addonprod?.length-1 == index ? '5%' :0}}>
                              <Text style={styles.addonsText}>
                                {data?.price?.length > 0
                                  ? `${data?.name}  Rs ${data?.price}`
                                  : `${data?.name}`} 
                              </Text>
                              </View>
                            )
                          })}
                        
                        </View>
                      </View>
                    );
                  })}
                  </View>
                </View>
              </>
            )}
          </>
        )}
      </>
    ) : null;
  };

  const onViewDetails = () => {
    closeSheet();
    setTimeout(() => {
      navigation.navigate('addProduct', {product: null});
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
        uri={imageUriOne}
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
    width: wp('30%'),
  },
  valueText: {
    fontSize: RFValue(12),
    fontFamily: fonts.medium,
    color: '#000000',
    width: wp('62%'),
  },
  addonsText: {
    fontSize: RFValue(12),
    fontFamily: fonts.medium,
    color: '#000000',
    width: wp('62%'),
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
