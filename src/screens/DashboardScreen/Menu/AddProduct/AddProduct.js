import React, {useCallback} from 'react';
import {View} from 'react-native';
import {styles} from './styles';
import Header from '../../../../components/header/Header';
import AddProductForm from '../../../../forms/AddProductForm';
import {useFocusEffect} from '@react-navigation/native';
import handleAndroidBackButton from '../../../../halpers/handleAndroidBackButton';
import EditProductForm from '../../../../forms/EditProductForm';

export default function AddProduct({navigation, route}) {
  const {data, type} = route.params;
  //  console.log("data--",data,type);
  useFocusEffect(
    useCallback(() => {
      handleAndroidBackButton(navigation);
    }, []),
  );

  return (
    <View style={styles.container}>
      <Header
        onPress={() => {
          navigation.goBack();
        }}
        backArrow={true}
        title={type == 'add' ? 'Add Product' : 'Edit Product'}
        bottomLine={1}
      />
      {type == 'add' ? (
        <AddProductForm navigation={navigation} />
      ) : (
        <EditProductForm navigation={navigation} item={data} />
      )}
    </View>
  );
}
