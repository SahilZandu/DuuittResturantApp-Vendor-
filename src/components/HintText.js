import React from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts/fonts';


const HintText = ({hint}) => {
  return (
    <View
      style={{
        borderRadius: 8,
        borderWidth: 1,
        marginVertical: '5%',
        padding: '3%',
        borderColor:colors.lightRed,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <Icon
        name={'lightbulb-on'}
        color={'rgba(249, 189, 0, 1)'}
        size={25}
      />
      <Text
        style={{
          marginLeft: '4%',
          marginRight: '6%',
          fontFamily: fonts.regular,
          color:colors.black
        }}>
        {hint}
      </Text>
    </View>
  );
};

export default HintText;
