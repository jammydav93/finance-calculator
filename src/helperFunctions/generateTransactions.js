import moment from 'moment';
import { isEmpty, map } from 'ramda';
import {
  DAILY,
  MONTHLY,
  WEEKDAYS,
  FOUR_WEEKLY,
  QUATERLY,
  WEEKLY,
  LAST_MONTHLY_WEEKDAY,
  ONE_OFF,
  INCOMING_TRANSACTION,
  OUTGOING_TRANSACTION,
} from '../constants/recurrences';

const toPence = a => (a ? parseInt(parseFloat(a.replace(/,/g, '')) * 100, 10) : 0);

const costPenceReducer = transactions => transactions.reduce(
  (accumulator, currentValue) => accumulator + currentValue.costPence, 0,
);

const getLastWorkingDay = (initDate) => {
  const isWeekday = initDate.isoWeekday() < 6;

  if (isWeekday) {
    return initDate;
  }
  const nextDate = initDate.clone().subtract(1, 'day');
  return getLastWorkingDay(nextDate);
};

// Mon-Fri = 1-5
const isIsoWeekday = date => date.isoWeekday() < 6;

const isMonthly = (runningDate, recurrenceDate) => recurrenceDate
  && runningDate.date() === parseInt(recurrenceDate, 10);

const isFourWeekly = (runningDate, recurrenceDate) => recurrenceDate
  && (runningDate.dayOfYear() - moment(recurrenceDate).dayOfYear()) % 28 === 0;

const isQuaterly = (runningDate, recurrenceDate) => recurrenceDate
  && runningDate.date() === moment(recurrenceDate).date()
  && (runningDate.month() - moment(recurrenceDate).month()) % 3 === 0;

const isWeekly = (runningDate, recurrenceDate) => recurrenceDate
  && runningDate.isoWeekday() === parseInt(recurrenceDate, 10);

const isSameDate = (date1, date2) => date1.isSame(date2, 'day');

const isLastMontlyWeekday = (runningDate) => {
  const lastWeekdayOfMonth = getLastWorkingDay(runningDate.clone().endOf('month'));
  return isSameDate(runningDate, lastWeekdayOfMonth);
};

const shouldAddTransaction = (regularity, runningDate, recurrenceDate) => {
  switch (regularity) {
    case DAILY:
      return true;
    case WEEKDAYS:
      return isIsoWeekday(runningDate);
    case MONTHLY:
      return isMonthly(runningDate, recurrenceDate);
    case FOUR_WEEKLY:
      return isFourWeekly(runningDate, recurrenceDate);
    case QUATERLY:
      return isQuaterly(runningDate, recurrenceDate);
    case WEEKLY:
      return isWeekly(runningDate, recurrenceDate);
    case LAST_MONTHLY_WEEKDAY:
      return isLastMontlyWeekday(runningDate);
    case ONE_OFF:
      return isSameDate(runningDate, recurrenceDate);
    default:
      return false;
  }
};

const generateTransactions = (formDataValues = {}) => {
  const {
    startDate,
    endDate,
    income,
    outcome,
  } = formDataValues;

  const hasRequiredValues = startDate && endDate && (income || outcome);

  if (!hasRequiredValues) {
    return [];
  }

  const incomeRecurrences = formDataValues.income
    ? map(i => ({
      ...i,
      type: INCOMING_TRANSACTION,
      costPence: toPence(i.cost),
    }), formDataValues.income)
    : [];

  const outcomeRecurrences = formDataValues.outcome
    ? map(i => ({
      ...i,
      type: OUTGOING_TRANSACTION,
      costPence: toPence(i.cost),
    }), formDataValues.outcome)
    : [];

  const allRecurrences = incomeRecurrences.concat(outcomeRecurrences);

  const loopStartDate = moment(formDataValues.startDate);
  const loopEndDate = moment(formDataValues.endDate);
  const initBalancePence = toPence(formDataValues.initialBalance) || 0;

  let runningDate = moment(formDataValues.startDate).add(1, 'day');

  if (loopStartDate && loopEndDate) {
    const transactions = [];
    const daysDifference = loopEndDate.diff(loopStartDate, 'days');

    transactions.push({
      transactionID: 0,
      date: loopStartDate.toISOString(),
      daysTransactions: [{ description: 'Initial balance' }],
      initBalancePence,
      finalBalancePence: initBalancePence,
    });

    for (let x = 0; x < daysDifference; x += 1) {
      const daysTransactions = [];
      const dayInitialBalance = transactions[transactions.length - 1].finalBalancePence;

      for (let i = 0; i < allRecurrences.length; i += 1) {
        const {
          regularity,
          recurrenceDate,
        } = allRecurrences[i];

        if (shouldAddTransaction(regularity, runningDate, recurrenceDate)) {
          const cost = allRecurrences[i].type === OUTGOING_TRANSACTION
            ? Number(0 - allRecurrences[i].cost)
            : Number(allRecurrences[i].cost);

          const costPence = allRecurrences[i].type === OUTGOING_TRANSACTION
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
          date: runningDate.toISOString(),
          daysTransactions,
          initBalancePence: dayInitialBalance,
          finalBalancePence: dayInitialBalance + totalCostPence,
        });
      } else {
        transactions.push({
          transactionID: transactions.length,
          date: runningDate.toISOString(),
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
