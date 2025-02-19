import moment from 'moment';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {SvgXml} from 'react-native-svg';
import {appImagesSvg} from '../commons/AppImages';
import {currencyFormat} from '../halpers/currencyFormat';
import {colors} from '../theme/colors';
import {fonts} from '../theme/fonts/fonts';

export default function DishItemComp({data}) {
  return (
    <View style={styles.container}>
      <SvgXml
        width={18}
        height={18}
        xml={
          data?.vegNonVeg == 'veg'
            ? appImagesSvg.vegIcon
            : appImagesSvg.nonVegIcon
        }
      />
      <Text style={styles.name}>{data?.name}</Text>
      <Text style={styles.quanity}> X {data?.quanity}</Text>
      <Text style={styles.price}>{currencyFormat(Number(data?.price))}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: '3%',
  },
  name: {
    fontSize: RFValue(13),
    fontFamily: fonts.regular,
    color: colors.black,
    marginLeft: '2%',
  },
  quanity: {
    flex: 1,
    fontSize: RFValue(13),
    fontFamily: fonts.regular,
    color: colors.color64,
  },
  price: {
    fontSize: RFValue(13),
    fontFamily: fonts.medium,
    color: colors.black,
  },
});
