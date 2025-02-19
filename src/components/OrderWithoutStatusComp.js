import moment from 'moment';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {colors} from '../theme/colors';
import {fonts} from '../theme/fonts/fonts';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export default function OrdersWithoutStatusComp({item}) {
  const dateFormat = d => {
    var date = new Date(d);
    return moment(date).format('DD MMM YYYY [at] h:mmA');
  };

  return (
    <View style={styles.container}>
      <View style={styles.idNameView}>
        <Text numberOfLines={1} style={styles.trackingId}>
          #{item?.trackingId}
        </Text>

        <Text numberOfLines={1} style={styles.name}>
          {item?.restaurantName}
        </Text>
      </View>
      <View>
        <Text style={styles.dateTime}>{dateFormat(item?.date)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center ',
  },
  idNameView: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  trackingId: {
    flex: 1,
    fontSize: RFValue(16),
    fontFamily: fonts.semiBold,
    color: colors.black,
  },
  name: {
    fontSize: RFValue(13),
    fontFamily: fonts.medium,
    color: colors.black,
    width: wp('30%'),
  },
  dateTime: {
    fontSize: RFValue(11),
    fontFamily: fonts.medium,
    color: colors.color9A,
    marginTop: '1%',
  },
});
