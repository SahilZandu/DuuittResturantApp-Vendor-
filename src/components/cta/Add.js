import React from 'react';
import {Text, Pressable, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {RFValue} from 'react-native-responsive-fontsize';
import {SvgXml} from 'react-native-svg';
import {fonts} from '../../theme/fonts/fonts';
import {colors} from '../../theme/colors';
import { appImagesSvg } from '../../commons/AppImages';

const AddCTA = ({onAdd, isProfile, bottom, textTransform}) => (
  <Pressable onPress={onAdd} style={styles.container(bottom)}>
    {isProfile ? (
      <SvgXml style={{right: wp('1.5%')}} xml={appImagesSvg?.avatarImg} />
    ) : (
      <SvgXml style={{right: wp('1.5%')}} xml={appImagesSvg?.addWhite} />
    )}
    <Text style={styles.addText(textTransform)}>ADD</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  container: bottom => ({
    position: 'absolute',
    backgroundColor: colors.lightGreen1,
    height: hp('5.2%'),
    borderRadius: 10,
    alignItems: 'center',
    // justifyContent: 'center',
    paddingHorizontal: '5%',
    flexDirection: 'row',
    right: 10,
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowColor: 'black',
    elevation: 8,
    shadowOffset: {
      height: 3,
      width: 3,
    },
    bottom: bottom ? bottom : hp('9%'),
    right: wp('-2%'),
  }),
  addText: textTransform => ({
    color: colors.white,
    fontSize: RFValue(13),
    fontFamily: fonts.semiBold,
    textTransform: textTransform ? textTransform : 'uppercase',
  }),
});

export default AddCTA;
