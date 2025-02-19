import React from 'react';
import {View} from 'react-native';
import Header from '../../../../components/header/Header';
import BankDetailsForm from '../../../../forms/BankDetailsForm';
import {styles} from './styles';

export default function BankDetails({navigation}) {
  return (
    <View style={styles.container}>
      <Header
        backArrow={true}
        onPress={() => {
          navigation.goBack();
        }}
        title={'Bank Details'}
        bottomLine={1}
      />
      <BankDetailsForm navigation={navigation} />
    </View>
  );
}
