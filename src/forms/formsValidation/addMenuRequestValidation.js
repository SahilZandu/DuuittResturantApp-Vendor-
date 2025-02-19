import * as Yup from 'yup';

export function addMenuRequestValidation() {
  return Yup.object().shape({
    ['uri']: Yup.string('').trim().required('image required'),
  });
}
