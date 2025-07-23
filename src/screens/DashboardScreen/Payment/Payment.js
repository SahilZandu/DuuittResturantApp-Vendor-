import React, { useCallback, useEffect, useState } from 'react';
import { Text, View, SectionList, KeyboardAvoidingView } from 'react-native';
import Header from '../../../components/header/Header';
import SearchInputComp from '../../../components/SearchInputComp';
import Tabs from '../../../components/Tabs';
import { styles } from './styles';
import { paymentData } from '../../../stores/DummyData/Payment';
import PaymentsCard from '../../../components/cards/PaymentsCard';
import AnimatedLoader from '../../../components/AnimatedLoader/AnimatedLoader';
import { useFocusEffect } from '@react-navigation/native';
import handleAndroidBackButton from '../../../halpers/handleAndroidBackButton';
import KYCDocumentPopUp from '../../../components/appPopUp/KYCDocumentPopup';
import { rootStore } from '../../../stores/rootStore';
import { ScreenBlockComponent } from '../../../components/ScreenBlockComponent/ScreenBlockComponent';
import { isScreenAccess } from '../../../halpers/AppPermission';
import IndicatorLoader from '../../../halpers/IndicatorLoader';

const tabs = [
  {
    text: 'All',
  },
  {
    text: 'Withdraw',
  },
  {
    text: 'Refund',
  },
  {
    text: 'Captured',
  },

];
let defaultType = 'All';
let perPage = 100;
export default function Payment({ navigation }) {
  const { appUser } = rootStore.commonStore;
  const { checkTeamRolePermission } = rootStore.teamManagementStore;
  const { getRestaurantFoodPayment, paymentOrderList } = rootStore.orderStore;
  const [searchValue, setSeachValue] = useState('');
  const [debouncedSearchValue, setDebouncedSearchValue] = useState("");
  const [payments, setPayments] = useState(paymentOrderList ?? []
    // paymentData
  );
  const [loading, setLoading] = useState(paymentOrderList?.length > 0 ? false : true);
  const [filterLoading, setFilterLoading] = useState(false);

  const [isPaymentScreen, setIsPaymentScreen] = useState(isScreenAccess(5))

  // useEffect(() => {
  //   if (isPaymentScreen) {
  //     setPayments(paymentData);
  //   }
  // }, [paymentData, isPaymentScreen]);

  // useEffect(() => {
  //   if (isPaymentScreen) {
  //     setPayments(paymentOrderList);
  //   }
  // }, [paymentOrderList, isPaymentScreen]);


  useFocusEffect(
    useCallback(() => {
      handleAndroidBackButton(navigation);
      if (appUser?.role !== "vendor") {
        onCheckTeamRolePermission()
      }
      if (isPaymentScreen) {
        getRestaurantFoodPaymentData();
      }
    }, [appUser]),
  );


  const getRestaurantFoodPaymentData = async () => {
    const paymentRes = await getRestaurantFoodPayment(appUser, defaultType, searchValue, handleLoading);
    console.log("paymentRes---", paymentRes);
    if (paymentRes?.length > 0) {
      setPayments(paymentRes)
    } else {
      setPayments([])
    }

  }

  const handleLoading = (v) => {
    setLoading(v);
  }

  const onCheckTeamRolePermission = async () => {
    const res = await checkTeamRolePermission(appUser);
    // console.log("res --- ", res);
  }

  const renderItem = ({ item }) => {
    return <PaymentsCard item={item} />;
  };

  const loadMoredata = async () => {
    if (payments?.length > 1) {
      console.log('load more', payments);
      perPage = perPage + 10;
      // const data = await getPayments(defaultType,perPage);
      setLoading(false);
      // setPayments(data ? data : []);
    }
  };

  const getRestFoodPaymentFilter = async (text) => {
    setFilterLoading(true)
    const paymentRes = await getRestaurantFoodPayment(appUser, text, searchValue, handleFilterLoading);
    // console.log("paymentRes---", paymentRes);
    if (paymentRes?.length > 0) {
      setFilterLoading(false)
      setPayments(paymentRes)
    } else {
      setFilterLoading(false)
      setPayments([])
    }

  }

  const handleTabPress = async text => {
    defaultType = text;
    getRestFoodPaymentFilter(text);
  };

  const handleFilterLoading = (v) => {
    console.log("v---");
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchValue(searchValue);
    }, 700);
    return () => clearTimeout(timer);
  }, [searchValue]);

  useEffect(() => {
    getRestaurantFoodPaymentData();
  }, [debouncedSearchValue]);

  const handleSearch = (item) => {
    // console.log("item---handleSearch", item);
    setSeachValue(item);
  };


  return (
    <View style={styles.container}>
      <Header title={'Payment'} bottomLine={1} />
      {!isPaymentScreen ? (
        <ScreenBlockComponent />
      ) : (<>
        <SearchInputComp
          value={searchValue}
          onChangeText={handleSearch}
        // onChangeText={item => {
        //   setSeachValue(item);
        // }}
        />
        <Tabs tabs={tabs} tabPress={handleTabPress} />
        <KeyboardAvoidingView behavior={'padding'} style={{ flex: 1 }}>
          <View style={styles.sectionListView}>

            <View style={{ flex: 1 }}>
              {loading == true ? (
                <AnimatedLoader type={'paymentLoader'} />
              ) : (
                <>
                  {payments && payments?.length != 0 ? (
                    <SectionList
                      showsVerticalScrollIndicator={false}
                      style={{ paddingHorizontal: 16 }}
                      contentContainerStyle={{ paddingBottom: '30%' }}
                      sections={payments}
                      keyExtractor={(item, index) => item + index}
                      renderItem={renderItem}
                      onEndReachedThreshold={0.3}
                      onEndReached={loadMoredata}
                      renderSectionHeader={({ section: { title } }) => (
                        <View style={styles.titleListView}>
                          <Text style={styles.sectionTitle}>{title}</Text>
                        </View>
                      )}
                    />
                  ) : (
                    <Text style={styles.noDataText}>
                      {loading ? '' : 'This is where your payments will appear'}
                    </Text>
                  )}
                </>
              )}
            </View>
            {filterLoading && <IndicatorLoader />}
          </View>

        </KeyboardAvoidingView>
        {(appUser?.role === "vendor" ?
          appUser?.is_kyc_completed == false
          : appUser?.vendor?.is_kyc_completed == false) &&
          <KYCDocumentPopUp
            appUserData={appUser}
            navigation={navigation} />}
      </>)}

    </View>
  );
}
