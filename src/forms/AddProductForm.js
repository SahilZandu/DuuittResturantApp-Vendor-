import React, {useEffect, useState, useCallback, useRef} from 'react';
import {View, KeyboardAvoidingView} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import RBSheet from '@lunalee/react-native-raw-bottom-sheet';
import {Formik, useFormikContext} from 'formik';
import PickUpdateActions from '../components/PickUpdateActions';
import FieldInput from '../components/FieldInput';
import InputFieldMultiLine from '../components/InputFieldMultiLine';
import AppInputScroll from '../halpers/AppInputScroll';
import {dishTypeArray} from '../stores/DummyData/Menu';
import DishTypeDropDown from '../components/addMenu/DishTypeDropDown';
import ProductType from '../components/addMenu/ProductType';
import SelectTag from '../components/addMenu/SelectTag';
import ProductTiming from '../components/addMenu/ProductTiming';
import Variants from '../components/addMenu/Variants';
import Addons from '../components/addMenu/Addons';
import AddPhotoComp from '../components/AddPhotoComp';
import AddPhotoShowComp from '../components/AddPhotoShowComp';
import CTA from '../components/cta/CTA';
import Spacer from '../halpers/Spacer';
import {addProductValidations} from './formsValidation/productValidations';
import {rootStore} from '../stores/rootStore';
import {useFocusEffect} from '@react-navigation/native';
import handleAndroidBackButton from '../halpers/handleAndroidBackButton';

let addProdoctData = [];
let combinationArray = [];

