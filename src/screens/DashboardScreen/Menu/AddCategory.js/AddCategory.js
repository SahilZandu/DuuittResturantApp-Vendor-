import React, {useEffect, useState, useCallback} from 'react';
import {
  FlatList,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import {styles} from './styles';
import Header from '../../../../components/header/Header';
import Spacer from '../../../../halpers/Spacer';
import MenuToggleStock from '../../../../components/menuCard/MenuToggleStock';
import {SvgXml} from 'react-native-svg';
import {appImagesSvg} from '../../../../commons/AppImages';
import {colors} from '../../../../theme/colors';
import MenuItemCard from '../../../../components/menuCard/MenuItemCard';
import CTA from '../../../../components/cta/CTA';
import {rootStore} from '../../../../stores/rootStore';
import PopUp from '../../../../components/appPopUp/PopUp';
import {useFocusEffect} from '@react-navigation/native';
import handleAndroidBackButton from '../../../../halpers/handleAndroidBackButton';
import AnimatedLoader from '../../../../components/AnimatedLoader/AnimatedLoader';

export default function AddCategory({navigation, route}) {
  const {data, type} = route.params;
  // console.log('data,type--AddCategory', data, type);
  const {
    addMenuGroup,
    updateMenuGroup,
    deleteGroupItem,
    updateStatusMenuGroup,
    groupAddedData,
    getFoodItemOfGroup,
    categoryItemDelete,
  } = rootStore.menuStore;
  const {appUser} = rootStore.commonStore;
  const [seacrh, setSeacrh] = useState(
    data?.name?.length > 0 ? data?.name : '',
  );
  const [groupAllItem, setGroupAllItem] = useState([]);
  const [loading, setLoading] = useState(false);
  const [groupActive, setGroupActive] = useState(data?.status ?? true);
  const [isDelete, setIsDelete] = useState(false);
  const [isDeleteItem, setIsDeleteItem] = useState(false);
  const [deleteItem, setDeleteItem] = useState({});
  const [loadingGroup, setLoadingGroup] = useState(
    groupAddedData?.length > 0 ? false : true,
  );

  useEffect(() => {
    if (type == 'edit') {
      setGroupAllItem(groupAddedData);
    }
  }, [groupAddedData]);

  useFocusEffect(
    useCallback(() => {
      handleAndroidBackButton(navigation);
      if (type == 'edit') {
        getFoodItemOfGroupData();
      } else {
        setLoadingGroup(false);
      }
    }, [type]),
  );

  const getFoodItemOfGroupData = async () => {
    const resGroupData = await getFoodItemOfGroup(
      data,
      appUser,
      handleGroupLoading,
    );
    // console.log('resGroupData--', resGroupData);
    setGroupAllItem(resGroupData);
  };

  const handleGroupLoading = v => {
    setLoadingGroup(v);
  };

  const onDeleteItem = async item => {
    // console.log('item, index--234', item, item?.item);
    await categoryItemDelete(
      appUser,
      data,
      item?.item,
      handleDeleteLoading,
      onSuccess,
    );
  };
  const handleDeleteLoading = v => {
    console.log('v----', v);
  };

  const onSuccess = () => {
    setIsDeleteItem(false);
    getFoodItemOfGroupData();
  };

  const handleDeletePopUpToggle = useCallback((item, index) => {
    setDeleteItem({
      item: item,
      index: index,
    });
    setIsDeleteItem(prev => !prev);
  }, []);

  const renderItem = ({item, index}) => {
    return (
      <MenuItemCard
        item={item}
        index={index}
        editShow={false}
        toggleShow={false}
        onDelete={handleDeletePopUpToggle}
      />
    );
  };

  const saveGroup = async seacrh => {
    if (type == 'add') {
      await addMenuGroup(
        seacrh,
        groupActive,
        appUser,
        handleLoading,
        navigation,
      );
    } else {
      await updateMenuGroup(
        seacrh,
        data,
        groupActive,
        appUser,
        handleLoading,
        navigation,
      );
    }
  };

  const handleLoading = v => {
    setLoading(v);
  };

  const onPressToggle = async item => {
    if (type == 'add') {
      setGroupActive(item);
    } else {
      const resToggle = await updateStatusMenuGroup(
        data,
        item,
        appUser,
        handleLoading,
      );
      if (resToggle?.statusCode == 200) {
        setGroupActive(item);
      } else {
        setGroupActive(!item);
      }
    }
  };

  const onDeleteGroupItem = async data => {
    await deleteGroupItem(
      appUser,
      data,
      0,
      handleLoading,
      onSuccessGroupDelete,
    );
  };

  const onSuccessGroupDelete = v => {
    // console.log('onSuccessGroupDelete v --', v);
    setIsDelete(false);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Header
        onPress={() => {
          navigation.goBack();
        }}
        backArrow={true}
        title={type == 'add' ? 'Add Category' : 'Edit Category'}
        bottomLine={1}
      />
      <KeyboardAvoidingView behavior={'padding'} style={{flex: 1}}>
        <View style={{marginHorizontal: 30, justifyContent: 'center'}}>
          <View style={styles.topSeacrhMain}>
            <View style={styles.textView}>
              <Text style={styles.categoryName}>Category name</Text>
              <TouchableOpacity
                style={{opacity: seacrh?.length > 0 ? 1 : 0.6}}
                disabled={seacrh?.length > 0 ? false : true}
                onPress={() => {
                  saveGroup(seacrh);
                }}
                hitSlop={styles.hitSlop}>
                <Text style={styles.save}>Save</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.inputView}>
              <TextInput
                value={seacrh}
                onChangeText={t => {
                  setSeacrh(t);
                }}
                placeholderTextColor={colors.placeHolderColor}
                placeholder="Enter name"
                style={styles.input}
              />
            </View>
          </View>
        </View>
        <Spacer space={'1.5%'} />
        {/* <ScrollView style={{flex: 1}}> */}
        {loadingGroup == true ? (
          <AnimatedLoader type={'allMenuItemLoader'} />
        ) : (
          <>
            <View style={styles.activeView}>
              <View style={styles.toggleView}>
                <MenuToggleStock
                  onPressToggle={onPressToggle}
                  left={true}
                  stock={groupActive}
                  status={'active'}
                />
                <Text style={{flex: 1}} />
                <SvgXml
                  onPress={() => {
                    if (type == 'add') {
                      Alert.alert('', 'Firstly add the group');
                    } else {
                      setIsDelete(true);
                    }
                  }}
                  hitSlop={styles.hitSlop}
                  width={24}
                  height={24}
                  xml={appImagesSvg.deleteGrey}
                />
              </View>
              <Text style={styles.allItemsText}>All Items in Categories</Text>
            </View>
            {groupAllItem?.length > 0 ? (
              <View style={styles.flatListView}>
                <FlatList
                  scrollEnabled={true}
                  data={groupAllItem}
                  renderItem={renderItem}
                  keyExtractor={item => item?._id?.toString()}
                  contentContainerStyle={{paddingBottom: '20%'}}
                  showsVerticalScrollIndicator={false}
                />
              </View>
            ) : (
              <View style={styles.noDataView}>
                <Text style={styles.noItemText}>
                  No Items found. Please add items in categroy
                </Text>
              </View>
            )}
            {/* </ScrollView> */}
            <View style={styles.bottomBtnView}>
              <CTA
                disable={data?._id ? false : true}
                bottomCheck={0.1}
                onPress={() => {
                  navigation.navigate('addItems', {
                    selectedArray: groupAllItem,
                    data: data,
                  });
                }}
                width={'94%'}
                title={'ADD ITEMS'}
              />
            </View>
          </>
        )}
      </KeyboardAvoidingView>
      <PopUp
        topIcon={true}
        visible={isDelete}
        type={'delete'}
        onClose={() => setIsDelete(false)}
        title={'You are about to remove an categroy from this categroy list'}
        text={
          'This will delete your categroy from the categroy list are your sure?'
        }
        onDelete={() => {
          onDeleteGroupItem(data);
        }}
      />
      <PopUp
        topIcon={true}
        visible={isDeleteItem}
        type={'delete'}
        onClose={() => {
          setIsDeleteItem(false);
        }}
        title={'You are about to remove an item from this categroy list'}
        text={
          'This will delete your item from the categroy list are your sure?'
        }
        onDelete={() => {
          onDeleteItem(deleteItem);
        }}
      />
    </View>
  );
}
