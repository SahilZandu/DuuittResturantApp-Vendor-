import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {ItemType} from '../ItemType';
import {RFValue} from 'react-native-responsive-fontsize';

import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { currencyFormat } from '../../halpers/currencyFormat';
import { fonts } from '../../theme/fonts/fonts';
import { colors } from '../../theme/colors';

const CardItems = ({item, isExpand}) => {
  // console.log('item---CardItems', item);

  if (item?.order_items) {
    return item?.order_items
      ?.slice(0, isExpand ? item?.order_items.length : 3)
      ?.map((item, index) => (
        <View style={{marginBottom: '3%', flexWrap: 'wrap'}}>
          <View key={index} style={[styles.cardRow]}>
            <View style={{alignItems: 'center', flexDirection: 'row'}}>
              <ItemType type={item?.product?.veg_non_veg} />
              <Text style={styles.itemText}>
                {' '}
                {item?.quantity} x {item?.product_name}
              </Text>
            </View>
            <Text style={styles.amount}>
              {currencyFormat(item?.grand_total)}
            </Text>
          </View>
          {item?.varient_name?.length > 0 && (
            <View style={{marginLeft: '7%'}}>
              <Text style={styles.varientName}>{item?.varient_name}</Text>
            </View>
          )}
          {item?.orderitem_addon?.length > 0 && (
            <View style={styles.addonView}>
              {item?.orderitem_addon?.map((value, index) => {
                return (
                  <Text key={index} style={styles.addonText}>
                    {value?.addon_name}
                    {item?.orderitem_addon?.length - 1 > index ? ', ' : ''}
                  </Text>
                );
              })}
            </View>
          )}
        </View>
      ));
  } else {
    return null;
  }
};

export default CardItems;

const styles = StyleSheet.create({
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: '0.5%',
  },
  amount: {
    fontSize: RFValue(13),
    fontFamily: fonts.semiBold,
  },
  itemText: {
    fontSize: RFValue(12),
    fontFamily: fonts.semiBold,
  },
  varientName: {
    fontSize: RFValue(11),
    fontFamily: fonts.regular,
    color: colors.black,
    marginTop: '0.3%',
  },
  addonView: {
    flexDirection: 'row',
    width: wp('83%'),
    flexWrap: 'wrap',
    marginTop: '0.3%',
    marginLeft: '7%',
  },
  addonText: {
    fontSize: RFValue(11),
    fontFamily: fonts.regular,
    color: colors.black,
  },
});
