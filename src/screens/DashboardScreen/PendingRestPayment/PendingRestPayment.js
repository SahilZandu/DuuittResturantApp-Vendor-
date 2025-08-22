import React, { useCallback, useState } from 'react';
import { View, Text, FlatList, } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useFocusEffect } from '@react-navigation/native';
import { styles } from './styles';
import Header from '../../../components/header/Header';
import handleAndroidBackButton from '../../../halpers/handleAndroidBackButton';
import { rootStore } from '../../../stores/rootStore';
import { Surface } from 'react-native-paper';
import moment from 'moment';
import AnimatedLoader from '../../../components/AnimatedLoader/AnimatedLoader';




export default function PendingRestPayment({ navigation }) {
    const { appUser } = rootStore.commonStore;
    const { getRestaurantPendingPayment } = rootStore.orderStore;
    const [weeklyPaymentList, setWeeklyPaymentList] = useState([]);
    const [loading, setLoading] = useState(false);

    useFocusEffect(
        useCallback(() => {
            handleAndroidBackButton(navigation);
            handlePendingRestPayment();
        }, []),
    );


    const handlePendingRestPayment = async () => {
        const res = await getRestaurantPendingPayment(appUser, handleLoading);
        console.log("res---handlePendingRestPayment", res);
        setWeeklyPaymentList(res);
    }


    const handleLoading = (v) => {
        console.log('PendingRestPayment loading', v);
        setLoading(v);
    }


    const formatPayoutDate = (payoutDate, format = "DD-MMM-YYYY") => {
        if (!payoutDate) return "";
        return moment(payoutDate).local().format(format);
    };

    const renderItem = ({ item, index }) => {
        // console.log("item---", item);

        return (
            <Surface elevation={3} style={styles.main}>
                <View style={styles.innerView}>
                    <Text style={styles.payoutsCredited}>{"Payouts are credited to your account every wednesday by 9 Pm for all transactions from the previous Monday-Sunday"}</Text>
                    <Text style={styles.hedingText}>{"Payout Cycle"}</Text>
                    <Text style={styles.payoutCycle}>{item?.payout_cycle}</Text>
                    <View style={styles.orderMainView}>
                        <Text style={styles.hedingText}>{"Orders"}</Text>
                        <Text style={styles.orderText}>{item?.total_week_order}</Text>
                    </View>
                    <View style={styles.orderMainView}>
                        <Text style={styles.hedingText}>{"Estimate Payout"}</Text>
                        <Text style={styles.estimateText}>{item?.payout_amt}</Text>
                    </View>
                    <View style={styles.orderMainView}>
                        <Text style={styles.hedingText}>{"Status"}</Text>
                        <Text style={styles.statusText}>{item?.status}</Text>
                    </View>
                    <View style={styles.orderMainView}>
                        <Text style={styles.hedingText}>{"Payout Date"}</Text>
                        <Text style={styles.payoutDateText}>{formatPayoutDate(item?.payout_date)}</Text>
                    </View>



                </View>
            </Surface>

        );
    };


    return (
        <View style={styles.container}>
            <Header
                backArrow={true}
                onPress={() => {
                    navigation.goBack();
                }}
                title={'Restaurant Payment Payout'}
                bottomLine={1}
            />
             {loading == true ? (
                <AnimatedLoader type={'rateCardViewLoader'} />
            ) : (<>
            {weeklyPaymentList?.length > 0 ?
                <FlatList
                    data={weeklyPaymentList}
                    nestedScrollEnabled={true}
                    contentContainerStyle={{ paddingBottom: hp(5) }}
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                    renderItem={renderItem}
                    keyExtractor={item => item?._id}
                />
                :
                <View style={styles.NoDataView}>
                    <Text style={styles.noDataText}>No Data Found</Text>
                </View>
            }
            </>)}

        </View>
    );
}


