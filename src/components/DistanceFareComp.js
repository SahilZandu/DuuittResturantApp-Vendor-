

import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { fonts } from '../theme/fonts/fonts';
import { colors } from '../theme/colors';
import { currencyFormat } from '../halpers/currencyFormat';


const DistanceFareComp = ({ data, distanceFareArray ,i}) => {
    return (
        <View style={styles.main}>
            <Text style={styles.kmText}>{data?.km}</Text>
            <Text style={styles.kmBPrice(distanceFareArray,i)}>-</Text>
            <Text style={styles.des(distanceFareArray,i)}>
                <Text style={{
                    color: colors.black
                }} >{currencyFormat(data?.price)}</Text>{' '}{data?.perKm}
            </Text>
        </View>

    );
};

export default DistanceFareComp;

const styles = StyleSheet.create({
    main: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: '15%'
    },
    kmText: {
        fontSize: RFValue(14),
        fontFamily: fonts.medium,
        color: colors.black85,
        marginTop: '1%',
        marginRight: '10%'
    },
    kmBPrice: (distanceFareArray,i) => ({
        fontSize: RFValue(25),
        fontFamily: fonts.medium, 
        color: colors.black85, marginTop: '1%',
        marginRight: distanceFareArray?.length - 1 === i ? '0%' : 0
    }),
    des: (distanceFareArray,i) => ({
        fontSize: RFValue(14),
        fontFamily: fonts.medium, 
        color: colors.black85,
         marginTop: '1%',
        marginLeft: '10%',
        marginRight: distanceFareArray?.length - 1 === i ? '5%' : 0
    }),

});
