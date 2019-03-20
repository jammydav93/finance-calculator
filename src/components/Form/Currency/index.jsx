import React from 'react';
import { Field } from 'redux-form';
import classnames from 'classnames';
import {
  TextField,
  InputAdornment as MuiInputAdornment,
  withStyles,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import styles from './index.module.scss';

const normalize = isInitialBalance => (value) => {
  if (!value) {
    return '';
  }

  const parsedValue = parseFloat(value);

  if (Number.isNaN(Number(parsedValue))) {
    return '0.00';
  }

  const decimalRegex = isInitialBalance
    ? /(-?\d*)(\.?)(\d?\d?)/g
    : /(\d*)(\.?)(\d?\d?)/g;

  const matches = decimalRegex.exec(value);
  const normalisedValue = matches[0] || `${matches[1]}` || `${matches[2]}` || '';

  return normalisedValue;
};

const InputAdornment = withStyles(() => ({
  root: {
    margin: '0px',
    paddingRight: '2px',
  },
}))(MuiInputAdornment);

const CurrencyInput = ({
  input, className, otherProps,
}) => (
  <TextField
    className={styles.currency}
    type="number"
    value={input.value}
    onChange={input.onChange}
    onBlur={input.onChange}
    {...otherProps}
    inputProps={{
      className: classnames(styles.currency, className),
    }}
    InputProps={{  //eslint-disable-line
      startAdornment: <InputAdornment position="start">£</InputAdornment>,
    }}
  />
);

CurrencyInput.defaultProps = {
  className: '',
  otherProps: {},
};

CurrencyInput.propTypes = {
  input: PropTypes.object.isRequired,
  className: PropTypes.string,
  otherProps: PropTypes.object,
};

const CurrencyField = ({
  name, isInitialBalance = false, className, otherProps,
}) => (
  <Field
    name={name}
    component={CurrencyInput}
    normalize={normalize(isInitialBalance)}
    otherProps={otherProps}
    className={className}
  />
);

CurrencyField.defaultProps = {
  isInitialBalance: false,
  className: '',
  otherProps: {},
};

CurrencyField.propTypes = {
  name: PropTypes.string.isRequired,
  isInitialBalance: PropTypes.bool,
  className: PropTypes.string,
  otherProps: PropTypes.object,
};

export default CurrencyField;
