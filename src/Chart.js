import React from 'react';
import { LineChart } from 'react-easy-chart';
import { connect } from 'react-redux';
import { generateChartData,
  generateTransactions
  } from './helperFunctions';

const mapStateToProps = state => (
  {
    selectingFormValues: state.form.selectingFormValues,
  }
);

const Chart = ({selectingFormValues}) => {
  const transactionData = generateTransactions(selectingFormValues);

  return (
    <div className="Chart">

      <LineChart
        xType={'time'}
        axes
        grid
        verticalGrid
        width={750}
        height={250}
        data={[transactionData]}
      />

    </div>
  );
};

export default connect(mapStateToProps)(Chart);
