import React, { useState, useCallback } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Platform,
    KeyboardAvoidingView,
} from 'react-native';

import { useFocusEffect } from '@react-navigation/native';
import Spacer from '../../../halpers/Spacer';
import { Strings } from '../../../translates/strings';
import { styles } from './styles';
import AuthScreenContent from '../../../components/AuthScreenContent';
import AppInputScroll from '../../../halpers/AppInputScroll';
import RegisterForm from '../../../forms/RegisterForm';
import handleAndroidBackButton from '../../../halpers/handleAndroidBackButton';

export default function Register({ navigation }) {

    useFocusEffect(
        useCallback(() => {
            handleAndroidBackButton(navigation);
        }, []),
    );




    return (
        <View style={styles.container}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <AppInputScroll padding={true} keyboardShouldPersistTaps={'handled'}>
                    <View style={styles.screen}>
                        <AuthScreenContent
                            marginTop={'10%'}
                            title={Strings?.sign_Up}
                            subTitle={Strings?.accessYourAccount}
                        />
                        <RegisterForm navigation={navigation} />

                    </View>
                </AppInputScroll>
            </KeyboardAvoidingView>
        </View>
    );
}
