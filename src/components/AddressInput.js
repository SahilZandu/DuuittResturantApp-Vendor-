import React, {useRef, useEffect} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useFormikContext} from 'formik';
import FieldErrorMessage from '../components/FieldErrorMessage';
import { fonts } from '../theme/fonts/fonts';
import { colors } from '../theme/colors';

const AddressInput = ({title, value, name, isPending, titleColor,marginLeft,width}) => {
  const {setFieldValue, errors, touched, values} = useFormikContext();
  const ref = useRef(null);
  useEffect(() => {
    ref.current?.setAddressText(values[name]);
  }, [values['address']]);

  return (
    <View pointerEvents={isPending ? 'none' : 'auto'}>
      <Text
        style={{
          marginBottom: 10,
          fontSize: RFValue(12),
          fontFamily: fonts.semiBold,
          color: titleColor ? titleColor :colors.black,
          marginTop: '5%',
          marginLeft:marginLeft?marginLeft:'1%'
        }}>
        {title}
      </Text>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        horizontal={true}
        bounces={false}
        style={{width:width?width: wp('90%')}}>
        <GooglePlacesAutocomplete
          // placeholderTextColor="red"
          enablePoweredByContainer={false}
          ref={ref}
          fetchDetails={true}
          placeholder={'Search address'}
          onFail={error => console.log(error)}
          onNotFound={() => console.log('no results')}
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            setFieldValue(name, data?.description);
            setFieldValue('lat', details?.geometry?.location?.lat);
            setFieldValue('lng', details?.geometry?.location?.lng);
          }}
          query={{
            key: 'AIzaSyAGYLXByGkajbYglfVPK4k7VJFOFsyS9EA',
            language: 'en',
            type: ['geocode', 'hotel'],
            components: 'country:ind',
          }}
          textInputProps={{
            placeholderTextColor: colors.color8F,
            onBlur: () => ref.current?.setAddressText(values[name]),
          }}
          styles={{
            textInputContainer: {width:width?width: wp('90%'),
               borderRadius: 50,
              borderWidth: 1,
              borderColor:colors.colorD9,
              height: hp('5.2%'),
            },
            textInput: {
              borderRadius: 50,
              height: hp('5%'),
              width:width?width: wp('90%'),
              opacity: isPending ? 0.5 : 1,
              fontSize: RFValue(11),
              color:colors.black,
              marginHorizontal:'1%',
              backgroundColor:colors.appBackground
            },
          }}
        />
      </ScrollView>
      <View style={{marginTop: '0%'}}>
        <FieldErrorMessage
          error={errors[name]}
          //visible={touched[name]}
          visible={true}
        />
      </View>
    </View>
  );
};

export default AddressInput;
