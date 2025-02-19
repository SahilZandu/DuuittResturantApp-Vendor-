import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Pressable,
  ScrollView,
  Platform,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {SvgXml} from 'react-native-svg';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useFormikContext} from 'formik';
import {appImagesSvg} from '../../commons/AppImages';
import { fonts } from '../../theme/fonts/fonts';
import { colors } from '../../theme/colors';

const {height} = Dimensions.get('window');

const iosZindex = Platform.OS == 'ios' ? {zIndex: 1} : {};
const androidZindex = Platform.OS == 'android' ? {zIndex: 1} : {};

const ProductDropDown = ({
  title,
  name,
  list,
  value,
  titleStyle,
  listObject,
  selectedObject,
  onSelectItem,
}) => {
  const {setFieldValue, values} = useFormikContext();
  const [isOpen, setIsOpen] = useState(false);
  const [v, setV] = useState(values[name]);

  console.log('name,listObject,value,values',name,listObject,value,values);

  useEffect(() => {
    if (listObject?.length > 0) {
      listObject?.map(item => {
        if (item?.id === values?.selectRole && name === 'selectRole') {
          setV(item?.name);
          setFieldValue(name, item?.id);
          if(selectedObject){
          setFieldValue(selectedObject,item)
          }
        } else {
          if (
            item?.id === values?.selectedResturant &&
            name === 'selectedResturant'
          ) {
            setV(item?.name);
            setFieldValue(name, item?.id);
          }
        }
      });
    }
    if (list) {
      setV(value);
      setFieldValue(name, value);
    }
    if (listObject && listObject?.length == 1) {
      setV(listObject[0].name);
      setFieldValue(name, listObject[0].id);
      if(selectedObject){
      setFieldValue(selectedObject,listObject[0])
      }
    }
  }, [listObject, value]);

  const DropDownList = () => {
    return (
      <View style={[styles.listView, {...androidZindex}]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}>
          {list &&
            list?.map((item, key) => (
              <Pressable
                key={key}
                onPress={() => {
                  setV(item);
                  setFieldValue(name, item);
                  setIsOpen(!isOpen);
                }}>
                <Text
                  style={{
                    marginTop: '3%',
                    fontFamily: fonts.medium,
                    fontSize: RFValue(14),
                  }}>
                  {item}
                </Text>
              </Pressable>
            ))}

          {listObject &&
            listObject?.map((item, key) => (
              <Pressable
                key={key}
                onPress={() => {
                  setV(item?.name);
                  setFieldValue(name, item?.id);
                  if(selectedObject){
                  setFieldValue(selectedObject,item)
                  }
                  setIsOpen(!isOpen);
                  if (onSelectItem) {
                    onSelectItem(item);
                    if (item?.name === 'custom') {
                      setFieldValue('permission', []);
                    } else {
                      setFieldValue('permission', item?.permissions);
                    }
                    if (values['isAction'] == 'false') {
                      setFieldValue('isAction', 'true');
                    }
                    console.log('presss');
                  }
                }}>
                <Text
                  style={{
                    marginTop: '3%',
                    fontFamily: fonts.semiBold,
                    fontSize: RFValue(14),
                    textTransform: 'capitalize',
                    color:colors.black
                  }}>
                  {item?.name}
                </Text>
              </Pressable>
            ))}
        </ScrollView>
      </View>
    );
  };

  return (
    <View
      style={{
        marginTop: '5%',
        overflow: 'visible',
        ...iosZindex,
      }}>
      <Text style={[styles.title, titleStyle]}>{title}</Text>
      <View>
        <Pressable onPress={() => setIsOpen(!isOpen)} style={styles.box}>
          <Text style={styles.title}>{v ? v : 'Select'}</Text>
          <SvgXml
            style={{transform: [{rotate: isOpen ? '180deg' : '0deg'}]}}
            xml={appImagesSvg?.dropDwonIcon}
          />
        </Pressable>
        {isOpen && <DropDownList />}
      </View>
    </View>
  );
};

export default ProductDropDown;

const styles = StyleSheet.create({
  title: {
    color:colors.black,
    fontFamily: fonts.semiBold,
    fontSize: RFValue(12),
    textTransform: 'capitalize',
  },
  box: {
    height: height / 20,
    width: '100%',
    marginTop: '3%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor:colors.colorB1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '5%',
  },
  listView: {
    marginTop: '5%',
    borderRadius: 12,
    borderWidth: 1,
    borderColor:colors.colorB1,
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 10,
    shadowColor: 'rgba(16, 24, 40, 0.1)',
    shadowOffset: {width: 2, height: 4},
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 10,
    position: 'absolute',
    top: height / 20,
    width: '100%',
    maxHeight: hp('30%'),
  },
});
