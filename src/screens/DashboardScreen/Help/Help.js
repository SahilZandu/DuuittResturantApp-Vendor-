import React, { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { SvgXml } from 'react-native-svg';
import Header from '../../../components/header/Header';
import Spacer from '../../../halpers/Spacer';
import { styles } from './styles';
import AppInputScroll from '../../../halpers/AppInputScroll';
import { useFocusEffect } from '@react-navigation/native';
import handleAndroidBackButton from '../../../halpers/handleAndroidBackButton';




export default function Help({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [openClose, setOpenClose] = useState('');
  let helpArray = [
    {
      id: 1,
      name: 'How to Accepting Orders',
      AnswerArray: [
        "When a customer places an order, you’ll get a notification.",
        "Open the order details, check the items, and tap Accept to confirm.",
        "Prepare the order within the given time and hand it over to the assigned rider.",
      ],
    },
    {
      id: 2,
      name: 'How to Managing Menu Items',
      AnswerArray: [
        "Go to Menu Management in the app.",
        "Add new items, update prices, or mark items as unavailable.",
        "Changes reflect instantly for customers.",
      ],
    },
    {
      id: 3,
      name: 'How to Updating Order Status',
      AnswerArray: [
        "Once an order is ready, tap Mark as Ready.",
        "If you need to cancel an order, select Cancel and provide a reason.",
      ],
    },
    {
      id: 4,
      name: 'How to Payments & Settlements',
      AnswerArray: [
        "Your daily/weekly earnings are shown in the Earnings section.",
        "Payments are settled to your registered bank account as per the payout cycle.",
        "Transaction history can be viewed in-app.",
      ],
    },
    {
      id: 5,
      name: 'How to Handling Cancellations',
      AnswerArray: [
        "If an order cannot be fulfilled, cancel it in the app with a valid reason.",
        "Frequent cancellations may affect your rating.",
      ],

    },
    {
      id: 6,
      name: 'How to Contact Us',
      AnswerArray: [
        "We’re here to help between 8 AM – 10 PM.",
        "Email: support@duuitt.com",
      ],
    },

  ];

  const hanldeLinking = (type, data) => {
    if (type) {
      if (type == 'email') {
        Linking.openURL(`mailto:${data ?? "support@duuitt.com"}`);
      } else {
        Linking.openURL(`tel:${data ?? '1234567890'}`);
      }
    }
  };

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
        <Spacer space={'2%'} />
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
                  // <>
                  //   <Text style={styles.discriptionText}>
                  //     {item?.discription}
                  //   </Text>
                  // </>
                  <>
                    {item?.AnswerArray?.map((data, i) => {
                      const parts = data.split(": ");
                      return (
                        <>
                          {data?.includes(':') ?
                            <Text
                              onPress={() => { hanldeLinking("email", parts[1]) }}
                              style={styles.answerText}>
                              {parts[0]} :
                              <Text style={styles.emailPhoneText}>{' '}{parts[1]}</Text>
                            </Text>
                            : <Text
                              style={styles.answerText}>
                              {data}
                            </Text>}
                        </>
                      )
                    })}
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
