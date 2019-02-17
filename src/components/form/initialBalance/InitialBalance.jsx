import React from 'react';
import { reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import CurrencyField from '../currency/CurrencyField';
import './initialbalance.scss';
// import validate from './validate'

const FieldForm = ({ label, type }) => (
  <div className="initial-amount">
    <div className="label">
      {label}
    </div>
    <div>
      <CurrencyField
        name={type}
        isInitialBalance
        otherProps={{ variant: 'outlined' }}
      />
    </div>
  </div>
);

FieldForm.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default reduxForm({
  form: 'selectingFormValues',
})(FieldForm);
