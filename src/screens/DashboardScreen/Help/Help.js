import React, {useCallback, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {SvgXml} from 'react-native-svg';
import Header from '../../../components/header/Header';
import Spacer from '../../../halpers/Spacer';
import {styles} from './styles';
import AppInputScroll from '../../../halpers/AppInputScroll';
import {useFocusEffect} from '@react-navigation/native';
import handleAndroidBackButton from '../../../halpers/handleAndroidBackButton';

let helpArray = [
  {
    id: 1,
    name: 'I did not receive this order',
    discription:
      'We are really sorry for this experience. You can try reaching out to our delivery executive or us and we will try to resolve this as soon as possible.',
    bio: 'NotReceiveOrder',
  },
  {
    id: 2,
    name: 'Item(s) portion size is not adequate',
    discription:
      'We are really sorry for this experience. You can try reaching out to our delivery executive or us and we will try to resolve this as soon as possible.',
    bio: 'SizeNotAdequate',
  },
  {
    id: 3,
    name: 'Report a Safety incident',
    discription:
      'We are really sorry for this experience. You can try reaching out to our delivery executive or us and we will try to resolve this as soon as possible.',
    bio: 'SafetyIncident',
  },
  {
    id: 4,
    name: 'Few Items missing in my order',
    discription:
      'We are really sorry for this experience. You can try reaching out to our delivery executive or us and we will try to resolve this as soon as possible.',
    bio: 'MissingMyOrder',
  },
  {
    id: 5,
    name: 'Item(s) quality is poor',
    discription:
      'We are really sorry for this experience. You can try reaching out to our delivery executive or us and we will try to resolve this as soon as possible.',
    bio: 'QualityPoor',
  },
  {
    id: 6,
    name: 'I have coupon related issue',
    discription:
      'We are really sorry for this experience. You can try reaching out to our delivery executive or us and we will try to resolve this as soon as possible.',
    bio: 'couponRelatedIssue',
  },
  {
    id: 7,
    name: 'Payment and billing related issue',
    discription:
      'We are really sorry for this experience. You can try reaching out to our delivery executive or us and we will try to resolve this as soon as possible.',
    bio: 'PaymentRelatedIssue',
  },
];

export default function Help({navigation}) {
  const [loading, setLoading] = useState(false);
  const [openClose, setOpenClose] = useState('');

  useFocusEffect(
    useCallback(() => {
      handleAndroidBackButton(navigation);
    }, []),
  );

  const onPressDownUp = item => {
    if (item?.id === openClose) {
      setOpenClose('');
    } else {
      setOpenClose(item?.id);
    }
  };

  return (
    <View style={styles.container}>
      <Header
        onPress={() => {
          navigation.goBack();
        }}
        title={'Help'}
        backArrow={true}
        bottomLine={1}
      />
      <AppInputScroll padding={true} Pb={hp('15%')}>
        <Spacer space={'4%'} />
        {helpArray?.map((item, i) => {
          return (
            <View>
              <View style={styles.mainRenderView}>
                <TouchableOpacity
                  style={styles.dropDownImageTouch}
                  activeOpacity={0.8}
                  onPress={() => {
                    onPressDownUp(item);
                  }}
                  hitSlop={styles.hitSlot}>
                  <Text style={styles.nameText}>{item?.name}</Text>

                  <SvgXml xml={openClose == item?.id ? upperIcon : downIcon} />
                </TouchableOpacity>

                {openClose === item?.id && (
                  <>
                    <Text style={styles.discriptionText}>
                      {item?.discription}
                    </Text>
                  </>
                )}
              </View>
              <View style={styles.bottomLineView} />
            </View>
          );
        })}
      </AppInputScroll>
    </View>
  );
}

const downIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 20 20" fill="none">
<path d="M5 7.5L10 12.5L15 7.5" stroke="#595959" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const upperIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 20 20" fill="none">
<path d="M15 12.5L10 7.5L5 12.5" stroke="#595959" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
