import moment from 'moment';

export function generateTransactions(formDataValues) {
  let allRecurrences = [];

  const toPence = (a) => a ? parseInt(parseFloat(a.replace(/,/g, "")) * 100, 10) : 0

  if (formDataValues) {
    const values = formDataValues;
      if (values.income) {
        values.income.forEach((item) => { 
          item.type = 'incoming'
          item.costPence = toPence(item.cost)
        });
        allRecurrences = allRecurrences.concat(values.income);
      }
      if (values.outcome) {
        values.outcome.forEach((item) => {
          item.type = 'outgoing'
          item.costPence = toPence(item.cost)
        });
       allRecurrences = allRecurrences.concat(values.outcome);
      }
  }

  console.log('all=', allRecurrences)

  let startDate, endDate, runningDate, initBalancePence;

  if (formDataValues) {
    startDate = moment(formDataValues.startDate);
    runningDate = moment(formDataValues.startDate);
    endDate = moment(formDataValues.endDate);
    initBalancePence = toPence(formDataValues.initialBalance) || 0;
  }

  if (startDate && endDate) {
    const transactions = [];
    const daysDifference = endDate.diff(startDate, 'days');

    transactions.push({
      transactionID: -1,
      date: moment(startDate),
      description: 'Initial balance',
      cost: null,
      initBalancePence,
      finalBalancePence: initBalancePence,
    });

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
          const itemInitBalancePence = transactions[transactions.length - 1].finalBalancePence

          const cost = allRecurrences[i].type === 'outgoing' ?
            0 - allRecurrences[i].cost :
            allRecurrences[i].cost;

          const costPence = allRecurrences[i].type === 'outgoing' ?
            0 - allRecurrences[i].costPence :
            allRecurrences[i].costPence;

          transactions.push({
            transactionID: transactions.length,
            date: moment(runningDate),
            description: allRecurrences[i].description,
            cost,
            costPence,
            initBalancePence: itemInitBalancePence,
            finalBalancePence: itemInitBalancePence + costPence,
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
