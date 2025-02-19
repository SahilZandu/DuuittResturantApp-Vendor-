import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {colors} from '../../theme/colors';
import {fonts} from '../../theme/colors';
import {Line} from '../../helpers/Line';
import MenuActions from '../menu/MenuActions';
import {SvgXml} from 'react-native-svg';

const icon = `<svg xmlns="http://www.w3.org/2000/svg" width="8" height="13" viewBox="0 0 8 13" fill="none">
<path d="M1.75 12.5001C1.3375 12.5001 0.984375 12.3532 0.690625 12.0594C0.396875 11.7657 0.25 11.4126 0.25 11.0001C0.25 10.5876 0.396875 10.2344 0.690625 9.94069C0.984375 9.64694 1.3375 9.50006 1.75 9.50006C2.1625 9.50006 2.51562 9.64694 2.80938 9.94069C3.10313 10.2344 3.25 10.5876 3.25 11.0001C3.25 11.4126 3.10313 11.7657 2.80938 12.0594C2.51562 12.3532 2.1625 12.5001 1.75 12.5001ZM6.25 12.5001C5.8375 12.5001 5.48438 12.3532 5.19063 12.0594C4.89688 11.7657 4.75 11.4126 4.75 11.0001C4.75 10.5876 4.89688 10.2344 5.19063 9.94069C5.48438 9.64694 5.8375 9.50006 6.25 9.50006C6.6625 9.50006 7.01563 9.64694 7.30938 9.94069C7.60313 10.2344 7.75 10.5876 7.75 11.0001C7.75 11.4126 7.60313 11.7657 7.30938 12.0594C7.01563 12.3532 6.6625 12.5001 6.25 12.5001ZM1.75 8.00006C1.3375 8.00006 0.984375 7.85319 0.690625 7.55944C0.396875 7.26569 0.25 6.91256 0.25 6.50006C0.25 6.08756 0.396875 5.73444 0.690625 5.44069C0.984375 5.14694 1.3375 5.00006 1.75 5.00006C2.1625 5.00006 2.51562 5.14694 2.80938 5.44069C3.10313 5.73444 3.25 6.08756 3.25 6.50006C3.25 6.91256 3.10313 7.26569 2.80938 7.55944C2.51562 7.85319 2.1625 8.00006 1.75 8.00006ZM6.25 8.00006C5.8375 8.00006 5.48438 7.85319 5.19063 7.55944C4.89688 7.26569 4.75 6.91256 4.75 6.50006C4.75 6.08756 4.89688 5.73444 5.19063 5.44069C5.48438 5.14694 5.8375 5.00006 6.25 5.00006C6.6625 5.00006 7.01563 5.14694 7.30938 5.44069C7.60313 5.73444 7.75 6.08756 7.75 6.50006C7.75 6.91256 7.60313 7.26569 7.30938 7.55944C7.01563 7.85319 6.6625 8.00006 6.25 8.00006ZM1.75 3.50006C1.3375 3.50006 0.984375 3.35319 0.690625 3.05944C0.396875 2.76569 0.25 2.41256 0.25 2.00006C0.25 1.58756 0.396875 1.23444 0.690625 0.940686C0.984375 0.646936 1.3375 0.500061 1.75 0.500061C2.1625 0.500061 2.51562 0.646936 2.80938 0.940686C3.10313 1.23444 3.25 1.58756 3.25 2.00006C3.25 2.41256 3.10313 2.76569 2.80938 3.05944C2.51562 3.35319 2.1625 3.50006 1.75 3.50006ZM6.25 3.50006C5.8375 3.50006 5.48438 3.35319 5.19063 3.05944C4.89688 2.76569 4.75 2.41256 4.75 2.00006C4.75 1.58756 4.89688 1.23444 5.19063 0.940686C5.48438 0.646936 5.8375 0.500061 6.25 0.500061C6.6625 0.500061 7.01563 0.646936 7.30938 0.940686C7.60313 1.23444 7.75 1.58756 7.75 2.00006C7.75 2.41256 7.60313 2.76569 7.30938 3.05944C7.01563 3.35319 6.6625 3.50006 6.25 3.50006Z" fill="#B1B1B1"/>
</svg>`;

export default function CategoryCard({
  item,
  onActive,
  onDelete,
  onEdit,
  isMenu,
}) {
 
    return (
      <View style={{paddingHorizontal: 16}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <SvgXml xml={icon} />
          <View style={{flex: 1, marginLeft: '4%', marginTop: '1%'}}>
            <Text style={styles.itemName}>{item?.name}</Text>

            <MenuActions
              isEdit={true}
              statusUpdate={true}
              isMenu={isMenu}
              item={item}
              onUpdateStock={onActive}
              onDelete={onDelete}
              onEdit={onEdit}
              type={'category'}
            />
          </View>
        </View>

        <Line />
      </View>
    );
 
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
  },
  amount: {
    fontSize: RFValue(14),
    fontFamily: fonts.semiBold,
    color: colors.main,
    marginTop: '1%',
  },
  itemName: {
    fontSize: RFValue(14),
    fontFamily: fonts.semiBold,
    color: '#333333',
    marginLeft: '1%',
  },
  itemCategory: {
    color: '#8F8F8F',
    fontFamily: fonts.Regular,
    fontSize: RFValue(12),
    marginTop: '1%',
  },
  switchText: {
    fontFamily: fonts.Regular,
  },
});
