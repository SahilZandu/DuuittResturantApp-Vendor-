import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {currencyFormat} from '../halpers/currencyFormat';
import {colors} from '../theme/colors';
import {fonts} from '../theme/fonts/fonts';

export default function TotalBillComp({item}) {
  return (
    <View style={styles.container}>
      <Text style={styles.totalBill}>Total bill</Text>
      <View style={styles.billPaymentView}>
        <Text style={styles.billPayment}>{item?.billPayment}</Text>
      </View>
      <Text style={styles.totalPrice}>
        {currencyFormat(Number(item?.total))}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '5%',
  },
  totalBill: {
    fontSize: RFValue(14),
    fontFamily: fonts.medium,
    color: colors.black,
  },
  billPaymentView: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: '2%',
  },
  billPayment: {
    backgroundColor: colors.colorE5,
    width: '25%',
    textAlign: 'center',
    paddingVertical: '2%',
    fontSize: RFValue(11),
    fontFamily: fonts.regular,
    color: colors.color33,
    borderRadius: 5,
  },
  totalPrice: {
    fontSize: RFValue(13),
    fontFamily: fonts.semiBold,
    color: colors.black,
  },
});
