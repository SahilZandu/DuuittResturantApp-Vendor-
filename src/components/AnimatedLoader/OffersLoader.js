import React from 'react';
import {View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';


const OffersLoader = ({}) => {
  const map = ['1', '2', '3', '4', '5',];

  return (
    <View style={{paddingHorizontal: 18,}}>
      {map?.map((item, key) => (
        <SkeletonPlaceholder key={key}>
            <View style={{width: wp('90%'),flexDirection:'row',justifyContent:'space-between'}}>
            <View
                style={{
                  height: hp('17%'),
                  width: wp('43%'),
                  borderRadius: 10,
                  marginTop:'4%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              />
               <View
                style={{
                  height: hp('17%'),
                  width: wp('43%'),
                  borderRadius: 10,
                  marginTop:'4%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              />
              </View>
        </SkeletonPlaceholder>
      ))}
    </View>
  );
};

export default OffersLoader;
