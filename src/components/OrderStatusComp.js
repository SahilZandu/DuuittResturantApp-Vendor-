import moment from 'moment';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {colors} from '../theme/colors';
import {fonts} from '../theme/fonts/fonts';

export default function OrdersStatusComp({item}) {
  const dateFormat = d => {
    var date = new Date(d);
    return moment(date).format('DD MMM YYYY [at] h:mmA');
  };
  const onChangeBackColor = type => {
    switch (type) {
      case 'Preparing':
        return colors.main;
      case 'Packing':
        return colors.colorFF9;
      case 'Ready To Pickup':
        return colors.colorFC;
      default:
        return colors.main;
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.idStatusView}>
        <Text numberOfLines={1} style={styles.trackingId}>
          #{item?.trackingId}
        </Text>
        <View
          style={[
            styles.statusView,
            {
              backgroundColor: onChangeBackColor(item?.status),
            },
          ]}>
          <Text
            style={styles.statusText}>
            {item?.status}
          </Text>
        </View>
      </View>
      <View>
        <Text
          numberOfLines={1}
          style={styles.name}>
          {item?.restaurantName}
        </Text>
        <Text
          style={styles.dateTime}>
          {dateFormat(item?.date)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  idStatusView: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  trackingId: {
    flex: 1,
    fontSize: RFValue(16),
    fontFamily: fonts.semiBold,
    color: colors.black,
  },
  statusView: {
    paddingHorizontal: '3%',
    paddingVertical: '2%',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusText:{
    fontSize: RFValue(11),
    fontFamily: fonts.regular,
    color: colors.white,
  },
  name:{
    fontSize: RFValue(13),
    fontFamily: fonts.medium,
    color: colors.black,
  },
  dateTime:{
    fontSize: RFValue(11),
    fontFamily: fonts.medium,
    color: colors.color9A,
    marginTop: '1%',
  }
});
