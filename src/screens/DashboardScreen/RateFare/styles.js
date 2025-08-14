import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { colors } from '../../../theme/colors';





export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.appBackground
  },

  main: {
    shadowColor: colors.black, // You can customize shadow color
    backgroundColor: colors.white,
    alignSelf: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    width: wp(92),
    height: hp(52.5),
    marginTop: '5%',
  },
  dotView: {
    marginHorizontal: 20, justifyContent: 'center'
  },
  renderFareView: {
    marginTop: '0.5%', justifyContent: 'center'
  },
  oderFareLine: {
    height: 2, backgroundColor: colors.colorD9, marginTop: '3%'
  },
  extraSurface: {
    shadowColor: colors.black, // You can customize shadow color
    backgroundColor: colors.white,
    alignSelf: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    width: wp(92),
    height: hp(29),
    marginTop: '5%',
  },
  commissionSurface: {
    shadowColor: colors.black, // You can customize shadow color
    backgroundColor: colors.white,
    alignSelf: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    width: wp(92),
    height: hp(33.5),
    marginTop: '5%',
  }
});
