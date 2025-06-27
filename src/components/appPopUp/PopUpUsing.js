import React, { useState } from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import Modal from 'react-native-modal';
import { SvgXml } from 'react-native-svg';
import { RFValue } from 'react-native-responsive-fontsize';
import CTA from '../cta/CTA';
import { fonts } from '../../theme/fonts/fonts';
import { appImagesSvg } from '../../commons/AppImages';
import Spacer from '../../halpers/Spacer';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const PopUpUsing = ({ visible, text, title, onPress, CTATitle }) => {
    const [loading, setLoading] = useState(false)

    const onPressTouch = () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(true)
        }, 5000)

    }

    return (
        <Modal isVisible={visible}>
            <View style={styles.mainView}>
                <View style={styles.subView}>
                    {/* <PopUpIcon />
                    <CloseBtn /> */}
                    <Text style={styles.titleText}>
                        {title ? title : 'You are about to delete an item'}
                    </Text>
                    <Text style={styles.textSecond}>{text}</Text>
                    <Spacer space={hp('4%')} />
                    <CTA width={wp('45%')}
                        onPress={() => { onPressTouch() }}
                        loading={loading}
                        height={hp('4.5%')}
                        title={CTATitle}
                        textTransform={'capitalize'} />
                </View>
            </View>
        </Modal>
    );
};

export default PopUpUsing;

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    subView: {
        backgroundColor: 'white',
        paddingHorizontal: '5%',
        paddingBottom: '5%',
        width: '85%',
        borderRadius: 15,
    },
    cancelBTNPress: {
        backgroundColor: 'rgba(203, 47, 47, 0.15)',
        height: 28,
        width: 28,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 14,
        position: 'absolute',
        right: 15,
        top: 10,
    },
    titleText: {
        fontFamily: fonts.bold,
        fontSize: RFValue(13),
        textAlign: 'center',
        paddingVertical: '5%',
    },
    textSecond: {
        fontFamily: fonts.regular,
        fontSize: RFValue(11),
        textAlign: 'center',
        color: '#8F8F8F',
    },
    iconView: {
        height: 60,
        width: 60,
        borderRadius: 30,
        alignSelf: 'center',
        marginTop: -20,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
