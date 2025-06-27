import React, {useEffect, useState, useRef, useCallback} from 'react';
import {Text, View} from 'react-native';
import Header from '../../../../components/header/Header';
import NewOrdersCardDetails from '../../../../components/NewOrdersCardDeatils';
import NewOrdersRequestDetails from '../../../../components/NewOrdersRequestDetails';

import {styles} from './styles';
import { useFocusEffect } from '@react-navigation/native';
import handleAndroidBackButton from '../../../../halpers/handleAndroidBackButton';

export default function OrderDetails({navigation, route}) {
  const {item, onCookingTimeChnage, type} = route.params;
  // console.log('route--order', route, item);
  const [itemList, setItemList] = useState(item);
  const [orderType, setOrderType] = useState(type);

  useEffect(() => {
    setItemList(item);
    setOrderType(type);
  }, [item, type]);

  const onPressTime = (data, time) => {
    // console.log('data, time:', data, time);
    const updatedItemList = {...itemList, cookinTiming: time};
    setItemList(updatedItemList);
    onCookingTimeChnage(data, time);
  };

  useFocusEffect(
    useCallback(() => {
      handleAndroidBackButton(navigation);
    }, []),
  );


  return (
    <View style={styles.container}>
      <Header
        backArrow={true}
        title={'OrderDetails'}
        onPress={() => {
          navigation.goBack();
        }}
      />
      {orderType == 'NewOrders' ? (
        <NewOrdersCardDetails item={item} />
      ) : (
        <NewOrdersRequestDetails
          item={itemList}
          onCookingTimeChnage={onPressTime}
        />
      )}
    </View>
  );
}
