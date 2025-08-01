import React, { useCallback, useEffect, useState } from 'react';
import { Text, View, StyleSheet, Pressable, DeviceEventEmitter } from 'react-native';
import { appImagesSvg } from '../../commons/AppImages';
import { colors } from '../../theme/colors';
import AppInputScroll from '../../halpers/AppInputScroll';
import { rootStore } from '../../stores/rootStore';
import { CommonActions, useFocusEffect } from '@react-navigation/native';
import TouchTextIcon from '../TouchTextIcon';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Header from '../header/Header';
import PopUp from './PopUp';




const KYCDocumentPopUp = ({ appUserData, navigation }) => {
    const { appUser, setAppUser, setToken } = rootStore.commonStore;
    const { getAppUser, userLogout } = rootStore.authStore;
    const [appDetails, setAppDetails] = useState(appUserData || appUser?.role === "vendor" ? appUser : appUser?.vendor);
    const [isLogout, setIsLogout] = useState(false);

    useFocusEffect(
        useCallback(() => {
            const { appUser } = rootStore.commonStore;
            // handleAndroidBackButton(navigation);
            setAppDetails(appUser?.role === "vendor" ? appUser : appUser?.vendor);
        }, []),
    );


    const getAppUserData = async () => {
        const userData = await getAppUser(appUser)

        console.log("userData--kyc pop", userData);

        if (userData?._id?.length > 0) {
            setAppDetails(userData?.role === "vendor" ? userData : userData?.vendor);
        } else {
            setAppDetails(appUser?.role === "vendor" ? appUser : appUser?.vendor);
        }
    }

    useEffect(() => {
        const subscription = DeviceEventEmitter.addListener('kycStatusUpdate', data => {
            console.log('kycStatusUpdate Order data --Kyc pop ', data);
            getAppUserData();
        });
        return () => {
            subscription.remove();
        };
    }, []);


    const kycInformation = [
        {
            id: '1',
            title: 'Bank Details',
            onPress: () => {
                navigation.navigate('bankDetails');
            },
            icon:
                // appUser?.bank_detail?.length > 0
                appDetails?.bank_detail?.status == "approved"
                    ? appImagesSvg.greenTick
                    : appImagesSvg.crossTick,
            show: true,
            disable: false,
            status:
                appDetails?.bank_detail?.account_number?.toString()?.length > 0
                    ? appDetails?.bank_detail?.status
                    : 'fill detail',
        },
        {
            id: '2',
            title: 'FSSAI Details',
            onPress: () => {
                navigation.navigate('fssaiDetails');
            },
            icon:
                // appUser?.fssai_detail?.length > 0
                appDetails?.fssai_detail?.status == "approved"
                    ? appImagesSvg.greenTick
                    : appImagesSvg.crossTick,
            show: true,
            disable: false,
            status:
                appDetails?.fssai_detail?.account_number?.toString()?.length > 0
                    ? appDetails?.fssai_detail?.status
                    : 'fill detail',
        },
        {
            id: '3',
            title: 'GST Details',
            onPress: () => {
                navigation.navigate('gstDetails');
            },
            icon:
                // appUser?.gstn_detail?.length > 0
                appDetails?.gstn_detail?.status == "approved"
                    ? appImagesSvg.greenTick
                    : appImagesSvg.crossTick,
            show: true,
            disable: false,
            status:
                appDetails?.gstn_detail?.gstn_number?.toString()?.length > 0
                    ? appDetails?.gstn_detail?.status
                    : 'fill detail',
        },
        {
            id: '4',
            title: 'PAN Card Details',
            onPress: () => {
                navigation.navigate('panCardDetails');
            },
            icon:
                // appUser?.pan_detail?.length > 0
                appDetails?.pan_detail?.status == "approved"
                    ? appImagesSvg.greenTick
                    : appImagesSvg.crossTick,
            show: true,
            disable: false,
            status:
                appDetails?.pan_detail?.pan_number?.toString()?.length > 0
                    ? appDetails?.pan_detail?.status
                    : 'fill detail',
        },
    ];



    const handleLogout = async () => {
        await userLogout(handleLogoutLoading, isSuccess, onError);
    }


    const handleLogoutLoading = (v) => {
        console.log("v--", v);
        if (v === false) {
            setIsLogout(false);
        }
    }

    const isSuccess = async () => {
        await setToken(null);
        await setAppUser(null);
        setIsLogout(false)
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'auth' }],
            }),
        );
    }

    const onError = () => {
        setIsLogout(false);
    }



    return (
        <View style={styles.mainView}>
            <Header
                backArrow={false}
                title={'KYC Document'}
                bottomLine={1}
                rightText={"Logout"}
                onPressRight={() => { setIsLogout(true) }}
            />
            <View style={styles.subView}>
                <AppInputScroll padding={true} keyboardShouldPersistTaps={'handled'}>
                    <View style={styles.screen}>
                        {kycInformation?.map(
                            (item, index) =>
                                item?.show && <TouchTextIcon item={item} index={index} />,
                        )}
                    </View>
                </AppInputScroll>

            </View>
            <PopUp
                topIcon={true}
                visible={isLogout}
                type={'logout'}
                onClose={() => setIsLogout(false)}
                title={'Are you sure you want to log out?'}
                text={
                    'You will be log out of your account. Do you want to continue?'
                }
                onDelete={handleLogout}
            />
        </View>
    );
};

export default KYCDocumentPopUp;

const styles = StyleSheet.create({
    mainView: {
        position: 'absolute',
        width: wp('100%'),
        height: hp('100%'),
    },
    subView: {
        backgroundColor: colors.white,
        paddingHorizontal: '5%',
        borderRadius: 15,
    },
    screen: {
        flex: 1,
        justifyContent: 'center',
    }

});
