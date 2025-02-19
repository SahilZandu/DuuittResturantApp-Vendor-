import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {SvgXml} from 'react-native-svg';
import {colors} from '../theme/colors';
import {fonts} from '../theme/fonts/fonts';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {appImages} from '../commons/AppImages';
import {Surface} from 'react-native-paper';

const AddPhotoShowComp = ({onPress, image, onPressEdit, mainStyle}) => {
  return (
    <TouchableOpacity
      style={[styles.container, mainStyle]}
      activeOpacity={1}
      onPress={onPress}>
      <Surface elevation={2} style={styles.surfaceView}>
        <Image style={styles.image} source={{uri: image}} />
      </Surface>
      <TouchableOpacity
        activeOpacity={1}
        onPress={onPressEdit}
        style={styles.editBtn}>
        <Image
          style={{width: 40, height: 50}}
          source={appImages.editProfileImage}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default AddPhotoShowComp;

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
  image: {
    width: wp('30%'),
    height: hp('14%'),
    borderRadius: 10,
  },
  editBtn: {
    position: 'absolute',
    right: '0.1%',
    bottom: hp('-3.5%'),
  },
});
