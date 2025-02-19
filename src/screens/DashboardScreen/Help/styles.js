import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {colors} from '../../../theme/colors';
import {fonts} from '../../../theme/fonts/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.appBackground,
  },
  mainRenderView: {
    marginHorizontal: 20,
    marginTop: '2%',
    justifyContent: 'center',
  },
  dropDownImageTouch: {
    flexDirection: 'row',
    marginTop: '3%',
    justifyContent: 'center',
  },
  hitSlot: {
    top: 15,
    bottom: 15,
    right: 5,
    left: 5,
  },
  nameText: {
    flex: 1,
    fontSize: RFValue(12),
    fontFamily: fonts.medium,
    color: colors.color43,
  },
  discriptionText: {
    fontSize: RFValue(12),
    fontFamily: fonts.medium,
    color: colors.color80,
    marginTop: '5%',
  },
  bottomLineView: {
    height: 1,
    backgroundColor: colors.colorD9,
    marginTop: '5%',
  },
});
