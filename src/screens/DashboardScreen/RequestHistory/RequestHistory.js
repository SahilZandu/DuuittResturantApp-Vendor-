import React, {useEffect, useState, useRef, useCallback} from 'react';
import {Text, View, KeyboardAvoidingView, TouchableOpacity} from 'react-native';
import Header from '../../../components/header/Header';
import SearchInputComp from '../../../components/SearchInputComp';
import Tabs from '../../../components/Tabs';
import {styles} from './styles';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {SwipeListView, SwipeRow} from 'react-native-swipe-list-view';
import {SvgXml} from 'react-native-svg';
import {colors} from '../../../theme/colors';
import PopUp from '../../../components/appPopUp/PopUp';
import RequestsHistoryCard from '../../../components/cards/RequestsHistoryCard';
import {appImagesSvg} from '../../../commons/AppImages';
import AnimatedLoader from '../../../components/AnimatedLoader/AnimatedLoader';
import {useFocusEffect} from '@react-navigation/native';
import handleAndroidBackButton from '../../../halpers/handleAndroidBackButton';
import {rootStore} from '../../../stores/rootStore';

const tabs = [
  {
    text: 'all',
  },
  {
    text: 'pending',
  },
  {
    text: 'approved',
  },
  {
    text: 'declined',
  },
];
let defaultType = 'all';
let perPage = 10;
export default function RequestHistory({navigation}) {
  const {
    getAdminRequestsAll,
    requestHistData,
    getReqHistorybyFilters,
    adminRequestsDelete,
  } = rootStore.requestSupportStore;
  const {appUser} = rootStore.commonStore;
  const ref = useRef(null);
  const [searchValue, setSeachValue] = useState('');
  const [requestHist, setRequestHist] = useState(
    Array(Number(requestHistData?.length))
      .fill(requestHistData)
      .map((item, i) => ({key: `${i}`, text: `item #${i}`, item: item[i]})),
  );
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isItemDelete, setIsItemDelete] = useState({});
  const [serialNo, setSerialNo] = useState(0);
  const [loading, setLoading] = useState(
    requestHistData?.length > 0 ? false : true,
  );

  useFocusEffect(
    useCallback(() => {
      defaultType = 'all';
      handleAndroidBackButton(navigation);
      getRequestAllData();
    }, []),
  );

  const getRequestAllData = async () => {
    const res = await getAdminRequestsAll(appUser, handleLoading);
    // console.log('res---getRequestAllData', res);
    setRequestHist(
      Array(Number(res?.length))
        .fill(res)
        .map((item, i) => ({key: `${i}`, text: `item #${i}`, item: item[i]})),
    );
  };

  const handleLoading = v => {
    console.log('v--', v);
    setLoading(v);
  };

  useEffect(() => {
    setRequestHist(
      Array(Number(requestHistData?.length))
        .fill(requestHistData)
        .map((item, i) => ({key: `${i}`, text: `item #${i}`, item: item[i]})),
    );
  }, [requestHistData]);

  const renderItem = ({item}) => {
    // console.log('item++++=====', item);
    return (
      <RequestsHistoryCard
        item={item?.item}
        navigation={navigation}
        id={serialNo}
        setSerialNo={setSerialNo}
        setIsBottomSheetOpen={setIsBottomSheetOpen}
      />
    );
  };

  const onRowDidOpen = rowKey => {
    console.log('This row opened', rowKey);
  };
  const renderHiddenItem = (data, rowMap) => {
    // console.log('render Hidden Item', data);
    return (
      <View
        style={{
          backgroundColor: colors.appBackground,
          alignItems: 'flex-end',
          justifyContent: 'center',
          borderColor: colors.appBackground,
          borderBottomWidth: 2,
          marginHorizontal: 5,
        }}>
        <TouchableOpacity
          activeOpacity={0.4}
          disabled={data?.item?.item?.status !== 'pending'}
          style={{
            height: hp('8%'),
            backgroundColor: colors.appBackground,
            width: 60,
            alignItems: 'center',
            justifyContent: 'center',
            borderLeftWidth: 2,
            borderColor: colors.red,
            opacity: data?.item?.item?.status !== 'pending' ? 0.5 : 1,
          }}
          onPress={() => {
            setIsDelete(true), setIsItemDelete(data?.item?.item);
          }}>
          <SvgXml width={28} height={28} xml={appImagesSvg?.deleteIcon} />
        </TouchableOpacity>
      </View>
    );
  };

  const handleTabPress = async text => {
    if (ref?.current) {
      closeRow(ref?.current?._rows, ref?.current?.openCellKey);
    }
    defaultType = text;
    const filterData = await getReqHistorybyFilters(text);
    //  console.log('filterData--',filterData);
    setRequestHist(
      Array(Number(filterData?.length))
        .fill(filterData)
        .map((item, i) => ({key: `${i}`, text: `item #${i}`, item: item[i]})),
    );
  };

  const handleDelete = async item => {
    await adminRequestsDelete(item, handleDeletemodal);
    console.log('res delete request', item);
    // handleDeletemodal();
  };

  const handleDeletemodal = () => {
    setIsDelete(false);
    onRefersh();
  };

  const onRefersh = async () => {
    await getRequestAllData(), await handleTabPress(defaultType);
  };
  const closeRow = (rowMap, rowKey) => {
    // console.log('rowMap, rowKey', rowMap, rowKey);
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  return (
    <View style={styles.container}>
      <Header
        backArrow={true}
        onPress={() => {
          navigation.goBack();
        }}
        title={'Request History'}
        bottomLine={1}
      />
      <SearchInputComp
        value={searchValue}
        onChangeText={item => {
          setSeachValue(item);
        }}
      />
      <Tabs tabs={tabs} tabPress={handleTabPress} />
      <KeyboardAvoidingView behavior={'padding'} style={{flex: 1}}>
        {loading == true ? (
          <AnimatedLoader type={'requestHistoryLoader'} />
        ) : (
          <View style={styles.sectionListView}>
            {requestHist && requestHist?.length > 0 ? (
              <View style={styles.flatList}>
                <SwipeListView
                  nestedScrollEnabled
                  ref={ref}
                  style={{marginTop: '0.1%', paddingTop: '4%'}}
                  contentContainerStyle={{paddingBottom: '20%'}}
                  showsVerticalScrollIndicator={false}
                  data={requestHist}
                  keyExtractor={(item, index) => item?._id?.toString() || index?.toString()}
                  renderItem={renderItem}
                  renderHiddenItem={renderHiddenItem}
                  leftOpenValue={0}
                  rightOpenValue={-60}
                  //  previewRowKey={'0'}
                  previewOpenValue={-60}
                  previewOpenDelay={2000}
                  onRowDidOpen={onRowDidOpen}
                  rightActionValue={1}
                  stopRightSwipe={isBottomSheetOpen == false ? 0 : -1}
                  stopLeftSwipe={isBottomSheetOpen == false ? 0 : -1}
                />
              </View>
            ) : (
              <Text style={styles.noDataText}>
                {loading ? '' : 'This is where your requests will appear'}
              </Text>
            )}
          </View>
        )}
      </KeyboardAvoidingView>
      <PopUp
        topIcon={true}
        visible={isDelete}
        type={'delete'}
        onClose={() => setIsDelete(false)}
        title={'You are about to delete a request'}
        text={'This will delete your request from the admin are your sure?'}
        onDelete={async () => {
          handleDelete(isItemDelete);
        }}
      />
    </View>
  );
}
