import moment from 'moment';
import 'moment/locale/en-au'  // without this line it didn't work
moment.locale('en-au');

export function generateTransactions(allRecurrences, initBalance, startDate, endDate) {
  const transactions = [];

  const oneDay = 1000 * 60 * 60 * 24;
  const daysDifference = (endDate - startDate) / oneDay;

  let runningDate = moment(startDate);

  console.log('allrecurrences=', allRecurrences);

  for (let x = 0; x <= daysDifference; x++) {

    for (let i = 0; i < allRecurrences.length; i++) {
      const regularity = allRecurrences[i].regularity;
      const transactionDate = allRecurrences[i].transactionDate;

      if (
        (regularity === 'daily') ||
        (regularity === 'weekdays' && runningDate._d.getDay() > 0 && runningDate._d.getDay() < 6 ) ||
        (regularity === 'monthly' && transactionDate === runningDate._d.getDate()) ||
        (regularity === '4 weekly' && (runningDate._d.getDOY() - transactionDate._d.getDOY()) % 28 === 0 ) ||
        (regularity === 'quaterly' && transactionDate._d.getDate() === runningDate._d.getDate() && (runningDate._d.getMonth() - transactionDate._d.getMonth()) % 3 === 0 ) ||
        (regularity === 'weekly' && transactionDate === runningDate._d.getDay ())
      ) {
        const itemInitBalance = transactions.length > 0 ? transactions[transactions.length - 1].finalBalance : initBalance;
        const cost = allRecurrences[i].debit ? 0 - allRecurrences[i].cost : allRecurrences[i].cost;
        transactions.push({
          transactionID: transactions.length,
          date: new Date(runningDate._d),
          description: allRecurrences[i].description,
          cost,
          initBalance: itemInitBalance,
          finalBalance: itemInitBalance + cost,
        });
      }
    }
    runningDate = moment(runningDate).add(1, 'days');
  }

  // No need to sort by date as already generated in order.
  return transactions;
}
