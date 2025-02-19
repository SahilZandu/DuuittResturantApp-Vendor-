import {Platform, StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {colors} from '../../../theme/colors';
import {fonts} from '../../../theme/fonts/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.appBackground,
  },
  userDetailsView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadowUserCard: {
    shadowColor: Platform.OS == 'ios' ? colors.black50 : colors.black, // You can customize shadow color
    backgroundColor: colors.white,
    alignSelf: 'center',
    borderRadius: 10,
    width: wp('90%'),
    height: hp('12%'),
    marginTop: '-13%',
    borderWidth: 1,
    borderColor: colors.colorD9,
    justifyContent: 'center',
  },
  userCardView: {
    flexDirection: 'row',
  },
  userImage: {
    width: 60,
    height: 60,
    borderRadius: 100,
    marginLeft: '5%',
    borderWidth: 0.3,
    borderColor: colors.main,
  },
  innerMainView: {
    flex: 1,
    marginLeft: '3%',
    justifyContent: 'center',
  },
  nameIconview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nameText: {
    width: wp('55%'),
    fontSize: RFValue(17),
    fontFamily: fonts.medium,
    color: colors.black,
  },
  editTouch: {
    marginRight: '7%',
    justifyContent: 'center',
  },
  emailText: {
    fontSize: RFValue(13),
    fontFamily: fonts.medium,
    color: colors.black75,
    marginTop: '2%',
  },
  phoneText: {
    fontSize: RFValue(13),
    fontFamily: fonts.medium,
    color: colors.black75,
    marginTop: '2%',
  },

  renderItemContainer: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  touchRender: {
    justifyContent: 'center',
  },
  renderView: {
    flexDirection: 'row',
    marginTop: '5%',
  },
  title: {
    fontSize: RFValue(14),
    fontFamily: fonts.regular,
    marginLeft: '3%',
    color: colors.color24,
  },
  bottomLineView: {
    height: 2,
    backgroundColor: colors.colorD9,
    marginTop: '5%',
  },
  modalView: {
    height: hp('62%'),
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalInnerView: {
    justifyContent: 'center',
    marginHorizontal: 20,
    paddingVertical: '5%',
  },
});
