import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import moment from 'moment';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {fonts} from '../../theme/fonts/fonts';
import {colors} from '../../theme/colors';
import {currencyFormat} from '../../halpers/currencyFormat';
import {Line} from '../../halpers/Line';
import {appImagesSvg} from '../../commons/AppImages';
import CircleIcon from '../CircleIcon';

export default function PaymentsCard({item}) {
  const dateFormat = d => {
    var date = new Date(d);
    return moment(date).format('DD MMM YYYY [at] h:mmA');
  };

  console.log('item PaymentsCard---',item)

  const getColor = status => {
    switch (status) {
        case 'withdraw':
          return colors.green;
          case 'refund':
            return colors.yellow;
            case 'captured':
              return colors.red;
      default:
        return colors.red;
    }
  };

  const getCircleColor = status => {
    switch (status) {
        case 'withdraw':
          return colors.green;
          case 'refund':
            return colors.red;
            case 'captured':
              return colors.red;
      default:
        return colors.red;
    }
  };

  const getStatusText = status => {
    switch (status) {
      case 'withdraw':
        return 'Withdraw';
      case 'refund':
        return 'Refund';
        case 'captured':
          return 'Captured';
      default:
        return 'Completed';
    }
  };

  return (
    <View>
      <View style={styles.conatiner}>
        <CircleIcon
          bgColor={getCircleColor(item?.status)}
          icon={appImagesSvg?.payment}
        />
        <View style={styles.innerView}>
          <View style={styles.flexDractionView}>
            <Text numberOfLines={1} style={styles.id}>
              ID : {item?.order_id}
            </Text>
            <Text numberOfLines={1} style={styles.time}>
              {dateFormat(item?.created_at)}
            </Text>
          </View>
          <View style={styles.flexDractionView}>
            <Text numberOfLines={1} style={styles.nameText}>
              {item?.name}
            </Text>
            <Text style={[styles.amount]}>
              {currencyFormat(item?.total_amount)}
            </Text>
          </View>
          <View style={styles.flexDractionView}>
            <Text numberOfLines={1} style={styles.transitionId}>
              TID : {item?.transaction_number}
            </Text>
            <Text style={[styles.status, {color: getColor(item?.status)}]}>
              {getStatusText(item?.status)}
            </Text>
          </View>
        </View>
      </View>
      <Line mainStyle={styles.bottomLineView} />
    </View>
  );
}

const styles = StyleSheet.create({
  conatiner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '2%',
  },
  innerView: {
    flex: 1,
    marginLeft: '3%',
    marginTop: '1%',
  },
  amount: {
    marginLeft: 'auto',
    color: colors.black,
    fontFamily: fonts.bold,
    fontSize: RFValue(14),
  },

  id: {
    color: colors.black,
    fontSize: RFValue(14),
    fontFamily: fonts.medium,
    width: wp('40%'),
  },
  nameText: {
    fontSize: RFValue(14),
    fontFamily: fonts.semiBold,
    color: colors.black,
    width: wp('58%'),
  },
  time: {
    color: colors.color8F,
    fontSize: RFValue(11),
    fontFamily: fonts.medium,
    marginTop: '1%',
  },
  transitionId: {
    color: colors.black,
    fontSize: RFValue(11),
    fontFamily: fonts.medium,
    marginTop: '1%',
    width:wp('58%')
  },
  status: {
    color: colors.color8F,
    fontSize: RFValue(11),
    fontFamily: fonts.medium,
    marginTop: '1%',
  },
  flexDractionView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: '0.5%',
  },
  bottomLineView: {
    marginTop: '4%',
    width: wp('100%'),
    marginHorizontal: -20,
  },
});
