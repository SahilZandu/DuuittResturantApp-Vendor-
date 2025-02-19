import {View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { colors } from '../theme/colors';

export const Line = ({mainStyle}) => {
  return (
    <View
      style={[{
        height:1,
        backgroundColor:colors.colorD9,
        marginTop: '3%',
        // marginBottom:"1%",
        width: wp("93%"),
        // marginLeft:"-1%"
      },mainStyle]}></View>
  );
};
