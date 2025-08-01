import React, {useEffect, useState} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {Switch} from 'react-native-paper';
import {RFValue} from 'react-native-responsive-fontsize';
import {colors} from '../theme/colors';
import {fonts} from '../theme/fonts/fonts';

export default function TextSwitchComp({status,title, onPressToggle}) {
  const [activateSwitch, setActivateSwitch] = useState(status);

  useEffect(() => {
    setActivateSwitch(status);
  }, [status]);

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: '5%',
      }}>
      <Text
        numberOfLines={1}
        style={{
          flex: 1,
          fontSize: RFValue(12),
          fontFamily: fonts.medium,
          color: colors.black,
        }}>
       {title}
      </Text>
      <Switch
        style={{
          transform:
            Platform.OS === 'ios'
              ? [{scaleX: 0.8}, {scaleY: 0.7}]
              : [{scaleX: 1}, {scaleY: 0.9}],
        }}
        value={activateSwitch}
        trackColor={{false: colors.red, true: colors.green}}
        thumbColor={activateSwitch ? colors.white : colors.white}
        onValueChange={() => {
          setActivateSwitch(!activateSwitch);
          onPressToggle(!activateSwitch);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
