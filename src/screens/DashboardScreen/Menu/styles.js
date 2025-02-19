import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {colors} from '../../../theme/colors';
import {fonts} from '../../../theme/fonts/fonts';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.appBackground,
  },
  noDataView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('-15%'),
  },
  noDataText: {
    fontSize: RFValue(14),
    fontFamily: fonts.medium,
    color: colors.black,
  },
});
