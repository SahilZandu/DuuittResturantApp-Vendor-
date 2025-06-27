import React, { useEffect, useState } from 'react';
import { Image, Platform, StyleSheet, Text, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { colors } from '../../theme/colors';
import { fonts } from '../../theme/fonts/fonts';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { appImagesSvg } from '../../commons/AppImages';
import { SvgXml } from 'react-native-svg';
import BottomLine from '../../halpers/BottomLine';
import MenuToggleStock from './MenuToggleStock';

export default function GroupItemCard({
  item,
  index,
  onPressToggle,
  onDelete,
  onEditPress,
  isMenuScreen,
  isMenuStockScreen
}) {
  const onPressToggleData = status => {
    onPressToggle(item, status);
  };

  return (
    <View style={[styles.container]}>
      <View pointerEvents={isMenuScreen ? 'none' : 'auto'} style={[styles.innerView, { opacity: !isMenuScreen ? 1 : 0.5 }]}>
        <Text style={styles.groupText}>{item?.name}</Text>
        <Text style={{ flex: 1 }} />
        <SvgXml
          onPress={() => {
            onDelete(item, index);
          }}
          hitSlop={styles.hitDeleteSlot}
          width={24}
          height={24}
          style={{ right: '3%' }}
          xml={appImagesSvg.deleteGrey}
        />
        <SvgXml
          onPress={() => {
            onEditPress(item);
          }}
          hitSlop={styles.hitEditSlot}
          width={18}
          height={18}
          xml={appImagesSvg.editGrey}
        />
      </View>
      <View pointerEvents={isMenuStockScreen ? 'none' : 'auto'} style={[styles.toggleView]}>
        <MenuToggleStock
          onPressToggle={onPressToggleData}
          left={true}
          stock={item?.status}
          status={'active'}
        />
      </View>
      <BottomLine borderStyle={'solid'} borderColor={colors.colorD9} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: '4%',
  },
  innerView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  groupText: {
    fontSize: RFValue(13),
    fontFamily: fonts.semiBold,
    color: colors.black,
    width: wp('78%'),
  },
  toggleView: {
    justifyContent: 'center',
    marginTop: '2%',
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
});
