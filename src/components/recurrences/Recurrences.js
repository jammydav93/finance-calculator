import React from 'react';
import { path } from 'ramda'
import {
  Field,
  FieldArray,
  reduxForm,
} from 'redux-form';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './recurrences.scss';
import { connect } from 'react-redux';
import moment from 'moment';
import { RECURRENCE_OPTIONS } from '../../constants/recurrences';
import CurrencyField from '../form/currency/CurrencyField';
// import validate from './validate'

const renderField = (
  {
    input,
    label,
    type,
    meta: { touched, error },
  }
) => (
  <div>
      <input {...input} type={type} placeholder={label} />
      {touched && error && <span>{error}</span>}
  </div>
);

const renderDatePicker = ({ input, meta: { touched, error } }) => (
  <div>
    <DatePicker
      name={input.name}
      onChange={ (a) => (input.onChange(moment(a).toISOString())) }
      dateFormat="DD-MM-YYYY"
      selected={input.value ? moment(input.value) : null}
    />
    {touched && error && <span>{error}</span>}
  </div>
);

const renderDateField = (member, regularity) => {
  switch (regularity) {
    case 'weekly':

    // Use ISO weekday convention (http://momentjs.com/docs/#/get-set/iso-weekday/)
      const WeeklyList =[
        { num: 1, day: 'Mon' },
        { num: 2, day: 'Tue' },
        { num: 3, day: 'Wed' },
        { num: 4, day: 'Thu' },
        { num: 5, day: 'Fri' },
        { num: 6, day: 'Sat' },
        { num: 7, day: 'Sun' },
       ];

      return (
        <Field
          name={`${member}.recurrenceDate`}
          component='select'
        >
          {WeeklyList.map((x) =>
            <option key={x.day} value={x.num}>{x.day}</option>
          )}
        </Field>);

    case 'monthly':
      const MonthlyList = Array.from(new Array(31), (val, index) => index+1 );

      return <Field
              name={`${member}.recurrenceDate`}
              component='select'
            >
                {MonthlyList.map((x) =>
                  <option key={x} value={x}>{x}</option>
                )}
              </Field>

    case 'quaterly':
    case '4 weekly':
      return <Field
              name={`${member}.recurrenceDate`}
              component={renderDatePicker}
             />;

    case 'daily':
    case 'week daily':
    default:
      return null;
  }
};

const renderMembers = props => {
  const { selectingFormValues, type, fields, meta: { error, submitFailed } } = props;

  const title = type === 'income' ? 'Incomes' : 'Outgoings';
  const description = type === 'income' ? 'income' : 'outgoing';

  return (
    <React.Fragment>
      <table className="table-container">
        <tr className="table-row">
          <th className="description header" >{title}</th>
          <th className="cost header" >Amount</th>
          <th className="regularity header" >Type</th>
          <th className="date header" >Date</th>
          <th className="remove header" ></th>
        </tr>
        {fields.map((member, index) => (
          <tr className="table-row" key={index}>
            <td className="description">
              <Field
                name={`${member}.description`}
                type="text"
                component={renderField}
              />
            </td>
            <td className="cost">
              <CurrencyField
                name={`${member}.cost`}
              />

            </td>
            <td className="regularity">
            <Field
              name={`${member}.regularity`}
              component="select"
            >
              {RECURRENCE_OPTIONS.map((x) =>
                <option
                  key={x.value}
                  value={x.value}
                  disabled={x.disabled ? true : false }>
                    {x.description}
                </option>
              )}
            </Field>
          </td>
            <td className="date">
                { renderDateField(member, selectingFormValues[fields.name][index].regularity) }
            </td>
            <td className="remove">
              <IconButton aria-label="Delete">
                <DeleteIcon onClick={() => fields.remove(index)}/>
              </IconButton>
            </td>
          </tr>
        ))}
      </table>

      <button type="button" className="button" onClick={() => fields.push({})}>
        Add {description}
      </button>
      {submitFailed && error && <span>{error}</span>}
    </React.Fragment>
  );
};

const mapStateToProps = state => (
  {
    selectingFormValues: path(['form', 'selectingFormValues', 'values'], state),
  }
);

const renderMembersConnected = connect(mapStateToProps)(renderMembers);

let FieldArraysForm = props => (
  <form className={props.className}>
    <FieldArray name={props.type} props={{type: props.type}} component={renderMembersConnected} />
  </form>
);

FieldArraysForm = reduxForm({
  form: 'selectingFormValues',
  enableReinitialize : true,
})(FieldArraysForm);

FieldArraysForm = connect(
  state => ({
    initialValues: path(['recurrencesState', 'formData'], state),
  }),
)(FieldArraysForm)

export default FieldArraysForm