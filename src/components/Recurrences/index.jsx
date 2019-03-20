import React from 'react';
import { path } from 'ramda';
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
  Select as MuiSelect,
  MenuItem,
  Table,
  TableBody,
  TableCell as MuiTableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import {
  AddCircle,
  Delete,
  ExpandMore as ExpandMoreIcon,
} from '@material-ui/icons';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { connect } from 'react-redux';
import moment from 'moment';
import styles from './index.module.scss';
import { RECURRENCE_OPTIONS, WEEKLY_OPTIONS } from '../../constants';
import CurrencyField from '../Form/Currency';
// import validate from './validate'


const Select = withStyles(() => ({
  root: {
    div: { width: '100%' },
  },
}))(MuiSelect);

const SelectInput = ({ input, options }) => (
  <Select className={styles.select} {...input}>
    {options.map(x => <MenuItem key={x.description} value={x.value}>{x.description}</MenuItem>)}
  </Select>
);

SelectInput.propTypes = {
  input: PropTypes.object.isRequired,
  options: PropTypes.array.isRequired,
};

const RenderField = (
  {
    input,
    label,
    type,
    className,
  },
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
  </div>
);

RenderField.defaultProps = {
  label: '',
  className: '',
};

RenderField.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string,
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
};


const RenderDatePicker = ({ input, className }) => (
  <div>
    <DatePicker
      customInput={<TextField />}
      name={input.name}
      onChange={a => input.onChange(moment(a))}
      dateFormat="dd-MM-yyyy"
      popperClassName="date-picker-popper"
      popperPlacement="bottom-end"
      selected={input.value ? new Date(input.value) : null}
      className={className}
    />
  </div>
);

RenderDatePicker.defaultProps = {
  className: '',
};

RenderDatePicker.propTypes = {
  input: PropTypes.object.isRequired,
  className: PropTypes.string,
};

const renderDateField = (member, regularity) => {
  const className = 'date';
  switch (regularity) {
    case 'weekly':
      return (
        <Field
          name={`${member}.recurrenceDate`}
          component={SelectInput}
          options={WEEKLY_OPTIONS}
        />
      );
    case 'monthly': {
      const MonthlyList = Array.from(
        new Array(31), (val, index) => ({ value: index + 1, description: index + 1 }),
      );

      return (
        <Field
          name={`${member}.recurrenceDate`}
          component={SelectInput}
          options={MonthlyList}
        />
      );
    }
    case 'quaterly':
    case '4 weekly':
      return (
        <Field
          name={`${member}.recurrenceDate`}
          component={RenderDatePicker}
          className={className}
        />
      );
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
    input: { width: '100%' },
    padding: '2px',
    '&:last-child': { padding: '0' },
    '&:first-child': { paddingLeft: '0' },
  },
}))(MuiTableCell);

const showDateCol = (selectingFormValues, type, index) => {
  const regularity = path([type, index, 'regularity'], selectingFormValues);
  const regularityConfig = RECURRENCE_OPTIONS.find(i => i.description === regularity);

  return regularityConfig && regularityConfig.showDateColumn;
};


const RenderMembers = (props) => {
  const {
    formExpandedDefault,
    selectingFormValues,
    type,
    fields,
    changeFormValue,
  } = props;

  const title = type === 'income' ? 'Incomes' : 'Outgoings';
  const itemCount = fields.length;

  return (
    <React.Fragment>
      <ExpansionPanel defaultExpanded={formExpandedDefault}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          {`${title} (${itemCount})`}
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div className={styles['table-container']}>
            <Table className={styles.table}>
              <TableHead>
                <TableRow className={styles['table-row']}>
                  <TableCell className={styles.description}>Name</TableCell>
                  <TableCell className={styles.amount}>Value (£)</TableCell>
                  <TableCell className={styles.regularity}>Occurs</TableCell>
                  <TableCell className={styles.date}>Date</TableCell>
                  <TableCell className={styles.remove} />
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  fields.map((member, index) => {
                    const shouldShowDateCol = showDateCol(selectingFormValues, type, index);
                    return (
                      <TableRow className={styles['table-row']} key={fields.get(index)}>
                        <TableCell>
                          <Field
                            name={`${member}.description`}
                            type="text"
                            component={RenderField}
                            className={styles.description}
                          />
                        </TableCell>
                        <TableCell>
                          <CurrencyField
                            name={`${member}.cost`}
                            className={styles.aomunt}
                          />
                        </TableCell>
                        <TableCell colSpan={shouldShowDateCol ? 1 : 2}>
                          <Field
                            name={`${member}.regularity`}
                            component={SelectInput}
                            options={RECURRENCE_OPTIONS}
                            onChange={() => {
                              changeFormValue(selectingFormValues, member, type, index, 'recurrenceDate', null);
                            }}
                          />
                        </TableCell>
                        { shouldShowDateCol
                          && (
                          <TableCell>
                            {
                              renderDateField(
                                member,
                                selectingFormValues[fields.name][index].regularity,
                              )
                            }
                          </TableCell>
                          )
                        }
                        <TableCell className={styles.remove}>
                          <IconButton aria-label="Delete">
                            <Delete onClick={() => fields.remove(index)} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })
                }
              </TableBody>
            </Table>
            <div className={styles['add-button']}>
              <AddCircle onClick={() => fields.push({})} />
            </div>
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </React.Fragment>
  );
};

RenderMembers.defaultProps = {
  fields: [],
};

RenderMembers.propTypes = {
  formExpandedDefault: PropTypes.bool.isRequired,
  selectingFormValues: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  fields: PropTypes.object,
  changeFormValue: PropTypes.func.isRequired,
};

const mapStateToProps = state => (
  {
    selectingFormValues: path(['form', 'selectingFormValues', 'values'], state),
  }
);

const mapDispatchToProps = dispatch => ({
  changeFormValue: (selectingFormValues, member, type, index, key, value) => {
    const previousData = selectingFormValues[type][index];
    dispatch(change(['selectingFormValues'], member, { ...previousData, [key]: value }));
  },
});

const renderMembersConnected = connect(mapStateToProps, mapDispatchToProps)(RenderMembers);

const FieldArrayContainer = ({ className, type, formExpandedDefault }) => (
  <div className={className}>
    <FieldArray
      name={type}
      props={{ type, formExpandedDefault }}
      component={renderMembersConnected}
    />
  </div>
);

FieldArrayContainer.propTypes = {
  className: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  formExpandedDefault: PropTypes.bool.isRequired,
};

const FieldArrayForm = reduxForm({
  form: 'selectingFormValues',
  enableReinitialize: true,
})(FieldArrayContainer);

const FieldArrayFormConnected = connect(
  state => ({
    initialValues: path(['recurrencesState', 'formData'], state),
  }),
)(FieldArrayForm);

export default FieldArrayFormConnected;
