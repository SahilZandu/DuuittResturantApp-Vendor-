import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {Surface} from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Url from '../../api/Url';
import {fonts} from '../../theme/fonts/fonts';
import CTA from '../cta/CTA';
import FullImage from '../FullImage';
import Spacer from '../../halpers/Spacer';
import { colors } from '../../theme/colors';

export default function PanCardDetailsShow({item, navigation, closeSheet}) {
  const [fullImage, setFullImage] = useState(false);

  const panData = [
    {
      title: 'Pan Image',
      value: Url?.Image_Url + item?.vendor?.pan_detail?.image,
      image: true,
      adminStatus: '11',
    },
    {
      title: 'Pan Number',
      value:  item?.vendor?.pan_detail?.pan_number,
      image: false,
      adminStatus: '11',
    },
    {
      title: 'Admin Remarks',
      value: item?.remarks,
      image: false,
      adminStatus: item?.remarks,
    },
  ];

  const RenderData = ({data}) => {
    return data?.value ? (
      <>
        {data?.adminStatus?.length > 0 && (
          <View style={styles.container}>
            <Text style={styles.titleText}>{data?.title} : </Text>
            {data?.image === false ? (
              <Text style={styles.valueText}>{data?.value}</Text>
            ) : (
              <Surface style={styles.surface} elevation={1}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={{borderRadius: 8}}
                  onPress={() => {
                    setFullImage(true);
                  }}>
                  <Image
                    resizeMode='cover'
                    style={styles.image}
                    source={{uri: data?.value}}
                  />
                </TouchableOpacity>
              </Surface>
            )}
          </View>
        )}
      </>
    ) : null;
  };
  const onViewDetails = () => {
    closeSheet();
    setTimeout(() => {
      navigation.navigate('panCard');
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
            {panData?.map((itemdata, i) => (
              <View key={i}>
                <RenderData data={itemdata} />
              </View>
            ))}
          </TouchableOpacity>
        </ScrollView>
      </View>

      {item?.status === 'rejected' && (
        <>
          <Spacer space={hp('4%')} />
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
      <FullImage
        uri={Url?.Image_Url + item?.vendor?.pan_detail?.image}
        visible={fullImage}
        onRequestClose={() => setFullImage(false)}
      />
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
    width: wp('33%'),
  },
  valueText: {
    fontSize: RFValue(12),
    fontFamily: fonts.medium,
    color:colors.black,
    width: wp('58%'),
  },
  image: {
    height: hp('8%'),
    width: wp('22%'),
    borderRadius: 10,
  },
  surface: {
    height: hp('8%'),
    width: wp('22%'),
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
