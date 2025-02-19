import React from 'react';
import {View} from 'react-native';
import Header from '../../../components/header/Header';
import ProfileForm from '../../../forms/ProfileForm';
import {styles} from './styles';

export default function Profile({navigation}) {
  return (
    <View style={styles.container}>
      <Header
        backArrow={true}
        onPress={() => {
          navigation.goBack();
        }}
        title={'Profile'}
        bottomLine={1}
      />

      <ProfileForm navigation={navigation} />
    </View>
  );
}
