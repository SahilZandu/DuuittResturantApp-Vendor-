import {StyleSheet, Text} from 'react-native';
import React from 'react';

import { RFValue } from 'react-native-responsive-fontsize';
import { fonts } from '../theme/fonts/fonts';
import { colors } from '../theme/colors';

export default function ErrorMessage({error, visible,marginTop}) {
  if (error && visible) {
    return <Text style={styles.error(marginTop)}>{error}</Text>;
  }
  return null;
}

const styles = StyleSheet.create({
  error:(marginTop)=>({
    color:colors.red,
   fontFamily:fonts.medium,
   fontSize:RFValue(12),
   marginTop:marginTop?marginTop: '1.7%',
  }),
});
