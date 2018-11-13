import React from 'react';
import {
  Field,
  reduxForm,
} from 'redux-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './daterangeinput.scss';
import moment from 'moment';
// import validate from './validate'

const renderDatePicker = ({ input, label, meta: { touched, error } }) => (
  <div className="date-input">
    { label }:
    <DatePicker
      name={input.name}
      onChange={ (a) => (input.onChange(moment(a))) }
      dateFormat="DD-MM-YYYY"
      selected={input.value ? moment(input.value) : null}
    />
    {touched && error && <span>{error}</span>}
  </div>
);

const FieldForm = props => (
  <form className={props.className}>
    <Field name={props.type} defaultDate={props.defaultDate} label={props.label} component={renderDatePicker} />
  </form>
);

// No need to map intialState to form as linked within Recurrences component
export default reduxForm({
  form: 'selectingFormValues',
})(FieldForm);
