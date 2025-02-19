import * as Yup from 'yup';

export const addTeamMemberValidations = () => {
    
  return Yup.object().shape({
    ['firstName']: Yup.string('Enter first name')
    .trim()
    .required('First name is required')
    .min(2,"First name should be 2 character")
    .max(20,"First name should not be greater than 20 character"),
    ['lastName']: Yup.string('Enter last name')
    .trim()
    .required('Last name is required')
    .min(2,"Last name should be 2 character")
    .max(20,"Last name should not be greater than 20 character"),
    ['email']: Yup.string('Enter email')
      .trim()
      .email('Enter a valid email')
      .required('Enter your email')
      .matches(
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
        'Enter a valid email',
      ),
     
    ['phone']: Yup.string('Enter Mobile number')
      .trim()
      .required('Enter Mobile number')
      .matches(
        /(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/,
        'Number not valid',
      ).min(10 ,"Number should be 10 digits")
      .max(10,"Number should not be greater than 10 digits"),
      ['selectRole']: Yup.string('Enter your select role')
      .trim()
      .required('Your select role is required'),
      ['permission']: Yup.array().min(1, 'At least one permission is required'),
    
  });
};