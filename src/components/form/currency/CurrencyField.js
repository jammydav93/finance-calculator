import React from 'react';
import { Field } from 'redux-form';

const isAllowedValue = (value) => 
  !isNaN(value) 
  || value === '.'
  || value === ','

const CurrencyInput = ({ input }) => 
  <input
    value={input.value}
    onChange={input.onChange}
    onBlur={input.onChange}
    onKeyPress={(event) => {
      const keyCode = event.keyCode || event.which;
      const keyValue = String.fromCharCode(keyCode);
      if (!isAllowedValue(keyValue)){
        return event.preventDefault();
      }
    }} 
  />

const CurrencyField = ({ name }) =>
  <Field
    name={name}
    component={CurrencyInput}
  />

export default CurrencyField;
