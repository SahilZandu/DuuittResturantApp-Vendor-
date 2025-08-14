import React, { useCallback, useState } from 'react';
import { View, Text, } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { useFocusEffect } from '@react-navigation/native';
import { styles } from './styles';
import Header from '../../../components/header/Header';
import AppInputScroll from '../../../halpers/AppInputScroll';
import handleAndroidBackButton from '../../../halpers/handleAndroidBackButton';
import { Surface } from 'react-native-paper';
import UpperViewBC from '../../../components/UpperViewBC';
import { colors } from '../../../theme/colors';
import TwoTextRender from '../../../components/TwoTextRender';
import { DotView } from '../../../halpers/DotView';
import DistanceFareComp from '../../../components/DistanceFareComp';
import Spacer from '../../../halpers/Spacer';
import OrderFareComp from '../../../components/orderFareComp';
import ExtraFareComp from '../../../components/ExtraFareComp';
import CommissionFareComp from '../../../components/CommissionFareComp';
import { DotViewCardRate } from '../../../halpers/DotViewCardRate';


export default function RateFare({ navigation }) {

    useFocusEffect(
        useCallback(() => {
            handleAndroidBackButton(navigation);
        }, []),
    );

    let distanceFareArray = [
        {
            id: 1,
            km: "₹100 to ₹200",
            price: 30,
            perKm: 'per/order'

        },
        {
            id: 2,
            km: "₹200 to ₹1000",
            price: 80,
            perKm: 'per/order'

        },
        {
            id: 3,
            km: "₹1000 to ₹5000",
            price: 200,
            perKm: 'per/order'

        },
        {
            id: 4,
            km: "₹5000 to ₹100000",
            price: 500,
            perKm: 'per/order'

        }
    ]

    let orderFareArray = [
        // {
        //     id: 1,
        //     title: 'Time Fare',
        //     description: 'Time to complete the order',
        //     price: 0.52,
        //     perMin: 'per min',
        //     isPluse: '',
        //     isBottom: true

        // },
        {
            id: 2,
            title: 'Base Fare',
            description: 'For completing an order',
            price: 11,
            perMin: '',
            isPluse: '',
            isBottom: true

        },
        {
            id: 3,
            title: 'Platform fee',
            description: 'Collected from customer',
            price: 1.5,
            perMin: '',
            isPluse: '',
            isBottom: false

        },
        // {
        //     id: 4,
        //     title: 'Wait Time charges',
        //     description: 'Afrer 3 min (max ₹15)',
        //     price: 1,
        //     perMin: 'per min',
        //     isPluse: '+',
        //     isBottom: false

        // },
    ]


    let extraFareArray = [
        {
            id: 1,
            title: 'Cancelltion Fare',
            description: 'When the customer cancel',
            price: 0,
            secondPrice: 24,
            isPluse: '+',
            isBottom: true,
            isRupee: true,
            isPercent: false,
        },
        {
            id: 2,
            title: 'Surge Fare',
            description: 'Extra fare paid by customer',
            price: 0,
            secondPrice: 0,
            isPluse: '',
            isBottom: true,
            isRupee: false,
            isPercent: false,

        },
        {
            id: 3,
            title: 'Night Fare(10:00pm - 6:00am)',
            description: '+40% on Base ,Time and Distance Fare',
            price: 40,
            secondPrice: 0,
            isPluse: '+',
            isBottom: false,
            isRupee: false,
            isPercent: true,

        },
    ]


    let commissionFareArray = [
        {
            id: 1,
            title: "DuuItt's Commission",
            description: '9% of (Order + Surge , Long Pickup and Night Fare) If the order consists of Surge or Long Pickup or Night Fare or all of the above',
            price: 0,
            perMin: '',
            isPluse: '',
            isBottom: true

        },
        {
            id: 2,
            title: 'Base Fare',
            description: 'For completing an order',
            price: 0,
            perMin: '',
            isPluse: '',
            isBottom: true

        },
        {
            id: 3,
            title: 'Platform fee',
            description: 'Collected from customer',
            price: 0,
            perMin: '',
            isPluse: '',
            isBottom: false

        },
    ]

    return (
        <View style={styles.container}>
            <Header
                backArrow={true}
                onPress={() => {
                    navigation.goBack();
                }}
                title={'Rate Card'}
                bottomLine={1}
            />
            <AppInputScroll
                Pb={'25%'}
                padding={true}
                keyboardShouldPersistTaps={'handled'}>

                <Surface elevation={3} style={styles.main}>
                    <UpperViewBC title={"Order Fare"}
                        backColor={colors.colorDo6}
                        textColor={colors.green}
                    />
                    <TwoTextRender title={'Food Fare'}
                        des={'For the food order'} />

                    <View style={styles.dotView}>
                        <DotViewCardRate />
                    </View>
                    <View style={styles.renderFareView}>
                        {distanceFareArray?.map((data, i) => {
                            return (
                                <DistanceFareComp
                                    data={data}
                                    distanceFareArray={distanceFareArray}
                                    i={i}
                                />
                            )
                        })}
                    </View>
                    <Spacer space={'2%'} />
                    <View style={styles.oderFareLine} />
                    {orderFareArray?.map((data, i) => {
                        return (
                            <OrderFareComp data={data} />
                        )
                    })}

                </Surface>


                <Surface elevation={3} style={styles.extraSurface}>
                    <UpperViewBC title={"Extra Fare (not applicable on all orders)"}
                        backColor={colors.colorDo6}
                        textColor={colors.green}
                    />

                    {extraFareArray?.map((data, i) => {

                        return (
                            <ExtraFareComp data={data} />
                        )

                    })}

                </Surface>


                <Surface elevation={3} style={styles.commissionSurface}>
                    <UpperViewBC title={"Commission and GST (Depends on order fare)"}
                        backColor={colors.colorFC15}
                        textColor={colors.colorFC}
                    />

                    {commissionFareArray?.map((data, i) => {

                        return (
                            <CommissionFareComp data={data} />
                        )

                    })}

                </Surface>

            </AppInputScroll>
        </View>
    );
}


