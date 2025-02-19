import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {SvgXml} from 'react-native-svg';
import {colors} from '../../../theme/colors';
import {fonts} from '../../../theme/fonts/fonts';

export default function SwitchTabs(props) {
  const {Icon, text, marginLeft, isActiveTab} = props;

  return (
    <View>
      <TouchableOpacity
        onPress={() => isActiveTab()}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: marginLeft ? marginLeft : '0%',
        }}>
        <SvgXml width={20} height={20} xml={Icon} />
        <Text
          style={{
            marginLeft: '5%',
            color: colors.black,
            fontFamily: fonts.medium,
            fontSize: RFValue(14),
          }}>
          {text}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
