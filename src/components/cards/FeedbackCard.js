import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {colors, fonts} from '../../theme/colors';
import {currencyFormat} from '../../helpers/currencyFormat';
import Rating from '../Rating';
import {Line} from '../../helpers/Line';
import {OrderDate} from '../../helpers/OrderDate';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import RatingStar from '../RatingStar';
import {SvgXml} from 'react-native-svg';
import {appImages} from '../../commons/AppImages';

export default function FeedbackCard({item, index}) {
  const OrderStatus = () => {
    return (
      <View key={index} style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={styles.id}>#{item?.orders?.order_id}</Text>
        <Text style={[styles.id, {marginLeft: 'auto'}]}>
          {currencyFormat(item?.orders?.total_amount)}
        </Text>
        <View style={styles.statusBox}>
          <Text style={styles.status}>Paid</Text>
        </View>
      </View>
    );
  };

  const getImage = status => {
    switch (status) {
      case 'veg':
        return appImages.veg;
        case 'egg':
          return appImages.egg;
      default:
        return appImages.nonVeg;
    }
  };

  const Items = () => {
    if (
      item?.orderitemreview_with_product &&
      item?.orderitemreview_with_product?.length != 0
    ) {
      return (
        <View style={{flex: 1, marginTop: '-4%'}}>
          {item?.orderitemreview_with_product?.map((item, key) => (
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: colors.white,
                marginTop: '4%',
                height: hp('4%'),
                borderRadius: 8,
                borderColor: '#B1B1B1',
                borderWidth: 1,
                alignItems: 'center',
              }}>
              <SvgXml style={{marginLeft: '4%'}} xml={getImage(item?.veg_non_veg)} />
              <Text numberOfLines={1} style={styles.itemText} key={key}>
                {item?.title}
              </Text>
              <RatingStar rate={Number(item?.item_rating)} />
            </View>
          ))}
        </View>
      );
    } else {
      return null;
    }
  };

  const Review = () => {
    return (
      <View style={{marginTop: '-1%'}}>
        <Text style={styles.feedbackText}>{item?.review}</Text>
      </View>
    );
  };

  const renderItems = [
    {
      title: 'Restaurent Rating',
      item: <Rating rate={item?.rating} />,
    },
    {
      title: 'Dish Rating',
      item: <Items />,
    },
    {
      title: 'Review',
      item: <Review />,
    },
  ];

  return (
    <View style={styles.card}>
      <OrderStatus />
      {/* <OrderType  type={item?.orders?.order_type} /> */}
      <Text style={styles.pickedOn}>
        Picked on {OrderDate(item?.orders?.created_at)}
      </Text>
      {renderItems.map((item, key) => (
        <View key={key} style={styles.rovView}>
          <Text style={styles.itemTitle}>{item?.title} </Text>
          {item.item}
        </View>
      ))}

      <Line />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: '4%',
  },
  id: {
    fontFamily: fonts.semiBold,
    fontSize: RFValue(15),
  },
  statusBox: {
    backgroundColor: '#D9D9D9',
    borderRadius: 5,
    marginLeft: '2%',
    paddingHorizontal: '2%',
    paddingVertical: '1%',
  },
  status: {
    color: '#333333',
    fontSize: RFValue(11),
    fontFamily: fonts.Regular,
  },
  pickedOn: {
    color: '#8F8F8F',
    fontFamily: fonts.Regular,
    fontSize: RFValue(11),
    paddingVertical: '2%',
  },
  rovView: {
    // flexDirection: 'row',
    marginBottom: '4%',
  },

  itemTitle: {
    color: colors.black,
    fontFamily: fonts.medium,
    fontSize: RFValue(12),
    marginBottom: '2%',
  },
  feedbackText: {
    color: '#8F8F8F',
    fontFamily: fonts.Regular,
    fontSize: RFValue(12),
    lineHeight:20,
  },
  itemText: {
    // flex:1,
    fontFamily: fonts.medium,
    fontSize: RFValue(11),
    marginLeft: '3%',
    width: wp('60%'),
    marginRight: '1%',
  },
});
