import React from 'react';
import { connect } from 'react-redux';
import { generateTransactions } from '../helperFunctions';
import ReactEcharts from 'echarts-for-react';

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
    chartData.push({name: item.description, value: [item.date.toISOString(), item.finalBalancePence/100]})
  });

  const formatDate = (date) => {
    const parsedDate = new Date(date)
    return parsedDate.getDate() + '/' + (parsedDate.getMonth() + 1) + '/' + parsedDate.getFullYear()
  }

  const option = {
    tooltip : {
      trigger: 'axis',
      formatter: function (params) {
        params = params[0];
        var date = new Date(params.value[0]);
        return `${formatDate(date)}: ${params.name}<br>£${params.value[1]}`;
      },
    },
    legend: {
      data:['balance']
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    grid: {
      left: '3%',
      right: '3%',
      bottom: '3%',
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
        name:'name',
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
        onChartReady={this.onChartReadyCallback}
        onEvents="  "
        opts=""
      />
    </div>
  );
};

export default connect(mapStateToProps)(Chart);
