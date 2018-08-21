import React from 'react';
import { LineChart } from 'react-easy-chart';
import { connect } from 'react-redux';
import { generateTransactions } from '../helperFunctions';

const mapStateToProps = state => (
  {
    selectingFormValues: state.form.selectingFormValues,
  }
);

const Chart = ({selectingFormValues}) => {
  const transactionData = generateTransactions(selectingFormValues.values);

  if (transactionData.length === 0) {
    return null;
  }

  const chartData = [];

  transactionData.forEach(function(item) {
    chartData.push({x: item.date.format('D-MMM-YY'), y: item.finalBalance, description: item.description});
  });

  return (
    <div className="Chart">
      <LineChart
        xType={'time'}
        axes
        grid
        verticalGrid
        width={750}
        height={250}
        data={[chartData]}
      />

    </div>
  );
};

export default connect(mapStateToProps)(Chart);
