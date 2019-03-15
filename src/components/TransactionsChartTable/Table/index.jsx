import React from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@material-ui/core';
import PropTypes from 'prop-types';

import { formatCost } from '../../../helperFunctions';

const renderDaysTransactions = daysTransactions => (
  <ul>
    {daysTransactions.map(transaction => (
      <li>
        {`${transaction.description} (${formatCost(transaction.cost)})`}
      </li>
    ))}
  </ul>
);

const Chart = ({ transactions }) => {
  if (transactions.length < 1) {
    return null;
  }

  return (
    <div className="transactions-table">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Transactions</TableCell>
            <TableCell align="right">Balance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map(row => (
            <TableRow key={row.id}>
              <TableCell align="right">{row.date}</TableCell>
              <TableCell align="right">{renderDaysTransactions(row.daysTransactions)}</TableCell>
              <TableCell align="right">{formatCost(row.finalBalancePence / 100)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

Chart.propTypes = {
  transactions: PropTypes.array.isRequired,
};

export default Chart;
