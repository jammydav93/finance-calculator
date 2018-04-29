import React from 'react';
import Recurrences from './Recurrences';
import Chart from '../Chart.js';
import { generateTransactions } from '../helperFunctions';
import { connect } from 'react-redux';

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
        {this.props.selectingFormValues}
        <Recurrences type='income'/>
        <Recurrences type='outcome'/>
        <Chart showChart='true'/>
      </div>
    )
  }
}

const AllRecurrencesConnected = connect(mapStateToProps)(AllRecurrences);

export default AllRecurrencesConnected
