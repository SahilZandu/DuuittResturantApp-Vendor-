import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { WebView } from 'react-native-webview';
import {
  termsAndConditionsLink,
  privacyPolicyLink,
  openSourceyLink,
} from '../../../halpers/AppLink';
import handleAndroidBackButton from '../../../halpers/handleAndroidBackButton';
import Header from '../../../components/header/Header';
import { styles } from './styles';

export default function MyWebComponent({ navigation, route }) {
  const [loading, setLoading] = useState(true);
  const { type } = route?.params;

  let link = type == 'policy' ? privacyPolicyLink : type == 'terms' ? termsAndConditionsLink : openSourceyLink;

  useEffect(() => {
    if (type == 'policy') {
      link = privacyPolicyLink
    } else if (type == 'terms') {
      link = termsAndConditionsLink
    } else {
      link = openSourceyLink
    }
  }, [type])

  const setHeaderText = (type) => {
    switch (type) {
      case 'policy':
        return 'Privacy Policy';
      case 'terms':
        return 'Terms & Conditions'
      default:
        return 'Open Source Library';
    }
  }


  useEffect(() => {
    handleAndroidBackButton(navigation);
  }, []);



  return (
    <View style={styles.container}>
      <Header
        onPress={() => {
          navigation.goBack();
        }}
        backArrow={true}
        title={setHeaderText(type)}
      />
      {loading && (
        <View
          style={{
            height: hp('100%'),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      )}
      <View style={{ flex: 1 }}>
        <WebView
          style={{ flex: 1 }}
          source={{ uri: link }}
          onLoadStart={item => {
            setLoading(true);
          }}
          onLoadEnd={item => {
            setLoading(false);
          }}
        />
      </View>
    </View>
  );
}
