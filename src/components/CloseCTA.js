import React from 'react';
import {Pressable, Dimensions, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const size = Dimensions.get('window').height;

const CloseCTA = ({onPress,color,topHeight}) => (
  <Pressable
  onPress={onPress}
    style={{
      position: 'absolute',
      top:topHeight ? topHeight : '3%',
      right: '4%',
      padding: '3%',
      alignItems: 'center',
      justifyContent:'center'
    }}>
    <Icon name={'close'} size={size / 30} color={color ? color :'black'} />
  </Pressable>
);

export default CloseCTA;
