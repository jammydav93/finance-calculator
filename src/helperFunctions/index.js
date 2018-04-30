import moment from 'moment';

export function generateTransactions(selectingFormValues) {
  const initBalance = 100;
  let allRecurrences = [];

  if (selectingFormValues && selectingFormValues.values) {
    const values = selectingFormValues.values;
      if (values.income) {
        values.income.forEach((item) => {item.type = 'incoming'} );
        allRecurrences = allRecurrences.concat(values.income);
      }
      if (values.outcome) {
        values.outcome.forEach((item) => {item.type = 'outgoing'} );
        allRecurrences = allRecurrences.concat(values.outcome);
      }
  }

  let startDate, endDate, runningDate;

  if (selectingFormValues && selectingFormValues.values) {
    startDate = moment(selectingFormValues.values.startDate);
    runningDate = moment(selectingFormValues.values.startDate);
    endDate = moment(selectingFormValues.values.endDate);
  }

  if (startDate, endDate){
    const oneDay = 1000 * 60 * 60 * 24;
    const transactions = [];
    const daysDifference = endDate.diff(startDate, 'days');

    for (let x = 0; x <= daysDifference; x++) {
      for (let i = 0; i < allRecurrences.length; i++) {
        //console.log('allRecurr[i]', allRecurrences[i]);
        const regularity = allRecurrences[i].regularity;
        const transactionDate = allRecurrences[i].transactionDate;
        if (
          (regularity === 'daily')
        //     (regularity === 'weekdays' && runningDate._d.getDay() > 0 && runningDate._d.getDay() < 6 ) ||
        //     (regularity === 'monthly' && transactionDate === runningDate._d.getDate()) ||
        //     (regularity === '4 weekly' && (runningDate._d.getDOY() - transactionDate._d.getDOY()) % 28 === 0 ) ||
        //     (regularity === 'quaterly' && transactionDate._d.getDate() === runningDate._d.getDate() && (runningDate._d.getMonth() - transactionDate._d.getMonth()) % 3 === 0 ) ||
        //     (regularity === 'weekly' && transactionDate === runningDate._d.getDay ())
        ) {
          const itemInitBalance = transactions.length > 0 ?
            parseFloat(transactions[transactions.length - 1].finalBalance) :
            parseFloat(initBalance);
          const cost = allRecurrences[i].type === 'outgoing' ?
            parseFloat(0 - allRecurrences[i].cost) :
            parseFloat(allRecurrences[i].cost);
          transactions.push({
            //transactionID: transactions.length,
            date: runningDate.format('D-MMM-YY'),
            description: allRecurrences[i].description,
            cost,
            initBalance: itemInitBalance,
            finalBalance: itemInitBalance + cost,
            y: itemInitBalance + cost,
            x: runningDate.format('D-MMM-YY'),
          });
        }
    runningDate = runningDate.add(1, 'day');
      }
    }

    // No need to sort by date as already generated in order.
    return transactions;
  }

  else {
    return [
      {
        x: moment().format('D-MMM-YY'),
        y: 10,
      },
      {
        x: moment().add(2, 'day').format('D-MMM-YY'),
        y: 12,
      }
    ]
  }

}
