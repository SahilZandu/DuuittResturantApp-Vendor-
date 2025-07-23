import React, {useEffect, useState} from 'react';
import {Text, View, Pressable, StyleSheet, ScrollView} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {SvgXml} from 'react-native-svg';
import {useFormikContext} from 'formik';
import {fonts} from '../../theme/fonts/fonts';
import {colors} from '../../theme/colors';
import {appImagesSvg} from '../../commons/AppImages';

const tags = ['Mostly Order', "Chef's Special", 'Best Selling'];

const SelectTag = ({
  tagvalue,
  tagTitle,
  recommendedvalue,
  recommendedTitle,
}) => {
  const {setFieldValue, values} = useFormikContext();
  // console.log("rec-------",recommendedvalue)
  const [vR, setVR] = useState(recommendedvalue);
  const [tV, setTV] = useState(tagvalue);

  console.log('recommendedvalue', recommendedvalue);
  const showTags = i => {
    if (i == 'Mostly Order') {
      return 'Mostly Order';
    } else if (i == "Chef's Special") {
      return "Chef's Special";
    } else if (i == 'Best Selling') {
      return 'Best Selling';
    } else {
      return 'Mostly Order';
    }
  };

  useEffect(() => {
    setTV(tagvalue);
  }, [tagvalue]);

  const Recommended = () => {
    return (
      <Pressable
        onPress={() => {
          let v = vR == 0 ? 1 : 0;
          setVR(v);
          setFieldValue('recommended', v);
        }}
        style={styles.recommendedView}>
        <SvgXml xml={vR == 1 ? appImagesSvg?.select : appImagesSvg?.unSelect} />
        <Text
          style={styles.recommendedText}>
          {'  '}Recommended
        </Text>
      </Pressable>
    );
  };

  const Tags = () => {
    return (
      <ScrollView
        horizontal
        contentContainerStyle={{paddingRight: '6%'}}
        showsHorizontalScrollIndicator={false}
        style={{flex: 1}}>
        <View style={{flexDirection: 'row'}}>
          {tags?.map((i, k) => (
            <Pressable
              onPress={() => {
                let v = i == tV ? null : i;
                setTV(v);
                setFieldValue('tag', v);
              }}
              key={k}
              style={ [styles.tagView,{
                marginLeft: k == 0 ? 0 : '2%',
              }]}>
              <SvgXml
                width={20}
                height={20}
                xml={
                  tV == i ? appImagesSvg?.checkBox : appImagesSvg?.unCheckBox
                }
              />
              <Text
                style={styles.tagText}>
                {'  '}
                {showTags(i)}
              </Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    );
  };

  return (
    <View style={{}}>
      <Text style={styles.title}>{recommendedTitle}</Text>
      <Recommended />

      <Text style={styles.title}>{tagTitle}</Text>

      <Tags />
    </View>
  );
};

export default SelectTag;

const styles = StyleSheet.create({
  title: {
    color: colors.black,
    fontFamily: fonts.semiBold,
    fontSize: RFValue(12),
    marginTop: '5%',
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
    marginTop: '3%',
  },
  recommendedView:{
    flexDirection: 'row', alignItems: 'center', marginTop: '3%'
  },
  recommendedText:{
    fontFamily: fonts.medium,
    fontSize: RFValue(13),
    color:colors.black
  },
  tagView:{
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '3%',
    marginLeft:'2%',
  },
  tagText:{
    fontFamily: fonts.medium,
    fontSize: RFValue(12),
    color:colors.black
  }
});
