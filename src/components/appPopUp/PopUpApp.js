import React from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import Modal from 'react-native-modal';
import { SvgXml } from 'react-native-svg';
import { RFValue } from 'react-native-responsive-fontsize';
import DeleteActions from './DeleteActions';
import CTA from '../cta/CTA';
import LogoutActions from './LogoutActions';
import { fonts } from '../../theme/fonts/fonts';
import { appImagesSvg } from '../../commons/AppImages';
import Spacer from '../../halpers/Spacer';
import { colors } from '../../theme/colors';
import BTN from '../cta/BTN';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';



const PopUpApp = ({ visible, onDelete, type, text, title, firstButton, secondButton, onClose, topIcon, topCrossBtn, onPressBack }) => {
    const getIconXml = () => {

        if (type == 'logout') {
            return appImagesSvg?.crossIconBackRed
        }
        else {
            return appImagesSvg?.popUpDelete;
        }
    };

    const PopUpIcon = () => {
        return (
            <View
                style={[
                    styles.iconView,
                    {
                        backgroundColor: colors.colorCB
                    },
                ]}>
                <SvgXml xml={getIconXml()} />
            </View>
        );
    };

    const CloseBtn = () => {
        return (
            <Pressable onPress={onClose} style={styles.cancelBTNPress}>
                <SvgXml xml={appImagesSvg?.popUpclose} />
            </Pressable>
        );
    };

    return (
        <Modal isVisible={visible}>
            <Pressable
                onPress={onPressBack}
                style={styles.mainView}>
                <View style={styles.mainView}>
                    <View style={styles.subView}>
                        {topIcon &&
                            <PopUpIcon />
                        }
                        {topCrossBtn && <CloseBtn />}

                        {!topIcon && <Spacer space={'2%'} />}
                        <Text style={styles.titleText}>
                            {title ? title : 'You are about to delete an item'}
                        </Text>
                        <Text style={styles.textSecond}>{text}</Text>
                        <View style={{
                            flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center',
                            top: hp('2%'), marginTop: hp('3.5%')
                        }}>
                            <BTN
                                backgroundColor={colors.white}
                                borderColor={colors.main}
                                labelColor={colors.main}
                                title={firstButton}
                                width={'45%'}
                                height={40}
                                onPress={onClose}
                                textTransform={'capitalize'}

                            />
                            <BTN
                                title={secondButton}
                                width={'45%'}
                                height={40}
                                onPress={onDelete}
                                textTransform={'capitalize'}
                            />

                        </View>
                    </View>
                </View>
            </Pressable>
        </Modal>
    );
};

export default PopUpApp;

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    subView: {
        backgroundColor: colors.white,
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
        color: colors.black,
        paddingVertical: '5%',
    },
    textSecond: {
        fontFamily: fonts.regular,
        fontSize: RFValue(11),
        textAlign: 'center',
        color: colors.color8F,
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
