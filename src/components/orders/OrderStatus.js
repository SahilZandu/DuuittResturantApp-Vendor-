import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {SvgXml} from 'react-native-svg';
import {appImages} from '../../commons/AppImages';
import { OrderTime } from '../../halpers/OrderDate';
import { fonts } from '../../theme/fonts/fonts';

const OrderStatus = ({status, item}) => {
  const getBgColor = () => {
    switch (status) {
      case 'cooking':
        return '#1D721E';
      case 'packing_processing':
        return '#F9BD00';
      case 'ready_to_pickup':
        return '#FF8C22';
    }
  };

  const getText = () => {
    switch (status) {
      case 'cooking':
        return 'Preparing';
      case 'packing_processing':
        return 'Packing';
      case 'ready_to_pickup':
        return 'Ready to Pickup';
    }
  };

  const ArravingTime = () => {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <SvgXml xml={appImages.arraving} />
        <Text style={{fontFamily: fonts.regular, fontSize: RFValue(11)}}>
          {' '}
          Arriving in : {item?.cust_duration}
        </Text>
      </View>
    );
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      {item?.status !== 'waiting_for_confirmation' ? (
        <View
          style={{
            backgroundColor: getBgColor(),
            padding: '1%',
            borderRadius: 6,
          }}>
          <Text
            style={{
              fontSize: RFValue(12),
              color: '#FFFFFF',
              fontFamily: fonts.Regular,
            }}>
            {' '}
            {getText()}{' '}
          </Text>
        </View>
      ) : (
        <ArravingTime />
      )}

      <Text style={styles.timeText}>{OrderTime(item?.created_at)}</Text>
    </View>
  );
};

export default OrderStatus;

const styles = StyleSheet.create({
  timeText: {
    color: '#8F8F8F',
    fontSize: RFValue(10),
    fontFamily: fonts.medium,
  },
});
