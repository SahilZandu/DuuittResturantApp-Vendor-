import React from 'react';
import {Text, View} from 'react-native';
import Header from '../../../../components/header/Header';
import PanCardForm from '../../../../forms/PanCardForm';
import {styles} from './styles';

export default function PanCardDetails({navigation}) {
  return (
    <View style={styles.container}>
      <Header
        backArrow={true}
        onPress={() => {
          navigation.goBack();
        }}
        title={'PAN Card Details'}
        bottomLine={1}
      />
      <PanCardForm form={'pancard'} navigation={navigation} />
    </View>
  );
}
