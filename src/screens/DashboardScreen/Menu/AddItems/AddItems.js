import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { styles } from './styles';
import Header from '../../../../components/header/Header';
import CTA from '../../../../components/cta/CTA';
import AddItemCard from '../../../../components/menuCard/AddItemCard';
import { rootStore } from '../../../../stores/rootStore';
import Tabs from '../../../../components/Tabs';
import SearchInputComp from '../../../../components/SearchInputComp';
import { isTablet } from 'react-native-device-info';

const tabs = [
  {
    text: 'All',
  },
  {
    text: 'Veg',
  },
  {
    text: 'Non-Veg',
  },

  {
    text: 'Egg',
  },
];

let defaultText = "All"

export default function AddItems({ navigation, route }) {
  const { selectedArray, data } = route.params;
  const { menuItems, addGroupFoodItem } = rootStore.menuStore;
  const { appUser } = rootStore.commonStore;
  const [allMenu, setAllMenu] = useState(menuItems);
  const [filterAllMenu, setFilterAllMenu] = useState(menuItems);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSeachValue] = useState('');

  // console.log('selectedArray, data',selectedArray, data);
  // console.log('menuItems--',menuItems);

  useEffect(() => {
    setAllMenu(menuItems);
    setFilterAllMenu(menuItems)
    defaultText = 'All'
  }, [menuItems]);

  useEffect(() => {
    // const updatedData = allMenu?.map(item => {
    //   const isAdded = selectedArray?.find(value => value?._id == item?._id);
    //   // Use a new object to avoid mutating the original `item`
    //   return {
    //     ...item,
    //     groupAdded: isAdded ? true : false,
    //   };
    // });
    // // console.log('updatedData:', updatedData);
    // setAllMenu(updatedData);
    seletctedArrayData(menuItems ?? allMenu);
  }, [selectedArray, menuItems]);

  const seletctedArrayData = (data) => {
    const updatedData = data?.map(item => {
      const isAdded = selectedArray?.find(value => value?._id == item?._id);
      // Use a new object to avoid mutating the original `item`
      return {
        ...item,
        groupAdded: isAdded ? true : false,
      };
    });
    // console.log('updatedData:', updatedData);
    setAllMenu(updatedData);
  }

  const onSelected = item => {
    setAllMenu(
      allMenu?.map(data =>
        data?._id === item?._id
          ? { ...data, groupAdded: !data.groupAdded }
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

  const handleTabFilter = async (data) => {
    defaultText = data
    setSeachValue('');
    if (data === "All") {
      setAllMenu(filterAllMenu);
      seletctedArrayData(filterAllMenu);
    }
    else if (data === 'Veg') {
      const resFilter = filterAllMenu?.filter(item => item?.veg_nonveg === data?.toLowerCase());
      setAllMenu(resFilter);
      seletctedArrayData(resFilter);
    } else if (data === 'Non-Veg') {
      const resFilter = filterAllMenu?.filter(item => item?.veg_nonveg === data?.toLowerCase());
      setAllMenu(resFilter);
      seletctedArrayData(resFilter);
    }
    else if (data === 'Egg') {
      const resFilter = filterAllMenu?.filter(item => item?.veg_nonveg === data?.toLowerCase());
      setAllMenu(resFilter);
      seletctedArrayData(resFilter);
    }
  };


  const filterFoodItems = async (data, searchQuery, defaultText) => {
    const query = searchQuery?.toLowerCase().trim();
    let resFilter = data
    if (defaultText !== "All") {
      resFilter = await data?.filter(item => item?.veg_nonveg === defaultText?.toLowerCase());
    }

    return await resFilter?.filter(item => {
      const nameMatch = item?.name?.toLowerCase()?.includes(query);
      const tagMatch = item?.tag?.toLowerCase()?.includes(query);
      const priceMatch = item?.selling_price?.toString()?.includes(query);

      return nameMatch || tagMatch || priceMatch;
    });
  };

  const handleSearching = async (search) => {
    setSeachValue(search);
    const searchRes = await filterFoodItems(filterAllMenu, search, defaultText)
    console.log("searchRes--", searchRes);
    setAllMenu(searchRes);
    seletctedArrayData(searchRes);

  }


  const renderItem = ({ item, i }) => {
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
      <SearchInputComp
        value={searchValue}
        onChangeText={item => {
          handleSearching(item)
          // setSeachValue(item);
        }}
      />

      <Tabs tabs={tabs} tabPress={handleTabFilter} />

      {allMenu?.length > 0 ? (
        <View style={styles.flatListView}>
          <FlatList
            data={allMenu}
            renderItem={renderItem}
            keyExtractor={item => item?._id.toString()}
            contentContainerStyle={{ paddingBottom: '20%' }}
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
