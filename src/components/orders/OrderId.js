import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import { currencyFormat } from '../../halpers/currencyFormat';
import { fonts } from '../../theme/fonts/fonts';



const OrderId = ({item}) => {
  return (
    <View style={styles.cardRow}>
      <Text style={styles.idText} numberOfLines={1}>
        #{item?.order_id}
      </Text>

      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={styles.amount}>
          {currencyFormat(item?.total_amount)}
          {'  '}
        </Text>
        <View style={styles.statusBox}>
          <Text style={styles.status}>Paid</Text>
        </View>
      </View>
    </View>
  );
};

export default OrderId;

const styles = StyleSheet.create({
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: '0.5%',
  },
  idText: {
    color: '#000000',
    fontSize: RFValue(14),
    fontFamily: fonts.medium,
    lineHeight: 22,
    width: '60%',
  },
  amount: {
    fontSize: RFValue(13),
    fontFamily: fonts.semiBold,
  },
  statusBox: {
    backgroundColor: '#D9D9D9',
    borderRadius: 5,
  },
  status: {
    color: '#333333',
    fontSize: RFValue(11),
    fontFamily: fonts.regular,
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 5,
  },
});
