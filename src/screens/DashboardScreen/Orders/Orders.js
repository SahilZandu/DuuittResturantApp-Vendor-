import React, {useCallback, useEffect, useState} from 'react';
import {Image, Text, View} from 'react-native';
import DashboardHeader from '../../../components/header/DashboardHeader';
import Tabs from '../../../components/Tabs';
import {orderArray} from '../../../stores/DummyData/Order';
import {styles} from './styles';
import NewOrdersCard from '../../../components/NewOrdersCard';
import {appImages} from '../../../commons/AppImages';
import OrderIndicator from '../../../components/orders/OrderIndicator';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import FlastListAnimated from '../../../components/FlatListAnimated/FlastListAnimated';
import moment from 'moment';
import {rootStore} from '../../../stores/rootStore';
import { useFocusEffect } from '@react-navigation/native';
import handleAndroidBackButton from '../../../halpers/handleAndroidBackButton';
import KYCDocumentPopUp from '../../../components/appPopUp/KYCDocumentPopup';

const tabs = [
  {id: 0, text: 'All Orders', count: 3},
  {id: 1, text: 'Preparing', count: 3},
  {id: 2, text: 'Picked Up', count: 3},
  {id: 3, text: 'Ready', count: 3},
];

export default function Orders({navigation}) {
  const {appUser} = rootStore.commonStore;
  const [orderList, setOrderList] = useState( 
    // orderArray
    []
  );

  const timerCheck = item => {
    const givenTimestamp = new Date().getTime();
    const format = 'DD-MM-YYYY HH:mm:ss';
    // Parse the given timestamp
    const givenMoment = moment(givenTimestamp, format);

    // Get the current date and time
    const currentMoment = moment();
    // console.log("givenTimestamp---",givenTimestamp,givenMoment,currentMoment)
    // Calculate the difference in milliseconds
    const duration = moment.duration(currentMoment.diff(givenMoment));

    // Extract the difference in minutes
    const totalMinutes = duration.asMinutes();

    console.log('totalMinutes--', totalMinutes, item?.cooking_time, item);

    if (totalMinutes < Number(item?.cooking_time)) {
      const newTime = Number(item?.cooking_time) - totalMinutes;
      const newSeconds = newTime * 60;
      // const newSeconds = 2 * 60;
      // Update the timerSecond state for the specific item
      item.timerSecond = newSeconds;
    } else {
      item.timerSecond = 0;
    }
  };
  const onCookingTimeChnage = () => {
    console.log('onCookingTimeChnage');
  };

  useFocusEffect(
    useCallback(() => {
      handleAndroidBackButton();
    }, []),
  );

  return (
    <View style={styles.container}>
      <DashboardHeader navigation={navigation} />
      <View style={{flex: 1}}>
        {orderList?.length > 0 ? (
          <View>
            <Tabs tabs={tabs} isCount={true} />
            <View style={styles.innerView}>
              <GestureHandlerRootView style={{flex: 0}}>
                {/* {loading ? (
            <AnimatedLoader type={'orders'} />
          ) : ( */}
                <FlastListAnimated
                  paddingBottom={'60%'}
                  scrollEnabled={true}
                  items={orderList}
                  id={'id'}
                  outAnimation={'fadeOutRight'}
                  duration={900}
                  rowItem={({item, index}) => {
                    timerCheck(item);
                    return (
                      <NewOrdersCard
                        item={item}
                        onViewDetails={() => {
                          navigation.navigate('orderDetails', {
                            item: item,
                            onCookingTimeChnage: onCookingTimeChnage,
                            type: 'NewOrders',
                          });
                        }}
                      />
                    );
                  }}
                />
                {/* )} */}
              </GestureHandlerRootView>
            </View>
          </View>
        ) : (
          <View style={styles.receiveOrderView}>
            <Image
              // resizeMode={'contain'}
              style={{width: 120, height: 120}}
              source={appImages.cookingGif}
            />
            <Text style={styles.receiveHoursText}>
              We have received 245+ Orders In 1 Hour
            </Text>
            <Text style={styles.bePatientText}>
              Be patient you will start receiving orders soon
            </Text>
          </View>
        )}
      </View>
       <OrderIndicator
        navigation={navigation}
        isHashOrders={s => console.log('s',s)}
       />
       {/* {appUser?.is_kyc_completed !== true && <KYCDocumentPopUp
        appUserData={appUser}
        navigation={navigation} />} */}
    </View>
  );
}
