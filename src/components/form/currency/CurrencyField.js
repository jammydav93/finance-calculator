import React from 'react';
import { Field } from 'redux-form';
import classnames from 'classnames';
import { TextField, InputAdornment } from '@material-ui/core';
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

const CurrencyInput = ({ input, className, InputProps, otherProps }) => 
  <TextField
    className="currency"
    type="number"
    value={input.value}
    onChange={input.onChange}
    onBlur={input.onChange}
    {...otherProps}
    inputProps={{
      className: classnames('currency', className),
    }}
    InputProps={{  //eslint-disable-line
      startAdornment: <InputAdornment position="start">£</InputAdornment>,
      ...InputProps
    }}
  />

const CurrencyField = ({ name, isInitialBalance = false, className, InputProps, otherProps}) =>
  <Field
    name={name}
    component={CurrencyInput}
    normalize={normalize(isInitialBalance)}
    InputProps={InputProps}
    otherProps={otherProps}
    className={className}
  />

export default CurrencyField;
