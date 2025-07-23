import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts/fonts';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Spacer from '../halpers/Spacer';
import BTN from './cta/BTN';
import { currencyFormat } from '../halpers/currencyFormat';

export default function OffersCardComp({ onPressDetails, item, BtnColor, backgroundColor, onPress, selectedItem }) {
  console.log("item--OffersCardComp", item);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPressDetails}
      style={styles.main(backgroundColor)}>
      <Spacer space={hp('1.5%')} />
      {item?.discount_type === "percentage" ?
        <Text
          numberOfLines={1}
          style={styles.discountText(item)}>
          {item?.discount_price}% discount
        </Text> :
        <Text
          numberOfLines={1}
          style={styles.discountText(item)}>
          Rs.{item?.discount_price} discount
        </Text>}
      <Text
        style={styles.rateText(item)}>
        on order upto {currencyFormat(Number(item?.usage_conditions?.min_order_value))}
      </Text>
      <Spacer space={hp('4.5%')} />
      <BTN
        backgroundColor={BtnColor}
        borderColor={BtnColor}
        height={hp('4%')}
        width={wp('35%')}
        title={item?.is_vendor_accepted === true ? 'Deactivate Now' : 'Activate Now'}
        textTransform={'capatilize'}
        onPress={onPress}
        loading={item?._id == selectedItem?._id}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  main: (backgroundColor) => ({
    height: hp('17%'),
    width: wp('43%'),
    backgroundColor: backgroundColor,
    marginTop: hp(2),
    borderRadius: 10,
    borderWidth: 0.3,
    borderColor: colors.colorD9,
    justifyContent: 'center',
    alignItems: 'center',
  }),
  discountText: (item) => ({
    fontSize: RFValue(15),
    fontFamily: fonts.medium,
    color: colors.black,
    opacity: item?.is_vendor_accepted === true ? 0.5 : 1,

  }),
  rateText: (item) => ({
    fontSize: RFValue(12),
    fontFamily: fonts.medium,
    color: colors.black75,
    marginTop: '4%',
    opacity: item?.is_vendor_accepted === true ? 0.5 : 1,

  })
});
