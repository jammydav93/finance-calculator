import React from 'react';
import { Field } from 'redux-form';
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

const CurrencyInput = ({ input }) => 
  <input
    className="currency"
    type="number"
    value={input.value}
    onChange={input.onChange}
    onBlur={input.onChange}
  />

const CurrencyField = ({ name, isInitialBalance = false }) =>
  <Field
    name={name}
    component={CurrencyInput}
    normalize={normalize(isInitialBalance)}
  />

export default CurrencyField;
