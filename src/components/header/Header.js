import React, { useEffect, useState } from 'react';
import { Pressable, Text, TouchableOpacity, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { SvgXml } from 'react-native-svg';
import { appImagesSvg } from '../../commons/AppImages';
import { colors } from '../../theme/colors';
import { fonts } from '../../theme/fonts/fonts';

const Header = ({
  onPress,
  title,
  backArrow,
  shareIcon,
  onPressShare,
  onPressPhone,
  bottomLine,
  rightText,
  onPressRight
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: colors.appBackground,
        alignItems: 'center',
        paddingBottom: '3%',
        marginTop: '1%',
        borderBottomWidth: bottomLine ? bottomLine : 0,
        borderBottomColor: bottomLine ? colors.colorD9 : 'transparent',
      }}>
      {backArrow && (
        <TouchableOpacity
          activeOpacity={0.9}
          hitSlop={{ top: 10, bottom: 10, left: 20, right: 20 }}
          onPress={onPress}
          style={{ marginLeft: '4%' }}>
          <SvgXml xml={appImagesSvg.backArrow} />
        </TouchableOpacity>
      )}
      <Text
        style={{
          flex: 1,
          fontSize: RFValue(15),
          fontFamily: fonts.semiBold,
          color: colors.black,
          marginLeft: backArrow ? '3%' : '6%',
          // textAlign: backArrow ?'left': 'center'
        }}>
        {title}
      </Text>
      {shareIcon && (
        <TouchableOpacity
          hitSlop={{ top: 10, bottom: 10, left: 20, right: 20 }}
          activeOpacity={0.9}
          onPress={onPressShare}
          style={{ marginRight: '5%' }}>
          <SvgXml xml={appImagesSvg.shareIcon} />
        </TouchableOpacity>
      )}
      {onPressPhone && (
        <TouchableOpacity
          hitSlop={{ top: 10, bottom: 10, left: 20, right: 20 }}
          activeOpacity={0.9}
          onPress={onPressPhone}
          style={{ marginRight: '5%' }}>
          <SvgXml xml={appImagesSvg.phoneChatIcon} />
        </TouchableOpacity>
      )}
      {rightText && (
        <TouchableOpacity
          hitSlop={{ top: 10, bottom: 10, left: 20, right: 20 }}
          activeOpacity={0.9}
          onPress={onPressRight}
          style={{ marginRight: '5%' }}>
          <Text style={{ fontSize: RFValue(13), 
            fontFamily: fonts.semiBold,
             color: colors.red }}>{rightText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;
