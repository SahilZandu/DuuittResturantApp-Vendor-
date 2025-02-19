import React from 'react';
import {View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';


const TeamMemberLoader = ({}) => {
  const map = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

  return (
    <View style={{paddingHorizontal: 18,alignSelf:'center'}}>
      {map?.map((item, key) => (
        <SkeletonPlaceholder key={key}>
          <View
                style={{
                  height: hp('11%'),
                  width: wp('90%'),
                  borderRadius: 6,
                  marginTop:'2%',
                }}
              />
        </SkeletonPlaceholder>
      ))}
    </View>
  );
};

export default TeamMemberLoader;
