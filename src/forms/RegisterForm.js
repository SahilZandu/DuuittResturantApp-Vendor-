import React, { useCallback, useState } from 'react';
import { View, Keyboard } from 'react-native';
import CTA from '../components/cta/CTA';
import { Formik, useFormikContext } from 'formik';
import { Strings } from '../translates/strings';
import { rootStore } from '../stores/rootStore';
import { useFocusEffect } from '@react-navigation/native';
import handleAndroidBackButton from '../halpers/handleAndroidBackButton';
import FieldInput from '../components/FieldInput';
import ProductInput from '../components/addMenu/ProductInput';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import { DateFormat } from '../halpers/DateFormat';
import Spacer from '../halpers/Spacer';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { registerValidations } from './formsValidation/RegisterValidations';




const RegisterForm = ({ navigation }) => {
    let dateStart = new Date();
    const { vendorManageProfile } = rootStore.requestSupportStore;
    const [loading, setLoading] = useState(false);
    const [initialValues, setInitialValues] = useState({
        firstName: '',
        lastName: '',
        restaurantName: '',
        mobile: '',
        email: '',
        dateOfFounding: '',
        gender: 'male',
    });
    const [showPicker, setShowPicker] = useState(false)
    const [update, setUpdate] = useState(true);

    useFocusEffect(
        useCallback(() => {
            handleAndroidBackButton(navigation);
        }, []),
    );

    const FormButton = ({ loading, onPress }) => {
        const { dirty, isValid, values } = useFormikContext();

        return (
            <CTA
                disable={!(isValid && dirty)}
                title={Strings?.save}
                onPress={() => onPress(values)}
                loading={loading}
                isBottom={true}
                bottomCheck={20}
                width={'90%'}
            />
        );
    };

    const handleRegister = async values => {
        console.log('values', values);
        // await vendorManageProfile(values, handleLoading, isSuccess)
        navigation.goBack();
    };

    const handleLoading = v => {
        setLoading(v);
    };

    const isSuccess = () => {
        setUpdate(false);
        setTimeout(() => {

            setUpdate(true);
        }, 20);
    };

    const dateFormat = d => {
        var date = new Date(d);
        // const founding = moment(date).format('YYYY-MM-DD');
        // setFoundingdate(founding);
        return DateFormat(date);
    };


    const DatePickeButton = ({ }) => {
        const { setFieldValue } = useFormikContext();
        return (
            <DatePicker
                modal
                mode="date"
                maximumDate={dateStart}
                open={showPicker}
                date={dateStart}
                onConfirm={date => {
                    setShowPicker(false);
                    setFieldValue('dateOfFounding', dateFormat(date));
                }}
                onCancel={() => {
                    setShowPicker(false);
                }}
            />
        );
    };

    if (update == true) {
        return (
            <Formik
                initialValues={initialValues}
                validationSchema={registerValidations()}>
                {/* <KeyboardAvoidingView   behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
          <AppInputScroll padding={true} keyboardShouldPersistTaps={'handled'}> */}
                <>
                    <View
                        style={{
                            marginHorizontal: 20,
                            justifyContent: 'center',
                            marginTop: '5%',
                        }}>
                        <FieldInput
                            autoCapitalize={'none'}
                            name={'firstName'}
                            inputLabel={'First Name'}
                            placeholder={'Enter your fisrt name'}
                        />
                        <FieldInput
                            autoCapitalize={'none'}
                            name={'lastName'}
                            inputLabel={'Last Name'}
                            placeholder={'Enter your last name'}
                        />
                        <FieldInput
                            autoCapitalize={'none'}
                            name={'restaurantName'}
                            inputLabel={'Restaurant Name'}
                            placeholder={'Enter your restaurant name'}
                        />
                        <FieldInput
                            autoCapitalize={'none'}
                            name={'mobile'}
                            keyboardType="number-pad"
                            inputLabel={'Phone Number'}
                            placeholder={'Enter phone number'}
                            maxLength={10}
                        />
                        <FieldInput
                            autoCapitalize={'none'}
                            keyboardType="email-address"
                            name={'email'}
                            inputLabel={'Email Address'}
                            placeholder={'Enter email address'}
                        />
                        <ProductInput
                            boxStyle={{ borderRadius: 50 }}
                            isTouchInput
                            onPress={() => {
                                Keyboard.dismiss(),
                                    setTimeout(() => {
                                        setShowPicker(true);
                                    }, 100);
                            }}
                            editable={false}
                            title={'Date of Founding'}
                            name={'dateOfFounding'}
                            placeholder={'select date'}
                        />
                    </View>
                    {<DatePickeButton />}
                    {/* </AppInputScroll> */}
                    <Spacer space={hp("12%")} />
                    <FormButton loading={loading} onPress={handleRegister} />
                </>
                {/* </KeyboardAvoidingView> */}
            </Formik>
        );
    } else {
        return null;
    }
};

export default RegisterForm;
