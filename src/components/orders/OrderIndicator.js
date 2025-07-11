import React, { useState, useCallback } from 'react';
import { View, Pressable, Text } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/Entypo';
import { Badge, FAB } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import { useFocusEffect } from '@react-navigation/native';
import { rootStore } from '../../stores/rootStore';
import { fonts } from '../../theme/fonts/fonts';
// import { isScreenAccess } from '../../helpers/AppPermission';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { colors } from '../../theme/colors';


const OrderIndicator = ({ navigation, isHashOrders }) => {
  const { appUser } = rootStore.commonStore;
  const { getNewOrder, newOrderList } = rootStore.orderStore;
  const [hashOrder, setHashOrder] = useState(newOrderList?.length > 0 ? true : false);
  const [badge, setBadge] = useState(newOrderList?.length > 0 ? newOrderList?.length : 0);
  const [isOrderIndicator, setIsOrderIndicator] = useState(newOrderList?.length > 0 ? true : false);
  // const [isOrderIndicator, setIsOrderIndicator] = useState(isScreenAccess(6));



  useFocusEffect(
    useCallback(() => {
      // if (isScreenAccess(6) === true) {
      getNewOrdersData();
      // }
      // setHashOrder(true)
      // setIsOrderIndicator(true)

    }, []),
  );

  const getNewOrdersData = async () => {
    const newOrders = await getNewOrder(appUser);
    if (newOrders && newOrders?.length != 0) {
      setBadge(newOrders?.length);
      setHashOrder(true);
      setIsOrderIndicator(true)
      isHashOrders(true)
    } else {
      setBadge(newOrders?.length);
      setHashOrder(false);
      isHashOrders(false)
      setIsOrderIndicator(false)
    }
  };

  if (hashOrder && isOrderIndicator) {
    return (
      <Animatable.View
        animation="pulse"
        duration={2000}
        //delay={10000}
        easing={'ease-in'}
        iterationCount={'infinite'}
        style={{
          position: 'abslute', bottom: hp("6.5%"),
          width: "100%"
        }}
      >
        <Pressable
          onPress={() => navigation.navigate('newOrder')}
          style={{
            backgroundColor: colors.green,
            paddingVertical: '4.5%',
            flexDirection: 'row',
            paddingHorizontal: 20,
            alignItems: 'center',
            justifyContent: 'center',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,

          }}>
          <Text
            style={{
              color: colors.white,
              fontFamily: fonts.semiBold,
              fontSize: RFValue(13),
              marginTop: '-2%'
            }}>
            New Orders
          </Text>
          <Badge
            size={22}
            style={{
              backgroundColor: colors.white,
              fontFamily: fonts.medium,
              fontSize: RFValue(12),
              marginLeft: '2%',
              color: colors.green,
              marginTop: '-2%'
            }}>
            {badge}
          </Badge>
          <View style={{ marginLeft: 'auto', marginTop: '-2%' }}>
            <Icon name={'chevron-up'} size={25} color={colors.white} />
          </View>
        </Pressable>
      </Animatable.View>
    );
  } else {
    return null;
  }
};

export default OrderIndicator;
