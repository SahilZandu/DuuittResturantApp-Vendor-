import React, { useState } from 'react';
import { Text, View, Pressable, ActivityIndicator } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { colors } from '../../theme/colors';
import { fonts } from '../../theme/fonts/fonts';

const LogoutActions = ({ onCancle, onLogout, type }) => {
  const actions = [
    {
      action: 'Cancel',
      onAction: () => onCancle(),
    },
    {
      action: type == 'logout' ? 'Logout' : 'Back',
      onAction: () => onLogout(),
    },
  ];

  const [loading, setLoading] = useState(false);

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '5%',
      }}>
      {actions?.map((item, key) => (
        <Pressable
          onPress={() => {
            if (type == 'logout') {
              setLoading(true);
            }
            item.onAction();
          }}
          key={key}
          style={{
            height: hp('4%'),
            width: wp('30%'),
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: key == 0 ? 1 : 0,
            borderRadius: 20,
            borderColor: colors.main,
            backgroundColor:
              key == 0
                ? colors.white
                : type == 'logout'
                  ? colors.colorCB
                  : 'rgba(254, 240, 199, 1)',
            marginRight: key == 0 ? 15 : 0,
          }}>
          {type == 'logout' && item?.action == 'Logout' ? (
            loading == true ? (
              <ActivityIndicator size="small" color={colors.white} />
            ) : (
              <Text
                style={{
                  fontSize: RFValue(11),
                  fontFamily: fonts.medium,
                  color:
                    key == 0
                      ? colors.main
                      : type == 'logout'
                        ? colors.white
                        : colors.colorDC,
                }}>
                {item?.action}
              </Text>
            )
          ) : (
            <Text
              style={{
                fontSize: RFValue(11),
                fontFamily: fonts.medium,
                color:
                  key == 0
                    ? colors.main
                    : type == 'logout'
                      ? colors.white
                      : colors.colorDC,
              }}>
              {item?.action}
            </Text>
          )}
        </Pressable>
      ))}
    </View>
  );
};

export default LogoutActions;
