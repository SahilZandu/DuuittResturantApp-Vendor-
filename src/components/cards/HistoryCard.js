import React from 'react';
import {StyleSheet, Text, View, Pressable} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {fonts} from '../../theme/colors';
import {currencyFormat} from '../../helpers/currencyFormat';
import {Line} from '../../helpers/Line';
import {appImages} from '../../commons/AppImages';
import CircleIcon from '../CircleIcon';
import {OrderDate} from '../../helpers/OrderDate';
import OrderType from '../orders/OrderType';

export default function HistoryCard({item, navigation}) {
  const getStatus = () => {
    switch (item?.status) {
      case 'completed':
        return 'Completed';
      case 'not_picked' :
       return "Not Picked"
      default:
        return item?.status;
    }
  };

  const getBgColor = () => {
    switch (item.status) {
      case 'completed':
        return '#1D721E';

      default:
        return '#CB2F2F';
    }
  };

  return (
    <Pressable
      onPress={() => navigation.navigate('orderHisDetail', {item})}
      style={{marginBottom: '5%'}}>
      <View style={{flexDirection: 'row'}}>
        <CircleIcon icon={appImages.menu} bgColor={'#F9BD00'} />
        <View style={{marginLeft: '3%',justifyContent:'space-between'}}>
          <Text style={styles.id} numberOfLines={1}>
            #{item.order_id}
          </Text>
          <Text style={styles.name}>{item?.user?.user_name}'s Order</Text>
          <Text style={styles.amount}>{currencyFormat(item.total_amount)}</Text>
        </View>
        <View style={styles.rightView}>
          <View style={[styles.statusView, {backgroundColor: getBgColor()}]}>
            <Text style={styles.status}>{getStatus()}</Text>
          </View>
          <OrderType type={item?.order_type}   />
          <Text style={styles.time}> {OrderDate(item.created_at)} </Text>
        </View>
      </View>
      <Line />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  id: {
    color: '#000',
    fontSize: RFValue(14),
    fontFamily: fonts.medium,
  },
  name: {
    color: '#1D721E',
    fontFamily: fonts.medium,
    fontSize: RFValue(12),
   
  },
  amount: {
    color: '#000000',
    fontFamily: fonts.medium,
    fontSize: RFValue(13),
  },
  status: {
    color: 'white',
    fontSize: RFValue(11),
    fontFamily: fonts.Regular,
    textTransform: 'capitalize',
  },
  time: {
    color: 'rgba(51, 51, 51, 0.50)',
    fontSize: RFValue(11),
    fontFamily: fonts.Regular,
    marginTop:"5%"
  },
  rightView: {
    marginLeft: 'auto',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  statusView: {
    paddingHorizontal: '6%',
    paddingVertical: '2%',
    borderRadius: 5,
    marginBottom:"5%"
  },
});
