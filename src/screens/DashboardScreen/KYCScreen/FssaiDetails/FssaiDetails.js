import React from 'react';
import {Text, View} from 'react-native';
import Header from '../../../../components/header/Header';
import DocumentForm from '../../../../forms/DocumentForm';
import {styles} from './styles';

export default function FssaiDetails({navigation}) {
  return (
    <View style={styles.container}>
      <Header
        backArrow={true}
        onPress={() => {
          navigation.goBack();
        }}
        title={'FSSAI Details'}
        bottomLine={1}
      />
      <DocumentForm
        form={'fssai'}
        navigation={navigation}
        hint={
          'Please enter your FSSAI number. We require a clear image or PDF of your FSSI document for verification. Ensure that the uploaded file contains all relevant details. Thank you for your cooperation!'
        }
      />
    </View>
  );
}
