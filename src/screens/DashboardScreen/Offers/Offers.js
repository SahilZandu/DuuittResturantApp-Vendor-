import React, { useEffect, useState, useRef, useCallback } from 'react';
import { KeyboardAvoidingView, View } from 'react-native';
import Header from '../../../components/header/Header';
import SearchInputComp from '../../../components/SearchInputComp';
import Tabs from '../../../components/Tabs';
import { offersData } from '../../../stores/DummyData/OffresData';
import { styles } from './styles';
import AppInputScroll from '../../../halpers/AppInputScroll';
import Spacer from '../../../halpers/Spacer';
import { colors } from '../../../theme/colors';
import OffersCardComp from '../../../components/OffersCardComp';
import AnimatedLoader from '../../../components/AnimatedLoader/AnimatedLoader';
import NoData from '../../../components/NoData';
import { useFocusEffect } from '@react-navigation/native';
import handleAndroidBackButton from '../../../halpers/handleAndroidBackButton';
import { rootStore } from '../../../stores/rootStore';
import KYCDocumentPopUp from '../../../components/appPopUp/KYCDocumentPopup';
import { ScreenBlockComponent } from '../../../components/ScreenBlockComponent/ScreenBlockComponent';
import { isScreenAccess } from '../../../halpers/AppPermission';
import OffersDetails from '../../../components/appPopUp/OffersDetails';

