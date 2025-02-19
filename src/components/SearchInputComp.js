

import react, {useState, useRef} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {SvgXml} from 'react-native-svg';
import {appImagesSvg } from '../commons/AppImages';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts/fonts';



export default function SearchInputComp({value,onChangeText, onFocus,onBlur,}) {

    const searchInputRef = useRef(null);
  const handleSearchButtonPress = () => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };


  return (
    <View
    style={{
      flexDirection: 'row',
      justifyContent: 'center',
      marginHorizontal: '4%',
      marginTop: '3%',
    }}>
    <View
      style={{
        width: wp('90%'),
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor:colors.colorD9,
        backgroundColor: colors.screenBackground,
      }}>
      <TextInput
        ref={searchInputRef}
        value={value}
        onChangeText={onChangeText}
        // autoFocus={true}
        placeholderTextColor="#808080"
        placeholder="Search"
        style={{
          width: wp('80%'),
          height: hp('5%'),
          paddingLeft: '4%',
          paddingRight: '2%',
          fontSize: RFValue(12),
          color: colors.black,
          padding: 0,
        }}
        onFocus={onFocus}
        onBlur={onBlur}
      />
        <TouchableOpacity
          onPress={() => {
            handleSearchButtonPress();
          }}
          activeOpacity={0.8}
          hitSlop={{top: 15, bottom: 10, left: 5, right: 5}}>
          <SvgXml
            width={20}
            height={20}
            xml={appImagesSvg.searchIcon}
            style={{right: wp('0.7%')}}
          />
        </TouchableOpacity>
     
    </View>
  </View>
  );
}

const styles = StyleSheet.create({
 
});
