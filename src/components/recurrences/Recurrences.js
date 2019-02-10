import React from 'react';
import { path } from 'ramda'
import {
  Field,
  FieldArray,
  reduxForm,
  change,
} from 'redux-form';
import {
  IconButton,
  withStyles,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails as MuiExpansionPanelDetails,
  TextField,
  Select,
  MenuItem,
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

import {
  Table,
  TableBody,
  TableCell as MuiTableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';

const SelectInput = ({input, options, className}) => 
  <Select className={`${className}`} {...input}>
      {options.map((x) =>
        <MenuItem key={x.description} value={x.value}>{x.description}</MenuItem>
      )}
  </Select>

const renderField = (
  {
    input,
    label,
    type,
    className,
    meta: { touched, error },
  }
) => (
  <div>
      <TextField
        {...input}
        className={className}
        type={type}
        placeholder={label} 
        inputProps={{
          className,
        }}
      />
      {touched && error && <span>{error}</span>}
  </div>
);

const renderDatePicker = ({ input, className, meta: { touched, error } }) => (
  <div>
    <DatePicker
      customInput={<TextField />}
      name={input.name}
      onChange={ (a) => input.onChange(moment(a)) }
      dateFormat="dd-MM-yyyy"
      popperClassName="date-picker-popper"
      popperPlacement="bottom-end"
      selected={input.value ? new Date(input.value) : null}
      className={className}
    />
    {touched && error && <span>{error}</span>}
  </div>
);

const renderDateField = (member, regularity) => {
  const className = 'date'
  switch (regularity) {
    case 'weekly':
    // Use ISO weekday convention (http://momentjs.com/docs/#/get-set/iso-weekday/)
      const WeeklyList =[
        { value: 2, description: 'Tue' },
        { value: 3, description: 'Wed' },
        { value: 4, description: 'Thu' },
        { value: 5, description: 'Fri' },
        { value: 6, description: 'Sat' },
        { value: 7, description: 'Sun' },
       ];
      return (
        <Field
          name={`${member}.recurrenceDate`}
          component={SelectInput}
          options={WeeklyList}
          className={className}
        />
      )
    case 'monthly':
      const MonthlyList = Array.from(new Array(31), (val, index) => ({value: index+1, description: index+1}) );
      return <Field
              name={`${member}.recurrenceDate`}
              component={SelectInput}
              options={MonthlyList}
              className={className}

            />
    case 'quaterly':
    case '4 weekly':
      return <Field
              name={`${member}.recurrenceDate`}
              component={renderDatePicker}
              className={className}
             />;
    case 'daily':
    case 'week daily':
    default:
      return <div className={className} />;
  }
};

const ExpansionPanelDetails = withStyles(() => ({
  root: {
    padding: '0px 3px 5px',
  },
}))(MuiExpansionPanelDetails);

const TableCell = withStyles(() => ({
  root: {
    padding: '2px',
    '&:last-child': { padding: '0' },
    '&:first-child': { paddingLeft: '0'},
  },
}))(MuiTableCell);

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
          <div className='table-container'>
            <Table className="table">
              <TableHead>
                <TableRow className="table-row">
                  <TableCell className="description" >Name</TableCell>
                  <TableCell className="amount" >Value (£)</TableCell>
                  <TableCell className="regularity" >Occurs</TableCell>
                  <TableCell className="date" >Date</TableCell>
                  <TableCell className="remove" ></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  fields.map((member, index) => (
                    <TableRow className="table-row" key={index}>
                      <TableCell>
                        <Field
                          name={`${member}.description`}
                          type="text"
                          component={renderField}
                          className='description'
                        />
                      </TableCell>
                      <TableCell>
                        <CurrencyField
                          name={`${member}.cost`}
                          className='amount'
                        />
                      </TableCell>
                      <TableCell>
                        <Field
                          name={`${member}.regularity`}
                          component={SelectInput}
                          className='regularity'
                          options={RECURRENCE_OPTIONS}
                          onChange={() => {
                            props.changeFormValue(selectingFormValues, member, type, index, 'recurrenceDate', null)
                          }}
                        />
                      </TableCell>
                      <TableCell>
                          { renderDateField(member, selectingFormValues[fields.name][index].regularity) }
                      </TableCell>
                      <TableCell className='remove'>
                        <IconButton aria-label="Delete">
                          <Delete onClick={() => fields.remove(index)}/>
                        </IconButton>
                      </TableCell>
                    </TableRow>)
                  )}
              </TableBody>              
            </Table>
            <div className='add-button'>
              <AddCircle onClick={() => fields.push({})} />
            </div>
          </div>
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

let FieldArraysForm = (props) => (
  <div className={props.className}>
    <FieldArray name={props.type} props={{type: props.type}} component={renderMembersConnected} />
  </div>
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