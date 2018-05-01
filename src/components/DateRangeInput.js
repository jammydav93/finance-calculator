import React from 'react';
import {
  Field,
  reduxForm,
} from 'redux-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
// import validate from './validate'

const renderDatePicker = ({ input, label, meta: { touched, error } }) => (
  <div>
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
  <form>
    <Field name={props.type} label={props.label} component={renderDatePicker} />
  </form>
);

export default reduxForm({
  form: 'selectingFormValues',
})(FieldForm);
