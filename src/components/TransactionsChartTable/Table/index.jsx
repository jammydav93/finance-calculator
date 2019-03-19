import React from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import './index.scss';
import { formatCost, formatDate } from '../../../helperFunctions';

const renderDaysTransactions = daysTransactions => (
  <ul>
    {daysTransactions.map(({ cost, description }) => (
      <li>
        {`${description}${cost ? ` (${formatCost(cost)})` : ''}`}
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
            <TableCell className="date">Date</TableCell>
            <TableCell className="descriptions">Transactions</TableCell>
            <TableCell className="balance">Balance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map(row => (
            <TableRow key={row.id}>
              <TableCell>{formatDate(row.date)}</TableCell>
              <TableCell>{renderDaysTransactions(row.daysTransactions)}</TableCell>
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
