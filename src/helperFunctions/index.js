import moment from 'moment';

export function generateTransactions(formDataValues) {
  let allRecurrences = [];

  if (formDataValues) {
    const values = formDataValues;
      if (values.income) {
        values.income.forEach((item) => {item.type = 'incoming'} );
        allRecurrences = allRecurrences.concat(values.income);
      }
      if (values.outcome) {
        values.outcome.forEach((item) => {item.type = 'outgoing'} );
        allRecurrences = allRecurrences.concat(values.outcome);
      }
  }

  let startDate, endDate, runningDate, initBalance = 0;

  if (formDataValues) {
    startDate = moment(formDataValues.startDate);
    runningDate = moment(formDataValues.startDate);
    endDate = moment(formDataValues.endDate);
    initBalance = formDataValues.initialBalance ? formDataValues.initialBalance : 0;
  }


  if (startDate && endDate) {
    const transactions = [];
    const daysDifference = endDate.diff(startDate, 'days');

    for (let x = 0; x <= daysDifference; x++) {
      for (let i = 0; i < allRecurrences.length; i++) {
        const regularity = allRecurrences[i].regularity;
        const recurrenceDate = allRecurrences[i].recurrenceDate

        if (
          (regularity === 'daily') ||
          (regularity === 'weekdays' && runningDate.isoWeekday() < 6 ) ||
          (regularity === 'monthly' && recurrenceDate
            && runningDate.date() === parseInt(recurrenceDate, 10)
          ) ||
          (regularity === '4 weekly' && recurrenceDate
            && (runningDate.dayOfYear() - moment(recurrenceDate).dayOfYear()) % 28 === 0
          ) ||
          (regularity === 'quaterly' && recurrenceDate
            && runningDate.date() === moment(recurrenceDate).date()
            && (runningDate.month() - moment(recurrenceDate).month()) % 3 === 0
          ) ||
          (regularity === 'weekly' && recurrenceDate
            && runningDate.isoWeekday() === parseInt(recurrenceDate, 10)
          )
        ) {
          const itemInitBalance = transactions.length > 0 ?
            transactions[transactions.length - 1].finalBalance :
            initBalance;
          const cost = allRecurrences[i].type === 'outgoing' ?
            0 - allRecurrences[i].cost :
            allRecurrences[i].cost;
          
            transactions.push({
            transactionID: transactions.length,
            date: moment(runningDate),
            description: allRecurrences[i].description,
            cost,
            initBalance: itemInitBalance,
            finalBalance: itemInitBalance + cost,
          });
        }
      }
      runningDate = runningDate.add(1, 'day');
    }

    // No need to sort by date as already generated in order.
    return transactions;
  }
  else {
    return []
  }
}
