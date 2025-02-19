import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {colors} from '../theme/colors';
import {fonts} from '../theme/fonts/fonts';

export default function OrdersInstrucationsComp({item}) {
  return (
    <View style={styles.container}>
      <Text style={styles.instructionText}>
        Instructions:{' '}
        <Text style={styles.instInnerText}>{item?.instructions}</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.colorF5,
    borderRadius: 10,
    justifyContent: 'center',
    marginTop: '4%',
  },
  instructionText: {
    marginHorizontal: '2%',
    paddingVertical: '2%',
    fontSize: RFValue(11),
    fontFamily: fonts.bold,
    color: colors.main,
  },
  instInnerText: {
    fontFamily: fonts.medium,
    color: colors.black,
  },
});
