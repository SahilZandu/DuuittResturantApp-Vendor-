import React from 'react';
import { View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    widthPercentageToDP,
} from 'react-native-responsive-screen';

const RateCardViewLoader = ({ }) => {
    const map = ['1', '2', '3', '4', '5', '6'];

    return (
        <View style={{ paddingHorizontal: 16 }}>
            {map?.map((item, key) => (
                <SkeletonPlaceholder key={key}>
                    <View
                        style={{
                            height: hp('32%'),
                            width: wp('92%'),
                            borderRadius: 8,
                            marginTop: '5%',
                        }}
                    />

                </SkeletonPlaceholder>
            ))}
        </View>
    );
};

export default RateCardViewLoader;
