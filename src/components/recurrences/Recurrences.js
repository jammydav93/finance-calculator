import React from 'react';
import { path } from 'ramda'
import {
  Field,
  FieldArray,
  reduxForm,
  change,
} from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import {
  IconButton,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails as MuiExpansionPanelDetails,
} from '@material-ui/core';
import { 
  AddCircle,
  Delete,
  ExpandMore as ExpandMoreIcon,
} from '@material-ui/icons';
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

const ExpansionPanelDetails = withStyles(() => ({
  root: {
    padding: 10,
  },
}))(MuiExpansionPanelDetails);

const renderMembers = (props) => {
  const { selectingFormValues, type, fields, meta: { error, submitFailed } } = props;

  const title = type === 'income' ? 'Incomes' : 'Outgoings';
  const itemCount = fields.length

  return (
    <React.Fragment>
      <ExpansionPanel defaultExpanded={true}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          {`${title} (${itemCount})`}
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <table className="table-container">
            <tr className="table-row">
              <th className="description header" >Description</th>
              <th className="cost header" >Amount</th>
              <th className="regularity header" >Regularity</th>
              <th className="date header" >Date</th>
              <th className="remove header" ></th>
            </tr>
            {
              fields.map((member, index) => (
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
                    onChange={() => {
                      props.changeFormValue(selectingFormValues, member, type, index, 'recurrenceDate', null)
                    }}
                  >
                    <option disabled hidden style={{display: 'none'}} value=''></option>
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
                      <Delete onClick={() => fields.remove(index)}/>
                    </IconButton>
                  </td>
                </tr>)
              )}
            <AddCircle onClick={() => fields.push({})} />
          </table>
        </ExpansionPanelDetails>
      </ExpansionPanel>

      {submitFailed && error && <span>{error}</span>}
    </React.Fragment>
  );
}

const mapStateToProps = state => (
  {
    selectingFormValues: path(['form', 'selectingFormValues', 'values'], state),
  }
);

const mapDispatchToProps = (dispatch) => ({
  changeFormValue: (selectingFormValues, member, type, index, key, value) => {
    const previousData = selectingFormValues[type][index]
    dispatch(change(['selectingFormValues'], member, {...previousData, [key]: value} ));
  },
})

const renderMembersConnected = connect(mapStateToProps, mapDispatchToProps)(renderMembers);

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