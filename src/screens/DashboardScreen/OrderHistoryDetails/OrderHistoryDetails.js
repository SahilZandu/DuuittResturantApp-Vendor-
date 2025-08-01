import React, { useEffect, useState, useCallback } from 'react';
import { View, Text } from 'react-native';
import Header from '../../../components/header/Header';
import { styles } from './styles';
import { useFocusEffect } from '@react-navigation/native';
import handleAndroidBackButton from '../../../halpers/handleAndroidBackButton';
import moment from 'moment';
import AppInputScroll from '../../../halpers/AppInputScroll';
import { SvgXml } from 'react-native-svg';
import { appImagesSvg } from '../../../commons/AppImages';
import { currencyFormat } from '../../../halpers/currencyFormat';
import { Line } from '../../../halpers/Line';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';
import { fonts } from '../../../theme/fonts/fonts';
import { colors } from '../../../theme/colors';
import OrdersInstrucationsComp from '../../../components/OrderInstructionsComp';



export default function OrderHistoryDetails({ navigation, route }) {
    const { item } = route.params;

    console.log("item---route.params", item);

    useFocusEffect(
        useCallback(() => {
            handleAndroidBackButton(navigation);
        }, []),
    );

    const dateFormat = d => {
        var date = new Date(d);
        return moment(date).format('DD MMM YYYY [at] h:mmA');
    };


    let amountArray = [
        {
            name: 'Item total',
            amount: item?.billing_detail?.item_sub_total_amount ?? item?.item_sub_total_amount ?? 0,
        },
        {
            name: 'Restaurant Charges',
            amount:item?.billing_detail?.restaurant_charge_amount ?? 0,
        },
        {
            name: 'Management Charges',
            amount:item?.billing_detail?.distance_fee ??  0,
        },
        {
            name: 'Packing Charges',
            amount:item?.billing_detail?.packing_fee ?? item?.packing_fee ?? 0,
          },
        {
            name: 'Plateform Fee',
            amount: item?.billing_detail?.platform_fee ?? 0,
        },
        {
            name: 'GST Charges',
            amount:item?.billing_detail?.gst_fee ?? item?.billing_detail?.tax_amount ?? 0,
        },
        {
            name: 'Delivery Charges',
            amount:item?.billing_detail?.delivery_fee ??  0,
        },
       
        {
            name: 'Grand Total',
            amount:item?.billing_detail?.total_amount ?? item?.total_amount ?? 0,
        },


    ]


    return (
        <View style={styles.container}>
            <Header
                onPress={() => {
                    navigation.goBack();
                }}
                backArrow={true}
                title={'Order History Details'}
                bottomLine={1}
            />
            <AppInputScroll
                Pb={hp('20%')}
                padding={true}
                keyboardShouldPersistTaps={'handled'}>
                <View style={styles.innerView}>
                    <View style={styles.IdStatusView}>
                        <Text style={styles.IdText}>#{item?.order_id}</Text>
                        <Text style={styles.statusText}>{item?.status}</Text>
                    </View>
                    <View style={styles.nameDateView}>
                        <Text numberOfLines={1} style={styles.nameText}>{item?.customer?.name}</Text>
                        <Text style={styles.dateText}>{dateFormat(item?.createdAt)}</Text>
                    </View>
                    <View style={styles.foodMainView}>
                        {item?.cart_items?.map((data, i) => {
                            return (
                                <>
                                    <View style={styles.foodItemView}>
                                        <SvgXml xml={appImagesSvg.veg} />
                                        <Text style={styles.quantity}>{data?.quantity} X</Text>
                                        <Text numberOfLines={1} style={styles.foodName}>{data?.varient_name ? data?.varient_name : data?.food_item_name}</Text>
                                        <Text style={styles.foodPrice}>{currencyFormat(data?.varient_price ? data?.varient_price : data?.food_item_price)}</Text>
                                    </View>
                                    {data?.selected_add_on?.length > 0 && (
                                        <View style={styles.addonsView}>
                                            <Text numberOfLines={2} style={styles.addonsName}>
                                                {data?.selected_add_on?.map(item => item?.addon_name).join(', ')}
                                            </Text>
                                            <Text style={styles.addonsPrice}>
                                                {currencyFormat(
                                                    data?.selected_add_on?.reduce((acc, item) => acc + Number(item?.addon_price || 0), 0)
                                                )}
                                            </Text>
                                        </View>
                                    )}
                                    {item?.cart_items?.length - 1 == i && <Line mainStyle={{ marginTop: hp('2%') }} />}
                                </>
                            )
                        })}

                    </View>
                    <View style={{ marginTop: '2%' }}>
                        {amountArray?.map((data, i) => {
                            return (
                                <>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: '4%' }}>
                                        <Text style={{ flex: 1, fontSize: i == amountArray?.length - 1 ? RFValue(16) : RFValue(13), fontFamily: fonts.medium, color: colors.color8F }}>{data?.name}</Text>
                                        <Text style={{ fontSize: RFValue(16), fontFamily: fonts.medium, color: colors.black }}>{currencyFormat(data?.amount)}</Text>
                                    </View>
                                    {i == amountArray?.length - 2 && <Line mainStyle={{ marginTop: hp('2%') }} />}
                                </>
                            )
                        })}
                    </View>
                    <OrdersInstrucationsComp item={item} />
                </View>
            </AppInputScroll>
        </View>
    );
}
