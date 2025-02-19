import React, {useState} from 'react';
import {
  Text,
  Pressable,
  StyleSheet,
  TextInput,
  Keyboard,
} from 'react-native';
import Modal from 'react-native-modal';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {RFValue} from 'react-native-responsive-fontsize';
import {fonts} from '../../theme/colors';
import CTA from '../cta/CTA';
import CloseCTA from '../CloseCTA';
import {SvgXml} from 'react-native-svg';
import {appImages} from '../../commons/AppImages';
import InputScrollView from 'react-native-input-scroll-view';


const OrderNotPicked = ({visible, setDecline, onClose}) => {
  const availability = [
    'Traffic and Road Conditions',
    'Weather Conditions',
    'Vehicle Breakdown',
    'Personal Emergencies',
    'Change in Plans',
    'Technical Issues',
    'Miscommunication',
    'Busy Schedules',
    'Health Issues',
    'Other',
  ];

  const [select, selected] = useState(null);
  const [showInput, setShowInput] = useState(false);
  const [customReason, setReason] = useState(null);
  const [loading, setloading] = useState(false);

  const clearAll = () => {
    selected(null);
    setReason(null);
    setShowInput(false);
  };

  const handlePress = item => {
    if (item == 'Other') {
      setShowInput(true);
      selected(item);
    } else {
      setShowInput(false);
      setReason(null);
      selected(item);
    }
  };

  const getDisable = () => {
    if (select == 'Other') {
      return customReason == null;
    } else {
      return select == null;
    }
  };

  const handleInput = input => {
    if (input) {
      setReason(input);
    } else {
      setReason(null);
    }
  };

  return (
    <Modal isVisible={visible}>
      <InputScrollView
        bounces={false}
        topOffset={100}
        keyboardShouldPersistTaps={'handled'}
        style={{
          width: wp('100%'),
          marginLeft: -20,
          height: hp('100%'),
          marginBottom: -20,
        }}>
        <Pressable
          onPress={() => {
            Keyboard.dismiss();
          }}
          style={styles.mainView}>
          <Pressable
            onPress={() => {
              Keyboard.dismiss();
            }}
            style={[
              styles.availabilityView,
              {
                // paddingBottom: useKeyboardHeight()
              },
            ]}>
            <Text style={styles.title}>Why you cancel this order?</Text>

            {availability.map((item, key) => (
              <Pressable
                onPress={() => {
                  handlePress(item), Keyboard.dismiss();
                }}
                key={key}
                style={styles.buitton}>
                {select == item ? (
                  <SvgXml xml={appImages?.selectBox} />
                ) : (
                  <SvgXml xml={appImages?.unSelectBox} />
                )}

                <Text style={styles.text}>{item}</Text>
              </Pressable>
            ))}

            <Text />

            {showInput && (
              <TextInput
                onChangeText={handleInput}
                multiline={true}
                placeholder="Enter Reason"
                style={styles.input}
              />
            )}
            <Text />
            <Text />
            <CTA
              // loading={loading}
              disable={getDisable()}
              title={'Continue'}
              width={'100%'}
              onPress={() => {
                setloading(true);
                setDecline(select == 'Other' ? customReason : select),
                  clearAll();
              }}
            />

            <CloseCTA
              onPress={() => {
                clearAll();
                onClose();
              }}
            />
          </Pressable>
        </Pressable>
      </InputScrollView>
    </Modal>
  );
};

export default OrderNotPicked;

const styles = StyleSheet.create({
  mainView: {
    height: hp('100%'),
    width: wp('100%'),
    backgroundColor: 'rgba(100, 100, 100, 0.2)',
    justifyContent: 'flex-end',
    marginBottom:-20,
  },
  availabilityView: {
    backgroundColor: 'white',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: '5%',
    marginBottom:'5%'
  },
  title: {
    fontFamily: fonts.semiBold,
    fontSize: RFValue(16),
  },
  buitton: {
    flexDirection: 'row',
    marginTop: '5%',
    alignItems: 'center',
  },

  text: {
    fontFamily: fonts.Regular,
    fontSize: RFValue(12),
    marginLeft: '4%',
    width: '95%',
  },
  input: {
    padding: 16,
    marginBottom: '5%',
    paddingTop: 16,
    borderRadius: 8,
    borderColor: '#8F8F8F',
    borderWidth: 1,
    maxHeight: hp('15%'),
  },
});
