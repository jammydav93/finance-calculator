import React from 'react';
import { connect } from 'react-redux';
import { prop, is } from 'ramda'
import { generateTransactions } from '../../helperFunctions';
import ReactEcharts from 'echarts-for-react';

const mapStateToProps = state => (
  {
    selectingFormValues: state.form.selectingFormValues,
  }
);

const Chart = ({selectingFormValues}) => {
  const transactionData = generateTransactions(prop('values', selectingFormValues));

  if (transactionData.length <= 1) {
    return null;
  }

  const chartData = [];
  
  transactionData.forEach(function(item) {
    chartData.push({name: item.description, costPence: item.costPence, value: [item.date.toISOString(), item.finalBalancePence/100]})
  });

  const formatDate = (date) => {
    const parsedDate = new Date(date)

    return parsedDate.getDate() + '/' + (parsedDate.getMonth() + 1) + '/' + parsedDate.getFullYear()
  }

  const formatCost = (amount) => amount
    ? new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(amount)
    : ''

  const option = {
    tooltip : {
      trigger: 'axis',
      formatter: function (params) {
        params = params[0];
        const date = new Date(params.value[0]);
        const formattedDescription = is(Array, params.name)
          ? params.name.reduce(
              (accumulator, current) =>  accumulator + `<br>${current.description} (${current.cost >= 0 ? '+' : ''}${formatCost(current.cost)})`, ''
            )
          : ''
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
        axisLabel : {
          formatter: '£{value}'
        }
      }
    ],
    series : [
      {
        type:'line',
        step: 'end',
        data: chartData,
      }
    ]
  };

  return (
    <div className="Chart">
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
