import React from 'react';
import {Text, Pressable, Dimensions} from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts/fonts';

const size = Dimensions.get('window').height;

const PendingReqView = ({text, onPress,marginHorizontal}) => (
  <Pressable
    style={{
      borderWidth: 0.7,
      marginTop: '3%',
      paddingHorizontal: '3%',
      paddingVertical: '2%',
      borderColor:colors.red,
      borderRadius: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginHorizontal:marginHorizontal?marginHorizontal: 20
    }}
    onPress={onPress}>
    <Text
      style={{
        fontFamily: fonts.regular,
        color: colors.colorEF,
        marginRight: '3%',
        width:wp('76%')
      }}>
      {text}
    </Text>
    <Icon name="information-circle-outline" color={colors.red} size={size / 36} />
  </Pressable>
);

export default PendingReqView;
