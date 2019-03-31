import React from 'react';
import { reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import CurrencyField from '../Currency';
// import validate from './validate'

const FieldForm = ({ label, type }) => (
  <CurrencyField
    name={type}
    label={label}
    isInitialBalance
    otherProps={{ variant: 'outlined' }}
  />
);

FieldForm.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default reduxForm({
  form: 'selectingFormValues',
})(FieldForm);
