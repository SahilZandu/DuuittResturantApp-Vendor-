import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {colors} from '../../theme/colors';
import {fonts} from '../../theme/colors';
import {currencyFormat} from '../../helpers/currencyFormat';
import {Line} from '../../helpers/Line';
import MenuCover from '../menu/MenuCover';
import MenuType from '../menu/MenuType';
import MenuActions from '../menu/MenuActions';
import UnderReview from '../menu/UnderReview';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

export default function MenuCard({
  item,
  onUpdateStock,
  onDelete,
  isGroup,
  handleCoverUpdate,
  onUpdateRecommended,
  tagEdit,
  statusUpdate,
  isMenu,
  onEdit,
  onReqInfo,
}) {
  const isActionDelete = item?.delete_request ? true : false;
  // const isProductShow =
  //   item.status == 1
  //     ? true
  //     : item.status == 0 && item.back_to_online
  //     ? true
  //     : false;

  const CardItems = () => {
    return (
      <View style={{marginLeft: '1%'}}>
        <MenuType
          item={item}
          onUpdateRecommended={onUpdateRecommended}
          isGroup={isGroup}
          tagEdit={tagEdit}
          tag={item?.tag}
        />
        <Text numberOfLines={2} style={styles.itemName}>
          {item?.title}
        </Text>
        <Text numberOfLines={1} style={styles.itemCategory}>
          {item?.product_type}
        </Text>
        <Text style={styles.amount}>{currencyFormat(item?.selling_price)}</Text>
      </View>
    );
  };

  return (
    <>
      <UnderReview
        visiable={item?.pending_request || isActionDelete}
        onInfo={onReqInfo}
      />
      <View
        pointerEvents={isActionDelete ? 'none' : 'auto'}
        style={{
          paddingHorizontal: 16,
          opacity: isActionDelete ? 0.6 : 1,
        }}>
        <View style={styles.card}>
          <MenuCover
            isPendingRequest={item?.pending_request ? true : false}
            isMenu={isMenu}
            isGroup={isGroup}
            uri={item.product_pic}
            urlScheme={'product'}
            isThumb={true}
            handleUpdate={uri => handleCoverUpdate(item, uri)}
            tag={item?.tag}
          />
          <CardItems />
        </View>

        <MenuActions
          isMenu={isMenu}
          isEdit={true}
          statusUpdate={statusUpdate}
          item={item}
          onUpdateStock={onUpdateStock}
          onDelete={onDelete}
          onEdit={onEdit}
          type={'menu'}
          isGroup={isGroup}
          onUpdateRecommended={onUpdateRecommended}
          // isRecommendedAction={isGroup ? false : true}
        />
      </View>
      <Line />
      <Text />
    </>
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
    marginTop: '2%',
  },
  itemName: {
    fontSize: RFValue(12),
    fontFamily: fonts.semiBold,
    color: '#333333',
    width: wp('50%'),
    marginTop: '1%',
  },
  itemCategory: {
    color: '#8F8F8F',
    fontFamily: fonts.Regular,
    fontSize: RFValue(12),
    marginTop: '1%',
    maxWidth: '70%',
  },
  switchText: {
    fontFamily: fonts.Regular,
  },
});
