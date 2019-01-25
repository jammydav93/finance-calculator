import React from 'react';
import { reduxForm } from 'redux-form';
import CurrencyField from '../currency/CurrencyField';
import './initialbalance.scss';

// import validate from './validate'

const FieldForm = props => (
    <form className={`${props.className} amount`}>
      <div className="label">
        {props.label}
      </div>
      <div>
        <CurrencyField
          name={props.type}
          isInitialBalance={true}
          inputProps={{ variant: 'outlined' }}
        />
      </div>
    </form>
);

// No need to map intialState to form as linked within Recurrences component
export default reduxForm({
  form: 'selectingFormValues',
})(FieldForm);
