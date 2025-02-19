import React from 'react';
import {Text,Pressable} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {RFValue} from 'react-native-responsive-fontsize';
import {SvgXml} from 'react-native-svg';
import { fonts } from '../../theme/fonts/fonts';
import { colors } from '../../theme/colors';
import { appImagesSvg } from '../../commons/AppImages';


const AddItem = ({onAdd, title,imageNotShow}) => (
  <Pressable
    onPress={onAdd}
    style={{
      backgroundColor: 'rgba(29, 114, 30, 0.10)',
      height: hp('4%'),
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: '4%',
      flexDirection: 'row',
    }}>
   {!imageNotShow && <SvgXml style={{right:3,}} xml={appImagesSvg?.greenPlusBtn} /> }
    <Text
      style={{
        color:colors.green,
        fontSize: RFValue(12),
        fontFamily: fonts.medium,
        left : !imageNotShow ? 3 :0,
        textAlign:'center'
      }}>
      {/* {' '} */}
      {title}
    </Text>
  </Pressable>
);

export default AddItem;
