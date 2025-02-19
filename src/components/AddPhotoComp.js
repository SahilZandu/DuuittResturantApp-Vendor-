import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {SvgXml} from 'react-native-svg';
import {colors} from '../theme/colors';
import {fonts} from '../theme/fonts/fonts';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {appImagesSvg} from '../commons/AppImages';
import {Surface} from 'react-native-paper';
import FieldErrorMessage from './FieldErrorMessage';

const AddPhotoComp = ({onPress, mainStyle, imageValidations}) => {
  return (
    <View>
      <TouchableOpacity
        style={[styles.container, mainStyle]}
        activeOpacity={1}
        onPress={onPress}>
        <Surface elevation={2} style={styles.surfaceView}>
          <SvgXml xml={appImagesSvg.cameraSvg} />
          <Text style={styles.addText}>Add Photo</Text>
        </Surface>
      </TouchableOpacity>
      <View style={{justifyContent:'center',alignItems:'center'}}>
      <FieldErrorMessage
        error={imageValidations}
        visible={imageValidations?.length > 0 ? true : false}
      />
      </View>
    </View>
  );
};

export default AddPhotoComp;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
  },
  surfaceView: {
    height: hp('14%'),
    width: wp('30%'),
    marginLeft: 0,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addText: {
    fontSize: RFValue(13),
    fontFamily: fonts.medium,
    color: colors.colorB1,
    marginTop: '6%',
  },
});
