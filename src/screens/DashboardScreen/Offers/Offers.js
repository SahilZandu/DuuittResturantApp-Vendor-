import React, { useEffect, useState, useRef, useCallback } from 'react';
import { DeviceEventEmitter, KeyboardAvoidingView, View } from 'react-native';
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
    text: 'All Offers',
  },
  {
    text: 'Activated Offers',
  },
  {
    // text: 'Recommended Offers',
    text: 'Deactivated Offers',
  },

  // {
  //   text: 'Activated Offers',
  // },
];

let defaultType = "All Offers"

export default function Offers({ navigation }) {
  const { appUser } = rootStore.commonStore;
  const { getAppUser } = rootStore.authStore;
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
  const [appDetails, setAppDetails] = useState(appUser)


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
      const { appUser } = rootStore.commonStore;
      defaultType = "All Offers"
      setAppDetails(appUser)
      handleAndroidBackButton(navigation);
      if (appUser?.role !== "vendor") {
        onCheckTeamRolePermission()
      }
      if (isOffersScreen) {
        getRestaurantOffersData();
      }
    }, []),
  );

  const getAppUserData = async () => {
    const userData = await getAppUser(appUser)
    // console.log("userData--", userData);
    if (userData?._id?.length > 0) {
      setAppDetails(userData)
    } else {
      setAppDetails(appUser)
    }
  }

  useEffect(() => {
    const subscription = DeviceEventEmitter.addListener('kycStatusUpdate', data => {
      // console.log('kycStatusUpdate Order data -- ', data);
      getAppUserData();
    });
    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    const subscription = DeviceEventEmitter.addListener('vendorBlockSuspend', data => {
      // console.log('vendorBlockSuspend update ', data);
      getAppUserData();
    });
    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    const subscription = DeviceEventEmitter.addListener('restProfileUpdate', data => {
      // console.log('Profile update ', data);
      getAppUserData();
    });
    return () => {
      subscription.remove();
    };
  }, []);

  const getRestaurantOffersData = async () => {
    const res = await getRestaurantOffers(appUser?.restaurant, handleLoding);
    if (res?.length > 0) {
      setOffersData(res);
      setFilterData(res)
      setOffersArray(res)
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
      setOffersArray([])
    }
  }


  const setOffersData = (res) => {
    console.log("res---setOffersData", res);

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
    await setAcceptDeclineOffer(item, appUser, handleSuccess, onError)
  }

  const handleSuccess = () => {
    setSelectedItem({})
    getRestaurantOffersData();
  }
  const onError = () => {
    setSelectedItem({})
  }


  // Check if a vendor is active inside a list
  const isVendorActive = (list = [], vendorId, allowedStatuses = ["active"]) => {
    return list?.some(
      (vendor) =>
        vendor?.vendor_id === vendorId && allowedStatuses?.includes(vendor?.status)
    );
  };


  // Filter data based on active vendor
  const vendorId =
    appUser?.role === "vendor" ? appUser?._id : appUser?.vendor?._id;



  const handleTabFilter = async (data) => {
    // console.log("data--tab", data);
    defaultType = data
    setSeachValue('');
    if (data === "All Offers") {
      setOffersData(filterData);
    }
    else if (data === 'Activated Offers') {
      // const resFilter = filterData?.filter(item => item?.is_vendor_accepted === true);
      const resFilter = filterData?.filter((item) =>
        isVendorActive(item?.vendor_list, vendorId, ['active'])
      );
      setOffersData(resFilter);
    } else if (data === 'Deactivated Offers') {
      // const resFilter = filterData?.filter(item => item?.is_vendor_accepted === false);
      const resFilter = filterData?.filter((item) =>
        isVendorActive(item?.vendor_list, vendorId, ["deactivate", "pending"])
      );
      setOffersData(resFilter);
    }
    else {
      setOffersData(filterData); // <- this should be the array
    }
  };


  const filterOffersItems = async (data, searchQuery, defaultText) => {
    const query = searchQuery?.toLowerCase().trim();

    let filteredData = data || [];

    if (defaultText === 'Activated Offers') {
      filteredData = data?.filter(item => item?.is_vendor_accepted === true);
    } else if (defaultText === 'Deactivated Offers') {
      filteredData = data?.filter(item => item?.is_vendor_accepted === false);
    }

    return filteredData?.filter(item => {
      const discountMatch = String(item?.discount_type || '')
        ?.toLowerCase()
        ?.includes(query);

      const disPriceMatch = String(item?.discount_price || '')
        ?.toLowerCase()
        ?.includes(query);

      const minMatch = String(item?.usage_conditions?.min_order_value || '')
        ?.toLowerCase()
        ?.includes(query);

      const titleMatch = String(item?.title || '')
        ?.toLowerCase()
        ?.includes(query);

      const desMatch = String(item?.description || '')
        ?.toLowerCase()
        ?.includes(query);

      return discountMatch || disPriceMatch || minMatch || titleMatch || desMatch;
    });
  };

  const onSearchOffers = async (search) => {
    setSeachValue(search);
    const searchRes = await filterOffersItems(filterData, search, defaultType);
    console.log("searchRes--onSearchOffers", searchRes);
    setOffersData(searchRes);
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
            onSearchOffers(item)
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
                            appUser={appUser}
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
                            appUser={appUser}
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
        {(appDetails?.role === "vendor" ?
          appDetails?.is_kyc_completed == false
          : appDetails?.vendor?.is_kyc_completed == false) &&
          <KYCDocumentPopUp
            appUserData={appDetails?.role === "vendor" ? appDetails : appDetails?.vendor}
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
