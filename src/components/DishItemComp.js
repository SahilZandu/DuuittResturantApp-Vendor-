import moment from 'moment';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { SvgXml } from 'react-native-svg';
import { appImagesSvg } from '../commons/AppImages';
import { currencyFormat } from '../halpers/currencyFormat';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts/fonts';

export default function DishItemComp({ data }) {
  console.log("data---DishItemComp", data, data?.selected_add_on);

  const onChangeImage = type => {
    switch (type) {
      case 'veg':
        return appImagesSvg.vegIcon;
      case 'non-veg':
        return appImagesSvg.nonVeg;
      case 'egg':
        return appImagesSvg.eggIcon;
      default:
        return appImagesSvg.vegIcon;
    }
  };

  return (
    <>
      <View style={styles.container}>
        <SvgXml
          width={18}
          height={18}
          xml={
            onChangeImage(data?.veg_nonveg)
          }
          style={{ alignSelf: 'center' }}
        />
        <Text style={styles.name}>{data?.varient_name ? data?.varient_name : data?.food_item_name}</Text>
        {/* data?.name ?? "Test"}</Text> */}
        <Text style={styles.quanity}> X {data?.quantity}</Text>
        <Text style={styles.price}>{currencyFormat(Number(data?.varient_price ? data?.varient_price : data?.food_item_price))}</Text>
      </View>
      {data?.selected_add_on?.length > 0 && (
        <View style={styles.addonsView}>
          <Text numberOfLines={2} style={styles.addonsName}>
            {data?.selected_add_on?.map(item => item?.addon_name).join(', ')}
          </Text>
          <Text style={styles.addonsPrice}>
            {currencyFormat(
              data?.selected_add_on?.reduce((acc, item) => acc + Number(item?.addon_price || 0), 0)
            )}
          </Text>
        </View>
      )}
    </>
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
    color: colors.black,
  },
  price: {
    fontSize: RFValue(13),
    fontFamily: fonts.medium,
    color: colors.black,
  },
  addonsView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: '1%'
  },
  addonsName: {
    flex: 1,
    flexWrap: 'wrap',
    fontFamily: fonts.medium,
    fontSize: RFValue(11),
    color: colors.black85
  },
  addonsPrice: {
    marginLeft: 10,
    fontFamily: fonts.medium,
    fontSize: RFValue(11),
    color: colors.black
  }
});
