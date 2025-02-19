import React, {useEffect, useState, useCallback} from 'react';
import {FlatList, View, KeyboardAvoidingView} from 'react-native';
import Header from '../../../components/header/Header';
import Tabs from '../../../components/Tabs';
import {styles} from './styles';
import SearchInputComp from '../../../components/SearchInputComp';
import {orderHistory} from '../../../stores/DummyData/Order';
import NoData from '../../../components/NoData';
import AnimatedLoader from '../../../components/AnimatedLoader/AnimatedLoader';
import OrderHistoryCard from '../../../components/OrderHistoryCard';
import {useFocusEffect} from '@react-navigation/native';
import handleAndroidBackButton from '../../../halpers/handleAndroidBackButton';

const tabs = [
  {
    text: 'All Orders',
  },
  {
    text: 'Completed',
  },
  {
    text: 'Declined',
  },
];
export default function OrderHistory({navigation}) {
  const [orderHistArray, setOrderHistArray] = useState(orderHistory);
  const [searchValue, setSeachValue] = useState('');
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      handleAndroidBackButton(navigation);
    }, []),
  );

  useEffect(() => {
    setOrderHistArray(orderHistory);
  }, [orderHistory]);

  const renderItem = ({item, i}) => {
    return <OrderHistoryCard item={item} />;
  };

  return (
    <View style={styles.container}>
      <Header
        onPress={() => {
          navigation.goBack();
        }}
        backArrow={true}
        title={'Order History'}
        bottomLine={1}
      />
      <SearchInputComp
        value={searchValue}
        onChangeText={item => {
          setSeachValue(item);
        }}
      />
      <Tabs tabs={tabs} />
      <KeyboardAvoidingView behavior={'padding'} style={{flex: 1}}>
        {loading == true ? (
          <AnimatedLoader type={'orderHistoryLoader'} />
        ) : (
          <View style={styles.flatlistView}>
            {orderHistArray?.length > 0 ? (
              <FlatList
                data={orderHistArray}
                renderItem={renderItem}
                keyExtractor={item => item?.id?.toString()}
                contentContainerStyle={{paddingBottom: '40%'}}
                showsVerticalScrollIndicator={false}
              />
            ) : (
              <NoData message={'Order Not Found'} />
            )}
          </View>
        )}
      </KeyboardAvoidingView>
    </View>
  );
}
