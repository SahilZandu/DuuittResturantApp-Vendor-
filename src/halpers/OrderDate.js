import moment from 'moment';

export const OrderDate = date => {
  if (date) {
    return (
      moment(date).format('D MMM YYYY ') + 'at' + moment(date).format(' h:mm A')
    );
  }
};

export const OrderTime = date => {
  if(date) {
    return (
      'at' + moment(date).format(' h:mm A')
    );
  }

}