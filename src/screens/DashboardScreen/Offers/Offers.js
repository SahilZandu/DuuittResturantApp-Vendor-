import React, { useEffect, useState, useRef, useCallback } from 'react';
import { KeyboardAvoidingView, View } from 'react-native';
import Header from '../../../components/header/Header';
import SearchInputComp from '../../../components/SearchInputComp';
import Tabs from '../../../components/Tabs';
import { offersData } from '../../../stores/DummyData/OffresData';
import { styles } from './styles';
import AppInputScroll from '../../../halpers/AppInputScroll';
import Spacer from '../../../halpers/Spacer';
import { colors } from '../../../theme/colors';
import OffersCardComp from '../../../components/OffersCardComp';
import AnimatedLoader from '../../../components/AnimatedLoader/AnimatedLoader';
import NoData from '../../../components/NoData';
import { useFocusEffect } from '@react-navigation/native';
import handleAndroidBackButton from '../../../halpers/handleAndroidBackButton';
import { rootStore } from '../../../stores/rootStore';
import KYCDocumentPopUp from '../../../components/appPopUp/KYCDocumentPopup';

const tabs = [
  {
    text: 'Recommended Offers',
  },
  {
    text: 'Activated Offers',
  },
  // {
  //   text: 'Activated Offers',
  // },
];
export default function Offers({ navigation }) {
  const { appUser } = rootStore.commonStore;
  const [searchValue, setSeachValue] = useState('');
  const [offersArray, setOffersArray] = useState(offersData ?? []);
  const [fhOffersArray, setFHOffersArray] = useState([]);
  const [shOffersArray, setSHOffersArray] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (offersArray?.length > 0) {
      const midIndex = Math.ceil(offersArray?.length / 2);
      const firstHalf = offersData.slice(0, midIndex);
      const secondHalf = offersData.slice(midIndex);
      setFHOffersArray(firstHalf);
      setSHOffersArray(secondHalf);
    }
  }, [offersArray]);

  useFocusEffect(
    useCallback(() => {
      handleAndroidBackButton(navigation);
    }, []),
  );

  return (
    <View style={styles.container}>
      <Header title={'Offers'} bottomLine={1} />
      <SearchInputComp
        value={searchValue}
        onChangeText={item => {
          setSeachValue(item);
        }}
      />
      <Tabs tabs={tabs} />
      <Spacer space={'1%'} />
      <KeyboardAvoidingView behavior={'padding'} style={{ flex: 1 }}>
        <AppInputScroll
          Pb={'30%'}
          padding={true}
          keyboardShouldPersistTaps={'handled'}>
          {loading == true ? (
            <AnimatedLoader type={'offersLoader'} />
          ) : (
            <View style={styles.main}>
              {fhOffersArray?.length > 0 ? (
                <View style={styles.renderDataView}>
                  <View style={styles.fhView}>
                    {fhOffersArray?.map((item, index) => {
                      // console.log('item===firstHalf', item);
                      return (
                        <OffersCardComp
                          item={item}
                          BtnColor={
                            index % 2 == 0 ? colors.colorE17 : colors.color00A
                          }
                          backgroundColor={
                            index % 2 == 0 ? colors.color2DF : colors.colorDFF
                          }
                          onPress={() => {
                            alert(index);
                          }}
                        />
                      );
                    })}
                  </View>
                  <View style={styles.shView}>
                    {shOffersArray?.map((item, index) => {
                      // console.log('item===secondHalf', item);
                      return (
                        <OffersCardComp
                          item={item}
                          BtnColor={
                            index % 2 == 0 ? colors.color00A : colors.colorE17
                          }
                          backgroundColor={
                            index % 2 == 0 ? colors.colorDFF : colors.color2DF
                          }
                          onPress={() => {
                            alert(index);
                          }}
                        />
                      );
                    })}
                  </View>
                </View>
              ) : (
                <View style={styles.noDataView}>
                  <NoData message={'Data Not Found'} />
                </View>
              )}
            </View>
          )}
        </AppInputScroll>
      </KeyboardAvoidingView>
      {/* {appUser?.is_kyc_completed !== true &&
        <KYCDocumentPopUp
          appUserData={appUser}
          navigation={navigation} />} */}
    </View>
  );
}
