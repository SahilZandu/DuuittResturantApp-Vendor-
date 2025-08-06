import * as Yup from 'yup';

export const registerValidations = () => {
    return Yup.object().shape({
        ['name']: Yup.string('Enter your full name')
            .trim()
            .required('Enter your full name')
            .min(2, 'Full name must be at least 2 characters'),
        ['restaurantName']: Yup.string('Enter your restaurant name')
            .trim()
            .required('Enter your restaurant name')
            .min(4, 'Restaurant name must be at least 4 characters'),

        ['address']: Yup.string('Enter your restaurant address')
            .trim()
            .required('Restaurant address is required'),
        ['mobile']: Yup.string('Enter your mobile number')
            .trim()
            .required('Enter your mobile number')
            .min(10, "Mobile number should be 10 digits")
            .matches(
                /(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/,
                'Number not valid',
            )
            .min(10, "Phone number should be 10 digits")
            .max(10, "Phone number should not be greater than 10 digits"),

        ['email']: Yup.string('Enter your email')
            .trim()
            .email('Enter a valid email')
            .required('Enter your email')
            .matches(
                /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                'Enter a valid email',
            ),
        ['dateOfFounding']: Yup.string('Select restaurant founded date')
            .trim()
            .required('Founded date is required'),
    });

};
