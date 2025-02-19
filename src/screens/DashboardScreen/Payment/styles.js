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
  sectionListView: {
    flex: 1,
    justifyContent: 'center',
    marginTop: '1%',
  },
  titleListView: {
    backgroundColor: colors.lightGreen,
    marginHorizontal: -20,
    justifyContent: 'center',
  },
  sectionTitle: {
    paddingVertical: '3%',
    color: colors.color90,
    fontFamily: fonts.medium,
    fontSize: RFValue(13),
    marginLeft: '7%',
  },
  noDataText: {
    color: colors.black,
    marginHorizontal: 16,
    fontFamily: fonts.medium,
    marginTop: hp('32%'),
    fontSize: RFValue(12),
    lineHeight: 20,
    textAlign: 'center',
  },
});
