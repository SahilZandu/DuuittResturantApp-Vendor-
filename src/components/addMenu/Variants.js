import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {useFormikContext} from 'formik';
import {SvgXml} from 'react-native-svg';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import { appImagesSvg} from '../../commons/AppImages';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { fonts } from '../../theme/fonts/fonts';
import AddItem from '../cta/AddItem';
import ProductInput from './ProductInput';


let addIndexs = 0;
let itemIndexs = 0;

const Variants = ({name, value,variantsValidation,eV}) => {
  const {values, handleChange, setFieldValue} = useFormikContext();
  const [variant, setVarinat] = useState(value);
  const [isShow, setIsShow] = useState(false);
  const [update, setUpdate] = useState(false);

  const initialVarient = {
    id: itemIndexs,
    // title: '',
    group: '',
    // values: [{value: '', id: addIndexs}],
    variant: [{name: '', id: addIndexs}],
  };
  // console.log('initialVarient', value,name );

  useEffect(() => {
    if(values[name]?.length > 0){
    setVarinat(values[name]); 
    }
  }, [values]);

  useEffect(()=>{
    if(value?.length > 0){
      setIsShow(true)
     setFieldValue(name ,value)
    }
  },[value])

  useEffect(()=>{
   
for (const item of variant) {
  // Check if title is empty
  if (item?.group === '') {
    variantsValidation(true);
    return; // Exit the loop if any title is empty
  }

  // Loop through values
  for (const valueItem of item?.variant) {
    // Check if value is empty
    if (valueItem?.name?.trim() === '') {
      variantsValidation(true);
      return; // Exit the loop if any value is empty
    }
  }
}

// If no empty title or value found, clear error and set validation to false
variantsValidation(false);
    
  },[variant,update])


  const Title = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={styles.title}>Item Variants</Text>
        {variant?.length < 2 && (
          <AddItem
            title={'Add Variant'}
            onAdd={() => {
              itemIndexs = itemIndexs + 1;
              const add = variant;
              add.push(initialVarient);
              setFieldValue(name, add);
              setVarinat(add);
              setUpdate(!update);
              setIsShow(true);
            }}
          />
        )}
      </View>
    );
  };

  // const handleInputChange = (text) => {
  //   // Check if the input is not null or empty
  //   if (!text.trim()) {
  //     setError('Field cannot be empty');
  //   } else {
  //     setError(null);
  //   }
  
  //   // Call the onChangeText prop to update the formik values
  //   handleChange(text);
  // };



  return (
    <View style={{marginTop: '5%'}}>
      <Title />
      {isShow && (
        <View>
          {variant?.map((item, key) => {
              // console.log("item---",item)
            return (
            <View key={item?._id ?? item?.id }>
              <View style={styles.variantDeleteView}>
                <Text style={styles.variantText}>Variant {key + 1}</Text>
                <TouchableOpacity
                  onPress={() => {
                    variant?.splice(key, 1);
                    setVarinat([...variant]);
                    setUpdate(!update)
                  }}
                  activeOpacity={0.8}
                  style={styles.deleteTouchVariant}>
                  <SvgXml xml={appImagesSvg?.deleteIcon} />
                  <Text style={styles.deleteText}>Delete</Text>
                </TouchableOpacity>
              </View>

              <ProductInput
                editValue={eV}
                name={`${name}[${key}].group`}
                title={'Group'}
                value={item?.group}
                placeholder={'Enter variant group'}
                onChangeText={text => {
                  // console.log("text--==",text)
                  const trimmedText = text.trim();
                 // Trim the text
                  handleChange(`${name}[${key}].group`)(trimmedText); // Pass trimmed text to handleChange
                }}
                // onChangeText={text => {handleChange(`${name}[${key}].title`)(text?.trim())}}
              />

              {item?.variant?.map((i, k) => {
              return(
                <View key={i?.id}>
                  <ProductInput
                    editValue={eV}
                    name={`${name}[${key}].variant[${k}].name`}
                    title={k == 0 ? 'Values' : ''}
                    value={item?.variant[k]?.name}
                    placeholder={'Enter variant name'}
                    onChangeText={text => {
                      handleChange(`${name}[${key}].variant[${k}].name`)(text?.trim());
                    }}
                    isDelete={k != 0 ? true : false}
                    onDeleteRow={async () => {
                      let remove = variant;
                      remove[key]?.variant?.splice(k, 1);
                      // console.log('remove=======', remove);
                      setFieldValue(name, remove);
                      setVarinat([...remove]);
                    }}
                  />
                </View>
              )}
              )}
              <View style={{marginTop: '4%', alignItems: 'flex-end'}}>
                <AddItem
                  title={'Add More'}
                  onAdd={() => {
                    addIndexs = Math.floor((Math.random() * 100) + 1);
                    const newFeild = {
                      name: '',
                      id: addIndexs,
                    };

                    let add = variant;
                    add[key]?.variant?.push(newFeild);
                    setVarinat(add);
                    setUpdate(!update);
                  }}
                />
              </View>
              <View
              style={styles.underLineView}
            />
            </View>
            )
          }
          )}
        </View>
      )}
    </View>
  );
};

export default Variants;

const styles = StyleSheet.create({
  title: {
    color: '#333333',
    fontFamily: fonts.semiBold,
    fontSize: RFValue(17),
  },
  variantDeleteView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '5%',
  },
  variantText: {
    flex: 1,
    color: '#1D721E',
    fontFamily: fonts.semiBold,
    fontSize: RFValue(16),
  },
  deleteTouchVariant: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  deleteText: {
    color: '#CB2F2F',
    fontFamily: fonts.semiBold,
    fontSize: RFValue(12),
    marginLeft: widthPercentageToDP('2%'),
  },
  underLineView:{
    marginHorizontal:hp('-4%'),
    marginTop:hp('2%'),
    height: hp('0.2%'),
    backgroundColor: '#000000',
    opacity: 0.1,
  }
});
