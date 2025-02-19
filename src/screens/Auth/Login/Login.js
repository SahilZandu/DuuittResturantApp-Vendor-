import React, {useState, useCallback} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import {colors} from '../../../theme/colors';
import LoginForm from '../../../forms/LoginForm';
import handleAndroidBackButton from '../../../halpers/handleAndroidBackButton';
import {useFocusEffect} from '@react-navigation/native';
import Spacer from '../../../halpers/Spacer';
import {Strings} from '../../../translates/strings';
import {styles} from './styles';
import AuthScreenContent from '../../../components/AuthScreenContent';
import AppInputScroll from '../../../halpers/AppInputScroll';
import BTN from '../../../components/cta/BTN';

export default function Login({navigation}) {
  const [type, setType] = useState('Mobile');
  const [update, setUpdate] = useState(true);

  useFocusEffect(
    useCallback(() => {
      handleAndroidBackButton();
      clearInputs();
    }, []),
  );

  const clearInputs = () => {
    setUpdate(false);

    setTimeout(() => {
      setUpdate(true);
    }, 10);
  };

  const handleType = () => {
    clearInputs();
    setType(type == 'Mobile' ? 'Email' : 'Mobile');
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <AppInputScroll padding={true} keyboardShouldPersistTaps={'handled'}>
          <View style={styles.screen}>
            <AuthScreenContent
              marginTop={'25%'}
              title={Strings?.sign_In}
              subTitle={Strings?.accessYourAccount}
            />
            <Spacer space={'6%'} />
            {update && <LoginForm navigation={navigation} type={type} />}
            <Text style={styles.orText}>{Strings.Or}</Text>
            <Spacer space={'7%'} />
            <BTN
              backgroundColor={colors.white}
              labelColor={colors.black}
              title={
                type == 'Mobile'
                  ? `${Strings?.loginWithEmail}`
                  : `${Strings?.loginWithMobile}`
              }
              onPress={handleType}
              textTransform={'capitalize'}
            />
            <View style={styles.termsPolicyMainView}>
              <Text style={styles.agreeText}>
                By proceeding, you agree with our
              </Text>
              <View style={styles.termsPolicyView}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('myWebComponent', {
                      type: 'terms',
                    });
                  }}
                  activeOpacity={0.8}>
                  <Text style={styles.termsText}>Terms & Conditions</Text>
                </TouchableOpacity>
                <Text style={styles.andText}> & </Text>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('myWebComponent', {
                      type: 'policy',
                    });
                  }}
                  activeOpacity={0.8}>
                  <Text style={styles.privacyText}>Privacy Policy</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </AppInputScroll>
      </KeyboardAvoidingView>
    </View>
  );
}
