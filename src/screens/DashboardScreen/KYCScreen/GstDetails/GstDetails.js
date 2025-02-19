import React from 'react';
import {Text, View} from 'react-native';
import Header from '../../../../components/header/Header';
import DocumentForm from '../../../../forms/DocumentForm';
import {styles} from './styles';

export default function GstDetails({navigation}) {
  return (
    <View style={styles.container}>
      <Header
        backArrow={true}
        onPress={() => {
          navigation.goBack();
        }}
        title={'GST Details'}
        bottomLine={1}
      />
      <DocumentForm
        form={'gst'}
        navigation={navigation}
        hint={
          'Please enter your GST number. We require a clear image or PDF of your GST document for verification. Ensure that the uploaded file contains all relevant details. Thank you for your cooperation!'
        }
      />
    </View>
  );
}
