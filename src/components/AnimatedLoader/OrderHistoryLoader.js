import React from 'react';
import {View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';


const OrderHistoryLoader = ({}) => {
  const map = ['1', '2', '3', '4', '5', '6', '7', '8',];

  return (
    <View style={{paddingHorizontal: 18,alignSelf:'center'}}>
      {map?.map((item, key) => (
        <SkeletonPlaceholder key={key}>
          <View
                style={{
                  height: hp('16%'),
                  width: wp('90%'),
                  borderRadius: 10,
                  marginTop:'2%',
                }}
              />
        </SkeletonPlaceholder>
      ))}
    </View>
  );
};

export default OrderHistoryLoader;
