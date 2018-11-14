import React from 'react';
import { Field } from 'redux-form';
import CurrencyInput from 'react-currency-input';

const CurrencyField = ({ name }) =>
  <Field
    name={name}
    component={props =>
      <CurrencyInput 
        value={ props.input.value }
        onBlur={props.input.onChange}
      />
    }
  />

export default CurrencyField;

            