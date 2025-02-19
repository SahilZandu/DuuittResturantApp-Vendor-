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
  flatList: {
    justifyContent: 'center',
    backgroundColor: colors.appBackground,
    // marginHorizontal:20
  },
  noDataText: {
    color: colors.black,
    marginHorizontal: 16,
    fontFamily: fonts.medium,
    marginTop: hp('32%'),
    fontSize: RFValue(13),
    lineHeight: 20,
    textAlign: 'center',
  },
});
