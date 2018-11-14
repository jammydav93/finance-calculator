import React from 'react';
import Recurrences from '../recurrences/Recurrences';
import DateRangeInput from '../form/date/DateRangeInput';
import IntitialBalance from '../form/initialBalance/InitialBalance';
import Chart from '../chart';
import './index.scss';

const AllRecurrences = () => (
  <div>
    <div>
      <DateRangeInput className='inline-block' type='startDate' label='Start date' />
      <DateRangeInput className='inline-block' type='endDate' label='End date' />
      <IntitialBalance className='inline-block' type='initialBalance' label='Current balance' />
    </div>
    <div>
      <Recurrences type='income' className='recurrences' />
      <Recurrences type='outcome' className='recurrences' />
    </div>
    <Chart />
  </div>
);

export default AllRecurrences
