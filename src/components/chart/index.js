import React from 'react';
import { connect } from 'react-redux';
import { prop, path } from 'ramda'
import { generateTransactions } from '../../helperFunctions';
import './index.scss'
import { Line } from 'react-chartjs-2';
import moment from 'moment'

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

  const chartData = transactionData.map(item => 
    ({ daysTransactions: item.daysTransactions, costPence: item.costPence, x: item.date.toISOString(), y: item.finalBalancePence/100 })
  );

  const formatCost = (amount) => new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(amount || 0)
  
  const lineColor = '#3cba9f'

  const data = {
      datasets: [
        {
          data: chartData,
          label: 'Balance',
          steppedLine: true,
          fill: false,
          backgroundColor: lineColor,
          borderColor: lineColor,
          pointBackgroundColor: lineColor,
          pointHoverBackgroundColor: lineColor,
          pointStyle: 'circle',
          pointRadius: 2,
          pointHoverRadius: 4,
        }
      ]
    };
    
    const options = {
      maintainAspectRatio: false,
      legend: {
        onClick: () => {}
      },
      scales: {
          xAxes: [{
              title: "time",
              type: 'time',
              gridLines: {
                  lineWidth: 2
              },
              time: {
                  unit: "day",
                  displayFormats: {
                      day: 'MMM DD',
                      week: 'MMM DD',
                  }
              }
          }],
          yAxes: [
            {
              ticks: {
                callback: (label) => formatCost(label)
              },
            }
          ]
      },
      tooltips: {
        mode: 'x',
        intersect: false,
        displayColors: false,
        callbacks: {
          title: (tooltipItems) => {
            const date = moment(tooltipItems[0].xLabel).format("DD/M/YYYY");
            const finalBalance = tooltipItems[0].yLabel
            return `${date} -> ${formatCost(finalBalance)}`
          },
          label: (tooltipItems, data) => { 
              const item = path(['datasets', [0], 'data', [tooltipItems.index]], data)
              return item.daysTransactions
                ? item.daysTransactions.map(
                  (t) => `${t.description}${t.cost ? ` (${formatCost(t.cost)})` : ''}`
                )
                : null
          },
        }
      },
      hover: {
        mode: 'x',
        intersect: false
      }
    }

  return (
    <div className='chart'> 
      <Line data={data} options={options}/>
    </div>
  )
};

export default connect(mapStateToProps)(Chart);
