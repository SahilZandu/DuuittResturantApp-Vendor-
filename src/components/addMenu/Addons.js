import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Platform, TouchableOpacity} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {useFormikContext} from 'formik';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {SvgXml} from 'react-native-svg';
import {appImagesSvg} from '../../commons/AppImages';
import { fonts } from '../../theme/fonts/fonts';
import AddItem from '../cta/AddItem';
import ProductInput from './ProductInput';
import CheckOutButton from './CheckOutButton';
import Spacer from '../../halpers/Spacer';
import FieldErrorMessage from '../FieldErrorMessage';
import { colors } from '../../theme/colors';


let addIndex = 0;
let itemIndex = 0;

const Addons = ({name, value,addonsValidation,eV}) => {
  const {values, handleChange, setFieldValue} = useFormikContext();
  const [addons, setAddons] = useState(value);
  const [isShow, setIsShow] = useState(false);
  const [update, setUpdate] = useState(false);
  const [maxLimitError ,setMaxLimitError]=useState(null)
  const [focusMaxLimit ,setFocusMaxLimit]=useState(false)
  const initialAddons = {
    id: itemIndex,
    // title: '',
    group:'',
    // max_selection :'',
    max_selection :0,
    // priceable: 0,
    is_price_related :false,
    // addonprod: [
      addon: [
      {
        name: '',
        price:0,
        id: addIndex,
      },
    ],
  };
  // console.log('initialAddons', initialAddons, addons);

  console.log('values Addons', values,addons);
  useEffect(() => {
    setAddons(values[name]);
    
  }, [values]);

  useEffect(()=>{
    if(value?.length > 0){
      setIsShow(true)
     setFieldValue(name ,value)
    }
  },[value])

  const validateAddons = (addons) => {
    let errors = {};
    
    addons?.forEach((addon, index) => {
      if (!addon?.group?.trim()) {
        errors[`addons[${index}].group`] = 'Title is required';
      }


      if (!addon?.max_selection?.toString()?.trim() || addon?.max_selection <= 0) {
        errors[`max_selection_${index}`] = 'Maximum selection limit is required';
      } else if (Number(addon?.max_selection) > addon?.addon?.length) {
        errors[`max_selection_${index}`] = 'Maximum selection limit is too high';
      }


      addon?.addon?.forEach((value, valueIndex) => {
        if (!value?.name?.trim()) {
          errors[`addons[${index}].addon[${valueIndex}].name`] = 'Name is required';
        }
        if (addon?.is_price_related == true && !value?.price?.toString().trim()) {
          errors[`addons[${index}].addon[${valueIndex}].price`] = 'Selling price is required';
        }
      });
    });
    var size = Object.keys(errors).length;
      console.log("errors---",errors,size,) 
      setMaxLimitError(errors)
    if(size == 0){
      addonsValidation(false)
    }else{
      addonsValidation(true)
    }
    
    return errors;
   
  };



  useEffect(()=>{
    validateAddons(addons);
  },[addons,update])


  const Title = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={styles.title}>Addons</Text>
        {addons?.length < 3 && (
          <AddItem
            title={'Add Addon Group'}
            onAdd={() => {
              itemIndex = itemIndex + 1;
              const add = addons;
              add.push(initialAddons);
              setFieldValue(name, add);
              setAddons(add);
              setUpdate(!update);
              setIsShow(true);
            }}
          />
        )}
      </View>
    );
  };


  const onSwitchValue = (value,key) => {
    // console.log('Addons---', addons,value,key);
    addons?.map((item, i) => {
      if (key === i ) {
        if (item?.is_price_related == false) {
          item.is_price_related = true;
        } else {
          item.is_price_related = false;
          item?.addon?.map((value,index)=>{
            value.price= 0
          })
        }

      }
      return {...item};
    });
    setAddons([...addons]);
    // console.log('Addons---', addons);
  };


  // const onSwitchValue = (k, key) => {
  //   addons?.map((item, i) => {
  //     if (key === i) {
  //       if (item?.addonprod[k]?.priceable == 0) {
  //         item.addonprod[k].priceable = 1;
  //       } else {
  //         item.addonprod[k].priceable = 0;
  //       }
  //     }

  //     return {...item};
  //   });
  //   setAddons([...addons]);
  //   // console.log('Addons---', addons);
  // };

  return (
    <View style={{marginTop: '5%'}}>
      <Title />
      {isShow && (
        <View>
          {addons?.map((item, key) => (
            <View key={item?.id}>
              <ProductInput
               editValue={eV}
                isDelete={true}
                name={`${name}[${key}].group`}
                title={`Add Group Title ${key + 1}`}
                value={item?.group}
                placeholder={'Enter Group title'}
                onChangeText={handleChange(`${name}[${key}].group`)}
                onDeleteRow={() => {
                  addons?.splice(key, 1);
                  setAddons([...addons]);
                }}
              />
                  <CheckOutButton
                    mainStyle={{
                      marginHorizontal: 0,
                      marginTop:  hp('1.5%'),
                      marginLeft: Platform.OS == 'ios' ? wp(-1.5) : wp(-0.3),
                    }}
                    value={item?.is_price_related}
                    onValueChange={() => {
                      onSwitchValue(item, key);
                    }}
                    TextName={'Priceable'}
                  />

                 

              {item?.addon?.map((i, k) => (
                <View key={i?.id}>
                  {/* <CheckOutButton
                    mainStyle={{
                      marginHorizontal: 0,
                      marginTop: k == 0 || k == 1 ? hp('2%') : hp('0%'),
                      marginLeft: Platform.OS == 'ios' ? wp(-1.5) : wp(-0.3),
                    }}
                    value={item?.addonprod[k]?.priceable}
                    onValueChange={() => {
                      onSwitchValue(k, key);
                    }}
                    TextName={'Priceable'}
                  /> */}

                  {/* <ProductType
                    title={'Item type'}
                    name={`${name}[${key}].addonprod[${k}].itemType`}
                    value={item?.addonprod[k]?.itemType}
                  /> */}
                  <Spacer space={k > 1 ? '-3%':0}/>
                  <ProductInput
                   editValue={eV}
                    name={`${name}[${key}].addon[${k}].name`}
                    title={'Addon Name'}
                    value={item?.addon[k]?.name}
                    placeholder={'Enter Addon name'}
                    onChangeText={text => {
                      handleChange(`${name}[${key}].addon[${k}].name`)(text);
                    }}
                  />
                  {/* {item?.addonprod[k]?.priceable == 1 && ( */}
                 { item?.is_price_related == true && (
                    <ProductInput
                      editValue={eV}
                      keyboardType="number-pad"
                      prefix={'₹'}
                      name={`${name}[${key}].addon[${k}].price`}
                      title={'Selling Price'}
                      value={item?.addon[k]?.price?.toString()}
                      placeholder={'Enter Selling Price'}
                      onChangeText={text => {
                        handleChange(
                          `${name}[${key}].addon[${k}].price`,
                        )(text);
                      }}
                    />
                  )}
                  {k !== 0 && (
                  <View style={styles.deleteTouchVariant}>
                    <TouchableOpacity
                    hitSlop={{top:15,bottom:15,left:15,right:15}}
                      activeOpacity={0.8}
                      style={styles.touchView}
                      onPress={() => {
                        let remove = addons;
                        remove[key]?.addon?.splice(k, 1);
                        setFieldValue(name, remove);
                        setAddons(remove);
                        setUpdate(!update);
                        console.log('remove=======', remove);
                      }}>
                      <SvgXml xml={appImagesSvg?.deleteIcon} />
                      <Text style={styles.deleteText}>Delete</Text>
                    </TouchableOpacity>
                    </View>
                  )}
                  <View
                    style={[
                      styles.underLineView,
                      // {marginBottom: k == 0 ? hp('0.5%') : hp('2%')},
                    ]}
                  />
                </View>
              ))}


             <ProductInput
               editValue={eV}
               keyboardType="number-pad"
                name={`${name}[${key}].max_selection`}
                title={'Maximun selection limit'}
                value={item?.max_selection?.toString()}
                placeholder={'Enter maximum limit'}
                onChangeText={handleChange(`${name}[${key}].max_selection`)}
                onFocus={() =>{console.log("focus received" ),setFocusMaxLimit(true)} }
                onBlur={() => console.log("focus lost") }
              />

              {(maxLimitError[`max_selection_${key}`] && focusMaxLimit == true) && (
                 <FieldErrorMessage error={maxLimitError[`max_selection_${key}`]} visible={true} />
            // <Text style={styles.errorText}>{maxLimitError[`max_selection_${key}`]}</Text>
                     )}
                
              <View
                style={{
                  marginTop : '4%',
                  alignItems: 'flex-start',
                }}>
                <AddItem
                  title={'Add More'}
                  onAdd={() => {
                    addIndex = addIndex + 1;
                    const newFeild = {
                      name: '',
                      price:0,
                      // itemType:  values?.itemType ? values?.itemType : 'veg',
                      // priceable: 0,
                      id: addIndex,
                    };

                    let add = addons;
                    add[key]?.addon?.push(newFeild);
                    setAddons(add);
                    setUpdate(!update);
                  }}
                />
              </View>

              <View style={[styles.underLineView, {marginTop: hp('2%')}]} />
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default Addons;

const styles = StyleSheet.create({
  title: {
    color: colors.color33,
    fontFamily: fonts.semiBold,
    fontSize: RFValue(17),
  },
  deleteTouchVariant: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: hp('2%'),
    padding: 10,
  },
  touchView:{
    flexDirection: 'row',alignSelf:'center'
  },
  deleteText: {
    color: colors.colorCB,
    fontFamily: fonts.semiBold,
    fontSize: RFValue(12),
    marginLeft: wp('2%'),
  },
  underLineView: {
    marginHorizontal: hp('-4%'),
    marginTop: hp('1%'),
    height: hp('0.2%'),
    backgroundColor: colors.black,
    opacity: 0.1,
  },
});
