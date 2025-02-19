import moment from 'moment';

export const DateFormat = date => {
  // console.log(';;;;;;', date);
  if (date) {
    return moment(date).format('D MMM, YYYY');
  }
};

export const checkDocExpire = (date) => {
  let currentdate = moment(new Date()).format('YYYY-MM-DD');
  let comparedate = moment(date).format('YYYY-MM-DD');

  console.log('check expired', comparedate, currentdate,comparedate > currentdate);
  if (comparedate) {
    if (comparedate > currentdate) {
      console.log('valid');
      return false
    } else {
      console.log('expired');
      return true
      
    }
  }
};
