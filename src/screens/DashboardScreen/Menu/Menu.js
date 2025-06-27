import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, Text, View, KeyboardAvoidingView } from 'react-native';
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
  const [activeTab, setActiveTab] = useState('All Items');
  const [allMenu, setAllMenu] = useState(menuItems);
  const [menuGroup, setMenuGroup] = useState(menuGroups);
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

  useFocusEffect(
    useCallback(() => {
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
      }

      if (isProductScreen) {
        getAllDishItemData();
      } else {
        setAllDishItem([])
      }

    }, []),
  );

  
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
  };

  const handleGruopLoading = v => {
    setLoadingGroup(v);
  };

  const getMenuData = async () => {
    const res = await getMenuItems(appUser, handleLoading);
    setAllMenu(res);
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
    } else {
      setMenuGroup(menuGroup);
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
      setMenuGroup(updatedMenu);
    } else {
      setMenuGroup(updatedMenu);
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
            setSeachValue(item);
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
        {(appUser?.role === "vendor" ?
          appUser?.is_kyc_completed == true
          : appUser?.vendor?.is_kyc_completed == true) &&
          <KYCDocumentPopUp
            appUserData={appUser?.role === "vendor" ? appUser : appUser?.vendor}
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
