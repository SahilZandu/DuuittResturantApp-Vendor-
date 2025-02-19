import React, {useEffect, useState} from 'react';
import {Image, Platform, StyleSheet, Text, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {colors} from '../../theme/colors';
import {fonts} from '../../theme/fonts/fonts';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {appImagesSvg} from '../../commons/AppImages';
import {SvgXml} from 'react-native-svg';
import {currencyFormat} from '../../halpers/currencyFormat';
import BottomLine from '../../halpers/BottomLine';
import MenuToggleStock from '../menuCard/MenuToggleStock';
import PopUp from '../appPopUp/PopUp';

export default function MemberCard({
  item,
  index,
  onPressToggle,
  onDelete,
  onEditPress,
  isDeletePopUp,
  setIsDeletedPopUp,
}) {
  const [isDelete, setIsDelete] = useState(isDeletePopUp);

  const onPressToggleData = status => {
    onPressToggle(item, status);
  };

  return (
    <>
      <View style={[styles.container]}>
        <View style={styles.innerView}>
          <Text numberOfLines={1} style={styles.textName}>
            {item?.first_name}{' '}
            {item?.last_name}{' '}({' '}{item?.roles?.name}{' '})
          </Text>
          <Text style={{flex: 1}} />
          <SvgXml
            onPress={() => {
              setIsDelete(true), setIsDeletedPopUp(true);
            }}
            hitSlop={styles.hitDeleteSlot}
            width={24}
            height={24}
            style={{right: '3%'}}
            xml={appImagesSvg.deleteGrey}
          />
          <SvgXml
            onPress={() => {
              onEditPress(item);
            }}
            hitSlop={styles.hitEditSlot}
            width={18}
            height={18}
            xml={appImagesSvg.editGrey}
          />
        </View>
        <View style={styles.toggleView}>
          <MenuToggleStock
            onPressToggle={onPressToggleData}
            left={true}
            stock={item?.is_active}
            status={'active'}
          />
        </View>
        <BottomLine borderStyle={'solid'} borderColor={colors.colorD9} />
      </View>
      <PopUp
        topIcon={true}
        visible={isDelete}
        type={'delete'}
        onClose={() => setIsDelete(false)}
        title={'You are about to remove an member from this team'}
        text={'This will delete your member from the team are your sure?'}
        onDelete={() => {
          onDelete(item, index);
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: '4%',
  },
  innerView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textName: {
    fontSize: RFValue(13),
    fontFamily: fonts.semiBold,
    color: colors.black,
    width: wp('78%'),
  },
  toggleView: {
    justifyContent: 'center',
    marginTop: '2%',
  },
  hitEditSlot: {
    top: 20,
    bottom: 20,
    left: 10,
    right: 20,
  },
  hitDeleteSlot: {
    top: 20,
    bottom: 20,
    left: 20,
    right: 10,
  },
});
