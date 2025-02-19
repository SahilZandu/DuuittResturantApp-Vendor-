import * as Yup from 'yup';

export function bankValidations() {
  
  return Yup.object().shape({
    // ['bank']: Yup.string('').trim().required('Bank required'),
    ['name']: Yup.string('').trim().required('Name required').min(2),
    ['account']: Yup.string('')
      .trim()
      .required('Account number required')
      .min(10 ,"Bank account should be 10 digits")
      .max(16,"Bank account should not be greater than 16 digits"),
    ['ifsc']: Yup.string('')
      .trim()
      .required('IFSC code required')
      .matches(/[A-Z|a-z]{4}[0][a-zA-Z0-9]{6}$/, 'Enter valid IFSC code'),
  });
}
