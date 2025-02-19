import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {colors} from '../../theme/colors';
import {fonts} from '../../theme/colors';
import {currencyFormat} from '../../helpers/currencyFormat';
import {ItemType} from '../ItemType';
import {DotView} from '../../helpers/DotView';
import {OrderDate} from '../../helpers/OrderDate';
import OrderType from '../orders/OrderType';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

export default function OrderCard({
  id,
  time,
  name,
  status,
  items,
  itemTotal,
  tax,
  packingfee,
  type,
  grandTotal,
  discount,
}) {
  const ID = () => {
    return (
      <View style={styles.cardRow}>
        <Text style={styles.idText} numberOfLines={1}>
          #{id}
        </Text>
        <Text style={styles.timeText}>{OrderDate(time)}</Text>
      </View>
    );
  };

  const getStatus = () => {
    switch (status) {
      case 'completed':
        return 'Completed';

      default:
        return status;
    }
  };

  const getBgColor = () => {
    switch (status) {
      case 'completed':
        return '#1D721E';

      default:
        return '#CB2F2F';
    }
  };

  const Status = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginTop: '3%',
          justifyContent: 'space-between',
        }}>
        <Text style={styles.orderName}>{name}'s Order</Text>
        <View
          style={[styles.statusView, {backgroundColor: getBgColor(status)}]}>
          <Text style={styles.statusText}>{getStatus()}</Text>
        </View>
      </View>
    );
  };

  const TextView = ({title, price}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: '3%',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: '#8F8F8F',
            fontFamily: fonts.Regular,
            fontSize: title == 'Grand Total' ? RFValue(15) : RFValue(13),
          }}>
          {title}
        </Text>
        <Text
          style={{
            fontFamily: fonts.medium,
            fontSize: RFValue(14),
          }}>
         {title == 'Discount' ?'-':''} {currencyFormat(price)}
        </Text>
      </View>
    );
  };
  

  const CardItems = () => {
    if (items && items?.length != 0) {
      return items?.map((item, index) => (
        <View style={{marginBottom: '3%'}}>
          <View key={index} style={[styles.cardRow]}>
            <View style={{alignItems: 'center', flexDirection: 'row'}}>
              <ItemType type={item?.product?.veg_non_veg} />
              <Text style={styles.itemText}>
                {item?.quantity} x {item?.product_name}
              </Text>
            </View>
            <Text style={styles.amount}>
              {currencyFormat(item?.grand_total)}
            </Text>
          </View>

          {item?.varient_name?.length > 0 && (
            <View style={{marginLeft: '7%'}}>
              <Text style={styles.varientName}>{item?.varient_name}</Text>
            </View>
          )}
          {item?.orderitem_addon?.length > 0 && (
            <View style={styles.addonView}>
              {item?.orderitem_addon?.map((value, index) => {
                return (
                  <Text key={index} style={styles.addonText}>
                    {value?.addon_name}
                    {item?.orderitem_addon?.length - 1 > index ? ', ' : ''}
                  </Text>
                );
              })}
            </View>
          )}
        </View>
      ));
    }
  };

  // const getItemsTotal = () => {
  //   if (items) {
  //     let t = 0;
  //     items?.map(item => (t = t + item?.grand_total));
  //     return t;
  //   } else {
  //     return 0;
  //   }
  // };

  return (
    <View style={styles.card}>
      <ID />
      <Status />
      <View style={{alignSelf: 'flex-end', paddingTop: '3%'}}>
        <OrderType type={type} />
      </View>
      <Text></Text>

      <CardItems />
      <DotView />
      <TextView title={'Item total'} price={Number(itemTotal)} />
     {discount > 0 && <TextView title={'Discount'} price={Number(discount)} /> }
      <TextView title={'Restaurant Charges'} price={packingfee} />
      <TextView title={'Taxes'} price={tax} />
      <DotView />
      <TextView title={'Grand Total'} price={Number(grandTotal)} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: '5%',
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeText: {
    color: '#8F8F8F',
    fontSize: RFValue(11),
    fontFamily: fonts.Regular,
  },
  idText: {
    color: '#000000',
    fontSize: RFValue(13),
    fontFamily: fonts.semiBold,
    lineHeight: 22,
    maxWidth: '60%',
  },
  orderName: {
    color: colors.main,
    fontFamily: fonts.semiBold,
    fontSize: RFValue(13),
    marginVertical: '1%',
  },
  statusView: {
    paddingVertical: '1%',
    paddingHorizontal: '3%',
    borderRadius: 5,
    justifyContent: 'center',
  },
  statusText: {
    color: 'white',
    fontSize: RFValue(11),
    fontFamily: fonts.Regular,
    textTransform: 'capitalize',
  },
  amount: {
    fontSize: RFValue(12),
    fontFamily: fonts.semiBold,
  },
  itemText: {
    fontSize: RFValue(11),
    fontFamily: fonts.medium,
    marginLeft: '4%',
    color: colors.black,
  },
  varientName: {
    fontSize: RFValue(11),
    fontFamily: fonts.Regular,
    color: colors.black,
    marginTop: '0.3%',
  },
  addonView: {
    flexDirection: 'row',
    width: wp('83%'),
    flexWrap: 'wrap',
    marginTop: '0.3%',
    marginLeft: '7%',
  },
  addonText: {
    fontSize: RFValue(11),
    fontFamily: fonts.Regular,
    color: colors.black,
  },
});
