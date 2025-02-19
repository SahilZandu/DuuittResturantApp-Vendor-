import React from 'react';
import { Dimensions,View } from 'react-native'
import {SvgXml} from 'react-native-svg';

const size = Dimensions.get('window').height

const CircleIcon = ({bgColor, icon}) => (
      <View
      style={{
        height: size/17,
        width: size/17,
        borderRadius: size/10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:bgColor,
      }}>
      <SvgXml width={25} height={25} xml={icon} />
    </View>
);

export default CircleIcon;
