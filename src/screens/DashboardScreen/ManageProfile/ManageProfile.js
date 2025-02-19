import React from 'react';
import {View} from 'react-native';
import Header from '../../../components/header/Header';
import {styles} from './styles';
import MaangeProfileForm from '../../../forms/ManageProfileForm';

export default function ManageProfile({navigation}) {
  return (
    <View style={styles.container}>
      <Header
        backArrow={true}
        onPress={() => {
          navigation.goBack();
        }}
        title={'Manage Profile'}
        bottomLine={1}
      />
      <MaangeProfileForm navigation={navigation} />
    </View>
  );
}
