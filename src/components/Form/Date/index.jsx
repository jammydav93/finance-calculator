import React from 'react';
import {
  Field,
  reduxForm,
} from 'redux-form';
import { TextField } from '@material-ui/core';
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
// import validate from './validate'

const renderDatePicker = ({ input, label }) => (
  <DatePicker
    customInput={<TextField label={label} variant="outlined" />}
    name={input.name}
    onChange={a => (input.onChange(moment(a)))}
    dateFormat="dd-MM-yyyy"
    selected={input.value ? new Date(input.value) : null}
  />
);

renderDatePicker.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
};

const FieldForm = ({ type, defaultDate, label }) => (
  <Field
    name={type}
    defaultDate={defaultDate}
    label={label}
    component={renderDatePicker}
  />
);

FieldForm.defaultProps = {
  defaultDate: null,
};

FieldForm.propTypes = {
  type: PropTypes.string.isRequired,
  defaultDate: PropTypes.object,
  label: PropTypes.string.isRequired,
};

export default reduxForm({
  form: 'selectingFormValues',
})(FieldForm);
