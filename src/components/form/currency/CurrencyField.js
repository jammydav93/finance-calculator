import React from 'react';
import { Field } from 'redux-form';
import './currency.scss';

const normalize = (value, prevValue) => {
  if (!value){
    return ''
  }

  const parsedValue = parseFloat(value)

  if (isNaN(parsedValue)){
    console.log('return 000')
    return '0.00'
  }

  const decimalRegex = /(\d*)(\.?)(\d?\d?)/g
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

const CurrencyField = ({ name }) =>
  <Field
    name={name}
    component={CurrencyInput}
    normalize={normalize}
  />

export default CurrencyField;