export default function AddProductForm({navigation}) {
  const {addProduct, allDishItem} = rootStore.menuStore;
  const {appUser} = rootStore.commonStore;
  const refRBSheet = useRef(null);
  const [image, setImage] = useState('');
  const [dishTypes, setDishTypes] = useState(
    allDishItem?.length > 0 ? allDishItem : [],
  );
  // const [dishTypes, setDishTypes] = useState(
  //   allDishItem?.length > 0 ?  allDishItem :
  //   dishTypeArray,
  // );
  const [variantsButton, setVariantsButton] = useState(true);
  const [addonsButton, setAddonsButton] = useState(true);
  const [imageValidations, setImageValidations] = useState('');
  const [loading, setLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({
    image: '',
    dishName: '',
    dishType: '',
    sellingPrice: '',
    itemType: 'veg',
    description: '',
    recommended: 1,
    tag: null,
    time: 'full_time',
    timing: [],
    product_id: '',
    variants: [],
    addons: [],
    foodItemId: '',
    productType: 'simple'
  });

  console.log('appUser==', appUser);

  const onChangeImage = uri => {
    setImage(uri);
    refRBSheet.current.close();
  };

  const onVariantsValidation = value => {
    // console.log('value---', value);
    setVariantsButton(value);
  };

  const onAddonsValidation = value => {
    // console.log('value---onAddonsValidation', value);
    setAddonsButton(value);
  };

  useFocusEffect(
    useCallback(() => {
      handleAndroidBackButton(navigation);
    }, []),
  );

  const handleSaveAndNext = async values => {
    console.log('values---', values);
    addProdoctData = [];
    combinationArray = [];

    values?.variants?.forEach((item, i) => {
      const newData = {
        name: item.group,
        groups: item?.variant?.map(itemData => itemData.name),
      };
      addProdoctData.push(newData);
    });

    // console.log('addProdoctData--', addProdoctData);


    if (addProdoctData?.length > 1) {
      addProdoctData[0]?.groups?.map((data, ix) => {
        addProdoctData[1]?.groups?.map((dataItem, ixx) => {
          const newItem = {
            first_gp: data,
            second_gp: dataItem,
            price: '',
          };
          combinationArray.push(newItem);
        });
      });
    } else {
      if (addProdoctData?.length > 0) {
        addProdoctData[0]?.groups?.map((data, ix) => {
          const newItem = {
            first_gp: data,
            second_gp: '',
            price: '',
          };
          combinationArray.push(newItem);
        });
      }
    }

    if (addProdoctData?.length > 0) {
      // console.log('combinationArray--', combinationArray);
      navigation.navigate('addVariantPrice', {
        data: values,
        combinationArray: combinationArray,
        addProdoctData: addProdoctData,
        type:'add'
      });
    } else {
      console.log('handleSaveAndNext--', values);
      await addProduct(values, appUser, handleLoading, navigation);
    }
    // console.log("handleSaveAndNext--",values)
    // await addProduct(values, appUser, handleLoading, navigation);
  };

  const handleLoading = v => {
    setLoading(v);
  };

  const AddProductBtn = () => {
    const {dirty, isValid, values} = useFormikContext();
    console.log('dirty', dirty, values);
    console.log('values---', values);
    return (
      <CTA
        width={wp('90%')}
        title={'Submit'}
        disable={!(dirty && isValid) || variantsButton || addonsButton}
        onPress={() => handleSaveAndNext(values)}
        loading={loading}
      />
    );
  };

  const ProductImageRender = () => {
    const {dirty, isValid, values, errors} = useFormikContext();
    // console.log('dirty', dirty, isValid);
    // console.log('values---', values, errors);
    if (errors?.image && errors?.image?.length > 0) {
      setImageValidations(errors?.image);
    } else {
      setImageValidations('');
    }

    return (
      <>
        {image?.length > 0 ? (
          <AddPhotoShowComp
            // onPress={() => {
            //   refRBSheet.current.open();
            // }}
            onPressEdit={() => {
              refRBSheet.current.open();
            }}
            image={image}
          />
        ) : (
          <AddPhotoComp
            onPress={() => {
              refRBSheet.current.open();
            }}
            imageValidations={imageValidations}
          />
        )}
      </>
    );
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={addProductValidations()}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <AppInputScroll
          Pb={'20%'}
          padding={true}
          keyboardShouldPersistTaps={'handled'}>
          <View style={{flex: 1, marginTop: '5%', marginHorizontal: 20}}>
            <ProductImageRender />
            <View>
              <DishTypeDropDown
                name={'dishType'}
                title={'Select dish type*'}
                value={initialValues.dishType}
                list={dishTypes}
              />
              <FieldInput
                inputLabel={'Dish Name*'}
                placeholder={'Enter dish name'}
                name={'dishName'}
              />
              <FieldInput
                inputLabel={'Selling Price*'}
                placeholder={'Enter dish selling price'}
                name={'sellingPrice'}
                keyboardType={'numeric'}
                maxLength={4}
              />
              <ProductType
                title={'Item type*'}
                name={'itemType'}
                value={initialValues.itemType}
              />
              <InputFieldMultiLine
                inputLabel={'Description'}
                placeholder={'Enter Description'}
                name={'description'}
              />
              <SelectTag
                tagTitle={'Select Tags'}
                recommendedTitle={'Recommended'}
                tagvalue={initialValues.tag}
                recommendedvalue={initialValues.recommended}
              />
              {/* <ProductTiming
                name={'time'}
                value={initialValues.time}
                title={'Dish Timing'}
                nameArray={'timing'}
                valueArray={initialValues.timing}
              /> */}
            </View>
            <Variants
              name={'variants'}
              value={initialValues.variants}
              variantsValidation={onVariantsValidation}
              eV={false}
            />
            <Addons
              name={'addons'}
              value={initialValues.addons}
              addonsValidation={onAddonsValidation}
              eV={false}
            />
            <Spacer space={'15%'} />
            <AddProductBtn />
            <RBSheet
              height={hp('22%')}
              ref={refRBSheet}
              closeOnDragDown={true}
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
              <PickUpdateActions name={'image'} onSelectUri={onChangeImage} />
            </RBSheet>
          </View>
        </AppInputScroll>
      </KeyboardAvoidingView>
    </Formik>
  );
}
