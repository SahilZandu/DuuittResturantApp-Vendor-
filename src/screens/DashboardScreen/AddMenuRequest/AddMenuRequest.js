import React, {useEffect} from 'react';
import {View} from 'react-native';
import Header from '../../../components/header/Header';
import handleAndroidBackButton from '../../../halpers/handleAndroidBackButton';
import {styles} from './styles';
import AddMenuRequestForm from '../../../forms/AddMenuRequestForm';

export default function AddMemuRequest({navigation}) {
  useEffect(() => {
    handleAndroidBackButton(navigation);
  }, []);

  return (
    <View style={styles.container}>
      <Header
        backArrow={true}
        onPress={() => {
          navigation.goBack();
        }}
        title={'Menu Request'}
        bottomLine={1}
      />
      <AddMenuRequestForm navigation={navigation} />
    </View>
  );
}
