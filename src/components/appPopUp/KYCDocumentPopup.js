import React, { useCallback, useState } from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import { appImagesSvg } from '../../commons/AppImages';
import { colors } from '../../theme/colors';
import AppInputScroll from '../../halpers/AppInputScroll';
import { rootStore } from '../../stores/rootStore';
import { useFocusEffect } from '@react-navigation/native';
import TouchTextIcon from '../TouchTextIcon';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Header from '../header/Header';




const KYCDocumentPopUp = ({ appUserData, navigation }) => {
    const { appUser } = rootStore.commonStore;
    const [appDetails, setAppDetails] = useState(appUserData || appUser);

    useFocusEffect(
        useCallback(() => {
            const { appUser } = rootStore.commonStore;
            // handleAndroidBackButton(navigation);
            setAppDetails(appUser);
        }, [appUser]),
    );

    // console.log('appUser--++--', appUser);

    const kycInformation = [
        {
            id: '1',
            title: 'Bank Details',
            onPress: () => {
                navigation.navigate('bankDetails');
            },
            icon:
                appUser?.bankDetails?.length > 0
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
                appUser?.fssaiDetails?.length > 0
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
                appUser?.gstDetails?.length > 0
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
                appUser?.panCardDetails?.length > 0
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



    return (
        <View style={styles.mainView}>
            <Header
                backArrow={false}
                // onPress={() => {
                //     navigation.goBack();
                // }}
                title={'KYC Document'}
                bottomLine={1}
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
