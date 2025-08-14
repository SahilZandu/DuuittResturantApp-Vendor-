

import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { currencyFormat } from '../halpers/currencyFormat';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts/fonts';


const ExtraFareComp = ({ data }) => {
    return (
        <View>
            <View style={styles.main}>
                <View style={styles.textPriceView}>
                    <Text style={styles.titleText}>{data?.title}</Text>
                    {data?.isRupee && <Text style={styles.rupeePercentText}>
                        {data?.isPluse}{' '}{currencyFormat(data?.price)} to {currencyFormat(data?.secondPrice)}
                    </Text>}
                    {data?.isPercent && <Text style={styles.rupeePercentText}>
                        {data?.isPluse}{''}{data?.price}%
                    </Text>}
                </View>
                <Text style={styles.des}>{data?.description}</Text>

            </View>
            {data?.isBottom && <View style={styles.bottomLine} />}
        </View>

    );
};

export default ExtraFareComp;

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
    rupeePercentText: {
        fontSize: RFValue(14),
        fontFamily: fonts.medium, color: colors.black, marginTop: '1%',
    },
    des: {
        fontSize: RFValue(12),
        fontFamily: fonts.medium,
        color: colors.black75,
        marginTop: '1%'
    },
    bottomLine: {
        height: 2, backgroundColor: colors.colorD9, marginTop: '3%'
    }


});
