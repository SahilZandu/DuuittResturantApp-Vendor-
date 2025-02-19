import React from 'react';
import {View, StyleSheet} from 'react-native';
import Header from '../../../../components/header/Header';
import AddProductPrice from '../../../../forms/AddProductPrice';
import {colors} from '../../../../theme/colors';

const AddVariantPrice = ({navigation, route}) => {
  return (
    <View style={styles.screen}>
      <Header
        onPress={() => {
          navigation.goBack();
        }}
        backArrow={true}
        title={'Add Item'}
        bottomLine={1}
      />
      <AddProductPrice navigation={navigation} route={route} />
    </View>
  );
};

export default AddVariantPrice;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.appBackground,
  },
});
