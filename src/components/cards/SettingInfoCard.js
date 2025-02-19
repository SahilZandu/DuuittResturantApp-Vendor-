import React, {useState} from 'react';
import {Text, View, Pressable, Platform, Alert, Dimensions} from 'react-native';
import {
  ImageBaseUrl,
  ImageBaseUrlThumbOrg,
  ImageBaseUrlOrg,
} from '../../commons/AppImages';
import {RFValue} from 'react-native-responsive-fontsize';
import {fonts} from '../../theme/colors';
import {SvgXml} from 'react-native-svg';
import {Switch, Avatar} from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {appImages} from '../../commons/AppImages';
import {colors} from '../../theme/colors';
import {Rating} from 'react-native-rating-element';

const size = Dimensions.get('window').height;

const SettingInfoCard = ({
  navigation,
  onOff,
  setOnOff,
  pickDine,
  setPickDine,
  appOrg,
  isProfile,
  checkProfilecompletion,
  orglist,
}) => {
  const overallrate = appOrg?.ratings_avg_rating
    ? Number(appOrg?.ratings_avg_rating)
    : 0;

  const rateFormat = overallrate ? overallrate.toFixed(2) : 0;

  //  console.log("rating org",rateFormat )

  const getUri = () => {
    if (appOrg?.logo?.startsWith('image')) {
      // const uri = appOrg?.update_profile
      //   ? appOrg?.update_profile?.data?.vendor?.logo_image_name
      //   : appOrg.logo;

      const uri =  appOrg.logo;

      return ImageBaseUrl + uri;
    } else {
      const uri =  appOrg.logo;
      return ImageBaseUrlThumbOrg + uri;
    }
  };

  return (
    <>
      <View
        style={{
          backgroundColor: 'rgba(29, 114, 30, 0.08)',
          paddingHorizontal: 16,
          paddingVertical: '2%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
        }}>
        <View
          style={{
            justifyContent: 'space-between',
            paddingVertical: orglist && orglist?.length == 1 ? '2%' : '1%',
          }}>
          <Text
            numberOfLines={1}
            style={{
              maxWidth: wp('66%'),
              color: '#1D721E',
              fontSize: RFValue(14),
              fontFamily: fonts.semiBold,
            }}>
            {appOrg?.name}
          </Text>

          <Pressable
            style={{
              marginTop: '-2%',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Rating
              rated={Number(rateFormat)}
              totalCount={5}
              ratingColor="#f1c644"
              ratingBackgroundColor="#d4d4d4"
              size={size / 39}
              readonly
              icon="ios-star"
              direction="row"
            />
            {/* <Text> (0/5)</Text> */}
          </Pressable>

          {orglist && orglist?.length > 1 && (
            <Pressable
              style={{
                flexDirection: 'row',
                // justifyContent: 'space-between',
                alignItems: 'center',
                paddingVertical: '2%',
              }}
              onPress={() => navigation.navigate('orgs', {orglist})}>
              <SvgXml xml={appImages.switch} />
              <Text
                style={{
                  fontFamily: fonts.medium,
                  fontSize: RFValue(12),
                }}>
                {' '}
                Switch Restaurant
              </Text>
            </Pressable>
          )}
        </View>

        <View style={{alignItems: 'flex-end', justifyContent: 'space-between'}}>
          <Pressable style={{}} onPress={() => navigation.navigate('profile')}>
            {appOrg?.logo == null || appOrg?.logo == 'null' ? (
              <Avatar.Icon
                size={size / 19}
                icon="person-outline"
                style={{
                  backgroundColor: colors.main,
                }}
              />
            ) : (
              <Avatar.Image source={{uri: getUri()}} size={size / 18} />
            )}
            {/* <SvgXml
              xml={editIcone}
              style={{position: 'absolute', top: '10%', right: '8%'}}
            /> */}
          </Pressable>
          {isProfile && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: '4%',
              }}>
              <Text
                style={{
                  fontSize: RFValue(12),
                  fontFamily: fonts.medium,
                  color: '#000',
                }}>
                {onOff === true ? 'Online' : 'Offline'}
              </Text>

              <Switch
                style={{
                  transform:
                    Platform.OS === 'ios'
                      ? [{scaleX: 0.8}, {scaleY: 0.7}]
                      : [{scaleX: 1}, {scaleY: 0.9}],
                }}
                value={onOff}
                trackColor={{false: '#F00', true: '#1D721E'}}
                ios_backgroundColor="#F00"
                thumbColor={onOff ? '#FFFFFF' : '#FFFFFF'}
                onValueChange={v => {
                  if (checkProfilecompletion && onOff == false) {
                    console.log(
                      'Please complete restaurant details to online the restaurant',
                    );
                    Alert.alert(
                      'Alert',
                      'If you want to put your restaurant online, finish your profile first.',
                      [
                        {
                          text: 'OK',
                          onPress: () => {
                            // rootStore.commonStore.setToken(null);
                            // rootStore.commonStore.setOrg(null);
                            // rootStore.authStore.logoutWithRestart();
                            // throw error.response;
                          },
                        },
                      ],
                      // {cancelable: false}
                    );
                  } else {
                    setOnOff(v);
                  }
                }}
              />
            </View>
          )}
        </View>
      </View>
    </>
  );
};

export default SettingInfoCard;

const editIcone = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 16 16" fill="none">
<g id="edit_FILL0_wght400_GRAD0_opsz24 1">
<path id="Vector" d="M3.33333 12.6667H4.26667L10.0167 6.91666L9.08333 5.98333L3.33333 11.7333V12.6667ZM12.8667 5.95L10.0333 3.14999L10.9667 2.21666C11.2222 1.96111 11.5361 1.83333 11.9083 1.83333C12.2806 1.83333 12.5944 1.96111 12.85 2.21666L13.7833 3.14999C14.0389 3.40555 14.1722 3.71388 14.1833 4.075C14.1944 4.43611 14.0722 4.74444 13.8167 4.99999L12.8667 5.95ZM11.9 6.93333L4.83333 14H2V11.1667L9.06667 4.1L11.9 6.93333ZM9.55 6.45L9.08333 5.98333L10.0167 6.91666L9.55 6.45Z" fill="#FFFF"/>
</g>
</svg>`;
