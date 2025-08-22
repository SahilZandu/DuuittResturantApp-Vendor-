import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { colors } from '../../../theme/colors';
import { fonts } from '../../../theme/fonts/fonts';





export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.appBackground
  },
  main: {
    shadowColor: colors.black, // You can customize shadow color
    backgroundColor: colors.white,
    alignSelf: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    width: wp(92),
    height: hp(32),
    marginTop: '5%',
  },
  innerView:{
    marginHorizontal:20,
    marginTop:'3%',
    justifyContent:'center'
  },
  payoutsCredited:{
    fontSize: RFValue(13),
    fontFamily: fonts.medium,
    color: colors.main,
    marginTop:'1%',
  },
  hedingText:{
    fontSize: RFValue(12),
    fontFamily: fonts.semiBold,
    color: colors.black,
    marginTop:'3%'
  },
  payoutCycle:{
    fontSize: RFValue(12),
    fontFamily: fonts.medium,
    color: colors.black85,
    marginTop:'2%'
  },
  orderMainView:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  orderText:{
    fontSize: RFValue(12),
    fontFamily: fonts.medium,
    color: colors.black85,
    marginTop:'4%'
  },
  estimateText:{
    fontSize: RFValue(12),
    fontFamily: fonts.medium,
    color: colors.black85,
    marginTop:'4%'
  },
  statusText:{
    fontSize: RFValue(12),
    fontFamily: fonts.medium,
    color: colors.black85,
    marginTop:'3%',
    textTransform:'capitalize'
  },
  payoutDateText:{
    fontSize: RFValue(12),
    fontFamily: fonts.medium,
    color: colors.black85,
    marginTop:'4%'
  },
  NoDataView: {
    flex: 1, 
    justifyContent: 'center',
     alignItems: 'center',
  },
  noDataText: {
    fontSize: RFValue(13),
     fontFamily: fonts.medium,
    color: colors.black
  }

  
});
