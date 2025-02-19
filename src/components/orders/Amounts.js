import React from 'react';
import {Text, View} from 'react-native';
import {fonts} from '../../theme/colors';
import {currencyFormat} from '../../helpers/currencyFormat';
import {RFValue} from 'react-native-responsive-fontsize';

const Amounts = ({order}) => {
  // console.log("order--",order)
  const getItemsTotal = () => {
    return order?.item_sub_total_amount;
    // if (order.order_items) {
    //   let t = 0;
    //   order?.order_items.map((item) => (t = t + item.product_price));
    //   return t;
    // } else {
    //   return 0;
    // }
  };

  const orderAmounts = [
    {title: 'Item total', amount: getItemsTotal(), show: true},
    {
      title: 'Discount',
      amount: order?.coupon_amount,
      show: order?.coupon_amount > 0 && order?.coupon_code?.length > 0,
    },
    {title: 'Taxes', amount: order?.tax_amount, show: true},
    {title: 'Restaurant Charges', amount: order?.packing_fee, show: true},
  ];

  const RenderItem = ({item, key}) => {
    return (
      <>
        {item?.show == true && (
          <View
            key={key}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '2%',
            }}>
            <Text
              style={{
                fontFamily: fonts.Regular,
                color: '#8F8F8F',
                fontSize: RFValue(13),
              }}>
              {item?.title}
            </Text>
            <Text style={{fontFamily: fonts.medium, fontSize: RFValue(15)}}>
              {item?.title == 'Discount' ? '-' : ''}
              {currencyFormat(item?.amount)}
            </Text>
          </View>
        )}
      </>
    );
  };

  return (
    <View>
      {orderAmounts?.map((item, key) => (
        <RenderItem item={item} key={key} />
      ))}
    </View>
  );
};

export default Amounts;
