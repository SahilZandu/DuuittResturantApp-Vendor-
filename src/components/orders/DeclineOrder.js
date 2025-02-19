import React from 'react';
import {Text, Pressable} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import { fonts } from '../../theme/fonts/fonts';


const DeclineOrder = ({onDecline, orderStatus}) => {
  const getTitle = () => {
    switch (orderStatus) {
      case 'waiting_for_confirmation':
        return 'Decline';
      case 'ready_to_pickup':
        return 'Not Picked';
      default:
        return 'Cancel';
    }
  };

  return (
    <Pressable onPress={onDecline}>
      <Text
        style={{
          color: '#CB2F2F',
          fontFamily: fonts.semiBold,
          textAlign: 'center',
          marginVertical: '2%',
          fontSize: RFValue(13),
        }}>
        {getTitle()}
      </Text>
    </Pressable>
  );
};

export default DeclineOrder;
