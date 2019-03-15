import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Tabs,
  Tab,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { prop } from 'ramda';

import { generateTransactions } from '../../helperFunctions';

import TransactionsChart from './Chart';
import TransactionsTable from './Table';

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
});

class SimpleTabs extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes, selectingFormValues } = this.props;
    const { value } = this.state;
    const transactionData = generateTransactions(prop('values', selectingFormValues)) || [];

    return (
      <div className={`${classes.root} chart`}>
        <AppBar position="static">
          <Tabs centered value={value} onChange={this.handleChange}>
            <Tab label="Chart" />
            <Tab label="Table" />
          </Tabs>
        </AppBar>
        {value === 0 && <TransactionsChart transactions={transactionData} />}
        {value === 1 && <TransactionsTable transactions={transactionData} />}
      </div>
    );
  }
}

SimpleTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  selectingFormValues: PropTypes.object.isRequired,
};

const mapStateToProps = state => (
  {
    selectingFormValues: state.form.selectingFormValues,
  }
);

export default connect(mapStateToProps)(withStyles(styles)(SimpleTabs));
