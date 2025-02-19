import React from 'react';
import {Pressable, TextInput, Text, View, Platform} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {colors} from '../../../theme/colors';
import { fonts } from '../../../theme/fonts/fonts';

export default function TimePicker(props) {
  const {onPress, text, timeZone, value, onPressIn} = props;
  return (
    <Pressable
      onPress={onPress}
      style={{
        flexDirection: 'row',
        borderRadius: 8,
        borderColor: 'rgba(0, 0, 0, 1)',
        backgroundColor:colors.white,
        paddingHorizontal: hp('1%'),
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        marginHorizontal: 16,
        marginBottom: hp('2%'),
        height: hp('5%'),
        marginTop: hp('1%'),
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            width: widthPercentageToDP('15%'),
            fontFamily: fonts.regular,
            alignSelf: 'center',
            fontSize: RFValue(14),
            color: 'rgba(143, 143, 143, 1)',
            marginLeft: hp('1%'),
          }}>
          {text}
        </Text>
        <TextInput
          editable={false}
          onPressIn={() => onPressIn()}
          style={{
            fontSize: RFValue(14),
            fontFamily: fonts.regular,
            alignSelf: 'center',
            paddingVertical: 0,
          }}
          value={value ? value : 'Select'}
          placeholder={'Select'}
          placeholderTextColor={colors.black}></TextInput>
      </View>
      <View
        style={{
          backgroundColor: 'rgba(249, 189, 0, 1)',
          width: widthPercentageToDP('10%'),
          padding: hp('0.5%'),
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 8,
        }}>
        <Text
          style={{
            color: colors.whiteBackground,
            fontFamily: fonts.regular,
            fontSize: RFValue(12),
          }}>
          {timeZone}
        </Text>
      </View>
    </Pressable>
  );
}
