import React from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell as MuiTableCell,
  withStyles,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { formatCost, formatDate } from '../../../helperFunctions';

const TableCell = withStyles(() => ({
  root: {
    padding: '0 10px',
  },
}))(MuiTableCell);

const renderDaysTransactions = daysTransactions => (
  <div>
    {daysTransactions.map(({ cost, description }) => (
      <span>
        {`${description}${cost ? ` (${formatCost(cost)})` : ''}`}
        <br />
      </span>
    ))}
  </div>

);

const Chart = ({ transactions }) => {
  if (transactions.length < 1) {
    return null;
  }

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Transactions</TableCell>
            <TableCell>Balance</TableCell>
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
