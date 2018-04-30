import React from 'react';
import { connect } from 'react-redux';
import { generateTransactions } from '../helperFunctions';
import Recurrences from './Recurrences';
import DateRangeInput from './DateRangeInput';
import Chart from '../Chart.js';

const mapStateToProps = state => (
  {
    selectingFormValues: state.form.selectingFormValues,
  }
);

  // transactions: generateTransactions(allRecurrences, initBalance, startDate, endDate),
  // showChart: true,

class AllRecurrences extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      transactions: [],
      showChart: false,
    };
  }

  render() {
    return (
      <div>
        <DateRangeInput type='startDate' label='Start Date' />
        <DateRangeInput type='endDate' label='End Date' />
        <Recurrences type='income'/>
        <Recurrences type='outcome'/>
        <Chart />
      </div>
    )
  }
}

const AllRecurrencesConnected = connect(mapStateToProps)(AllRecurrences);

export default AllRecurrencesConnected
