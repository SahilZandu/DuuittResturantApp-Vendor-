import * as Yup from 'yup';

export const restaurantProfileValidations = () => {
  return Yup.object().shape({
    ['restaurantName']: Yup.string('Enter your restaurant name')
      .trim()
      .required('Restaurant name is required')
      .min(2, 'Restaurant name should be 2 character')
      .max(50, 'Restaurant name should not be greater than 50 character'),
    ['about']: Yup.string('Enter your bio')
      .trim()
      .required('Bio is required')
      .min(2, 'Bio should be 2 character')
      .max(250, 'Bio should not be greater than 250 character'),
    ['address']: Yup.string('Enter your restaurant address')
      .trim()
      .required('Restaurant address is required'),
    ['landMark']: Yup.string('Enter your land mark address')
      .trim()
      .required('Land mark address is required'),
    ['phone']: Yup.string('Enter your Phone number')
      .trim()
      .required('Enter your mobile number')
      .min(10, 'Phone number should be 10 digits')
      .matches(
        /(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/,
        'Number not valid',
      )
      .min(10, 'Phone number should be 10 digits')
      .max(10, 'Phone number should not be greater than 10 digits'),
    ['email']: Yup.string('Enter your email')
      .trim()
      .email('Enter a valid email')
      .required('Enter your email')
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, 'Enter a valid email'),
    ['dateOfFounding']: Yup.string('Select restaurant founded date')
      .trim()
      .required('Founded date is required'),
    ['minimunPrice']: Yup.number('')
      // .trim()
      .typeError('Minimum price must be a number')
      .required('Minimum price field required')
      .test(
        'minimunPrice',
        'Minimum price should be 50 to 200',
        number => String(number) <= 200,
      )
      .test(
        'minimunPrice',
        'Minimum price should be 50 to 200',
        number => String(number) >= 50,
      ),
    ['prepareTime']: Yup.number('')
      // .trim()
      .typeError('Prepare time must be a number')
      .required('Prepare time field required')
      .test(
        'minimunPrice',
        'Prepare time  should be 15 to 50 minutes',
        number => String(number) <= 50,
      )
      .test(
        'minimunPrice',
        'Prepare time  should be 15 to 50 minutes',
        number => String(number) >= 15,
      ),
    ['gst_percentage']: Yup.number('')
      // .trim()
      .typeError('GST percentage must be a number')
      .required('GST percentage field required')
      .test(
        'gst_percentage',
        'GST should be 5 to 30 percentage ',
        number => String(number) <= 30,
      )
      .test(
        'gst_percentage',
        'GST should be 5 to 30 percentage',
        number => String(number) >= 5,
      ),
    ['restaurant_charge']: Yup.number('')
      // .trim()
      .typeError('Restaurant packaging charge must be a number')
      .required('restaurant packaging charge field required')
      .test(
        'restaurant_charge',
        'restaurant packaging charge should be 5 to 20',
        number => String(number) <= 20,
      )
      .test(
        'restaurant_charge',
        'restaurant packaging charge should be 5 to 20',
        number => String(number) >= 5,
      ),
  });

};
