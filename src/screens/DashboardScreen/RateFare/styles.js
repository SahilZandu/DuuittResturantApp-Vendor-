import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { colors } from '../../../theme/colors';
import { fonts } from '../../../theme/fonts/fonts';





export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.appBackground
  },

  main: {
    shadowColor: colors.black, // You can customize shadow color
    backgroundColor: colors.colorD6,
    alignSelf: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    width: wp(92),
    height: hp(48),
    marginTop: '5%',
  },
  dotView: {
    marginHorizontal: 20, justifyContent: 'center'
  },
  renderFareView: {
    marginTop: '0.5%', justifyContent: 'center'
  },
  oderFareLine: {
    height: 2, backgroundColor: colors.colorD9, marginTop: '3%',
    marginHorizontal:15
  },
  extraSurface: {
    shadowColor: colors.black, // You can customize shadow color
    backgroundColor: colors.colorDo6,
    alignSelf: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    width: wp(92),
    height: hp(28.5),
    marginTop: '5%',
  },
  commissionSurface: {
    shadowColor: colors.black10, // You can customize shadow color
    backgroundColor: colors.colorFC15,
    alignSelf: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    width: wp(92),
    height: hp(33),
    marginTop: '5%',
  },
  NoDataView: {
    flex: 1, 
    justifyContent: 'center',
     alignItems: 'center',
  },
  noDataText: {
    fontSize: RFValue(13),
     fontFamily: fonts.medium,
    color: colors.black
  }
});
