import {RFC_2822} from 'moment';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Spacer from '../../halpers/Spacer';
import {colors} from '../../theme/colors';
import {fonts} from '../../theme/fonts/fonts';
import CTA from '../cta/CTA';

export default function BankDetailsShow({item, navigation, closeSheet}) {
  const bankData = [
    // {
    //   title: 'Name',
    //   value: item?.vendor?.bank_detail?.bank_name,
    //   adminStatus: '11',
    // },
    {
      title: 'Branch Name',
      value: item?.vendor?.bank_detail?.bank_name,
      adminStatus: '11',
    },
    {
      title: 'Account Number',
      value: item?.vendor?.bank_detail?.account_number,
      adminStatus: '11',
    },
    {
      title: 'IFSC Code',
      value: item?.vendor?.bank_detail?.ifsc_code,
      adminStatus: '11',
    },
    {
      title: 'Admin Remarks',
      value: item?.reason,
      adminStatus: item?.reason,
    },
  ];

  const RenderData = ({data}) => {
    return data?.value ? (
      <>
        {data?.adminStatus?.length > 0 && (
          <View style={styles.container}>
            <Text style={styles.titleText}>{data?.title} : </Text>
            <Text style={styles.valueText}>{data?.value}</Text>
          </View>
        )}
      </>
    ) : null;
  };
  const onViewDetails = () => {
    closeSheet();
    setTimeout(() => {
      navigation.navigate('bank');
    }, 300);
  };

  return (
    <View>
      <View style={{height: hp('24%')}}>
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: hp('2%')}}
          style={{flex: 1}}>
          <TouchableOpacity activeOpacity={1}>
            {bankData?.map((itemdata, i) => (
              <View key={i}>
                <RenderData data={itemdata} />
              </View>
            ))}
          </TouchableOpacity>
        </ScrollView>
      </View>
      {item?.status == 'rejected' && (
        <>
          <Spacer space={hp('3%')} />
          <CTA
            width={'100%'}
            title={'New Request'}
            onPress={() => {
              onViewDetails();
            }}
            isBottom={false}
            bottomCheck={0}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: hp('3%'),
  },
  titleText: {
    fontSize: RFValue(12),
    fontFamily: fonts.medium,
    color: colors.black50,
    width: wp('35%'),
  },
  valueText: {
    fontSize: RFValue(12),
    fontFamily: fonts.medium,
    color: colors.black,
    width: wp('56%'),
  },
});
