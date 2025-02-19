import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {colors} from '../../../../theme/colors';
import {fonts} from '../../../../theme/fonts/fonts';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.appBackground,
  },
  flatListView: {
    flex: 1,
    justifyContent: 'center',
    marginTop: '2%',
  },
  bottomBtnView: {
    justifyContent: 'center',
    backgroundColor: colors.appBackground,
    height: hp('8%'),
    position: 'absolute',
    bottom: 0.1,
    width: wp('100%'),
  },
  noDataView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: hp('40%'),
  },
  noItemText: {
    fontSize: RFValue(13),
    fontFamily: fonts.medium,
    color: colors.color8F,
    marginTop: '3%',
  },
});
