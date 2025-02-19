import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Pressable,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
  Image,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {SvgXml} from 'react-native-svg';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useFormikContext} from 'formik';
// import FastImage from 'react-native-fast-image';
import { fonts } from '../../theme/fonts/fonts';
import { colors } from '../../theme/colors';

const icon = `<svg xmlns="http://www.w3.org/2000/svg" width="10" height="6" viewBox="0 0 10 6" fill="none">
<path id="Vector" fill-rule="evenodd" clip-rule="evenodd" d="M5.54674 5.6563C5.4061 5.7969 5.21537 5.87589 5.01649 5.87589C4.81762 5.87589 4.62689 5.7969 4.48624 5.6563L0.243493 1.41355C0.17186 1.34437 0.114723 1.26161 0.0754165 1.1701C0.0361098 1.0786 0.01542 0.980186 0.0145547 0.880602C0.0136893 0.781017 0.0326658 0.682258 0.0703765 0.590085C0.108087 0.497913 0.163777 0.414174 0.234197 0.343754C0.304616 0.273335 0.388355 0.217645 0.480527 0.179934C0.572699 0.142224 0.671459 0.123247 0.771044 0.124113C0.870628 0.124978 0.969043 0.145668 1.06055 0.184975C1.15205 0.224281 1.23481 0.281418 1.30399 0.35305L5.01649 4.06555L8.72899 0.35305C8.87045 0.216432 9.0599 0.140836 9.25655 0.142545C9.45319 0.144254 9.6413 0.22313 9.78036 0.362186C9.91941 0.501242 9.99829 0.689352 10 0.886C10.0017 1.08265 9.92611 1.2721 9.78949 1.41355L5.54674 5.6563Z" fill="black"/>
</svg>`;

const {height} = Dimensions.get('window');

const iosZindex = Platform.OS == 'ios' ? {zIndex: 1} : {};
const androidZindex = Platform.OS == 'android' ? {zIndex: 1} : {};

const DishTypeDropDown = ({
  title,
  name,
  list,
  value,
  titleStyle,
  listObject,
  onSelectItem,
}) => {
  const {setFieldValue, values} = useFormikContext();
  const [isOpen, setIsOpen] = useState(false);
  const [v, setV] = useState(values[name]);

  console.log('v---',v,values[name]);

  const DropDownList = () => {
    return (
      <View style={[styles.listView, {...androidZindex}]}>
        <ScrollView 
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}>
          {list &&
            list?.map((item, key) => (
              <Pressable
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: '3%',
                }}
                key={key}
                onPress={() => {
                  setV(item?._id);
                  setFieldValue(name, item?._id);
                  setFieldValue('dishName', item?.name);
                  // setFieldValue('description', item?.description);
                  // setFieldValue('productType',item?.product_type);
                  setIsOpen(!isOpen);
                }}>
                {/* <FastImage
                  style={{height: hp('3%'), width: wp('8%'), borderRadius: 6}}
                  resizeMode={FastImage.resizeMode.stretch}
                  source={
                    item.image
                  //   {
                  //   uri:
                  //     'https://devserver.foodlemon.com/storage/dishes/image/' +
                  //     item?.image,
                  // }
                }
                /> */}
                <Text
                  style={{
                    // marginTop: '3%',
                    fontFamily: fonts.medium,
                    fontSize: RFValue(14),
                  }}>
                  {'  '}
                  {item?.name}
                </Text>
              </Pressable>
            ))}
        </ScrollView>
      </View>
    );
  };

  const getDishTitle = i => {
    // console.log("i---",i);
    if (list) {
      let f = list?.filter(e => {
        console.log("i---",i,e?._id, e?._id == i);
        return e?._id == i;
      });
      console.log("f---",f,f[0]?.name);
      return f ? f[0]?.name : i;
    } else {
      return i;
    }
  };

  return (
    <View style={{marginTop: '5%', overflow: 'visible', ...iosZindex}}>
      <Text style={[styles.title, titleStyle]}>{title}</Text>
      <View>
        <Pressable onPress={() => setIsOpen(!isOpen)} style={styles.box}>
          <Text style={styles.title}>{v ? getDishTitle(v) : 'Select'}</Text>
          <SvgXml
            style={{transform: [{rotate: isOpen ? '180deg' : '0deg'}]}}
            xml={icon}
          />
        </Pressable>
        {isOpen && <DropDownList />}
      </View>
    </View>
  );
};

export default DishTypeDropDown;

const styles = StyleSheet.create({
  title: {
    color:colors.black,
    fontFamily: fonts.semiBold,
    fontSize: RFValue(12),
  },
  box: {
    height: height / 20,
    width: '100%',
    marginTop: '3%',
    borderRadius: 50,
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
    backgroundColor:colors.white,
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
    zIndex: Platform.OS == 'ios' ? 0 : 1,
    maxHeight: hp('30%'),
  },
});
