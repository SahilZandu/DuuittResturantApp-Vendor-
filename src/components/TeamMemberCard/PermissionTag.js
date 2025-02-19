import React, {useEffect, useMemo, useState} from 'react';
import {Text, View, Pressable, StyleSheet, Alert} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {SvgXml} from 'react-native-svg';
import {useFormikContext} from 'formik';
import {appImages, appImagesSvg} from '../../commons/AppImages';
import {fonts} from '../../theme/fonts/fonts';
import {colors} from '../../theme/colors';

const PermissionTag = ({
  name,
  value,
  title,
  isAssign_Permissions,
  list,
  onClickItem,
  isSectedAllValue,
}) => {
  const {setFieldValue, values} = useFormikContext();
  const [v, setV] = useState(value);
  const [selectAssign_Permissions, setAssign_Permissions] = useState([]);
  const [allSelected, setAllSelected] = useState(
    isSectedAllValue ? isSectedAllValue : false,
  );

  const onRefershdata = async list => {
    const isValid = list?.filter(
      item => item?.active == true
    );
    if (isValid?.length > 0) {
      setFieldValue(name, isValid);
    } else {
      setFieldValue(name, []);
    }
  };

  useEffect(() => {
    if (list) {
      setAssign_Permissions(list);
      onRefershdata(list);
    }
  }, [list]);

  useEffect(() => {
    setAllSelected(isSectedAllValue);
  }, [isSectedAllValue]);

  const onTouchData = async data => {
    await selectAssign_Permissions?.map((item, i) => {
      if (item?.name == data?.name) {
        if (item?.active == false) {
          item.active = true;
          setV(data);
        } else {
          item.active = false;
          setV({});
        }
      }
      if (values['isAction'] == 'false') {
        setFieldValue('isAction', 'true');
      }
      return {...item};
    });

    setAssign_Permissions(selectAssign_Permissions);
    console.log("selectAssign_Permissions",selectAssign_Permissions)
    const isValid = selectAssign_Permissions?.filter(
      item => item?.active == true
    );

    if (isValid?.length > 0) {
      setFieldValue(name, isValid);
    } else {
      setFieldValue(name, []);
    }
    if (onClickItem) {
      if (isValid?.length == selectAssign_Permissions?.length) {
        onClickItem(isValid);
        setFieldValue('selectRole', 1);
        setAllSelected(true);
      } else {
        onClickItem(isValid);
        setFieldValue('selectRole', 4);
        setAllSelected(false);
      }
    }
  };

  const onAllSelect = async () => {
    setAllSelected(!allSelected);
    if (!allSelected) {
      await selectAssign_Permissions?.map(item => {
        item.active = true;
        return {...item};
      });
      onClickItem(selectAssign_Permissions);
      setFieldValue('selectRole', 1);
    } else {
      onClickItem([]);
      setFieldValue('selectRole', 4);
      setFieldValue('permission', []);
    }
    if (values['isAction'] == 'false') {
      setFieldValue('isAction', 'true');
    }
  };
  
  

  return (
    <View style={{marginTop: '5%'}}>
      <Text style={styles.title}>{title}</Text>

      <Pressable onPress={() => onAllSelect()} style={styles.btn}>
        {allSelected === true ? (
          <SvgXml xml={appImagesSvg?.selectBox} />
        ) : (
          <SvgXml xml={appImagesSvg?.unSelectBox} />
        )}
        <Text style={[styles.title, {fontFamily: fonts.semiBold}]}>All</Text>
      </Pressable>

      {isAssign_Permissions
        ? list?.map((item, key) => (
            <Pressable
              onPress={() => onTouchData(item)}
              key={key}
              style={styles.btn}>
              {item?.active == true ? (
                <SvgXml xml={appImagesSvg?.selectBox} />
              ) : (
                <SvgXml xml={appImagesSvg?.unSelectBox} />
              )}
              <Text style={[styles.title, {fontFamily: fonts.semiBold}]}>
                {item?.name}
              </Text>
            </Pressable>
          ))
        : list?.map((item, key) => (
            <Pressable onPress={() => setV(item)} key={key} style={styles.btn}>
              <SvgXml
                xml={v == item ? appImages?.selectBox : appImages?.unSelectBox}
              />
              <Text style={[styles.title, {fontFamily: fonts.semiBold}]}>
                {item}
              </Text>
            </Pressable>
          ))}
    </View>
  );
};

export default PermissionTag;

const styles = StyleSheet.create({
  title: {
    color: colors.black,
    fontFamily: fonts.semiBold,
    fontSize: RFValue(12),
    marginLeft: 10,
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
});
