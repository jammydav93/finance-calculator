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
      </span>
    ))}
  </div>

);

const Chart = ({ transactions }) => {
  if (transactions.length < 1) {
    return null;
  }

  return (
    <div className="transactions-table1">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className="trans-date">Date</TableCell>
            <TableCell className="descriptions">Transactions</TableCell>
            <TableCell className="balance">Balance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map(row => (
            <TableRow key={row.id}>
              <TableCell className="trans-date">{formatDate(row.date)}</TableCell>
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
