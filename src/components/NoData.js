import React from 'react';
import {Text, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts/fonts';


const NoData = ({message}) => (
    <Text
      style={{
        color:colors.black,
        marginHorizontal: 16,
        position: 'absolute',
        fontFamily: fonts.medium,
        alignSelf: 'center',
        top: '45%',
        fontSize: RFValue(13),
        lineHeight: 22,
        textAlign: 'center',
      }}>
      {message}
    </Text>
);

export default NoData;
