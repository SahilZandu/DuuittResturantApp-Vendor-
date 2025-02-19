import React, {useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {colors} from '../../theme/colors';
import {appImagesSvg} from '../../commons/AppImages';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import RBSheet from '@lunalee/react-native-raw-bottom-sheet';
import {SvgXml} from 'react-native-svg';
import {RenderDetailsItem} from './RenderDetailsItem';
import {fonts} from '../../theme/fonts/fonts';
import moment from 'moment';
import Spacer from '../../halpers/Spacer';
import {Line} from '../../halpers/Line';

export default function RequestsHistoryCard({
  item,
  navigation,
  id,
  setSerialNo,
  setIsBottomSheetOpen,
}) {
  const refRBSheet = useRef(null);
  const getType = () => {
    switch (item?.type) {
      case 'update_profile':
        return 'Profile update request';
      case 'bank_detail':
        return 'Bank update request';
      case 'pan_detail':
        return 'Pan card update request';
      case 'gstn_detail':
        return 'GST update request';
      case 'fssai_detail':
        return 'FSSAI update request';
      default:
        return item?.type;
    }
  };

  useEffect(() => {
    // console.log("check id:-",item?.serial_no, id)
    if (id) {
      if (item?.serial_no == id) {
        openRBSheetPress();
        setIsBottomSheetOpen(true);
      }
    }
  }, [id]);

  const getHeight = () => {
    switch (item?.type) {
      case 'update_profile':
        return item?.status === 'rejected' ? hp('70%') : hp('62%');
      case 'bank_detail':
        return item?.status === 'rejected' ? hp('40%') : hp('38%');
      case 'pan_detail':
        return item?.status === 'rejected' ? hp('41%') : hp('38%');
      case 'gstn_detail':
        return item?.status === 'rejected' ? hp('46%') : hp('40%');
      case 'fssai_detail':
        return item?.status === 'rejected' ? hp('46%') : hp('40%');
      default:
        return null;
    }
  };

  const openRBSheetPress = async () => {
    setSerialNo(0);
    setIsBottomSheetOpen(true);
    await refRBSheet.current.open();
  };

  const closeBtnRBSheet = async () => {
    setSerialNo(0);
    setIsBottomSheetOpen(false);
    await refRBSheet.current.close();
  };

  const CloseBtn = () => {
    return (
      <Pressable
        onPress={() => {
          closeBtnRBSheet();
        }}
        style={styles.cancelBTNPress}>
        <SvgXml xml={appImagesSvg?.popUpclose} />
      </Pressable>
    );
  };

  const dateFormat = d => {
    var date = new Date(d);
    return moment(date).format('DD MMM YYYY [at] h:mmA');
  };

  const getBackColorStatus = status => {
    switch (status) {
      case 'pending':
        return colors.color00A;
      case 'declined':
        return colors.red;
      case 'approved':
        return colors.green;
      default:
        return colors.color00A;
    }
  };

  return (
    <View>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          openRBSheetPress();
        }}
        style={styles.touchView}>
        <View style={styles.innerMainView}>
          <View style={styles.nameStatusView}>
            <Text numberOfLines={1} style={styles.nameText}>
           { getType() }
            {/* {item?.name} */}
            </Text>
            <Text
              style={[
                styles.statusText,
                {color: getBackColorStatus(item?.status)},
              ]}>
              {item?.status}
            </Text>
          </View>
          <View style={styles.idDateView}>
            <Text numberOfLines={1} style={styles.idText}>
              ID: {item?._id}
              {/* {item?.request_Id} */}
            </Text>
            <Text style={styles.dateText}>{dateFormat(
              // item?.created_at
              item?.createdAt
              )}</Text>
          </View>
          <View
            style={{
              height: 2,
              backgroundColor: colors.colorD9,
              marginTop: '4.5%',
              marginHorizontal: -20,
            }}
          />
        </View>
      </TouchableOpacity>

      <RBSheet
        onClose={() => {
          setIsBottomSheetOpen(false);
        }}
        height={getHeight()}
        ref={refRBSheet}
        //  closeOnDragDown={true}
        closeOnPressMask={true}
        keyboardAvoidingViewEnabled={Platform.OS == 'ios' ? true : false}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(52, 52, 52, 0.8)',
          },
          container: {
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          },
        }}>
        <View
          style={{
            flex: 1,
            marginHorizontal: 20,
            marginTop: hp('0.2%'),
            paddingTop: '4%',
          }}>
          <Text numberOfLines={1} style={styles.RBTypeText}>
            {getType()}{' '}
          </Text>
          <CloseBtn />
          <Spacer space={hp('0.5%')} />
          <Line />
          {RenderDetailsItem(navigation, item, closeBtnRBSheet)}
        </View>
      </RBSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  touchView: {
    justifyContent: 'center',
  },
  innerMainView: {
    backgroundColor: colors.appBackground,
    height: hp('11%'),
    marginHorizontal: 20,
  },
  nameStatusView: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  nameText: {
    flex: 1,
    fontSize: RFValue(12),
    fontFamily: fonts.semiBold,
    color: colors.black,
  },
  statusText: {
    fontSize: RFValue(12),
    fontFamily: fonts.medium,
    color: colors.color00A,
    textTransform: 'capitalize',
  },
  idDateView: {
    flexDirection: 'row',
    marginTop: '5%',
  },
  dateText: {
    fontSize: RFValue(12),
    fontFamily: fonts.medium,
    color: colors.color90,
  },
  idText: {
    flex: 1,
    fontSize: RFValue(12),
    fontFamily: fonts.medium,
    color: colors.black85,
  },
  moreInfoView: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp('1%'),
    marginTop: -3,
  },
  RBTypeText: {
    fontSize: RFValue(12),
    fontFamily: fonts.medium,
    color: colors.black,
    textAlign: 'auto',
    width: wp('80%'),
  },
  cancelBTNPress: {
    backgroundColor: 'rgba(203, 47, 47, 0.15)',
    height: 28,
    width: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    position: 'absolute',
    right: '1%',
    top: '2.5%',
  },
});
