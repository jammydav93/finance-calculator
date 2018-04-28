import React from 'react'
import { RECURRENCE_OPTIONS } from '../constants/recurrences';
import {
  select,
  formValueSelector,
  Field,
  FieldArray,
  reduxForm,
} from 'redux-form'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { connect } from 'react-redux';
import moment from 'moment';
//import validate from './validate'


const selector = formValueSelector('selectingFormValues');

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
      <input {...input} type={type} placeholder={label} />
      {touched && error && <span>{error}</span>}
  </div>
)

const renderDatePicker = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <DatePicker
      name={input.name}
      onChange={(a)=>(input.onChange(moment(a).toISOString()))}
      dateFormat="DD-MM-YYYY"
      selected={input.value ? moment(input.value) : moment()}
    />
    {touched && error && <span>{error}</span>}
  </div>
)


const renderDateField = (member, regularity) => {
  switch (regularity) {
    case 'weekly':
    const WeeklyList =[
      { num: 0, day: 'Mon' },
      { num: 1, day: 'Tue' },
      { num: 2, day: 'Wed' },
      { num: 3, day: 'Thu' },
      { num: 4, day: 'Fri' },
      { num: 5, day: 'Sat' },
      { num: 6, day: 'Sun' },
     ];

      return (
        <Field
          name={`${member}.recurrenceDate`}
          component='select'
          >
            {WeeklyList.map((x) =>
              <option key={x.day} value={x.day}>{x.day}</option>
            )}
        </Field>);

    case 'monthly':
      const MonthlyList = Array.from(new Array(31),(val,index)=>index+1);

      return  <Field
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
             />

    case 'daily':
    case 'week daily':
    default:
      return null;
  }
}

const renderMembers = props => {
  const { selectingFormValues, fields, meta: { error, submitFailed } } = props;
  return (
  <table>
  <tbody>
    <tr>
      <th> {JSON.stringify(fields.name)}</th>
    </tr>
    <tr>
      <th>Description</th>
      <th>Cost</th>
      <th>Regularity</th>
      <th>Recurrance Date</th>
      <th>Remove</th>
    </tr>
    {fields.map((member, index) => (
      <tr key={index}>
        <td>
          <Field
            name={`${member}.description`}
            type="text"
            component={renderField}
          />
        </td>
        <td>

          <Field
            name={`${member}.cost`}
            type="text"
            component={renderField}
          />
        </td>
        <td>
          <Field name={`${member}.regularity`} component="select">
            {RECURRENCE_OPTIONS.map((x) =>
              <option key={x} value={x}>{x}</option>
            )}
          </Field>
        </td>
        <td>
            { renderDateField(member, selectingFormValues[fields.name][index].regularity) }
        </td>
        <td>
          <button
            type="button"
            title="Remove Member"
            onClick={() => fields.remove(index)}
          >
          -
          </button>
        </td>
      </tr>
    ))}
    <tr>
      <td>
        <button type="button" onClick={() => fields.push({})}>
          Add Member
        </button>
        {submitFailed && error && <span>{error}</span>}
      </td>
    </tr>
  </tbody>
  </table>
  )
}

const mapStateToProps = state => (
  {
    selectingFormValues: state.form.selectingFormValues.values,
  }
);

const renderMembersConnected = connect(mapStateToProps)(renderMembers);

const FieldArraysForm = props => {
  const { favoriteColorValue, handleSubmit, pristine, submitting } = props
  return (
      <form onSubmit={handleSubmit}>
        {favoriteColorValue}
        <FieldArray name={props.type} component={renderMembersConnected} />
      </form>
  )
}

export default reduxForm({
  form: 'selectingFormValues'  // a unique identifier for this form
})(FieldArraysForm)
