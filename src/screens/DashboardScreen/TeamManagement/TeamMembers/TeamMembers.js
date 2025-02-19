import React, {useState, useCallback} from 'react';
import {FlatList, Text, View} from 'react-native';
import {styles} from './styles';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useFocusEffect} from '@react-navigation/native';
import handleAndroidBackButton from '../../../../halpers/handleAndroidBackButton';
import AnimatedLoader from '../../../../components/AnimatedLoader/AnimatedLoader';
import Header from '../../../../components/header/Header';
import AddCTA from '../../../../components/cta/Add';
import {rootStore} from '../../../../stores/rootStore';
import MemberCard from '../../../../components/TeamMemberCard/MemberCard';

export default function TeamMembers({navigation}) {
  // const {updateStatusMenuGroup} = rootStore.menuStore;
  const {getTeamMember, teamMembers, deleteTeamMember, updateStatusTeamMember} =
    rootStore.teamManagementStore;
  const {appUser} = rootStore.commonStore;
  const [addMembers, setAddMembers] = useState(teamMembers);
  const [loading, setLoading] = useState(
    teamMembers?.length > 0 ? false : true,
  );
  const [isDeletedPopUp, setIsDeletedPopUp] = useState(false);

  const [deleteLoading, setDeleteLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      handleAndroidBackButton(navigation);
      getTeamMemberData();
    }, []),
  );

  const getTeamMemberData = async () => {
    const teamMemberRes = await getTeamMember(appUser, handleLoading);
    setAddMembers(teamMemberRes);
  };

  const handleLoading = v => {
    setLoading(v);
  };

  const onPressGroupToggle = async (data, status) => {
    const resToggleGroup = await updateStatusTeamMember(
      data,
      status,
      handleMemberToggleLoading,
    );
    console.log('resToggle Team member --', resToggleGroup);
    if (resToggleGroup?.statusCode == 200) {
      const updatedGroup = addMembers?.map((item, i) => {
        if (item?._id == data?._id) {
          return {...item, status: !item.status}; // Toggle status
        }
        return item;
      });
      setAddMembers(updatedGroup);
    } else {
      setAddMembers(addMembers);
    }
  };

  const handleMemberToggleLoading = v => {
    console.log('v---', v);
  };

  const onDeleteTeamMember = async item => {
    await deleteTeamMember(appUser, item, handleDeleteLoading, onSuccessDelete);
  };

  const onSuccessDelete = () => {
    setIsDeletedPopUp(false);
    getTeamMemberData();
  };

  const handleDeleteLoading = v => {
    setDeleteLoading(v);
  };

  const renderMemberItem = ({item, i}) => {
    return (
      <MemberCard
        onPressToggle={onPressGroupToggle}
        onDelete={onDeleteTeamMember}
        onEditPress={item => {
          navigation.navigate('addEditTeamMembers', {
            item: item,
            type: 'edit',
          });
        }}
        item={item}
        index={i}
        isDeletePopUp={isDeletedPopUp}
        setIsDeletedPopUp={handleDeletePopUpToggle}
      />
    );
  };

  const handleDeletePopUpToggle = useCallback(() => {
    setIsDeletedPopUp(prev => !prev);
  }, []);

  return (
    <View style={styles.container}>
      <Header
        backArrow={true}
        onPress={() => {
          navigation.goBack();
        }}
        title={'Team Members'}
        bottomLine={1}
      />
      <View style={{flex: 1, justifyContent: 'center', marginTop: '2%'}}>
        <View style={{flex: 1}}>
          {loading == true ? (
            <AnimatedLoader type={'teamMemberLoader'} />
          ) : (
            <>
              {addMembers?.length > 0 ? (
                <>
                  <FlatList
                    data={addMembers}
                    renderItem={renderMemberItem}
                    keyExtractor={item => item?.id?.toString()}
                    contentContainerStyle={{paddingBottom: '20%'}}
                    showsVerticalScrollIndicator={false}
                  />
                </>
              ) : (
                <View style={styles.noDataView}>
                  <Text style={styles.noDataText}>No data found</Text>
                </View>
              )}
            </>
          )}
        </View>
      </View>
      {loading !== true && (
        <AddCTA
          bottom={hp('3%')}
          onAdd={() => {
            navigation.navigate('addEditTeamMembers', {item: {}, type: 'add'});
          }}
        />
      )}
    </View>
  );
}
