

import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts/fonts';

const UpperViewBC = ({ title, backColor, textColor }) => {
    return (
        <View style={styles.main(backColor)}>
            <Text style={styles.title(textColor)}>{title}</Text>

        </View>

    );
};

export default UpperViewBC;

const styles = StyleSheet.create({
    main: (backColor) => ({
        backgroundColor: backColor ? backColor : colors.colorDo6,
        height: hp('5%'),
        justifyContent: 'center',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10
    }),
    title: (textColor) => ({
        fontSize: RFValue(13),
        fontFamily: fonts.medium,
        color: textColor ? textColor : colors.green,
        marginHorizontal: '5%'
    })

});
