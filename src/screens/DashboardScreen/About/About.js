import React, { useCallback, useState, } from 'react';
import { View, } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { styles } from './styles';
import Header from '../../../components/header/Header';
import AppInputScroll from '../../../halpers/AppInputScroll';
import { appImagesSvg } from '../../../commons/AppImages';
import TouchTextRightIconComp from '../../../components/TextTouchRidgtIconComp';
import handleAndroidBackButton from '../../../halpers/handleAndroidBackButton';
import PopUp from '../../../components/appPopUp/PopUp';
import PopUpInProgess from '../../../components/appPopUp/PopUpInProgess';
import { rootStore } from '../../../stores/rootStore';

export default function About({ navigation }) {
    const { orderAccpetedList } = rootStore.orderStore;
    const { deleteVendor } = rootStore.authStore;

    const [isDelete, setIsDelete] = useState(false);
    const [isProgress, setIsProgress] = useState(false)
    const [isPendingOrder, setIsPendingOrder] = useState(orderAccpetedList ?? [])


    useFocusEffect(
        useCallback(() => {
            const { orderAccpetedList } = rootStore.orderStore;
            setIsPendingOrder(orderAccpetedList);
            handleAndroidBackButton(navigation);
        }, []),
    );



    const handleDelete = async () => {
        await deleteVendor(handleDeleteLoading, isSuccess, onError);
    };


    const handleDeleteLoading = (v) => {
        console.log("v--", v);
        if (v === false) {
            setIsDelete(false);

        }
    }

    const isSuccess = async () => {
        await setToken(null);
        await setAppUser(null);
        setIsDelete(false)
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'auth' }],
            }),
        );
    }

    const onError = () => {
        setIsDelete(false)

    }


    const onDeletePopUp = () => {
        if ((isPendingOrder?.length > 0 || orderAccpetedList?.length > 0)) {
          setIsProgress(true)
        } else {
          setIsDelete(true);
        }
      }


    const aboutOptions = [
        {
            id: '1',
            title: 'Terms and conditions',
            onPress: () => {
                navigation.navigate('myWebComponent', {
                    type: 'terms',
                });
            },
            icon: appImagesSvg.aboutSvg,
            show: true,
            disable: false,
        },
        {
            id: '2',
            title: 'Privacy Policy',
            onPress: () => {
                navigation.navigate('myWebComponent', {
                    type: 'policy',
                });
            },
            icon: appImagesSvg.aboutSvg,
            show: true,
            disable: false,
        },
        {
            id: '3',
            title: 'Open source library',
            onPress: () => {
                navigation.navigate('myWebComponent', {
                    type: 'openSource',
                });
            },
            icon: appImagesSvg.aboutSvg,
            show: true,
            disable: false,
        },
        {
            id: '4',
            title: 'Delete account',
            onPress: () => {
                onDeletePopUp();
                // console.log('Delete Account');
            },
            icon: appImagesSvg.aboutSvg,
            show: true,
            disable: false,
        },
        {
            id: '4',
            title: ' ',
            onPress: () => {
                console.log('aboutSvg');
            },
            icon: appImagesSvg.aboutSvg,
            show: false,
            disable: true,
        },
    ];


    return (
        <View style={styles.container}>
            <Header
                bottomLine={1}
                onPress={() => {
                    navigation.goBack();
                }}
                title={'About'}
                backArrow={true}
            />

            <AppInputScroll
                Pb={'20%'}
                padding={true}
                keyboardShouldPersistTaps={'handled'}>
                <View style={{ marginHorizontal: 5, justifyContent: 'center' }}>
                    <TouchTextRightIconComp firstIcon={false} data={aboutOptions} />
                </View>
            </AppInputScroll>
            <PopUp
                topIcon={true}
                visible={isDelete}
                type={'delete'}
                onClose={() => setIsDelete(false)}
                title={'Are you sure you want to delete your account?'}
                text={
                    'This action is permanent and will remove all your data. Do you really want to continue?'
                }
                onDelete={handleDelete}
            />
            <PopUpInProgess
                topIcon={true}
                CTATitle={'Cancel'}
                visible={isProgress}
                type={'warning'}
                onClose={() => setIsProgress(false)}
                title={`You can't delete account`}
                text={
                    `You can't delete your account while your order is being processed.`
                }
            />
        </View>
    );
}
