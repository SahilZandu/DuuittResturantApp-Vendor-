import React, { useEffect, useState } from 'react';
import { Image, Platform, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { colors } from '../../theme/colors';
import { fonts } from '../../theme/fonts/fonts';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { appImages, appImagesSvg } from '../../commons/AppImages';
import { SvgXml } from 'react-native-svg';
import { currencyFormat } from '../../halpers/currencyFormat';
import BottomLine from '../../halpers/BottomLine';
import MenuToggleStock from './MenuToggleStock';
import Url from '../../api/Url';

export default function MenuItemCard({
  item,
  index,
  editShow,
  toggleShow,
  onDelete,
  onEditPress,
  onPressToggle,
}) {

  // console.log("item--MenuItemCard",item);
  const [loading, setLoading] = useState(true);

  const onPressToggleData = status => {
    onPressToggle(item, status);
  };

  const statusImage = status => {
    switch (status) {
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
    <View style={styles.container}>
      <View style={styles.innerMainView}>
        <View style={styles.imageView}>
          {loading && (
            <ActivityIndicator
              size='large'
              color={colors.green}
              style={styles.loader}
            />

          )}
          <Image
            resizeMode="cover"
            style={styles.image}
            source={
              item?.image?.length > 0
                ? { uri: Url?.Image_Url + item?.image }
                : appImages?.dummyFoodImage
            }
            onLoadStart={() => setLoading(true)}
            onLoadEnd={() => setLoading(false)}
          />
        </View>
        <View style={styles.textBtnView}>
          <View style={styles.btnView}>
            <SvgXml
              width={18}
              height={18}
              xml={statusImage(item?.veg_nonveg)}
            />
            <Text style={{ flex: 1 }} />
            <SvgXml
              onPress={() => {
                onDelete(item, index);
              }}
              hitSlop={styles.hitDeleteSlot}
              style={{ right: editShow ? '5%' : 0 }}
              width={24}
              height={24}
              xml={appImagesSvg.deleteGrey}
            />
            {editShow && (
              <SvgXml
                onPress={() => {
                  onEditPress(item);
                }}
                hitSlop={styles.hitEditSlot}
                width={18}
                height={18}
                xml={appImagesSvg.editGrey}
              />
            )}
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
          <View style={styles.tagToggleView}>
            <View style={styles.tagView}>
              <Text style={styles.tagText}>
                {item?.tag == 'null' || item?.tag == null
                  ? 'Mostly Order'
                  : item?.tag}
              </Text>
            </View>
            <Text style={{ flex: 1 }} />
            {toggleShow && <View style={styles.toggleView}>
              <MenuToggleStock
                onPressToggle={onPressToggleData}
                stock={item?.in_stock}
                status={'stock'}
              />
            </View>}
          </View>
        </View>
      </View>
      <BottomLine />
    </View>
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
  imageView: {
    width: wp('34%'),
    height: hp('16%'),
    borderRadius: 10,
    borderWidth: 0.3,
    borderColor: colors.green,
  },
  image: {
    width: wp('34%'),
    height: hp('16%'),
    borderRadius: 10,
    // borderWidth: 0.3,
    // borderColor: colors.green,
  },
  textBtnView: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: '2%',
  },
  btnView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hitEditSlot: {
    top: 20,
    bottom: 20,
    left: 10,
    right: 20,
  },
  hitDeleteSlot: {
    top: 20,
    bottom: 20,
    left: 20,
    right: 10,
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
  tagToggleView: {
    flexDirection: 'row',
    marginTop: '4%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagView: {
    backgroundColor: colors.colorFF9,
    borderRadius: 10,
    justifyContent: 'center',
    height: hp('2.8%'),
    paddingHorizontal: '4%',
  },
  tagText: {
    fontSize: RFValue(10),
    fontFamily: fonts.medium,
    color: colors.white,
    textAlign: 'center',
  },
  toggleView: {
    justifyContent: 'center',
  },
  loader: {
    marginTop: hp('6%'),
    alignSelf: 'auto'
  },

});
