import { useFocusEffect } from '@react-navigation/native';
import React, { useState, useCallback } from 'react';
import { View } from 'react-native';
import Header from '../../../components/header/Header';
import TextSwitchComp from '../../../components/TextSwitchComp';
import handleAndroidBackButton from '../../../halpers/handleAndroidBackButton';
import { styles } from './styles';

export default function Notification({ navigation }) {
  const [switchStatus, setSwitchStatus] = useState(true);
  const [switchStatus1, setSwitchStatus1] = useState(true);

  useFocusEffect(
    useCallback(() => {
      handleAndroidBackButton(navigation);
    }, []),
  );

  return (
    <View style={styles.container}>
      <Header
        backArrow={true}
        onPress={() => {
          navigation.goBack();
        }}
        title={'Notifications'}
        bottomLine={1}
      />
      <View style={styles.innerView}>
        <TextSwitchComp
          title={'Orders Notification'}
          status={switchStatus}
          onPressToggle={item => {
            setSwitchStatus(item);
          }}
        />
        <TextSwitchComp
          title={'Profile Notification'}
          status={switchStatus1}
          onPressToggle={item => {
            setSwitchStatus1(item);
          }}
        />
      </View>
    </View>
  );
}
