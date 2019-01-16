import React from 'react';
import { connect } from 'react-redux';
import { prop, is } from 'ramda'
import { generateTransactions } from '../../helperFunctions';
import ReactEcharts from 'echarts-for-react';
import './index.scss'
const mapStateToProps = state => (
  {
    selectingFormValues: state.form.selectingFormValues,
  }
);

const Chart = ({selectingFormValues}) => {
  const transactionData = generateTransactions(prop('values', selectingFormValues));

  if (transactionData.length < 1) {
    return null;
  }

  const chartData = transactionData.map(item => ({
      name: item.description, costPence: item.costPence, value: [item.date.toISOString(), item.finalBalancePence/100]
    })
  );

  const formatDate = (date) => {
    const parsedDate = new Date(date)

    return parsedDate.getDate() + '/' + (parsedDate.getMonth() + 1) + '/' + parsedDate.getFullYear()
  }

  const formatCost = (amount) => amount
    ? new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(amount)
    : '£0.00'

  const balancesArray = chartData.map(a => a.value[1]);

  const minYValue = Math.min(...balancesArray) - 500;
  const maxYValue = Math.max(...balancesArray) + 500;

  const option = {
    tooltip : {
      trigger: 'axis',
      formatter: function (params) {
        params = params[0];
        const date = new Date(params.value[0]);

        let formattedDescription

        if (is(Array, params.name)) {
          formattedDescription = params.name.reduce(
            (accumulator, current) =>  accumulator + `<br>${current.description} (${current.cost >= 0 ? '+' : ''}${formatCost(current.cost)})`, ''
          )
        } else {
          formattedDescription = `<br>${params.name}`
        }

        const balance = params.value[1]

        return `${formatDate(date)} -> ${formatCost(balance)}:${formattedDescription}`;
      },
    },
    legend: {
      data:['balance']
    },
    grid: {
      top: '20',
      left: '20',
      right: '40',
      bottom: '10',
      containLabel: true
    },
    xAxis : [
      {
        type : 'time',
        min: chartData[0].value[0],
        max: chartData[chartData.length -1].value[0],
        axisLabel: {
          formatter: (function(value){
            return formatDate(value);
          })
        },
        boundaryGap : false,
      }
    ],
    yAxis : [
      {
        type : 'value',
        min: minYValue,
        max: maxYValue,
        axisLabel : {
          formatter: (function(value){
            return formatCost(value);
          })
        },
      }
    ],
    series : [
      {
        type: 'line',
        step: 'end',
        data: chartData,
      }
    ]
  };

  return (
    <div className="chart">
      <ReactEcharts
        option={option}
        notMerge={true}
        lazyUpdate={true}
        theme={"theme_name"}
        onEvents=""
        opts=""
      />
    </div>
  );
};

export default connect(mapStateToProps)(Chart);
