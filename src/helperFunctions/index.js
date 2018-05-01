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
            && runningDate.date() === parseInt(recurrenceDate)
          ) ||
          (regularity === '4 weekly' && recurrenceDate
            && (runningDate.dayOfYear() - moment(recurrenceDate).dayOfYear()) % 28 === 0
          ) ||
          (regularity === 'quaterly' && recurrenceDate
            && runningDate.date() === moment(recurrenceDate).date()
            && (runningDate.month() - moment(recurrenceDate).month()) % 3 === 0
          ) ||
          (regularity === 'weekly' && recurrenceDate
            && runningDate.isoWeekday() === parseInt(recurrenceDate)
          )
        ) {
          const itemInitBalance = transactions.length > 0 ?
            parseFloat(transactions[transactions.length - 1].finalBalance) :
            parseFloat(initBalance);
          const cost = allRecurrences[i].type === 'outgoing' ?
            parseFloat(0 - allRecurrences[i].cost) :
            parseFloat(allRecurrences[i].cost);
          transactions.push({
            transactionID: transactions.length,
            date: moment(runningDate),
            description: allRecurrences[i].description,
            cost,
            initBalance: itemInitBalance,
            finalBalance: itemInitBalance + cost,
          });
        }
    runningDate = runningDate.add(1, 'day');
      }
    }

    // No need to sort by date as already generated in order.
    return transactions;
  }
  else {
    return []
  }
}
