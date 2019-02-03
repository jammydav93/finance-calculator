import React from 'react';
import { reduxForm } from 'redux-form';
import CurrencyField from '../currency/CurrencyField';
import './initialbalance.scss';

// import validate from './validate'

const FieldForm = props => (
    <div className={`${props.className} amount`}>
      <div className="label">
        {props.label}
      </div>
      <div>
        <CurrencyField
          name={props.type}
          isInitialBalance={true}
          otherProps={{ variant: 'outlined' }}
        />
      </div>
    </div>
);

// No need to map intialState to form as linked within Recurrences component
export default reduxForm({
  form: 'selectingFormValues',
})(FieldForm);
