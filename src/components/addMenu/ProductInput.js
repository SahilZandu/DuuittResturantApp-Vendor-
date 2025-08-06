import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TextInput,
  Pressable,
  Platform,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {SvgXml} from 'react-native-svg';
import {useFormikContext} from 'formik';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {appImagesSvg} from '../../commons/AppImages';
import { fonts } from '../../theme/fonts/fonts';
import { DateFormat } from '../../halpers/DateFormat';
import FieldErrorMessage from '../FieldErrorMessage';
import { colors } from '../../theme/colors';

const {height} = Dimensions.get('window');

const ProductInput = ({
  name,
  title,
  value,
  placeholder,
  multiLine,
  isDelete,
  onDeleteRow,
  titleStyle,
  editable,
  keybordeType,
  mainStyle,
  boxStyle,
  isTouchInput,
  onPress,
  isPending,
  prefix,
  prefixColor,
  isHintText,
  onChange,
  editValue,
  marginLeft,
  ...otherProps
}) => {
  const {
    setFieldTouched,
    handleChange,
    values,
    errors,
    touched,
    isValid,
    dirty,
    setFieldValue,
  } = useFormikContext();

  const [focusValue, setFocusValue] = useState(false);
    const [inputShowError, setInputShowError] = useState(false)

  // console.log("name value--",name,value,values[name])
  // console.log("touched[name]",touched[name],errors,errors[name],name,focusValue)

  return (
    <View
      pointerEvents={isPending === true ? 'none' : undefined}
      style={[styles.container, mainStyle]}>
      {title && <Text style={[styles.title,{ left: marginLeft ? marginLeft : '1%',},titleStyle]}>{title}</Text>}

      {isTouchInput ? (
        <Pressable onPress={onPress}>
          <View
            style={[
              styles.box,
              {
                height: multiLine ? height / 8 : height / 20,
                paddingTop: multiLine ? '3%' : 0,
                justifyContent: multiLine ? 'flex-start' : 'center',
                paddingHorizontal: '5%',
                borderColor:colors.colorD9,
              },
              boxStyle,
            ]}>
            <Text
              style={[
                styles.textTouch,
                {
                  color: values[name]?.length > 0 ? colors.black :colors.color8F,
                  opacity: isPending ? 0.4 : 1,
                  fontSize: RFValue(13),
                },
              ]}>
              {values[name]?.length > 0
                ? values[name]
                : placeholder
                }
            </Text>

            {isDelete && (
              <Pressable onPress={onDeleteRow} style={styles.touchableView}>
                <SvgXml xml={appImagesSvg?.deleteWhiteIcon} />
              </Pressable>
            )}
          </View>
        </Pressable>
      ) : (
        <View
          style={[
            styles.box,
            {
              height: multiLine ? height / 8 : height / 20,
              paddingTop: multiLine ? '3%' : 0,
              justifyContent: multiLine ? 'flex-start' : 'center',
              borderColor:colors.colorD9,
            },
            boxStyle,
          ]}>
          <TextInput
            style={{
              paddingLeft: prefix
                ? prefixColor
                  ? wp('11%')
                  : wp('8%')
                : 'auto',
              paddingRight: isDelete ? wp('14%') : 'auto',
              paddingVertical: 0,
              height: multiLine ? height / 9 : height / 28,
              paddingHorizontal: '5%',
              marginTop: multiLine
                ? hp('-0.8%')
                : Platform.OS === 'ios'
                ? 0
                : hp('1%'),
              justifyContent: 'center',
              alignItems: 'center',
              opacity: isPending ? 0.4 : 1,
              fontSize: RFValue(13),
              color:colors.black
            }}
            textAlignVertical="top"
            keyboardType={keybordeType}
            multiline={multiLine}
            placeholder={placeholder}
            value={editValue ?value:values[name]}
            onChangeText={t => {
              setFieldValue(name, t);
              if (onChange) {
                onChange();
              }
            }}
            onBlur={() => {
              setFieldTouched(name), setFocusValue(false);
            }}
            onFocus={() => {
              setInputShowError(true)
              setFocusValue(true);
              if (values['isAction'] == 'false') {
                setFieldValue('isAction', 'true');
              }
            }}
            editable={editable}
            {...otherProps}
          />
          {prefix && (
            <Text
              style={{
                position: 'absolute',
                left: 10,
                fontSize: RFValue(13),
                color: prefixColor ? prefixColor : colors.main,
              }}>
              {prefix}
            </Text>
          )}

          {isDelete && (
            <Pressable onPress={onDeleteRow} style={styles.touchableView}>
              <SvgXml xml={appImagesSvg?.deleteWhiteIcon} />
            </Pressable>
          )}
        </View>
      )}
      <View style={{marginTop: '1%'}}>
        {isHintText?.length > 0 ? (
          <>
            {focusValue == false ? (
              <FieldErrorMessage error={errors[name]} visible={touched[name]} />
            ) : (
              <Text
                style={{
                  color: colors.color80,
                  fontFamily: fonts.medium,
                  fontSize: RFValue(12),
                  marginTop: '1.7%',
                }}>
                {isHintText}
              </Text>
            )}
          </>
        ) : (
          <FieldErrorMessage error={errors[name]} visible={  inputShowError ? true : inputShowError || touched[name]} />
        )}
      </View>
    </View>
  );
};

export default ProductInput;

const styles = StyleSheet.create({
  container: {
    marginTop: '5%',
  },
  title: {
    color:colors.black,
    fontFamily: fonts.semiBold,
    fontSize: RFValue(12),
  },
  box: {
    width: '100%',
    marginTop: '3%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor:colors.colorB1,
    color:colors.color33,
    fontFamily: fonts.medium,
    fontSize: RFValue(14),
  },
  touchableView: {
    backgroundColor:colors.colorCB,
    position: 'absolute',
    height: height / 20,
    right: 0,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '4%',
  },
  textTouch: {
    fontSize: 14,
    fontFamily: fonts.medium,
    color:colors.color33,

  },
});
