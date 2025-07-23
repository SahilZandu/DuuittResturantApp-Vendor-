import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Dimensions, FlatList, Text, TouchableOpacity, View } from 'react-native';
import Header from '../../../components/header/Header';
import Tabs from '../../../components/Tabs';
import { styles } from './styles';
import { useFocusEffect } from '@react-navigation/native';
import handleAndroidBackButton from '../../../halpers/handleAndroidBackButton';
import { currencyFormat } from '../../../halpers/currencyFormat';
import { SvgXml } from 'react-native-svg';
import Popover, { PopoverPlacement } from 'react-native-popover-view';
import { appImagesSvg } from '../../../commons/AppImages';
import AnimatedLoader from '../../../components/AnimatedLoader/AnimatedLoader';
import { rootStore } from '../../../stores/rootStore';

const tabs = [
  {
    text: 'All',
  },
  {
    text: 'Day',
  },
  {
    text: 'Week',
  },
  // {
  //   text: 'Month',
  // },
  {
    text: 'Year',
  },
];


let defaultType = "All";

let reportDummyArray = []

const size = Dimensions.get('window').height;

export default function Reports({ navigation }) {
  const { appUser } = rootStore.commonStore;
  const { getVendorOrderReport, } = rootStore.orderStore;
  const [reportArray, setReportArray] = useState(reportDummyArray ?? []);
  const [loading, setLoading] = useState(reportDummyArray?.length > 0 ? false : true);


  useFocusEffect(
    useCallback(() => {
      handleAndroidBackButton(navigation);
      defaultType = "All";
      getVendorOrderReportData();
    }, []),
  );


  const getVendorOrderReportData = async () => {
    const res = await getVendorOrderReport(appUser, defaultType, handleLoading);
    console.log("res---getVendorOrderReportData", res);
    updateData(res)
  }

  const updateData = (data) => {
    reportDummyArray = [
      {
        id: '1',
        name: 'Total Impression',
        collection: data?.total_impression ?? 0,
        isCurrency: 0,
        infromation: 'See how many times ads were seen.',
      },
      {
        id: '2',
        name: 'Total Visits',
        collection: data?.total_visits ?? 0,
        isCurrency: 0,
        infromation: 'Count how many times people visited.',
      },
      {
        id: '3',
        name: 'Total Orders',
        collection: data?.total_orders ?? 0,
        isCurrency: 0,
        infromation: 'See all orders to manage your business.',
      },
      {
        id: '4',
        name: 'Total Revenue',
        collection: data?.total_revenue ?? 0,
        isCurrency: 1,
        infromation: 'Check how much money you have earned.',
      },
      {
        id: '5',
        name: 'GST Collection',
        collection: data?.gst_collection ?? 0,
        isCurrency: 1,
        infromation: 'View GST collected for tax purposes.',
      },
      {
        id: '6',
        name: 'TDS Collection',
        collection: data?.tds_collection ?? 0,
        isCurrency: 1,
        infromation: 'Keep track of TDS collected.',
      },
      // {
      //   id: '7',
      //   name: 'Restaurant Charge Total',
      //   collection: data?.restaurant_charge_total ?? 0,
      //   isCurrency: 1,
      //   infromation: 'Keep track of Restaurant Charge Total.',
      // },
      // {
      //   id: '8',
      //   name: 'Coupon Discount Total',
      //   collection: data?.coupon_discount_total ?? 0,
      //   isCurrency: 1,
      //   infromation: 'Keep track of coupon discount total.',
      // },
    ];
    setReportArray(reportDummyArray)
  }


  const handleLoading = (v) => {
    setLoading(v)
  }


  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity activeOpacity={0.8} style={styles.button} key={index}>
        <View style={styles.mainContainer}>
          <Text style={styles.nameText}>{item?.name}</Text>
          <View style={styles.currencyView}>
            <Text style={styles.currencyText}>
              {item?.isCurrency === 1
                ? currencyFormat(item?.collection)
                : item?.collection}
            </Text>
          </View>
        </View>
        <Popover
          animationConfig={{
            duration: 100,
          }}
          popoverStyle={styles.popContainer}
          placement={PopoverPlacement.BOTTOM}
          from={
            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                styles.qImageView,
                {
                  height: size / 32,
                  width: size / 32,
                  borderRadius: size / 64,
                },
              ]}>
              <SvgXml
                hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                xml={appImagesSvg?.qIcon}
              />
            </TouchableOpacity>
          }>
          <Text style={styles.popUpText}>
            <Text style={styles.popUpOuterText}>{item?.name} : </Text>
            {item?.infromation}
          </Text>
        </Popover>
      </TouchableOpacity>
    );
  };

  const handleTabPress = async text => {
    defaultType = text;
    getVendorOrderReportData()
  };

  return (
    <View style={styles.container}>
      <Header
        backArrow={true}
        onPress={() => {
          navigation.goBack();
        }}
        title={'Reports'}
        bottomLine={1}
      />
      <Tabs tabs={tabs} tabPress={handleTabPress} />
      {loading == true ? (
        <AnimatedLoader type={'reportsLoader'} />
      ) : (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          {reportArray?.length > 0 ? (
            <View
              style={{
                flex: 1,
                marginTop: '1%',
                marginHorizontal: 16,
                justifyContent: 'center',
              }}>
              <FlatList
                contentContainerStyle={{ paddingBottom: '15%' }}
                showsVerticalScrollIndicator={false}
                bounces={false}
                data={reportArray}
                renderItem={renderItem}
                keyExtractor={item => item?.id}
              />
            </View>
          ) : (
            <View style={styles.noDataFoundView}>
              {loading === false ? (
                <Text style={styles.noDataFoundText}>
                  This is where your report item will appear
                </Text>
              ) : null}
            </View>
          )}
        </View>
      )}
    </View>
  );
}
