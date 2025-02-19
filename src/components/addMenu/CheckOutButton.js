import React from 'react';
import {Text,View,  StyleSheet,Platform} from 'react-native';
import {Switch} from 'react-native-paper';
import {RFValue} from 'react-native-responsive-fontsize';
import { colors } from '../../theme/colors';
import { fonts } from '../../theme/fonts/fonts';

 export default function CheckOutButton({value,onValueChange,TextName,mainStyle}) {

return (
<View style={[styles.container,mainStyle]}>
<Switch
    style={{transform:Platform.OS === 'ios' ? 
    [{scaleX: 0.8}, {scaleY: 0.7}] 
   :[{scaleX: 1}, {scaleY: 0.9}]}}
  value={value}
  trackColor={{false: colors.colorE5, true:colors.green}}
  thumbColor={value? colors.white : colors.white}
  onValueChange={onValueChange}
/>
<Text style={styles.Outlet}>{TextName}</Text>
</View>
)
};


const styles = StyleSheet.create({
  
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 16
    },
    Outlet: {
        marginLeft:5,
      fontSize: RFValue(14),
      fontFamily: fonts.medium,
      color: colors.black,
    },
});


