import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, View, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import Header from '../../../components/header/Header';
import Tabs from '../../../components/Tabs';
import { styles } from './styles';
import SearchInputComp from '../../../components/SearchInputComp';
import { orderHistory } from '../../../stores/DummyData/Order';
import NoData from '../../../components/NoData';
import AnimatedLoader from '../../../components/AnimatedLoader/AnimatedLoader';
import OrderHistoryCard from '../../../components/OrderHistoryCard';
import { useFocusEffect } from '@react-navigation/native';
import handleAndroidBackButton from '../../../halpers/handleAndroidBackButton';
import { rootStore } from '../../../stores/rootStore';
import { colors } from '../../../theme/colors';

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

let defaultType = 'All Orders'
let perPage = 100;

export default function OrderHistory({ navigation }) {
  const { getOrderHistory, orderHistoryList, getHistorybyFilters } = rootStore.orderStore;
  const { appUser } = rootStore.commonStore
  const [orderHistArray, setOrderHistArray] = useState(orderHistoryList ?? []);
  const [searchValue, setSeachValue] = useState('');
  const [debouncedSearchValue, setDebouncedSearchValue] = useState("");
  const [loading, setLoading] = useState(orderHistoryList?.length > 0 ? false : true);
  const [loadingMore, setLoadingMore] = useState(false);

  useFocusEffect(
    useCallback(() => {
      handleAndroidBackButton(navigation);
      getOrderHistoryData();
    }, []),
  );

  // useEffect(() => {
  //   setOrderHistArray(orderHistory);
  // }, [orderHistory]);

  const getOrderHistoryData = async () => {
    const res = await getOrderHistory(appUser, defaultType, perPage, searchValue, handleLoading);
    console.log("res---getOrderHistoryData", res);
    setLoadingMore(false);
    setOrderHistArray(res);
  }

  const handleLoading = (v) => {
    setLoading(v)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchValue(searchValue);
    }, 700);
    return () => clearTimeout(timer);
  }, [searchValue]);

  useEffect(() => {
    getOrderHistoryData();
  }, [debouncedSearchValue]);

  const handleSearch = (item) => {
    console.log("item---handleSearch", item);
    setSeachValue(item);
    //   if(item?.length > 0){
    //   setTimeout(async()=>{
    //    await getOrderHistoryData();
    //   },50)
    // }else{
    // getOrderHistoryData();
    // }
  }

  const handleTabPress = async text => {
    defaultType = text;
    const filter = await getHistorybyFilters(text);
    setOrderHistArray(filter);
  };


  const loadMoredata = () => {
    console.log('load more');
    if (!loadingMore && (orderHistArray?.length >= perPage)) {
      perPage = perPage + 20;
      setLoadingMore(true);
      getOrderHistoryData();
    }
  };

  const onHandleDetails = (item) => {
    navigation.navigate('orderHistoryDetails', { item: item })

  }


  const renderItem = ({ item, i }) => {
    return <OrderHistoryCard item={item} onPressItem={onHandleDetails} />;
  };

  const renderFooter = () => {
    return loadingMore ? (
      <View style={{ paddingVertical: 20 }}>
        <ActivityIndicator size="large" color={colors.main} />
      </View>
    ) : null;
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
        onChangeText={handleSearch}
      />
      <Tabs tabs={tabs} tabPress={handleTabPress} />
      <KeyboardAvoidingView behavior={'padding'} style={{ flex: 1 }}>
        {loading == true ? (
          <AnimatedLoader type={'orderHistoryLoader'} />
        ) : (
          <View style={styles.flatlistView}>
            {orderHistArray?.length > 0 ? (
              <FlatList
                data={orderHistArray}
                renderItem={renderItem}
                keyExtractor={item => item?._id?.toString()}
                contentContainerStyle={{ paddingBottom: '40%' }}
                showsVerticalScrollIndicator={false}
                onEndReached={loadMoredata}
                onEndReachedThreshold={0.5} // Trigger when the user scrolls 50% from the bottom
                ListFooterComponent={renderFooter}
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
