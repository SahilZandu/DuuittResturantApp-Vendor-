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
  topSeacrhMain: {
    marginTop: '3%',
    alignItems: 'center',
  },
  textView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryName: {
    flex: 1,
    fontSize: RFValue(13),
    fontFamily: fonts.medium,
    color: colors.black,
  },
  hitSlop: {
    top: 20,
    bottom: 20,
    right: 20,
    left: 20,
  },
  save: {
    fontSize: RFValue(14),
    fontFamily: fonts.medium,
    color: colors.green,
  },
  inputView: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: colors.colorD9,
    backgroundColor: colors.white,
    marginTop: '2%',
  },
  input: {
    width: wp('90%'),
    height: hp('5%'),
    paddingLeft: '4%',
    paddingRight: '2%',
    fontSize: RFValue(12),
    color: colors.black,
    padding: 0,
  },
  activeView: {
    marginHorizontal: 20,
    justifyContent: 'center',
  },
  toggleView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '1%',
  },
  allItemsText: {
    fontSize: RFValue(15),
    fontFamily: fonts.medium,
    color: colors.color09,
    marginTop: '2%',
  },
  flatListView: {
    flex: 1,
    justifyContent: 'center',
    marginTop: '2%',
  },
  noDataView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: hp('25%'),
  },
  noItemText: {
    fontSize: RFValue(13),
    fontFamily: fonts.medium,
    color: colors.color8F,
    marginTop: '3%',
  },
  bottomBtnView: {
    justifyContent: 'center',
    backgroundColor: colors.appBackground,
    height: hp('8%'),
    position: 'absolute',
    bottom: 0.1,
    width: wp('100%'),
  },
});
