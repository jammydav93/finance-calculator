import React from 'react';
import { Field } from 'redux-form';
import { TextField } from '@material-ui/core';
import './currency.scss';

const normalize = (isInitialBalance) => (value, prevValue) => {
  if (!value){
    return ''
  }

  const parsedValue = parseFloat(value)

  if (isNaN(parsedValue)){
    return '0.00'
  }

  const decimalRegex = isInitialBalance
  ? /(-?\d*)(\.?)(\d?\d?)/g
  : /(\d*)(\.?)(\d?\d?)/g

  const matches = decimalRegex.exec(value)
  const normalisedValue = matches[0] || '' + matches[1] || '' + matches[2] || ''

  return normalisedValue

}

const CurrencyInput = ({ input, inputProps }) => 
  <TextField
    className="currency"
    type="number"
    value={input.value}
    onChange={input.onChange}
    onBlur={input.onChange}
    {...inputProps}
  />

const CurrencyField = ({ name, isInitialBalance = false, inputProps}) =>
  <Field
    name={name}
    component={CurrencyInput}
    normalize={normalize(isInitialBalance)}
    inputProps={inputProps}
  />

export default CurrencyField;
