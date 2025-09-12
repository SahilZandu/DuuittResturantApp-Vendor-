

import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { currencyFormat } from '../halpers/currencyFormat';
import { fonts } from '../theme/fonts/fonts';
import { colors } from '../theme/colors';


const CommissionFareComp = ({ data }) => {
    return (
        <View>
            <View style={styles.main}>
                <View style={styles.textPriceView}>
                    <Text style={styles.titleText}>{data?.title}</Text>
                    {data?.price > 0 && <Text style={styles.priceText}>
                        <Text style={{
                            color: colors.black
                        }} > {data?.isPluse}{' '}{currencyFormat(data?.price)}</Text>{' '}{data?.perMin}
                    </Text>}
                </View>
                <Text style={styles.des}>{data?.description}</Text>

            </View>
            {data?.isBottom && <View style={styles.bottomLine} />}
        </View>

    );
};

export default CommissionFareComp;

const styles = StyleSheet.create({
    main: {
        marginHorizontal: '5%', marginTop: '2%'
    },
    textPriceView: {
        flexDirection: 'row', justifyContent: 'center', alignItems: 'center'
    },
    titleText: {
        flex: 1,
        fontSize: RFValue(14),
        fontFamily: fonts.medium,
        color: colors.black,
    },
    priceText: {
        fontSize: RFValue(14),
        fontFamily: fonts.medium,
        color: colors.black85,
        marginTop: '1%',
    },
    des: {
        fontSize: RFValue(12),
        fontFamily: fonts.medium,
        color: colors.black75,
        marginTop: '1%',
        lineHeight: 20
    },
    bottomLine: {
        height: 2,
         backgroundColor: colors.colorD9,
          marginTop: '3%',
            marginHorizontal:15
    },




});
