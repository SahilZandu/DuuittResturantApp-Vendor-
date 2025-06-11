import React, {useEffect, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import {styles} from './styles';
import Header from '../../../../components/header/Header';
import CTA from '../../../../components/cta/CTA';
import AddItemCard from '../../../../components/menuCard/AddItemCard';
import {rootStore} from '../../../../stores/rootStore';

export default function AddItems({navigation, route}) {
  const {selectedArray, data} = route.params;
  const {menuItems, addGroupFoodItem} = rootStore.menuStore;
  const {appUser} = rootStore.commonStore;
  const [allMenu, setAllMenu] = useState(menuItems);
  const [loading, setLoading] = useState(false);

  // console.log('selectedArray, data',selectedArray, data);

  useEffect(() => {
    setAllMenu(menuItems);
  }, [menuItems]);

  useEffect(() => {
    const updatedData = allMenu?.map(item => {
      const isAdded = selectedArray?.find(value => value?._id == item?._id);
      // Use a new object to avoid mutating the original `item`
      return {
        ...item,
        groupAdded: isAdded ? true : false,
      };
    });

    // console.log('updatedData:', updatedData);
    setAllMenu(updatedData);
  }, [selectedArray]);

  const onSelected = item => {
    setAllMenu(
      allMenu?.map(data =>
        data?._id === item?._id
          ? {...data, groupAdded: !data.groupAdded}
          : data,
      ),
    );
  };

  const onFinishData = async () => {
    let foodItemArray = [];
    await allMenu?.map((item, i) => {
      if (item?.groupAdded === true) {
        foodItemArray.push(item?._id);
      }
    });
    // console.log('foodItemArray--',foodItemArray);
    await addGroupFoodItem(
      appUser,
      data,
      foodItemArray,
      handleLoading,
      navigation,
    );
  };

  const handleLoading = v => {
    setLoading(v);
  };

  const renderItem = ({item, i}) => {
    return <AddItemCard item={item} onPressSelected={onSelected} />;
  };

  return (
    <View style={styles.container}>
      <Header
        onPress={() => {
          navigation.goBack();
        }}
        backArrow={true}
        title={'Add Items'}
        bottomLine={1}
      />

      {allMenu?.length > 0 ? (
        <View style={styles.flatListView}>
          <FlatList
            data={allMenu}
            renderItem={renderItem}
            keyExtractor={item => item?._id.toString()}
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

      <View style={styles.bottomBtnView}>
        <CTA
          onPress={() => {
            onFinishData();
          }}
          bottomCheck={0.1}
          width={'94%'}
          title={'Finish'}
          loading={loading}
        />
      </View>
    </View>
  );
}
