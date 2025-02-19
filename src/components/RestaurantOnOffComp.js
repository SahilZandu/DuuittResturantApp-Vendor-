import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {SvgXml} from 'react-native-svg';
import {appImagesSvg} from '../commons/AppImages';
import {colors} from '../theme/colors';
import {fonts} from '../theme/fonts/fonts';

const RestaurantOnOffComp = ({
  title,
  reasonData,
  restaurantOnOff,
  pressOnOff,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.renderUpperView}>
        {restaurantOnOff?.map((item, index) => {
          return (
            <View style={styles.renderView}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  pressOnOff(item);
                }}
                key={index}
                style={styles.touchView}>
                <Text style={styles.titleInner}>{item?.title}</Text>
                <SvgXml
                  style={{marginRight: '5%'}}
                  width={20}
                  height={20}
                  xml={
                    item?.title == reasonData
                      ? appImagesSvg.checkBox
                      : appImagesSvg.unCheckBox
                  }
                />
              </TouchableOpacity>
              <View style={styles.bottomLine} />
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default RestaurantOnOffComp;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    fontSize: RFValue(15),
    fontFamily: fonts.bold,
    color: colors.black,
  },
  renderUpperView: {
    marginTop: '2%',
    justifyContent: 'center',
  },
  renderView: {
    justifyContent: 'center',
  },
  touchView: {
    flexDirection: 'row',
    alignItems: 'center',
    height: hp('7%'),
  },
  title: {
    fontSize: RFValue(14),
    fontFamily: fonts.regular,
    marginLeft: '3%',
    color: colors.color24,
  },
  titleInner: {
    flex: 1,
    fontSize: RFValue(14),
    fontFamily: fonts.regular,
    marginLeft: '3%',
    color: colors.color24,
  },
  bottomLine: {
    height: 2,
    backgroundColor: colors.colorD9,
  },
});
