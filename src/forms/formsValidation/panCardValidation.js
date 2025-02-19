import * as Yup from 'yup';

export function panCardValidation() {
  return Yup.object().shape({
    ['file']: Yup.string('').trim().required('doc required'),
    ['number']: Yup.string('')
      .trim()
      .required('Please enter your pan number')
      .matches(
        /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/,
        'Pan card should be like this. e.g (AALPN1520B)',
      ),
  });
}
