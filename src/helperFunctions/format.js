import moment from 'moment';

const formatCost = amount => new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(amount || 0);

const formatDate = date => (date ? moment(date).format('DD/MM/YYYY') : '');

export {
  formatCost,
  formatDate,
};
