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
import { rootStore } from '../../../stores/rootStore';
import AnimatedLoader from '../../../components/AnimatedLoader/AnimatedLoader';

let distanceFareArray =
    [
        {
            id: 1,
            max_distance: 5,
            min_distance: 0,
            rate_per_km: 10

        },
        {
            id: 2,
            max_distance: 10,
            min_distance: 5,
            rate_per_km: 8

        },
        {
            id: 3,
            max_distance: 100,
            min_distance: 10,
            rate_per_km: 15

        }
    ]

export default function RateFare({ navigation }) {
    const { rateCardFoodList, rateViewCardList } = rootStore.orderStore;
    const [rateCartList, setRateCardList] = useState(rateViewCardList ?? {});
    const [loading, setLoading] = useState(Object.keys(rateViewCardList)?.length > 0 ? false : true)
    const [ratedistanceFareArray, setRateDistanceFareArray] = useState(distanceFareArray ?? [])
    useFocusEffect(
        useCallback(() => {
            handleAndroidBackButton(navigation);
            rateCardListHandler();
        }, []),
    );


    const rateCardListHandler = async () => {
        // if (Object.keys(rateViewCardList)?.length == 0) {
        const res = await rateCardFoodList(handleLoading);
        // console.log("res---rateCardListHandler", res);
        setRateCardList(res)
        setRateDistanceFareArray(res?.distance_rates?.[0]?.slabs?.slice(0, 3) || [])
        // } 
        // else {
        //     console.log("res---rateCardListHandler", rateViewCardList);
        //     setRateCardList(rateViewCardList)
        //     setRateDistanceFareArray(rateCartList?.distance_rates?.[0]?.slabs?.slice(0, 3) || [])
        // }

    }

    const handleLoading = (v) => {
        console.log('v--handleLoading', v);
        if (v === false) {
            setLoading(v)
        }


    }

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
            price: rateCartList?.distance_rates?.[0]?.base_fare ?? 0,
            perMin: '',
            isPluse: '',
            isBottom: true

        },
        {
            id: 3,
            title: 'Platform fee',
            description: 'Collected from customer',
            price: rateCartList?.platform_fee?.fee ?? 1.5,
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


    const convertTo12Hour = (time24) => {
        const [hourStr, minute] = time24?.split(":");
        let hour = parseInt(hourStr, 10);
        const ampm = hour >= 12 ? "PM" : "AM";

        hour = hour % 12 || 12; // convert 0 -> 12
        return `${hour}:${minute} ${ampm}`;
    };


    let extraFareArray = [
        {
            id: 1,
            title: 'Cancelltion Fare',
            description: 'When the customer cancel',
            price: rateCartList?.distance_rates?.[0]?.cancellation_min ?? 0,
            secondPrice: rateCartList?.distance_rates?.[0]?.cancellation_max ?? 24,
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
            title: `Night Fare(${convertTo12Hour(rateCartList?.distance_rates?.[0]?.night_start ?? "22:00")} - ${convertTo12Hour(rateCartList?.distance_rates?.[0]?.night_end ?? "06:00")})`,
            description: `+${rateCartList?.distance_rates?.[0]?.night_increase_percent ?? 40}% on Base ,Time and Distance Fare`,
            price: rateCartList?.distance_rates?.[0]?.night_increase_percent ?? 40,
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
            description: `${rateCartList?.platform_fee?.gst ?? 9}% of (Order + Surge , Long Pickup and Night Fare) If the order consists of Surge or Long Pickup or Night Fare or all of the above`,
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
            {loading !== true ? (
                <AnimatedLoader type={'rateCardViewLoader'} />
            ) : (<>
                {Object.keys(rateViewCardList)?.length > 0 ? <>
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
                                {ratedistanceFareArray?.map((data, i) => {
                                    return (
                                        <DistanceFareComp
                                            data={data}
                                            distanceFareArray={ratedistanceFareArray}
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
                </> :
                    <View style={styles.NoDataView}>
                        <Text style={styles.noDataText}>No View Rate Card Found</Text>
                    </View>}
            </>)}
        </View>
    );
}


