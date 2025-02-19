import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {colors} from '../theme/colors';
import {fonts} from '../theme/fonts/fonts';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {appImages} from '../commons/AppImages';
import {currencyFormat} from '../halpers/currencyFormat';
import moment from 'moment';
import {Line} from '../halpers/Line';

export default function OrderHistoryCard({item}) {
  const statusColor = status => {
    switch (status) {
      case 'Completed':
        return colors.lightGreen1;
      case 'Decline':
        return colors.colorE1;
      default:
        return colors.lightGreen1;
    }
  };

  const dateFormat = d => {
    var date = new Date(d);
    return moment(date).format('DD MMM YYYY [at] h:mmA');
  };

  return (
    <View style={styles.main}>
      <View style={styles.upperView}>
        <View style={styles.innerView}>
          <Image
            resizeMode="contain"
            style={styles.image}
            source={appImages.orderHistoryImage}
          />
          <View style={styles.textMainView}>
            <View style={styles.idNameView}>
              <Text style={styles.idtext}>#{item?.id}</Text>
              <Text style={styles.nameText}>{item?.name}</Text>
              <Text style={styles.dateText}>{dateFormat(item?.date)}</Text>
            </View>
            <View style={styles.rateStatusView}>
              <Text style={styles.rateText}>{currencyFormat(item?.price)}</Text>
              <Text
                style={[styles.statusText, {color: statusColor(item?.status)}]}>
                {item?.status}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <Line mainStyle={{width: wp('100%')}} />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    justifyContent: 'center',
    marginTop: '4%',
  },
  upperView: {
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  innerView: {flexDirection: 'row'},
  image: {
    width: 50,
    height: 50,
  },
  textMainView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  idNameView: {
    flex: 1,
    marginLeft: '4%',
    justifyContent: 'center',
  },
  idtext: {
    fontSize: RFValue(14),
    fontFamily: fonts.semiBold,
    color: colors.black,
  },
  nameText: {
    fontSize: RFValue(12),
    fontFamily: fonts.medium,
    color: colors.black,
    marginTop: '2%',
  },
  dateText: {
    fontSize: RFValue(12),
    fontFamily: fonts.medium,
    color: colors.color90,
    marginTop: '2%',
  },
  rateStatusView: {
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
  rateText: {
    fontSize: RFValue(14),
    fontFamily: fonts.semiBold,
    color: colors.black,
  },
  statusText: {
    fontSize: RFValue(12),
    fontFamily: fonts.medium,
    color: colors.lightGreen1,
    marginTop: '2%',
  },
});
