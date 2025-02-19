import * as Yup from 'yup';

export function docValidations(form) {
  return Yup.object().shape({
    ['file']: Yup.string('').trim().required('doc required'),
    [form == 'fssai' ? 'number' : '']: Yup.string('')
      .trim()
      .required('Please enter fssai number')
      .matches(/^[0-9]{14}$/, 'Fssai number should be 14 digits'),
    [form == 'gst' ? 'number' : '']: Yup.string('')
      .trim()
      .required('Please enter gst number')
      .matches(
        /^[0-9]{2}[A-Z]{3}[ABCFGHLJPTF]{1}[A-Z]{1}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
        // /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
        'GST should be like this. e.g (04AAACC4175D1Z6)',
      ),
    ['expirationDate']: Yup.string('')
      .trim()
      .required('Select expiration date'),
    ['docType']: Yup.string(''),
  });
}
