import {Text, View, StyleSheet} from 'react-native';
import {appImagesSvg} from '../../commons/AppImages';
import {SvgXml} from 'react-native-svg';
import {RFValue} from 'react-native-responsive-fontsize';
import {fonts} from '../../theme/fonts/fonts';
import {colors} from '../../theme/colors';

export function ScreenBlockComponent() {
  return (
    <View style={styles.container}>
      <SvgXml width={'100%'} height={'30%'} style={styles.image} xml={appImagesSvg.blockScreenLogo} />
      <View style={styles.textView}>
        <Text style={styles.text}>Not Authorized</Text>
        <Text style={styles.secondText}>
          Verify that your user account or permissions are sufficient.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 30,
  },
  textView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:'3%',
  },
  image: {
    resizeMode: 'contain',
    marginTop: '-20%',
  },
  text: {
    fontSize: RFValue(22),
    fontFamily: fonts.semiBold,
    color: colors.green,
    textAlign: 'center',
    marginTop:'1%',
  },
  secondText: {
    fontSize: RFValue(14),
    fontFamily: fonts.medium,
    color: colors.black,
    textAlign: 'center',
    marginTop:'4%',
  },
});
