import React from 'react';
import {
  Field,
  reduxForm,
} from 'redux-form';
import { TextField } from '@material-ui/core';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './daterangeinput.scss';
import moment from 'moment';
// import validate from './validate'

const renderDatePicker = ({ input, label, meta: { touched, error } }) => (
  <div className="date-input">
    <div className="label">
      {label}
    </div>
    <DatePicker
      customInput={<TextField variant="outlined" />}
      name={input.name}
      onChange={ (a) => (input.onChange(moment(a))) }
      dateFormat="dd-MM-yyyy"
      selected={input.value ? new Date(input.value) : null}
    />
    {touched && error && <span>{error}</span>}
  </div>
);

const FieldForm = props =>
  <Field
    name={props.type}
    defaultDate={props.defaultDate}
    label={props.label}
    component={renderDatePicker}
  />

// No need to map intialState to form as linked within Recurrences component
export default reduxForm({
  form: 'selectingFormValues',
})(FieldForm);
