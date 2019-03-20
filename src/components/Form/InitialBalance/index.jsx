import React from 'react';
import { reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import CurrencyField from '../Currency';
import styles from './index.module.scss';
// import validate from './validate'

const FieldForm = ({ label, type }) => (
  <div className={styles['initial-amount']}>
    <div className={styles.label}>
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
