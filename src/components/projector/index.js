import React from 'react';
import Recurrences from '../recurrences/Recurrences';
import DateRangeInput from '../form/date/DateRangeInput';
import IntitialBalance from '../form/initialBalance/InitialBalance';
import Chart from '../chart';
import './projector.scss';

const AllRecurrences = () => (
  <div>
    <div className="primary-fields">
      <DateRangeInput type='startDate' label='Start' />
      <DateRangeInput type='endDate' label='End' />
      <IntitialBalance type='initialBalance' label='Balance' />
    </div>
    <div className='recurrences'>
      <Recurrences type='income' className='recurrenceTable' />
      <Recurrences type='outcome' className='recurrenceTable' />
    </div>
    <Chart />
  </div>
);

export default AllRecurrences
