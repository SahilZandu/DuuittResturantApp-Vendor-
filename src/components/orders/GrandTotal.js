import React from 'react';
import {Text, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {fonts} from '../../theme/colors';
import {currencyFormat} from '../../helpers/currencyFormat';

const GrandTotal = ({amount}) => (
  <View
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '2%',
    }}>
    <Text
      style={{
        fontFamily: fonts.Regular,
        color: '#8F8F8F',
        fontSize: RFValue(15),
      }}>
      Grand Total
    </Text>
    <Text style={{fontFamily: fonts.medium, fontSize: RFValue(15)}}>
      {currencyFormat(amount)}
    </Text>
  </View>
);

export default GrandTotal;
