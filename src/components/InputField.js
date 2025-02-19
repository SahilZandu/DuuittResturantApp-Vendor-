
import React from 'react';
import {Pressable, View} from 'react-native';
import {Text,TextInput} from 'react-native-paper';
import {useFormikContext} from 'formik';
import {colors} from '../theme/colors';
import {RFValue} from 'react-native-responsive-fontsize';
import FieldErrorMessage from './FieldErrorMessage';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { fonts } from '../theme/fonts/fonts';


function InputField({
  name,
  leftIconName,
  onPressEye,
  rightIconName,
  leftIconAffix,
  value,
  onBlur,
  prefix,
  changeText,
  inputLabel,
  isBlur,
  onPress,
  onChange,
  autoCapitalize,
  marginLeft,
  ...otherProps
}) {
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

// console.log("errors--",errors)

  return (
    <>
      <View
        style={{
          justifyContent: 'center',
          marginVertical: '2%',
          marginTop: '4%',
          opacity: isBlur ? 0.5 : 1,
        }}>
        {inputLabel && (
          <Text
            style={{
              marginBottom: 10,
              fontSize: RFValue(13),
              // fontFamily:fonts.medium,
               fontWeight:'500',
              color:colors.black,
              marginLeft: marginLeft ? marginLeft : '3%',
            }}>
            {inputLabel}
          </Text>
        )}
        <Pressable
          onPress={() => {
            onPress ? onPress() : console.log('press');
          }}>
          <TextInput
          autoCapitalize={autoCapitalize}
            placeholderTextColor={colors.color95}
            outlineColor={colors.colorB6}
            activeOutlineColor={colors.color95}
            style={{
              paddingLeft: prefix ? '10%' :'2%',
              marginTop: '1%',
              backgroundColor: 'white',
              paddingVertical: 0,
              fontSize: RFValue(13),
              height:hp('5.8%'),
            }}
            theme={{roundness: 50}}
            left={
              (leftIconName && (
                <TextInput.Icon
                  icon={leftIconName}
                  size={24}
                  iconColor={colors.color8F}
                />
              )) ||
              (leftIconAffix && (
                <TextInput.Affix
                  text={leftIconAffix}
                  textStyle={{
                    fontSize: RFValue(12),
                    color: colors.red,
                    fontFamily: fonts.regular,
                  }}
                />
              ))
            }
            right={
              rightIconName ? (
                changeText ? (
                  <TextInput.Affix
                    text={changeText}
                    textStyle={{
                      fontSize: RFValue(12),
                      color: colors.red,
                      fontFamily: fonts.regular,
                    }}
                  />
                ) : (
                  <TextInput.Icon
                    onPress={onPressEye}
                    icon={rightIconName}
                    size={24}
                    iconColor={colors.color8F}
                    style={{marginLeft:'4%'}}
                  />
                )
              ) : null
            }
            mode="outlined"
            value={value ? value : values[name]}
            onBlur={() => (onBlur ? onBlur() : setFieldTouched(name))}
            onChangeText={t => {
              // handleChange(name)
              if(onChange){
                onChange(true)
              }
             ;
              setFieldValue(name, t);
            }}
            {...otherProps}
          />
        </Pressable>
        {prefix && (
          <Text
            style={{
              position: 'absolute',
              left: 10,
              fontSize: RFValue(13),
              color: colors.black,
              textAlign: 'center',
              top:'27%'
            }}>
            {prefix}
          </Text>
        )}
      </View>
      <FieldErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default InputField;
