import React from 'react';
import { reduxForm } from 'redux-form';
import InputAdornment from '@material-ui/core/InputAdornment';
import CurrencyField from '../currency/CurrencyField';
import './initialbalance.scss';

// import validate from './validate'

const FieldForm = props => (
    <div className={`${props.className} initial-amount`}>
      <div className="label">
        {props.label}
      </div>
      <div>
        <CurrencyField
          name={props.type}
          isInitialBalance={true}
          otherProps={{ variant: 'outlined' }}
          InputProps={{
            startAdornment: <InputAdornment position="start">£</InputAdornment>,
          }}
        />
      </div>
    </div>
);

// No need to map intialState to form as linked within Recurrences component
export default reduxForm({
  form: 'selectingFormValues',
})(FieldForm);
