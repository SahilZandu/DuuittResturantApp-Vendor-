import React from 'react';
import {Text, View, StyleSheet, Pressable, Image, Platform} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {appImages} from '../../commons/AppImages';
import {RFValue} from 'react-native-responsive-fontsize';
import {fonts} from '../../theme/colors';
import {colors} from '../../theme/colors';
import {coverPlaceholder} from '../../commons/AppImages';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AppImage from '../AppImage';

const RestaurantCard = ({item, org, onRestaurantSelect}) => {
  const isSelect = item.id == org?.id ? true : false;

  const cardShadow = isSelect
    ? {
        shadowColor:
          Platform.OS == 'android' ? 'black' : 'rgba(29, 114, 30, 0.18)',
        shadowOffset: {
          width: 2,
          height: 0,
        },
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 10,
      }
    : {};

  return (
    <Pressable
      // disabled={item?.is_active == 0 && true}
      onPress={onRestaurantSelect}
      style={[
        styles.buttonView,
        {
          opacity: item?.is_active == 0 ? 0.7 : 1,
          borderWidth: isSelect ? 0.3 : 1,
          backgroundColor: isSelect ? colors.whiteBackground : '#F4F4F4',
          ...cardShadow,
        },
      ]}>
      {item?.logo ? (
        <AppImage
          urlScheme={'org'}
          isThumb={true}
          style={{
            height: 66,
            width: 70,
            borderRadius: 10,
            backgroundColor: 'rgba(29, 114, 30, 0.18)',
          }}
          uri={item?.logo}
        />
      ) : (
        <Image
          source={coverPlaceholder}
          style={{
            height: 66,
            width: 70,
            borderRadius: 10,
            backgroundColor: 'rgba(29, 114, 30, 0.18)',
          }}
        />
      )}

      <Text style={styles.orgName} numberOfLines={2}>
        {item?.name} {'\n'}
        <Text style={styles.orgAdress}>{item?.address}</Text>{' '}
      </Text>
      {item?.name == null && item?.address == null && (
        <Text>Foodlemon restaurant</Text>
      )}
      <View style={{flex: 1}}>
        {item?.is_active == 0 ? (
          <Text style={styles.inActiveText}>Inactive</Text>
        ) : (
          <>
            {item?.id == org?.id ? (
              <View style={styles.selectOrgBox}>
                <Icon size={20} name={'done'} color={'#FFFFFF'} />
              </View>
            ) : (
              <View style={styles.unselectBox}>
                <SvgXml xml={appImages.rightIcon} fill={'#1D721E'} />
              </View>
            )}
          </>
        )}
      </View>
    </Pressable>
  );
};
export default RestaurantCard;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.whiteBackground,
  },
  title: {
    alignSelf: 'center',
    marginTop: '8%',
    fontFamily: fonts.medium,
    fontSize: RFValue(15),
    marginBottom: '5%',
    width: '80%',
  },
  orgName: {
    fontFamily: fonts.semiBold,
    fontSize: RFValue(13),
    color: '#1D721E',
    marginLeft: '5%',
    maxWidth: '50%',
  },
  itemView: {
    width: '80%',
    alignSelf: 'center',
    marginBottom: '5%',
  },
  buttonView: {
    flexDirection: 'row',
    borderRadius: 10,
    height: 70,
    alignItems: 'center',
    borderColor: 'rgba(29, 114, 30, 0.15)',
    paddingHorizontal: 1,
  },
  orgAdress: {
    fontSize: RFValue(10),
    color: '#000000',
    fontFamily: fonts.Regular,
    lineHeight: 22,
  },

  selectOrgBox: {
    marginLeft: 'auto',
    backgroundColor: '#F9BD00',
    marginRight: 16,
    height: 38,
    width: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor:
      Platform.OS == 'android' ? '#F9BD00' : 'rgba(249, 189, 0, 0.35)',
    shadowOffset: {
      width: 1,
      height: 6,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 10,
  },
  unselectBox: {
    marginLeft: 'auto',
    backgroundColor: 'rgba(29, 114, 30, 0.10)',
    marginRight: 16,
    height: 38,
    width: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inActiveText: {
    fontSize: RFValue(10),
    fontFamily: fonts.medium,
    color: '#000000',
    textAlign: 'right',
    marginRight: 16,
  },
});
