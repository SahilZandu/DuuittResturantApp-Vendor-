import * as Yup from 'yup';

export function addProductValidations() {
  return Yup.object().shape({
    ['image']: Yup.string('').trim().required('Product image required'),
    ['dishType']: Yup.string('').trim().required('Dish type required'),
    ['dishName']: Yup.string('').trim().required('Dish name required'),
    ['itemType']: Yup.string('').trim().required('Item type required'),
    ['sellingPrice']: Yup.string('').trim().required('Selling price required'),
    ['description']: Yup.string('').trim().required('Dish description required')
    .min(2,"Description should be 2 character")
    .max(250,"Description should not be greater than 250 character"),
    ['time']: Yup.string('').trim().required('Dish timing required'),
  });
}
