import {StyleSheet} from 'react-native';
import {colors} from '../../../theme/colors';
import { RFValue } from 'react-native-responsive-fontsize';
import { fonts } from '../../../theme/fonts/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.appBackground,
  },
  innerView:{
    marginHorizontal:20,
    justifyContent:'center'
  },
  IdStatusView:{
    flexDirection:'row',
    alignItems:'center',
    marginTop:'5%',
  },
  IdText:{
    flex:1,
    fontSize:RFValue(15),
    fontFamily:fonts.semiBold,
    color:colors.black
  },
  statusText:{
    fontSize:RFValue(13),
    fontFamily:fonts.medium,
    color:colors.main,
    textTransform:'capitalize'
  },
  nameDateView:{
 flexDirection:'row',
    alignItems:'center',
    marginTop:'5%',
  },
  nameText:{
    flex:1,
    fontSize:RFValue(13),
    fontFamily:fonts.semiBold,
    color:colors.black
  },
  dateText:{
    fontSize:RFValue(12),
    fontFamily:fonts.regular,
    color:colors.color80
  },
  foodMainView:{
  marginTop:'5%',
  },
  foodItemView:{
    flexDirection:'row',
    alignItems:'center',
    marginTop:'3%'
  },
  quantity:{
    fontSize:RFValue(14),
    fontFamily:fonts.medium,
    color:colors.black,
    marginLeft:'2%'
  },
  foodName:{
    flex:1,
    fontSize:RFValue(14),
    fontFamily:fonts.medium,
    color:colors.black,
    marginLeft:'2%'
  },
  foodPrice:{
    fontSize:RFValue(15),
    fontFamily:fonts.medium,
    color:colors.black,
  }

});
