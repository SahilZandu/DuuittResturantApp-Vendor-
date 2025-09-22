import React, {useEffect, useState} from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {colors} from '../../theme/colors';
import {fonts} from '../../theme/fonts/fonts';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {appImages, appImagesSvg} from '../../commons/AppImages';
import {SvgXml} from 'react-native-svg';
import {currencyFormat} from '../../halpers/currencyFormat';
import BottomLine from '../../halpers/BottomLine';
import Url from '../../api/Url';

export default function AddItemCard({item, onPressSelected}) {
  // console.log('item--', item);

  const onStatus = type => {
    switch (type) {
      case 'veg':
        return appImagesSvg?.vegIcon;
      case 'non-veg':
        return appImagesSvg?.nonVegIcon;
      case 'egg':
        return appImagesSvg?.eggIcon;
      default:
        return appImagesSvg?.vegIcon;
    }
  };

  return (
    <TouchableOpacity
      onPress={() => {
        onPressSelected(item);
      }}
      activeOpacity={0.8}>
      <View style={styles.container}>
        <View style={styles.innerMainView}>
          <Image
            resizeMode="cover"
            style={styles.image}
            source={
              item?.image?.length > 0
                ? {uri:item?.image}
                : appImages.dummyFoodImage
            }
          />
          <View style={styles.textBtnView}>
            <View style={styles.btnView}>
              <SvgXml width={18} height={18} xml={onStatus(item?.veg_nonveg)} />
              <View style={styles.tagView}>
                <Text style={styles.tagText}>
                  {item?.tag?.length > 0 ? item?.tag : 'Mostly Order'}
                </Text>
              </View>
            </View>
            <View style={styles.textMainView}>
              <Text numberOfLines={1} style={styles.nameText}>
                {item?.name}
              </Text>
              <Text numberOfLines={1} style={styles.descriptionText}>
                {item?.description}
              </Text>
              <Text numberOfLines={1} style={styles.price}>
                {currencyFormat(Number(item?.selling_price))}
              </Text>
            </View>
            <View style={styles.chechBoxView}>
              <SvgXml
                width={20}
                height={20}
                xml={
                  item?.groupAdded == true
                    ? appImagesSvg.checkBox
                    : appImagesSvg.unCheckBox
                }
              />
            </View>
          </View>
        </View>
        <BottomLine />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    justifyContent: 'center',
    marginTop: '4%',
  },
  innerMainView: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  image: {
    width: wp('34%'),
    height: hp('16%'),
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: colors.green,
  },
  textBtnView: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: '2%',
  },
  btnView: {
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  textMainView: {
    marginTop: '2%',
    justifyContent: 'center',
  },
  nameText: {
    fontSize: RFValue(13),
    fontFamily: fonts.semiBold,
    color: colors.color33,
  },
  descriptionText: {
    fontSize: RFValue(11),
    fontFamily: fonts.medium,
    color: colors.color9A,
    marginTop: '2%',
  },
  price: {
    fontSize: RFValue(15),
    fontFamily: fonts.medium,
    color: colors.color83,
    marginTop: '2%',
  },
  tagView: {
    backgroundColor: colors.colorFF9,
    borderRadius: 10,
    justifyContent: 'center',
    height: hp('2.8%'),
    paddingHorizontal: '4%',
    marginLeft: '4%',
  },
  tagText: {
    fontSize: RFValue(10),
    fontFamily: fonts.medium,
    color: colors.white,
    textAlign: 'center',
  },
  chechBoxView: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginTop: '5%',
  },
});
