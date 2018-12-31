import React from 'react';
import { Field } from 'redux-form';

const CurrencyInput = ({ input }) => 
  <input
    type="number"
    value={input.value}
    onChange={input.onChange}
    onBlur={input.onChange}
  />

const CurrencyField = ({ name }) =>
  <Field
    name={name}
    component={CurrencyInput}
  />

export default CurrencyField;
