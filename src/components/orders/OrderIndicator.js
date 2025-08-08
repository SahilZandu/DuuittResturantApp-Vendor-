import React, { useState, useCallback, useEffect } from 'react';
import { View, Pressable, Text, DeviceEventEmitter, Image } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/Entypo';
import { Badge, FAB } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import { useFocusEffect } from '@react-navigation/native';
import { rootStore } from '../../stores/rootStore';
import { fonts } from '../../theme/fonts/fonts';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { colors } from '../../theme/colors';
import { isScreenAccess } from '../../halpers/AppPermission';
import { appImages } from '../../commons/AppImages';



const OrderIndicator = ({ navigation, isHashOrders }) => {
  const { appUser } = rootStore.commonStore;
  const { getNewOrder, newOrderList } = rootStore.orderStore;
  const [hashOrder, setHashOrder] = useState(newOrderList?.length > 0 ? true : false);
  const [badge, setBadge] = useState(newOrderList?.length > 0 ? newOrderList?.length : 0);
  const [isOrderIndicator, setIsOrderIndicator] = useState(newOrderList?.length > 0 ? true : false);
  // const [isOrderScreenAccess, setIsOrderScreenAccess] = useState(isScreenAccess(6));



  useFocusEffect(
    useCallback(() => {
      if (isScreenAccess(6) === true) {
        // setHashOrder(true)
        // setIsOrderIndicator(true)
        getNewOrdersData();
        const intervalId = setInterval(() => {
          getNewOrdersData();
          console.log('timer running getNewOrders');
        },60000);
        return () => clearInterval(intervalId);
      }
    }, []),
  );

  useEffect(() => {
    const subscription = DeviceEventEmitter.addListener('newOrder', data => {
      console.log('cancel Order data -- ', data);
      getNewOrdersData();
    });
    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    const subscription = DeviceEventEmitter.addListener('cancelOrder', data => {
      console.log('cancel Order data -- ', data);
      getNewOrdersData();
    });
    return () => {
      subscription.remove();
    };
  }, []);


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
            paddingVertical: hp('1.5%'),
            flexDirection: 'row',
            paddingHorizontal: 20,
            alignItems: 'center',
            justifyContent: 'center',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,

          }}>
          <Image
            style={{ width: 55, height: 55, marginTop: '-3%', }}
            source={appImages.bellGif}
          />
          <Text
            style={{
              color: colors.white,
              fontFamily: fonts.semiBold,
              fontSize: RFValue(13),
              marginTop: '-4%',
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
              alignSelf: 'center',
              marginTop: '-4%'
            }}>
            {badge}
          </Badge>
          <View style={{ marginLeft: 'auto', marginTop: '-4%' }}>
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
