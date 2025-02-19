import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
  Platform,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {RFValue} from 'react-native-responsive-fontsize';
import {SvgXml} from 'react-native-svg';
import {fonts} from '../../theme/fonts/fonts';
import {LaunchGallaryMultipleImages} from '../LaunchCameraGallery';
import {appImagesSvg} from '../../commons/AppImages';
import FullImage from '../FullImage';
import {colors} from '../../theme/colors';

let imageData = [];
const MenuImage = ({onClickMenuImage}) => {
  const [imageArray, setImageArray] = useState([]);
  const [fullImage, setFullImage] = useState(false);
  const [imageUri, setImageUri] = useState('');

  useEffect(() => {
    onClickMenuImage(imageArray);
  }, [imageArray]);

  const handleOpenGallary = async () => {
    const res = await LaunchGallaryMultipleImages(
      imageArray?.length ? 6 - imageArray?.length : 6,
    );
    if (res?.assets?.length <= 6) {
      const resAddData = res?.assets?.map((item, i) => {
        return {...item, id: Math.floor(Math.random() * 10000)};
      });
      // console.log("resAddData",resAddData,imageArray)
      if (imageArray?.length > 0) {
        const imageMarge = resAddData?.concat(imageData);
        if (imageMarge?.length <= 6) {
          imageData = imageMarge;
          setImageArray([...imageMarge]);
        } else {
          console.log('You can not select more than six images');
          Alert.alert('', 'You can not select more than six images.');
        }
      } else {
        imageData = resAddData;
        setImageArray(resAddData);
      }
    } else {
      console.log('You can not select more than six images');
      Alert.alert('', 'You can not select more than six images.');
    }
  };

  const onDeleteStaticImage = async id => {
    await imageArray?.splice(id, 1);
    setImageArray([...imageArray]);
    await imageData?.splice(id, 1);
  };

  const renderItem = ({item, index}) => {
    return (
      <View style={{padding: 10}}>
        <TouchableOpacity
          onPress={() => {
            setImageUri(item?.uri);
            setFullImage(true);
          }}>
          <View style={{flex: 1, marginTop: 12}}>
            <Image
              style={{height: hp('12%'), width: wp('25%'),
               borderRadius: 10,
               borderWidth:1,
              borderColor: colors.colorD9,}}
              resizeMode="cover"
              source={{uri: item?.uri}}
            />
            <TouchableOpacity
              onPress={() => {
                onDeleteStaticImage(index);
              }}
              style={{
                backgroundColor:colors.white,
                height: 17,
                width: 17,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 14,
                position: 'absolute',
                right: 5,
                top: 4,
              }}>
              <SvgXml xml={appImagesSvg?.deleteCrossIcon} />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const Header = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontFamily: fonts.semiBold,
            fontSize: RFValue(12),
            color: colors.black,
          }}>
          Menu Photos
        </Text>
        {imageArray?.length < 6 ? (
          <Text
            onPress={handleOpenGallary}
            style={{
              fontFamily: fonts.semiBold,
              fontSize: RFValue(12),
              color: colors.colorE1,
            }}>
            <Text style={{fontSize: RFValue(17)}}>+</Text> Add Photos
          </Text>
        ) : null}
      </View>
    );
  };

  return (
    <View
      style={{
        paddingTop: '5%',
      }}>
      <Header />
      {imageArray?.length > 0 ? (
        <View style={{flex: 1}}>
          <FlatList
            nestedScrollEnabled={true}
            contentContainerStyle={{paddingBottom: hp(1)}}
            showsVerticalScrollIndicator={false}
            bounces={false}
            numColumns={3}
            data={imageArray}
            renderItem={renderItem}
            keyExtractor={item => item?.id}
          />
        </View>
      ) : (
        <TouchableOpacity
          style={{
            height: hp('12%'),
            width: wp('25%'),
            marginTop: hp('1.5%'),
            borderRadius: 10,
            borderWidth:1,
            borderColor: colors.colorD9,
            backgroundColor: colors.white,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            handleOpenGallary();
          }}>
          <Text
            style={{
              fontFamily: fonts.semiBold,
              fontSize: RFValue(12),
              color: colors.colorEF,
            }}>
            <Text style={{ fontSize: RFValue(18)}}>+</Text> 
           {' '} Add
          </Text>
          <Text
            style={{
              fontFamily: fonts.semiBold,
              fontSize: RFValue(12),
              color: colors.colorEF,
            }}>
            Photos
          </Text>
        </TouchableOpacity>
      )}
      <FullImage
        uri={imageUri}
        visible={fullImage}
        onRequestClose={() => setFullImage(false)}
      />
    </View>
  );
};

export default MenuImage;
