import React, {useEffect, useState} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {Switch} from 'react-native-paper';
import {RFValue} from 'react-native-responsive-fontsize';
import {colors} from '../../theme/colors';
import {fonts} from '../../theme/fonts/fonts';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export default function MenuToggleStock({stock, left, status,onPressToggle}) {
  const [activateStock, setActivateStock] = useState(stock);

  useEffect(() => {
    setActivateStock(stock);
  },[stock]);

  const onTogglePress = async () => {
    setActivateStock(!activateStock);
    onPressToggle(!activateStock)
  };

  const getStatusIn = status => {
    switch (status) {
      case 'stock':
        return 'In Stock';
      case 'active':
        return 'Active';
      default:
        return 'In Stock';
    }
  };
  const getStatusOut = status => {
    switch (status) {
      case 'stock':
        return 'Out Stock';
      case 'active':
        return 'Inactive';
      default:
        return 'Out Stock';
    }
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'center',
        right: left ? '3%' : 0,
      }}>
      <Switch
        style={{
          transform:
            Platform.OS === 'ios'
              ? [{scaleX: 0.8}, {scaleY: 0.7}]
              : [{scaleX: 1}, {scaleY: 0.9}],
          left: left
            ? activateStock
              ? '0%'
              : '2%'
            : activateStock
            ? '2%'
            : '10%',
        }}
        value={activateStock}
        trackColor={{false: colors.red, true: colors.green}}
        thumbColor={activateStock ? colors.white : colors.white}
        onValueChange={() => {
          onTogglePress();
        }}
      />
      <Text
        style={{
          fontSize: RFValue(11),
          fontFamily: fonts.medium,
          color: colors.color90,
        }}>
        {' '}
        {activateStock == true
          ? getStatusIn(status)
          : getStatusOut(status)}{' '}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({});
