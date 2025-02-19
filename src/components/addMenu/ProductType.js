import React, {useState} from 'react';
import {Text, View, Pressable, StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {SvgXml} from 'react-native-svg';
import {appImages} from '../../commons/AppImages';
import {useFormikContext} from 'formik';
import { fonts } from '../../theme/fonts/fonts';
import { appImagesSvg } from '../../commons/AppImages';
import { colors } from '../../theme/colors';

const types = ['veg', 'non-veg', 'egg'];

const ProductType = ({name, value, title,titleStyle}) => {
  const [v, setV] = useState(value);
  const {setFieldTouched, handleChange, values, setFieldValue} =
  useFormikContext();
  const getValueF = i => {
    if (i == 'non-veg') {
      return 'Non Veg';
    } else if (i == 'veg') {
      return 'Veg';
    } else {
      return 'Egg';
    }
  };

  return (
    <View style={{marginTop: '5%'}}>
      <Text style={[styles.title, titleStyle]}>{title}</Text>
      <View style={styles.rovView}>
        {types?.map((item, key) => (
          <Pressable onPress={() => {
            setV(item)
            setFieldValue(name,item)
            }} key={key} style={styles.btn}>
            <SvgXml width={20}
            height={20} xml={v == item ? appImagesSvg.checkBox : appImagesSvg.unCheckBox} />
            <Text style={[styles.title, {fontFamily: fonts.semiBold}]}>
              {'  '}
              {getValueF(item)}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default ProductType;

const styles = StyleSheet.create({
  title: {
    color:colors.black,
    fontFamily: fonts.semiBold,
    fontSize: RFValue(12),
    marginLeft:'1%'
  },
  rovView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '3%',
   

  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: '6%',
  },
});
