import React from 'react';
import { connect } from 'react-redux';
import Recurrences from './Recurrences';
import DateRangeInput from './DateRangeInput';
import IntitialBalance from './InitialBalance';
import Chart from './Chart.js';

const mapStateToProps = state => (
  {
    selectingFormValues: state.form.selectingFormValues,
  }
);

const AllRecurrences = () => (
  <div>
    <div className='ib'>
      <DateRangeInput type='startDate' label='Start Date' />
      <DateRangeInput type='endDate' label='End Date' />
      <IntitialBalance type='initialBalance' label='Initial Balance' />
    </div>
    <Recurrences type='income' />
    <Recurrences type='outcome' />
    <Chart />
  </div>
);

const AllRecurrencesConnected = connect(mapStateToProps)(AllRecurrences);

export default AllRecurrencesConnected
