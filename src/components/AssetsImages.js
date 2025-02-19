import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {RFValue} from 'react-native-responsive-fontsize';
import {SvgXml} from 'react-native-svg';
import {useFormikContext} from 'formik';
import {fonts} from '../theme/fonts/fonts';
import {LaunchGallaryMultipleImages} from './LaunchCameraGallery';
import {appImagesSvg} from '../commons/AppImages';
import Url from '../api/Url';
import {rootStore} from '../stores/rootStore';
import FullImage from './FullImage';
import PopUp from './appPopUp/PopUp';
import {colors} from '../theme/colors';

let imageData = [];
const AssetsImages = ({
  images,
  onClickAssetImage,
  isPending,
  onDeleteImages,
  name,
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
  //   const {deleteAssetImage} = rootStore.authStore;
  const [imageArray, setImageArray] = useState([]);
  const [issetImage, setIssetImage] = useState([]);
  const [fullImage, setFullImage] = useState(false);
  const [imageUri, setImageUri] = useState('');
  const [isDelete, setIsDelete] = useState(false);
  const [staticDynamic, setStaticDynamic] = useState('dynamic');
  const [isId, setIsId] = useState(0);
  const [isImage, setIsImage] = useState('');

  console.log("imageArray--",imageArray,images)

  useEffect(() => {
    if (images?.length > 0) {
      setImageArray(null);
      imageData = images;
      if (issetImage?.length > 0) {
        const newImagesArray = issetImage?.concat(imageArray);
        setImageArray(newImagesArray);
      } else {
        setImageArray(images);
      }
    }
  }, []);

  useEffect(() => {
    onClickAssetImage(issetImage);
  }, [issetImage]);

  const handleOpenGallary = async () => {
    if (isPending != true) {
      const res = await LaunchGallaryMultipleImages(10);
      if (res?.assets) {
        const resAddData = res?.assets?.map((item, i) => {
          return {...item, id: Math.floor(Math.random() * 10000)};
        });
        if (issetImage?.length > 0) {
          const newData = resAddData?.concat(issetImage);
          setFieldValue(name, [...newData]);
          setIssetImage([...newData]);
        } else {
          setFieldValue(name, resAddData);
          setIssetImage(resAddData);
        }

        if (imageArray?.length > 0) {
          const imageMarge = resAddData?.concat(imageData);
          imageData = imageMarge;
          setImageArray([...imageMarge]);
        } else {
          imageData = resAddData;
          setImageArray(resAddData);
        }
      }
    }
  };

  const onDeleteImage = async id => {
    // const result = await deleteAssetImage(id);
    // if (result?.status === true) {
    //   if (issetImage?.length > 0) {
    //     const newImagesArray = issetImage?.concat(result?.data);
    //     setImageArray(newImagesArray);
    //     imageData = newImagesArray;
    //     setFieldValue(name, newImagesArray);
    //     onClickAssetImage(newImagesArray);
    //   } else {
    //     imageData = result?.data;
    //     setImageArray(result?.data);
    //     setFieldValue(name, result?.data);
    //     onClickAssetImage(result?.data);
    //   }
    //   onDeleteImages();
    // }
  };

  const onDeleteStaticImage = async (id, img) => {
    await imageData?.splice(id, 1);
    setImageArray(imageData);
    const issetImageDelete = await issetImage?.filter((item, id) => {
      return img?.id != item?.id;
    });

    setFieldValue(name, [...issetImageDelete]);
    setIssetImage(issetImageDelete);
    onClickAssetImage(issetImageDelete);
  };

  const getImgUri = img => {
    if (img?.file_name) {
      return img?.file_name;
    } else {
      return img;
    }
  };

  const Gallary = ({img, id}) => {
    return (
      <View style={{}}>
        {img?.uri ? (
          <TouchableOpacity
            onPress={() => {
              setImageUri(img?.uri);
              setFullImage(true);
            }}>
            <View style={{flex: 1, marginTop: 15}}>
              <Image
                style={{height: hp('10%'), width: wp('20%'), borderRadius: 8}}
                resizeMode="cover"
                source={{uri: img?.uri}}
              />
              <TouchableOpacity
                disabled={isPending}
                onPress={() => {
                  setIsDelete(true);
                  setStaticDynamic('static');
                  setIsId(id);
                  setIsImage(img);
                }}
                style={{
                  backgroundColor: 'white',
                  height: 17,
                  width: 17,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 14,
                  position: 'absolute',
                  right: 5,
                  top: 4,
                  opacity: isPending ? 0.5 : 1,
                }}>
                <SvgXml xml={appImagesSvg?.deleteCrossIcon} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              setImageUri(Url?.Image_UrlAsset + getImgUri(img));
              setFullImage(true);
            }}>
            <View style={{flex: 1, marginTop: 15}}>
              <Image
                style={{height: hp('10%'), width: wp('20%'), borderRadius: 8}}
                resizeMode="cover"
                source={{uri: Url?.Image_UrlAsset + getImgUri(img)}}
              />
              <TouchableOpacity
                disabled={isPending}
                onPress={() => {
                  setStaticDynamic('dynamic');
                  setIsDelete(true);
                  setIsId(img?.id);
                }}
                style={{
                  height: 25,
                  width: 25,
                  alignItems: 'flex-end',
                  justifyContent: 'flex-start',
                  borderRadius: 14,
                  position: 'absolute',
                  right: 5,
                  top: 4,
                  opacity: isPending ? 0.5 : 1,
                }}>
                <View
                  style={{
                    backgroundColor: 'white',
                    height: 17,
                    width: 17,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 14,

                    opacity: isPending ? 0.5 : 1,
                  }}>
                  <SvgXml xml={appImagesSvg?.deleteCrossIcon} />
                </View>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
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
            fontFamily: fonts.medium,
            fontSize: RFValue(14),
            color: colors.black,
          }}>
          Restaurant Photos
        </Text>
        <Text
          onPress={handleOpenGallary}
          style={{
            fontFamily: fonts.medium,
            fontSize: RFValue(11),
            color: colors.colorE1,
            opacity: isPending ? 0.6 : 1,
          }}>
          + Add Photos
        </Text>
      </View>
    );
  };

  return (
    <View
      style={{
        paddingHorizontal: '4%',
        paddingTop: '5%',
      }}>
      <Header />
      {imageArray?.length > 0 ? (
        <ScrollView
          bounces={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{}}
          horizontal>
          {imageArray?.map((img, idx) => {
            return (
              <View key={idx} style={{marginTop: 0, marginRight: 15}}>
                <Gallary img={img} id={idx} />
              </View>
            );
          })}
        </ScrollView>
      ) : (
        <TouchableOpacity
          disabled={isPending}
          style={{
            marginTop: hp('1.5%'),
            width: wp('20%'),
            height: hp('10%'),
            borderRadius: Platform.OS === 'ios' ? 8 : 4,
            borderWidth: 0.2,
            borderColor:colors.color8F,
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
            opacity: isPending ? 0.6 : 1,
          }}
          onPress={() => {
            handleOpenGallary();
          }}>
          <Text
            style={{
              fontFamily: fonts.medium,
              fontSize: RFValue(11),
              color: colors.colorE1,
            }}>
            + Add
          </Text>
          <Text
            style={{
              fontFamily: fonts.medium,
              fontSize: RFValue(11),
              color: colors.colorE1,
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
      <PopUp
      topIcon={true}
        visible={isDelete}
        onClose={() => setIsDelete(false)}
        title={'You are about to delete an image'}
        type={'delete'}
        text={'This will delete your image are your sure?'}
        onDelete={() => {
          staticDynamic === 'dynamic'
            ? onDeleteImage(isId)
            : onDeleteStaticImage(isId, isImage);
          setIsDelete(false);
        }}
      />
    </View>
  );
};

export default AssetsImages;
