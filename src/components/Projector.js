import React from 'react';
import Recurrences from './Recurrences';
import DateRangeInput from './DateRangeInput';
import IntitialBalance from './InitialBalance';
import Chart from './Chart.js';
import './projector.scss';

const AllRecurrences = () => (
  <div>
    <div>
      <DateRangeInput className='inline-block' type='startDate' label='Start Date' />
      <IntitialBalance className='inline-block' type='initialBalance' label='Current Balance' />
      <DateRangeInput className='inline-block' type='endDate' label='End Date' />
    </div>
    <div>
      <Recurrences type='income' className='recurrences' />
      <Recurrences type='outcome' className='recurrences' />
    </div>
    <Chart />
  </div>
);

export default AllRecurrences
