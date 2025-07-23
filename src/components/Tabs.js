

import react, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Pressable,
  Dimensions,
  Image
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { SvgXml } from 'react-native-svg';
import { appImages, appImagesSvg } from '../commons/AppImages';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts/fonts';


const size = Dimensions.get('window').height;

export default function Tabs({ tabs, tabPress, isRating, isCount, type }) {
  const scrollViewRef = useRef();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleTabPress = (index, text) => {
    setSelectedIndex(index);
    if (tabPress) tabPress(text);
  };

  useEffect(() => {
    setSelectedIndex(0);
  },[tabs])

  const onSetIndex = (type) => {
    switch (type) {
      case 'Preparing':
        return 1;
      case 'Picked Up':
        return 2;
      case 'Ready':
        return 3;
      default:
        return 0;
    }

  }
  useEffect(() => {
    if (type) {
      setSelectedIndex(onSetIndex(type));
      if (tabPress) {
        tabPress(type)
      };
    }
  }, [type])


  const TabButton = ({
    index,
    text,
    selectedIndex,
    onPress,
    count,
  }) => {
    const isSelected = index === selectedIndex;

    return (
      <Pressable
        style={[
          styles.button,
          isSelected && styles.selectedButton,
        ]}
        onPress={() => {
          onPress(index, text);
        }}>
        <Text
          style={[
            styles.tabtext,
            {
              color: !isSelected ? colors.black : colors.main,
              fontSize: isCount ? RFValue(12) : RFValue(13),
              marginLeft: isRating ? index != 0 ? size / 130 : 0 : 0,
              textTransform: 'capitalize'
            },
          ]}>
          {text}
          {isCount ? ' (' + count + ')' : ''}
        </Text>
        {isSelected && (
          <SvgXml
            width={16} height={16}
            style={{ marginLeft: 2 }}
            xml={appImagesSvg.greenCrossIcon}
          />
        )}
      </Pressable>
    );
  };



  return (
    <View style={{ marginTop: '3%', justifyContent: 'center' }}>
      <ScrollView
        bounces={false}
        ref={scrollViewRef}
        style={{ alignSelf: 'center', height: hp("6%"), width: wp("92%") }}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          flexDirection: 'row', // Ensure horizontal alignment
          alignItems: 'center',
          minWidth: tabs?.length * 100, // Dynamically handle minimum width
        }}
        horizontal >
        {tabs?.map((tab, idx) => (
          <TabButton
            index={idx}
            text={tab.text}
            count={tab?.count}
            iconName={tab.iconName}
            selectedIndex={selectedIndex}
            onPress={handleTabPress}
            key={'tab-' + idx}
          />
        ))}
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  tabtext: {
    fontSize: RFValue(13),
    fontFamily: fonts.medium,
  },
  button: {
    flexDirection: 'row',
    height: hp('5%'),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    marginHorizontal: 3,
    borderWidth: 1,
    borderColor: colors.colorD9,
    paddingHorizontal: wp('4%'), // Ensure padding makes buttons wide
  },

  selectedButton: {
    backgroundColor: colors.colorD6,
    borderColor: colors.main,
  },
});
