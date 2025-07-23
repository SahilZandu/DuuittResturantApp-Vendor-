import {StyleSheet} from 'react-native';
import {colors} from '../../../theme/colors';
import {fonts} from '../../../theme/fonts/fonts';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {RFValue} from 'react-native-responsive-fontsize';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.appBackground,
  },
  noDataFoundView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('-10%'),
  },
  noDataFoundText: {
    alignSelf: 'center',
    fontFamily: fonts.medium,
    fontSize: RFValue(14),
    color: colors.black,
  },
  button: {
    paddingHorizontal: '4%',
    height: hp('12%'),
    marginTop: '3%',
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: colors.colorD6,
    justifyContent: 'space-between',
  },
  mainContainer: {
    paddingVertical: '4%',
    justifyContent: 'center',
  },
  nameText: {
    fontSize: RFValue(12),
    fontFamily: fonts.bold,
    color: colors.black65,
  },
  currencyView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '2%',
  },
  currencyText: {
    fontSize: RFValue(13),
    fontFamily: fonts.semiBold,
    color: colors.black,
    marginLeft: '4%',
    marginTop: hp('2%'),
  },
  qImageView: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 0.7,
  },
  popContainer: {
    borderRadius: 10,
    padding: 15,
    paddingHorizontal: 15,
    width: wp('90%'),
    alignSelf: 'center',
  },
  popUpText: {
    fontSize: RFValue(14),
    fontFamily: fonts.medium,
    lineHeight: 22,
    color: colors.black85,
  },
  popUpOuterText: {
    fontSize: RFValue(14),
    fontFamily: fonts.semiBold,
    color: colors.black,
  },
});
