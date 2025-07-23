import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Modal,
    Image,
    Pressable,
    Text,
    ScrollView,
    Platform,
    StyleSheet,
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';
import { SvgXml } from 'react-native-svg';
import { fonts } from '../../theme/fonts/fonts';
import { appImages, appImagesSvg } from '../../commons/AppImages';
import { colors } from '../../theme/colors';
import { currencyFormat } from '../../halpers/currencyFormat';
import moment from 'moment';

const OffersDetails = ({
    visible,
    selectedData,
    onClose,
    item,
    onApply,
    getCartTotal,
}) => {
    console.log(
        'item--OffersDetails',
        item,
    );

    let today = new Date()
    // const isDisabled =
    //   selectedData?.referral_code === item?.referral_code ||
    //   getCartTotal?.cartTotal < item?.discount_price;

    const formatTimeWindow = (timeWindowEnd) => {
        const formattedDate = moment(timeWindowEnd).format("DD-MM-YYYY hh:mm A");
        // const formattedTime = moment(timeWindowEnd).format("hh:mm A");
        return formattedDate;
    };

    // Usage
    const timeWindowEnd = "2025-06-29T22:25";
    const { date, time } = formatTimeWindow(timeWindowEnd);

    //   console.log("Date:", date); // "29-06-2025"
    //   console.log("Time:", time); // "10:25 PM"

    let list = [
        {
            id: '1',
            title: 'This offer is personalized for you.',
        },
        {
            id: '2',
            title: `Maximum instant discount of ₹ ${item?.discount_price}`,
        },
        {
            id: '3',
            title: `Applicable maximum ${item?.max_usage_limit ?? 1} times in a day.`,
        },
        {
            id: '4',
            title: `Start Date and time ${formatTimeWindow(item?.usage_conditions?.time_window_start) ?? formatTimeWindow(today)} .`,
        },
        {
            id: '5',
            title: `End Date and time ${formatTimeWindow(item?.usage_conditions?.time_window_end) ?? formatTimeWindow(today)}.`,
        },
        {
            id: '6',
            title: 'Other T&Cs may apply.',
        },
    ];

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={() => {
                onClose();
            }}>
            <View style={styles.container}>
                <Pressable onPress={() => onClose()} style={styles.backButtonTouch}>
                    <Image
                        resizeMode="contain"
                        style={{ height: 45, width: 45 }}
                        source={appImages.crossClose} // Your icon image
                    />
                </Pressable>
                <View style={styles.mainWhiteView}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: '5%' }}>
                        <View style={styles.innerMainView}>
                            <View style={styles.coupanDetailView}>
                                <Text numberOfLines={1} style={styles.coupanText}>
                                    Coupon Details
                                </Text>

                                <View style={styles.mainCardView}>
                                    <View style={styles.cardView}>
                                        <View style={styles.imageGetTextView}>
                                            <Image
                                                style={styles.parcentImage}
                                                source={appImages.offerPercent}
                                            />
                                            <Text style={styles.getText}>
                                                Get{' '}
                                                {item?.discount_type === 'percentage'
                                                    ? `${item?.discount_price}%`
                                                    : currencyFormat(Number(item?.discount_price))}{' '}
                                                OFF up to {currencyFormat(Number(item?.usage_conditions?.min_order_value))}
                                            </Text>
                                        </View>

                                        <Text style={styles.refralCodeText}>
                                            {item?.referral_code}
                                        </Text>
                                        {list?.map((data, i) => {
                                            return (
                                                <View style={styles.listView}>
                                                    <SvgXml
                                                        width={22}
                                                        height={22}
                                                        xml={appImagesSvg.tickColor}
                                                    />
                                                    <Text numberOfLines={2} style={styles.titleText}>
                                                        {data?.title}
                                                    </Text>
                                                </View>
                                            );
                                        })}
                                    </View>
                                    {/* <Spacer space={'13%'} />
                                    <BTN
                                        disable={
                                            getCartTotal?.cartTotal < item?.discount_price
                                                ? true
                                                : false
                                        }
                                        title={selectedData?._id === item?._id ? 'Remove' : 'Apply'}
                                        onPress={onApply}
                                    /> */}
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
};

export default OffersDetails;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },

    backButtonTouch: {
        alignItems: 'center',
        zIndex: 1,
        alignSelf: 'center',
        marginBottom: '3%',
    },
    mainWhiteView: {
        backgroundColor: colors.white,
        height: hp('50%'),
        borderTopEndRadius: 20,
        borderTopStartRadius: 20,
        borderColor: colors.colorF9,
        paddingTop: '3%',
    },
    innerMainView: {
        flex: 1,
        backgroundColor: colors.white,
        // borderTopEndRadius: 20,
        // borderTopStartRadius: 20,
        // borderColor: colors.colorF9,
        // marginTop: '3%',
    },
    coupanDetailView: {
        // borderRadius: 20,
        justifyContent: 'center',
    },
    coupanText: {
        fontFamily: fonts.bold,
        fontSize: RFValue(17),
        marginLeft: '5%',
        color: colors.black,
    },
    mainCardView: {
        // paddingHorizontal: 16,
        marginTop: '2%',
    },
    cardView: {
        backgroundColor: colors.white,
        justifyContent: 'center',
        // paddingHorizontal: 10,
        // paddingVertical: 18,
        // borderRadius: 20,
        // borderColor: colors.colorF9,
        // elevation: 4,
        // shadowColor: colors.black,
        // shadowOpacity: 0.2,
        // shadowRadius: 5,
    },
    imageGetTextView: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
    },
    parcentImage: {
        width: 20,
        height: 20,
    },
    getText: {
        // marginLeft: '-2%',
        fontFamily: fonts.bold,
        fontSize: RFValue(15),
        color: colors.black,
    },
    refralCodeText: {
        marginLeft: '5%',
        borderRadius: 12,
        width: wp('30%'),
        marginTop: '3%',
        textAlign: 'center',
        paddingVertical: '0.8%',
        color: colors.main,
        borderColor: colors.main,
        borderWidth: 1,
        fontSize: RFValue(11),
        fontFamily: fonts.medium,
    },
    listView: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
        marginTop: '4%',
        alignItems: 'center',
        marginLeft: '4%',
    },
    titleText: {
        fontFamily: fonts.medium,
        fontSize: RFValue(13),
        color: colors.black,
        marginLeft: '2%',
        width: wp('90%'),
    },
});
