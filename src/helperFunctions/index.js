import moment from 'moment';
import { isEmpty, map } from 'ramda';

const generateTransactions = (formDataValues) => {
  const toPence = a => (a ? parseInt(parseFloat(a.replace(/,/g, '')) * 100, 10) : 0);

  const costPenceReducer = transactions => transactions.reduce(
    (accumulator, currentValue) => accumulator + currentValue.costPence, 0,
  );

  if (!formDataValues) {
    return [];
  }

  const incomeRecurrences = formDataValues.income
    ? map(i => ({ ...i, type: 'incoming', costPence: toPence(i.cost) }), formDataValues.income)
    : [];

  const outcomeRecurrences = formDataValues.outcome
    ? map(i => ({ ...i, type: 'outgoing', costPence: toPence(i.cost) }), formDataValues.outcome)
    : [];

  const allRecurrences = incomeRecurrences.concat(outcomeRecurrences);

  const startDate = moment(formDataValues.startDate).startOf('day').add(12, 'h');
  const endDate = moment(formDataValues.endDate).startOf('day').add(12, 'h');
  const initBalancePence = toPence(formDataValues.initialBalance) || 0;

  let runningDate = moment(formDataValues.startDate).startOf('day').add(1, 'day');

  if (startDate && endDate) {
    const transactions = [];
    const daysDifference = endDate.diff(startDate, 'days');

    transactions.push({
      transactionID: -1,
      date: moment(startDate),
      daysTransactions: [{ description: 'Initial balance' }],
      cost: null,
      costPence: null,
      initBalancePence,
      finalBalancePence: initBalancePence,
    });

    for (let x = 0; x <= daysDifference; x += 1) {
      const daysTransactions = [];
      const dayInitialBalance = transactions[transactions.length - 1].finalBalancePence;

      for (let i = 0; i < allRecurrences.length - 1; i += 1) {
        const {
          regularity,
          recurrenceDate,
        } = allRecurrences[i];

        if (
          (regularity === 'daily')
          || (regularity === 'weekdays' && runningDate.isoWeekday() < 6)
          || (regularity === 'monthly' && recurrenceDate
            && runningDate.date() === parseInt(recurrenceDate, 10)
          )
          || (regularity === '4 weekly' && recurrenceDate
            && (runningDate.dayOfYear() - moment(recurrenceDate).dayOfYear()) % 28 === 0
          )
          || (regularity === 'quaterly' && recurrenceDate
            && runningDate.date() === moment(recurrenceDate).date()
            && (runningDate.month() - moment(recurrenceDate).month()) % 3 === 0
          )
          || (regularity === 'weekly' && recurrenceDate
            && runningDate.isoWeekday() === parseInt(recurrenceDate, 10)
          )
        ) {
          const cost = allRecurrences[i].type === 'outgoing'
            ? 0 - allRecurrences[i].cost
            : allRecurrences[i].cost;

          const costPence = allRecurrences[i].type === 'outgoing'
            ? 0 - allRecurrences[i].costPence
            : allRecurrences[i].costPence;

          daysTransactions.push({
            description: allRecurrences[i].description,
            cost,
            costPence,
          });
        }
      }

      if (!isEmpty(daysTransactions)) {
        const totalCostPence = costPenceReducer(daysTransactions);

        transactions.push({
          transactionID: transactions.length,
          date: moment(runningDate),
          daysTransactions,
          initBalancePence: dayInitialBalance,
          finalBalancePence: dayInitialBalance + totalCostPence,
        });
      } else {
        transactions.push({
          transactionID: transactions.length,
          date: moment(runningDate),
          daysTransactions: [{ description: 'No transactions' }],
          initBalancePence: dayInitialBalance,
          finalBalancePence: dayInitialBalance,
        });
      }

      runningDate = runningDate.add(1, 'day');
    }

    // No need to sort by date as already generated in date order.
    return transactions;
  }

  return [];
};

export default generateTransactions;
