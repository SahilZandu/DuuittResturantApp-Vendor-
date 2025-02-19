import React, {useCallback} from 'react';
import {View} from 'react-native';
import {styles} from './styles';
import {useFocusEffect} from '@react-navigation/native';
import Header from '../../../../components/header/Header';
import handleAndroidBackButton from '../../../../halpers/handleAndroidBackButton';
import AddEditTeamMembersForm from '../../../../forms/AddEditTeamMembersForm';

export default function AddEditTeamMembers({navigation, route}) {
  const {item, type} = route.params;
  // console.log("item ,type---AddEditTeamMembers",item ,type);
  useFocusEffect(
    useCallback(() => {
      handleAndroidBackButton(navigation);
    }, []),
  );

  return (
    <View style={styles.container}>
      <Header
        backArrow={true}
        onPress={() => {
          navigation.goBack();
        }}
        title={type == 'add' ? 'Add Members' : 'Edit Members'}
        bottomLine={1}
      />
      <AddEditTeamMembersForm navigation={navigation} item={item} type={type} />
    </View>
  );
}
