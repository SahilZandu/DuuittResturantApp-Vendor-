import React from 'react';
import {Text, View, Pressable, StyleSheet, Alert} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {colors} from '../../theme/colors';
import {fonts} from '../../theme/fonts/fonts';

const CookingTime = ({order, onChnage}) => {
  console.log("order---11",order);
  const tabs = [
    {text: '20 min'},
    {text: '25 min'},
    {text: '30 min'},
    {text: '35 min'},
    {text: '40 min'},
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.setFoodText}>Set food preparing time</Text>
      <View style={styles.tabBtnView}>
        {tabs?.map((item, key) => (
          <Pressable
            onPress={() => {
              onChnage(order,item?.text);
            }}
            key={key}
            style={[
              styles.touchBtnView,
              {
                backgroundColor:
                  item?.text == order?.cookinTiming
                    ? colors.main
                    : colors.white,
              },
            ]}>
            <Text
              style={[
                styles.btnText,
                {
                  color:
                    item.text == order.cookinTiming
                      ? colors.white
                      : colors.black,
                },
              ]}>
              {item?.text}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default CookingTime;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: '4%',
  },
  setFoodText: {
    fontSize: RFValue(12),
    fontFamily: fonts.semiBold,
    color: colors.black,
  },
  tabBtnView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '3%',
  },
  touchBtnView: {
    paddingHorizontal: '2%',
    paddingVertical: '1.5%',
    marginRight: '3%',
    borderRadius: 5,
    borderColor: colors.colorD9,
    borderWidth: 1,
  },
  btnText: {
    fontFamily: fonts.medium,
    fontSize: RFValue(11),
  },
});
