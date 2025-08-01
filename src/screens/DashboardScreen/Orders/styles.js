import { StyleSheet } from 'react-native';
import { colors } from '../../../theme/colors';
import { RFValue } from 'react-native-responsive-fontsize';
import { fonts } from '../../../theme/fonts/fonts';

export const styles = StyleSheet.create({
  container: (orderList) => ({
    flex: 1,
    backgroundColor: orderList?.length > 0 ? colors.appBackground : colors.white,
  }),
  screen: {
    flex: 1,
    backgroundColor: 'rgba(100, 100, 100, 0.8)',
  },
  innerView: {
    justifyContent: 'center',
    marginTop: '1%',
  },
  NoDataView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '50%',
  },
  NoDataText: {
    fontSize: RFValue(15),
    fontFamily: fonts.medium,
    color: colors.black,
  },

  receiveOrderView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 25,
    marginTop: '-25%',
  },
  receiveHoursText: {
    fontSize: RFValue(15),
    fontFamily: fonts.medium,
    color: colors.main,
    marginTop: '4%',
  },
  bePatientText: {
    fontSize: RFValue(12),
    fontFamily: fonts.regular,
    color: colors.color8F,
    marginTop: '2%',
  },
});