const tabs = [
  {
    text: 'Recommended Offers',
  },
  {
    text: 'Activated Offers',
  },
  // {
  //   text: 'Activated Offers',
  // },
];
export default function Offers({ navigation }) {
  const { appUser } = rootStore.commonStore;
  const { checkTeamRolePermission } = rootStore.teamManagementStore;
  const { getRestaurantOffers, restaurentOfferList, setAcceptDeclineOffer } = rootStore.orderStore;
  const [searchValue, setSeachValue] = useState('');
  const [offersArray, setOffersArray] = useState(
    // offersData
    restaurentOfferList?.length > 0 ? restaurentOfferList : []);
  const [fhOffersArray, setFHOffersArray] = useState([]);
  const [shOffersArray, setSHOffersArray] = useState([]);
  const [filterData, setFilterData] = useState([])
  const [loading, setLoading] = useState(restaurentOfferList?.length > 0 ? false : true);
  const [isOffersScreen, setIsOffersScreen] = useState(isScreenAccess(9))
  const [selectedItem, setSelectedItem] = useState({})
  console.log("appUser---+++---", appUser);
  const [activeOffer, setActiveOffer] = useState({});
  const [visible, setVisible] = useState(false);
  const [selectedOffers, setSelectedOffers] = useState({});


  // useEffect(() => {
  //   if (isOffersScreen) {
  //     if (offersArray?.length > 0) {
  //       const midIndex = Math.ceil(offersArray?.length / 2);
  //       const firstHalf = offersData.slice(0, midIndex);
  //       const secondHalf = offersData.slice(midIndex);
  //       setFHOffersArray(firstHalf);
  //       setSHOffersArray(secondHalf);
  //     }
  //   }
  // }, [offersArray, isOffersScreen]);

  useFocusEffect(
    useCallback(() => {
      handleAndroidBackButton(navigation);
      if (appUser?.role !== "vendor") {
        onCheckTeamRolePermission()
      }
      if (isOffersScreen) {
        getRestaurantOffersData();
      }
    }, []),
  );

  const getRestaurantOffersData = async () => {
    const res = await getRestaurantOffers(appUser?.restaurant, handleLoding);
    if (res?.length > 0) {
      setOffersData(res);
      setFilterData(res)
      // if (res?.length > 1) {
      //   const midIndex = Math.ceil(res?.length / 2);
      //   const firstHalf = res?.slice(0, midIndex);
      //   const secondHalf = res?.slice(midIndex);
      //   setFHOffersArray(firstHalf);
      //   setSHOffersArray(secondHalf);
      // } else {
      //   setFHOffersArray(res);
      //   setSHOffersArray([]);
      // }
    } else {
      setFHOffersArray([]);
      setSHOffersArray([]);
      setFilterData([])
    }
  }


  const setOffersData = (res) => {
    if (res?.length > 0) {
      if (res?.length > 1) {
        const midIndex = Math.ceil(res?.length / 2);
        const firstHalf = res?.slice(0, midIndex);
        const secondHalf = res?.slice(midIndex);
        setFHOffersArray(firstHalf);
        setSHOffersArray(secondHalf);
      } else {
        setFHOffersArray(res);
        setSHOffersArray([]);
      }
    } else {
      setFHOffersArray([]);
      setSHOffersArray([]);
    }
  }

  const handleLoding = (v) => {
    setLoading(v)
    console.log("v--++", v);

  }

  const onCheckTeamRolePermission = async () => {
    const res = await checkTeamRolePermission(appUser);
    console.log("res --- ", res);
  }


  const onAcceptDeclineOffer = async (item) => {
    setSelectedItem(item)
    await setAcceptDeclineOffer(item, handleSuccess, onError)
  }

  const handleSuccess = () => {
    setSelectedItem({})
    getRestaurantOffersData();
  }
  const onError = () => {
    setSelectedItem({})
  }


  const handleTabFilter = async (data) => {
    // console.log("data--tab", data);

    if (data === 'Activated Offers') {
      const resFilter = filterData.filter(item => item?.is_vendor_accepted === false);
      setOffersData(resFilter);
    } else {
      setOffersData(filterData); // <- this should be the array
    }
  };

  return (
    <View pointerEvents={selectedItem?._id ? 'none' : 'auto'} style={styles.container}>
      <Header title={'Offers'} bottomLine={1} />
      {!isOffersScreen ? (
        <ScreenBlockComponent />
      ) : (<>
        <SearchInputComp
          value={searchValue}
          onChangeText={item => {
            setSeachValue(item);
          }}
        />
        <Tabs tabs={tabs} tabPress={handleTabFilter} />
        <Spacer space={'1%'} />
        <KeyboardAvoidingView behavior={'padding'} style={{ flex: 1 }}>
          <AppInputScroll
            Pb={'30%'}
            padding={true}
            keyboardShouldPersistTaps={'handled'}>
            {loading == true ? (
              <AnimatedLoader type={'offersLoader'} />
            ) : (
              <View style={styles.main}>
                {fhOffersArray?.length > 0 ? (
                  <View style={styles.renderDataView}>
                    <View style={styles.fhView}>
                      {fhOffersArray?.map((item, index) => {
                        // console.log('item===firstHalf', item);
                        return (
                          <OffersCardComp
                            onPressDetails={() => {
                              // setActiveOffer(item);
                              setVisible(true);
                              setSelectedOffers(item);

                            }}
                            selectedItem={selectedItem}
                            item={item}
                            BtnColor={
                              index % 2 == 0 ? colors.colorE17 : colors.color00A
                            }
                            backgroundColor={
                              index % 2 == 0 ? colors.color2DF : colors.colorDFF
                            }
                            onPress={() => {
                              onAcceptDeclineOffer(item)
                              // alert(index);
                            }}
                          />
                        );
                      })}
                    </View>
                    <View style={styles.shView}>
                      {shOffersArray?.map((item, index) => {
                        // console.log('item===secondHalf', item);
                        return (
                          <OffersCardComp
                            onPressDetails={() => {
                              // setActiveOffer(item);
                              setVisible(true);
                              setSelectedOffers(item);
                            }}
                            selectedItem={selectedItem}
                            item={item}
                            BtnColor={
                              index % 2 == 0 ? colors.color00A : colors.colorE17
                            }
                            backgroundColor={
                              index % 2 == 0 ? colors.colorDFF : colors.color2DF
                            }
                            onPress={() => {
                              onAcceptDeclineOffer(item)
                              // alert(index);
                            }}
                          />
                        );
                      })}
                    </View>
                  </View>
                ) : (
                  <View style={styles.noDataView}>
                    <NoData message={'Data Not Found'} />
                  </View>
                )}
              </View>
            )}
          </AppInputScroll>
        </KeyboardAvoidingView>
        {(appUser?.role === "vendor" ?
          appUser?.is_kyc_completed == false
          : appUser?.vendor?.is_kyc_completed == false) &&
          <KYCDocumentPopUp
            appUserData={appUser?.role === "vendor" ? appUser : appUser?.vendor}
            navigation={navigation} />
        }
      </>)}
      <OffersDetails
        // onApply={() => {
        //   onCoupanSelected(activeOffer);
        //   setVisible(false);
        //   setTimeout(() => {
        //     navigation.goBack();
        //   }, 500);
        // }}
        // selectedData={fhOffersArray[0]}
        item={selectedOffers}
        // getCartTotal={getCartTotal}
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
      />
    </View>
  );
}
