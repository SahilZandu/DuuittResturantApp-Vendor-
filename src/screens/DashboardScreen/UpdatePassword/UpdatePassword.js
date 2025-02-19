import React from 'react';
import {Text, View} from 'react-native';
import Header from '../../../components/header/Header';
import {styles} from './styles';
import UpdatePasswordForm from '../../../forms/UpdatePasswordForm';

export default function UpdatePassword({navigation}) {
  return (
    <View style={styles.container}>
      <Header
        backArrow={true}
        onPress={() => {
          navigation.goBack();
        }}
        title={'Password Update'}
        bottomLine={1}
      />

      <UpdatePasswordForm navigation={navigation} />
    </View>
  );
}
