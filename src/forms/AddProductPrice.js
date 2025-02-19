import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Keyboard,
  Platform,
  StyleSheet,
  TextInput,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {RFValue} from 'react-native-responsive-fontsize';
import { useFocusEffect } from '@react-navigation/native';
import AppInputScroll from '../halpers/AppInputScroll';
import CTA from '../components/cta/CTA';
import Spacer from '../halpers/Spacer';
import { fonts } from '../theme/fonts/fonts';
import { colors } from '../theme/colors';
import handleAndroidBackButton from '../halpers/handleAndroidBackButton';
import { rootStore } from '../stores/rootStore';


const AddProductPrice = ({navigation, route}) => {
  // const {addProductWithVariants} = rootStore.organizationStore;
  const {addProductWithVariants,updateProductWithVariants} = rootStore.menuStore;
  const {appUser} = rootStore.commonStore;
  const {data,combinationArray,type} =route.params;
  console.log("data++++=====",data,combinationArray,)
  console.log('route.params', route?.params);
  const textInputs = useRef([]);
  const [isKeyboardVisible, setKeyboardVisible] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [allData, setAllData] = useState(combinationArray);
  const [focusedInput, setFocusedInput] = useState(null);

  useEffect(() => {
    setAllData(combinationArray);
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        if (Platform.OS === 'ios') {
          setKeyboardVisible('30%');
        } else {
          setKeyboardVisible('105%'); // or some other action
        }
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(0); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  useFocusEffect(
    useCallback(()=>{
     handleAndroidBackButton(navigation)
    },[])
  )

  const AddProductBtn = () => {
    const result = allData?.some(item => item?.price == '' || item?.price == 0);
    console.log('result----', result);

    return (
      <CTA
        width={wp('90%')}
        title={'Submit'}
        disable={result}
        onPress={() => handleSaveAndNext()}
        loading={isLoading}
      />
    );
  };

  const handleSaveAndNext = async() => {
    if(type == 'add'){
   await addProductWithVariants(
      data,
      allData,
      appUser,
      navigation,
      handleLoading,
    );
   }else{
    await updateProductWithVariants(
      data,
      allData,
      appUser,
      navigation,
      handleLoading,
    );
   }
    // alert('Under Progress');
    console.log("data ,allData--",data,allData,);
  };

  const handleLoading = v => {
    setIsLoading(v);
  };

  const handlePriceChange = useCallback ((index, value) => {
    const newData = [...allData];
    newData[index].price = Number(value) == 0 ? value : Number(value);
    setAllData([...newData]);
  },[]);

  console.log('allData---', allData);

  const HandalData =() => {
    return (
      <View>
        {allData?.map((item, index) => (
          <View style={{marginHorizontal: 20, marginTop: '5%'}} key={index}>
            <Text
              numberOfLines={1}
              style={{
                marginLeft: 2,
                fontSize: RFValue(12),
                fontFamily: fonts.medium,
              }}>
              {item?.second_gp?.length > 0
                ? `${item?.first_gp} - ${item?.second_gp}`
                : `${item?.first_gp}`}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderRadius: 8,
                borderColor: '#B1B1B1',
                borderWidth: 1,
                height: hp('5%'),
                marginTop: '1%',
              }}>
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: RFValue(12),
                  fontFamily: fonts.medium,
                  color: colors.green,
                }}>
                ₹
              </Text>
              <TextInput
                placeholder="Enter your amount"
                autoFocus={focusedInput === index ? true : false}
                ref={ref => (textInputs.current[index] = ref)}
                style={{
                  marginLeft: 5,
                  height: hp('5%'),
                  width: hp('37%'),
                  color: colors.black,
                }}
                keyboardType="number-pad"
                value={allData[index]?.price?.toString()}
                onChangeText={text => handlePriceChange(index, text)}
                onFocus={() => handleFocus(index)}
              />
            </View>
          </View>
        ))}
        <Spacer space={hp('6%')} />
        <AddProductBtn />
      </View>
    );
  };
  const handleFocus = useCallback((index) => {
    setFocusedInput(index);
  }, []);

  return (
    <View style={styles.container}>
           <AppInputScroll
            Pb={isKeyboardVisible}
            padding={true}
            keyboardShouldPersistTaps={'handled'}>
        <View>
          <Text style={styles.AddVPText}>Add Variant’s Price</Text>
          {HandalData()}
        </View>
        </AppInputScroll>
    </View>
  );
};

export default AddProductPrice;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:colors.appBackground
  },
  AddVPText: {
    color: '#090909',
    fontSize: RFValue(16),
    fontFamily: fonts.bold,
    marginTop: hp('3%'),
    marginHorizontal: 16,
  },
  underLineView: {
    marginTop: hp('2%'),
    height: hp('0.2%'),
    backgroundColor: '#000000',
    opacity: 0.1,
  },
});
