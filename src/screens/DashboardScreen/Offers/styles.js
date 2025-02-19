import {StyleSheet} from 'react-native';
import {colors} from '../../../theme/colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.appBackground,
  },
  main: {
    marginHorizontal: 20,
    marginTop: '1%',
    justifyContent: 'center',
  },
  renderDataView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fhView: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  shView: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  noDataView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('30%'),
  },
});
