import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { appImagesSvg } from '../commons/AppImages';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { SvgXml } from 'react-native-svg';
import CTA from './cta/CTA';
import { RFValue } from 'react-native-responsive-fontsize';
import { useFormikContext } from 'formik';
import FullImage from './FullImage';
import Spacer from '../halpers/Spacer';
import { fonts } from '../theme/fonts/fonts';
import { colors } from '../theme/colors';
import PickUpdateActions from './PickUpdateActions';
import RBSheet from '@lunalee/react-native-raw-bottom-sheet';

export default function UploadFilesCameraGallery(props) {
    const {
        name,
        filename,
        docCheck,
        docImageUri,
        docFileName,
        onDocSize,
        onChange,
    } = props;
    const refRBSheet = useRef(null);

    const { setFieldValue } = useFormikContext();
    const [imageUri, setImageUri] = useState(null);
    const [fileName, setFileName] = useState('');
    const [checktype, setCheckType] = useState('');
    const [fullImage, setFullImage] = useState(false);

    // console.log("docFileName-------------",docCheck,docImageUri,docFileName)

    useEffect(() => {
        setTimeout(() => {
            if (docImageUri?.length > 0 || docImageUri === '') {
                setImageUri(docImageUri);
                setFileName(docFileName);
                setCheckType(docCheck);
            }
        }, 300);
    }, [docCheck, docImageUri, docFileName]);

    const selectOneFile = async () => {
        refRBSheet.current.open();
    };

    const onChangeImage = uri => {
        // console.log('uri--', uri);
        setFileName('image');
        setImageUri(uri);
        setFieldValue(name, uri);
        setFieldValue(filename, 'image');
        setCheckType('image/jpeg');

        refRBSheet.current.close();

    };


    return (
        <>
            <Pressable
                style={{
                    borderRadius: 10,
                    borderWidth: 1.5,
                    borderColor: colors.colorD9,
                    borderStyle: 'dashed',
                    zIndex: 0,
                    marginTop: '2%',
                    alignItems: 'center',
                    paddingTop: '4%',
                }}>
                {imageUri ? (
                    <View style={{ alignItems: 'center' }}>
                        <Pressable
                            onPress={() => {
                                setFullImage(true);
                            }}>
                            <Image
                                source={{ uri: imageUri }}
                                style={{ width: wp('86%'), height: hp('20%'), borderRadius: 4 }}
                            />
                        </Pressable>
                    </View>
                ) : (
                    <View style={{ alignItems: 'center' }}>
                        <SvgXml xml={appImagesSvg.upload} />
                        <Text
                            style={{
                                fontFamily: fonts.medium,
                                fontSize: RFValue(14),
                                color: colors.colorDC,
                            }}>
                            Upload files here
                        </Text>
                    </View>
                )}
                <Spacer space={hp('3%')} />
                <CTA
                    height={hp('5%')}
                    onPress={() => selectOneFile()}
                    title="Browse Files"
                    width={wp('70%')}
                />
            </Pressable>
            <RBSheet
                height={hp('22%')}
                ref={refRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={true}
                keyboardAvoidingViewEnabled={
                    Platform.OS == 'ios' ? true : false
                }
                customStyles={{
                    wrapper: {
                        backgroundColor: 'rgba(52, 52, 52, 0.8)',
                    },
                    container: {
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                    },
                }}>
                <PickUpdateActions
                    name={'image'}
                    onSelectUri={onChangeImage}
                />
            </RBSheet>
            <FullImage
                uri={imageUri}
                visible={fullImage}
                onRequestClose={() => setFullImage(false)}
            />
        </>
    );
}
