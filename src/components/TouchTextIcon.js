import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { SvgXml } from 'react-native-svg';
import { appImagesSvg } from '../commons/AppImages';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts/fonts';

const TouchTextIcon = ({ item, index }) => {
  const getColor = () => {
    switch (item?.status) {
      case 'fill detail':
        return colors.color00A;
      case 'pending':
        return colors.colorFC;
      case 'approved':
        return colors.green;
      default:
        return colors.color00A;
    }
  };

  return (
    <TouchableOpacity
      id={index?.toString()}
      activeOpacity={0.8}
      disabled={item?.disable}
      onPress={item?.onPress}
      key={index}
      style={styles.main}>
      <View style={styles.innerView}>
        <SvgXml height={25} width={25} xml={item?.icon} />

        <Text numberOfLines={1} style={styles.title}>
          {item?.title}
        </Text>

        <View
          style={[styles.statusView, { borderColor: getColor(item?.status) }]}>
          <Text style={[styles.statusText, { color: getColor(item?.status) }]}>
            {item?.status}
          </Text>
        </View>

        {item?.title != 'Logout' && (
          <SvgXml
            height={22}
            width={22}
            style={{ marginLeft: 'auto' }}
            xml={appImagesSvg.rightArrow}
          />
        )}
      </View>
      {item?.title != 'Logout' && <View style={styles.bottomLine} />}
    </TouchableOpacity>
  );
};

export default TouchTextIcon;

const styles = StyleSheet.create({
  main: {
    justifyContent: 'center',
  },
  innerView: {
    flexDirection: 'row',
    marginTop: '6%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    fontSize: RFValue(14),
    fontFamily: fonts.regular,
    marginLeft: '3%',
    color: colors.color24,
    textTransform: 'capitalize'
  },
  statusView: {
    paddingVertical: '1.5%',
    paddingHorizontal: '5%',
    justifyContent: 'center',
    borderColor: colors.green,
    borderWidth: 1,
    borderRadius: 50,
    marginRight: '2%',
  },
  statusText: {
    textAlign: 'right',
    fontSize: RFValue(12),
    fontFamily: fonts.regular,
    color: colors.green,
    textTransform: 'capitalize'
  },
  bottomLine: {
    height: 2,
    backgroundColor: colors.colorD9,
    marginTop: '5%',
  },
});
