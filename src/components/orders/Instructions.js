import React from 'react';
import {View, Text} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { fonts } from '../../theme/fonts/fonts';
// import TrackPlayerAudio from '../trackPlayer/TrackPlayer';

const Instructions = ({order, setAudio, audio}) => {
  return (
    <View style={{flexDirection: 'row', 
    }}>
      <Text
        style={{
          color: '#1D721E',
          fontFamily: fonts.semiBold,
          fontSize: RFValue(13),
          marginRight: '1%',
        }}>
        Instructions:
      </Text>
      {/* <View>
      {order?.cooking_instructions_audio &&
         <TrackPlayerAudio
         uri={order.cooking_instructions_audio}
         id={order.id}
       />
      }
      {order?.cooking_instructions_text && <Text
          style={{
            color: 'black',
            fontFamily: fonts.Regular,
            marginTop: order?.cooking_instructions_audio ? "3%" : "1%",
            width:widthPercentageToDP("60%")
          }}>
          {order?.cooking_instructions_text}
        </Text>}
      </View> */}
    </View>
  );
};

export default Instructions;
