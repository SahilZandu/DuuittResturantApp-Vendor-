

import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { fonts } from '../theme/fonts/fonts';
import { colors } from '../theme/colors';

const TwoTextRender = ({ title, des }) => {
    return (
        <View style={styles.main}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.des}>{des}</Text>
        </View>

    );
};

export default TwoTextRender;

const styles = StyleSheet.create({
    main: {
        marginHorizontal: '5%', marginTop: '3%'
    },
    title: {
        fontSize: RFValue(14),
        fontFamily: fonts.medium,
        color: colors.black,
    },
    des: {
        fontSize: RFValue(12),
        fontFamily: fonts.medium,
        color: colors.black75,
        marginTop: '1%'
    }


});



