import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, Text, View, KeyboardAvoidingView, DeviceEventEmitter } from 'react-native';
import Header from '../../../components/header/Header';
import Tabs from '../../../components/Tabs';
import { styles } from './styles';
import MenuItemCard from '../../../components/menuCard/MenuItemCard';
import AddCTA from '../../../components/cta/Add';
import GroupItemCard from '../../../components/menuCard/GroupItemCard';
import SearchInputComp from '../../../components/SearchInputComp';
import { rootStore } from '../../../stores/rootStore';
import { useFocusEffect } from '@react-navigation/native';
import handleAndroidBackButton from '../../../halpers/handleAndroidBackButton';
import AnimatedLoader from '../../../components/AnimatedLoader/AnimatedLoader';
import PopUp from '../../../components/appPopUp/PopUp';
import KYCDocumentPopUp from '../../../components/appPopUp/KYCDocumentPopup';
import { isScreenAccess } from '../../../halpers/AppPermission';
import { ScreenBlockComponent } from '../../../components/ScreenBlockComponent/ScreenBlockComponent';

const tabs = [
  {
    text: 'All Items',
  },
  {
    text: 'Groups',
  },
];

export default function Menu({ navigation }) {
  const {
    getMenuGroup,
    getMenuItems,
    menuGroups,
    menuItems,
    deleteFoodItem,
    deleteGroupItem,
    updateStatusMenuGroup,
    updateStatusMenuItem,
    getAllDishItem,
    setAllDishItem
  } = rootStore.menuStore;

  const { checkTeamRolePermission } = rootStore.teamManagementStore;
  const { appUser } = rootStore.commonStore;
  const { getAppUser } = rootStore.authStore;
  const [activeTab, setActiveTab] = useState('All Items');
  const [allMenu, setAllMenu] = useState(menuItems);
  const [menuGroup, setMenuGroup] = useState(menuGroups);
  const [allMenuFilter, setAllMenuFilter] = useState(menuItems);
  const [menuGroupFilter, setMenuGroupFilter] = useState(menuGroups);
  const [searchValue, setSeachValue] = useState('');
  const [loading, setLoading] = useState(menuItems?.length > 0 ? false : true);
  const [loadingGroup, setLoadingGroup] = useState(
    menuGroups?.length > 0 ? false : true,
  );
  const [isDeletedPopUp, setIsDeletedPopUp] = useState(false);
  const [isDeletedGroup, setIsDeletedGroup] = useState(false);
  const [deletedItem, setDeletedItem] = useState({});
  const [deletedGroup, setDeletedGroup] = useState({});
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [isMenuScreen, setIsMenuScreen] = useState(isScreenAccess(1))
  const [isMenuStockScreen, setIsMenuStockScreen] = useState(isScreenAccess(2))
  const [isProductScreen, setIsProductScreen] = useState(isScreenAccess(12))
  const [appDetails, setAppDetails] = useState(appUser)

  useFocusEffect(
    useCallback(() => {
      const { appUser } = rootStore.commonStore;
      setAppDetails(appUser)
      handleAndroidBackButton();
      if (appUser?.role !== "vendor") {
        onCheckTeamRolePermission()
      }
      if (isMenuScreen && isMenuStockScreen) {
        getMenuGroupData();
        getMenuData();
      } else {
        setMenuGroup([]);
        setAllMenu([]);
        setAllMenuFilter([])
        setMenuGroupFilter([])
      }

      if (isProductScreen) {
        getAllDishItemData();
      } else {
        setAllDishItem([])
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


  const onCheckTeamRolePermission = async () => {
    const res = await checkTeamRolePermission(appUser);
    console.log("res --- ", res);
  }

  const getAllDishItemData = async () => {
    await getAllDishItem(appUser, handleDishLoading);
  };

  const handleDishLoading = v => {
    console.log('v---', v);
  };

  const getMenuGroupData = async () => {
    const groupRes = await getMenuGroup(appUser, handleGruopLoading);
    setMenuGroup(groupRes);
    setMenuGroupFilter(groupRes)
  };

  const handleGruopLoading = v => {
    setLoadingGroup(v);
  };

  const getMenuData = async () => {
    const res = await getMenuItems(appUser, handleLoading);
    setAllMenu(res);
    setAllMenuFilter(res)
  };

  const handleLoading = v => {
    setLoading(v);
  };
  const handleTabSwitch = t => {
    setIsDeletedPopUp(false);
    setActiveTab(t);
  };

  const onDeleteMenuItem = async item => {
    await deleteFoodItem(
      appUser,
      item?.item,
      item?.index,
      handleDeleteLoading,
      onSuccessMenuDelete,
    );
  };

  const handleDeleteLoading = v => {
    setDeleteLoading(v);
  };

  const onSuccessMenuDelete = () => {
    setIsDeletedPopUp(false);
    getMenuData();
  };

  const onDeleteGroupItem = async item => {
    await deleteGroupItem(
      appUser,
      item?.item,
      item?.index,
      handleDeleteLoading,
      onSuccessGroupDelete,
    );
  };

  const onSuccessGroupDelete = () => {
    setIsDeletedGroup(false);
    getMenuGroupData();
  };

  const onPressGroupToggle = async (data, status) => {
    const resToggleGroup = await updateStatusMenuGroup(
      data,
      status,
      appUser,
      handleGroupToggleLoading,
    );
    console.log('resToggle menu --', resToggleGroup);
    if (resToggleGroup?.statusCode == 200) {
      const updatedGroup = menuGroup?.map((item, i) => {
        if (item?._id == data?._id) {
          return { ...item, status: !item.status }; // Toggle status
        }
        return item;
      });
      setMenuGroup(updatedGroup);
      setMenuGroupFilter(updatedGroup)
    } else {
      setMenuGroup(menuGroup);
      setMenuGroupFilter(menuGroup)
    }
  };

  const onPressMenuToggle = async (data, status) => {
    const resToggleMenu = await updateStatusMenuItem(
      data,
      status,
      appUser,
      handleGroupToggleLoading,
    );
    console.log('resToggleMenu menu --', resToggleMenu);
    if (resToggleMenu?.statusCode == 200) {
      const updatedMenu = allMenu?.map((item, i) => {
        if (item?._id == data?._id) {
          return { ...item, status: !item.status }; // Toggle status
        }
        return item;
      });
      setAllMenu(updatedMenu);
      setAllMenuFilter(updatedMenu)
    } else {
      setAllMenu(allMenu);
      setAllMenuFilter(allMenu)
    }
  };

  const handleGroupToggleLoading = v => {
    console.log('v---', v);
  };

  const renderItem = ({ item, index }) => {
    return (
      <MenuItemCard
        isMenuScreen={!isMenuScreen}
        isMenuStockScreen={!isMenuStockScreen}
        item={item}
        index={index}
        editShow={true}
        toggleShow={true}
        onDelete={handleDeletePopUp}
        onEditPress={item => {
          navigation.navigate('addProduct', { data: item, type: 'edit' });
        }}
        onPressToggle={onPressMenuToggle}
      />
    );
  };

  const renderGroupItem = ({ item, index }) => {
    return (
      <GroupItemCard
        isMenuScreen={!isMenuScreen}
        isMenuStockScreen={!isMenuStockScreen}
        onPressToggle={onPressGroupToggle}
        onDelete={handleDeletePopUpGroup}
        onEditPress={item => {
          navigation.navigate('addCategory', { data: item, type: 'edit' });
        }}
        item={item}
        index={index}
      />
    );
  };

  const handleDeletePopUp = useCallback((item, index) => {
    setDeletedItem({
      item: item,
      index: index,
    });
    setIsDeletedPopUp(prev => !prev);
  }, []);

  const handleDeletePopUpGroup = useCallback((item, index) => {
    setDeletedGroup({
      item: item,
      index: index,
    });
    setIsDeletedGroup(prev => !prev);
  }, []);


  const filterMenuItems = async (data, searchQuery, activeTab) => {
    const query = searchQuery?.toLowerCase().trim();
    let filteredData = data || [];

    // If "All Items" is selected → search in all fields
    if (activeTab === 'All Items') {
      return filteredData?.filter(item => {
        const veg_nonvegMatch = String(item?.veg_nonveg || '')
          ?.toLowerCase()
          ?.includes(query);

        const priceMatch = String(item?.selling_price || '')
          ?.toLowerCase()
          ?.includes(query);

        const tagMatch = String(item?.tag || '')
          ?.toLowerCase()
          ?.includes(query);

        const nameMatch = String(item?.name || '')
          ?.toLowerCase()
          ?.includes(query);

        const desMatch = String(item?.description || '')
          ?.toLowerCase()
          ?.includes(query);

        return veg_nonvegMatch || priceMatch || tagMatch || nameMatch || desMatch;
      });
    }
    // Otherwise → only search by name
    else {
      return filteredData?.filter(item => {
        const nameMatch = String(item?.name || '')
          ?.toLowerCase()
          ?.includes(query);
        return nameMatch;
      });
    }
  };

  const onSearchMenu = async (search) => {
    setSeachValue(search);

    const searchRes = await filterMenuItems(
      activeTab === 'All Items' ? allMenuFilter : menuGroupFilter,
      search,
      activeTab
    );

    console.log("searchRes--onSearchMenu", searchRes);

    if (activeTab === 'All Items') {
      setAllMenu(searchRes);
    } else {
      setMenuGroup(searchRes);
    }
  };



  return (
    <View style={styles.container}>
      <Header title={'Menu'} bottomLine={1} />
      {(!isMenuScreen && !isMenuStockScreen && !isProductScreen) ? (
        <ScreenBlockComponent />
      ) : (<>
        {/* <View pointerEvents={!isMenuScreen && !isMenuStockScreen ? 'none' : 'auto'}> */}
        <SearchInputComp
          value={searchValue}
          onChangeText={item => {
            onSearchMenu(item)
          }}
        />
        <Tabs tabPress={handleTabSwitch} tabs={tabs} />
        {/* </View> */}
        <KeyboardAvoidingView behavior={'padding'} style={{ flex: 1 }}>
          <View style={{ flex: 1, justifyContent: 'center', marginTop: '2%' }}>
            {activeTab == 'All Items' && (
              <View style={{ flex: 1 }}>
                {loading == true ? (
                  <AnimatedLoader type={'allMenuItemLoader'} />
                ) : (
                  <>
                    {allMenu?.length > 0 ? (
                      <>
                        <FlatList
                          data={allMenu}
                          renderItem={renderItem}
                          keyExtractor={item => item?._id?.toString()}
                          contentContainerStyle={{ paddingBottom: '40%' }}
                          showsVerticalScrollIndicator={false}
                        />
                      </>
                    ) : (
                      <View style={styles.noDataView}>
                        <Text style={styles.noDataText}>No data found</Text>
                      </View>
                    )}
                  </>
                )}
              </View>
            )}

            {activeTab == 'Groups' && (
              <View style={{ flex: 1 }}>
                {loadingGroup == true ? (
                  <AnimatedLoader type={'groupItemLoader'} />
                ) : (
                  <>
                    {menuGroup?.length > 0 ? (
                      <>
                        <FlatList
                          data={menuGroup}
                          renderItem={renderGroupItem}
                          keyExtractor={item => item?.id?.toString()}
                          contentContainerStyle={{ paddingBottom: '40%' }}
                          showsVerticalScrollIndicator={false}
                        />
                      </>
                    ) : (
                      <View style={styles.noDataView}>
                        <Text style={styles.noDataText}>No data found</Text>
                      </View>
                    )}
                  </>
                )}
              </View>
            )}
          </View>
          <View pointerEvents={!isProductScreen ? 'none' : 'auto'}>
            <AddCTA
              opacity={isProductScreen ? 1 : 0.6}
              onAdd={() => {
                if (activeTab == 'All Items') {
                  navigation.navigate('addProduct', { data: {}, type: 'add' });
                } else {
                  navigation.navigate('addCategory', { data: {}, type: 'add' });
                }
              }}
            />
          </View>
        </KeyboardAvoidingView>
        {(appDetails?.role === "vendor" ?
          appDetails?.is_kyc_completed == false
          : appDetails?.vendor?.is_kyc_completed == false) &&
          <KYCDocumentPopUp
            appUserData={appDetails?.role === "vendor" ? appDetails : appDetails?.vendor}
            navigation={navigation} />}
      </>)}
      <PopUp
        topIcon={true}
        visible={isDeletedPopUp}
        type={'delete'}
        onClose={() => {
          setIsDeletedPopUp(false);
        }}
        title={'You are about to remove an item from this menu'}
        text={'This will delete your item from the menu are your sure?'}
        onDelete={() => {
          setIsDeletedPopUp(false);
          onDeleteMenuItem(deletedItem);
        }}
      />
      <PopUp
        topIcon={true}
        visible={isDeletedGroup}
        type={'delete'}
        onClose={() => setIsDeletedGroup(false)}
        title={'You are about to remove an categroy from this categroy list'}
        text={
          'This will delete your categroy from the categroy list are your sure?'
        }
        onDelete={() => {
          onDeleteGroupItem(deletedGroup);
        }}
      />


    </View>
  );
}
