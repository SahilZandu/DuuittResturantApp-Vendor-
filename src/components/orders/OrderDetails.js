import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Linking} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  heightPercentageToDP as wp,
  widthPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {SvgXml} from 'react-native-svg';
import { appImagesSvg} from '../../commons/AppImages';
import { colors } from '../../theme/colors';
import { fonts } from '../../theme/fonts/fonts';
import OrderType from './OrderType';

const OrderDetails = ({item}) => {
  const hanldeLinking = () => {
    Linking.openURL(`tel:${Number(item?.user?.mobile)}`);
  };

  return (
    <>
      <View style={styles.cardRow}>
        <Text style={styles.orderName}>
          {item?.user?.name ? item?.user?.user_name : 'Foodlemon'} 's Order
        </Text>
        <OrderType type={item?.order_type} />
      </View>
      {item?.status != 'waiting_for_confirmation' && (
        <TouchableOpacity
          onPress={() => {
            hanldeLinking();
          }}
          activeOpacity={0.8}
          style={styles.touchCallBtn}>
          <Text style={styles.customerText}>customer contact</Text>
          <SvgXml style={{marginLeft: '4%'}} xml={appImagesSvg.phone} />
        </TouchableOpacity>
      )}
    </>
  );
};

export default OrderDetails;

const styles = StyleSheet.create({
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: '1%',
  },
  orderName: {
    color: colors.main,
    fontFamily: fonts.semiBold,
    fontSize: RFValue(11),
    width: '60%',
  },

  timeText: {
    color: '#8F8F8F',
    fontSize: RFValue(10),
    fontFamily: fonts.regular,
  },
  touchCallBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    width: wp('40%'),
    height: hp('3%'),
    marginTop: '-1%',
    marginBottom: '2%',
  },
  customerText: {
    color: colors.main,
    fontFamily: fonts.semiBold,
    fontSize: RFValue(11),
  },
});
