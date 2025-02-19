import React from 'react';
import {View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AllMenuItemLoader from './AllMenuItemLoader';
import GroupItemLoader from './GroupItemLoader';
import OffersLoader from './OffersLoader';
import OrderHistoryLoader from './OrderHistoryLoader';
import PaymentLoader from './PaymentLoader';
import ReportsLoader from './ReportsLoader';
import RequestHistoryLoader from './RequestHistoryLoader';
import TeamMemberLoader from './TeamMemberLoader';



const AnimatedLoader = ({type,absolute}) => {
  return (
    <View style={{position:absolute ? 'absolute' : 'relative', width: wp('100%')}}>
      {type == 'allMenuItemLoader' && <AllMenuItemLoader />}
      {type == 'groupItemLoader' && <GroupItemLoader />}
      {type == 'teamMemberLoader' && <TeamMemberLoader />}
      {type == 'paymentLoader' && <PaymentLoader />}
      {type == 'offersLoader' && <OffersLoader />}
      {type == 'orderHistoryLoader' && <OrderHistoryLoader />}
      {type == 'requestHistoryLoader' && <RequestHistoryLoader />}
      {type == 'reportsLoader' && <ReportsLoader />}
      
      
      
    
    </View>
  );
};


export default AnimatedLoader;
