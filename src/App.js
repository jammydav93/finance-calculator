import React from 'react';
import './App.css';
import Chart from './Chart.js';
import Outgoings from './Outgoings.js';
import {BootstrapTable,
       TableHeaderColumn} from 'react-bootstrap-table';
import '../node_modules/react-bootstrap-table/css/react-bootstrap-table.css'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import 'moment/locale/en-au'  // without this line it didn't work
moment.locale('en-au');

const recurrenceOptions = ['daily', 'weekdays', 'weekly', '4 weekly', 'monthly', 'quaterly'];

const divStyle = {
  backgroundColor: 'yellow',
  colour: 'black'
};

Date.prototype.isLeapYear = function() {
    var year = this.getFullYear();
    if((year & 3) !== 0) return false;
    return ((year % 100) !== 0 || (year % 400) === 0);
};

// Get Day of Year
Date.prototype.getDOY = function() {
    var dayCount = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    var mn = this.getMonth();
    var dn = this.getDate();
    var dayOfYear = dayCount[mn] + dn;
    if(mn > 1 && this.isLeapYear()) dayOfYear++;
    return dayOfYear;
};


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      startDate: moment(),
      endDate: moment().add(1, 'years'),
      initBalance: 500,
      outgoings: [{ description: 'Council Tax', cost: 42, debit: true, regularity: 'monthly', transactionDate: '' }],
      incomes: [{ description: 'James Salary', cost: 50, debit: false, regularity: 'monthly', transactionDate: '' }],
      transactions: [],
      showChart: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.handleOutgoingDateChange = this.handleOutgoingDateChange.bind(this);
  }

  handleStartDateChange(date) {
    this.setState({
      startDate: date
    });
  }

  handleEndDateChange(date) {
    this.setState({
      endDate: date
    });
  }

  generateTransactions = (outgoings, incomes, initBalance, startDate, endDate) => {


    let transactions = [];

    const one_day=1000*60*60*24;
    const daysDifference = (endDate - startDate)/one_day;

    let runningDate = moment(startDate);

    const allRecurrences= incomes.concat(outgoings);

    console.log('allrecurrences=', allRecurrences);

    for (let x=0; x <= daysDifference; x++){

      for (let i=0; i < allRecurrences.length; i++){
        const regularity = allRecurrences[i].regularity;
        const transactionDate = allRecurrences[i].transactionDate;

        console.log('init1-', initBalance);

        if (
          ( regularity === 'daily') ||
          ( regularity === 'weekdays' && runningDate._d.getDay() > 0 && runningDate._d.getDay() < 6 ) ||
          ( regularity === 'monthly' && transactionDate === runningDate._d.getDate()) ||
          ( regularity === '4 weekly' && (runningDate._d.getDOY() - transactionDate._d.getDOY()) % 28 === 0 ) ||
          ( regularity === 'quaterly' && transactionDate._d.getDate() === runningDate._d.getDate() && (runningDate._d.getMonth() - transactionDate._d.getMonth()) % 3 === 0 ) ||
          ( regularity === 'weekly' && transactionDate === runningDate._d.getDay ())
        ){
          console.log('init2-', initBalance);

          console.log('transacxtuibslenfgth', typeof transactions.length, transactions.length, transactions.length > 0 ? 0: initBalance);
          console.log('init', typeof initBalance, initBalance);

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

  handleOutgoingDateChange = (idx, a) => (evt) => {
    const mapProperty = a === 'incomes' ? this.state.incomes: this.state.outgoings;
    const newoutgoings = mapProperty.map((outgoing, sidx) => {
      if (idx !== sidx) return outgoing;
        if (outgoing.regularity === 'monthly' || outgoing.regularity === 'weekly'){
          return { ...outgoing, transactionDate: Number(evt.target.value) }
        }
        if (outgoing.regularity === 'quaterly' || outgoing.regularity === '4 weekly'){
          return { ...outgoing, transactionDate: evt };
        }
        return null;

    });
    this.setState({ [a]: newoutgoings });
}

  handleOutgoingChange = (idx) => (evt) => {
    const mapProperty = evt.target.title === 'incomes' ? this.state.incomes: this.state.outgoings;
    const newoutgoings = mapProperty.map((outgoing, sidx) => {
      console.log('evttitle=', evt.target.title)
      if (idx !== sidx) return outgoing;
      if (evt.target.name === 'cost') {
        console.log('c');
        return { ...outgoing, [evt.target.name]: Number(evt.target.value) };
      }
      if (evt.target.name === 'regularity'){
        return { ...outgoing,  'transactionDate': '', [evt.target.name]: evt.target.value };
      }
      return { ...outgoing, [evt.target.name]: evt.target.value };
    });
      this.setState({ [evt.target.title]: newoutgoings });
  }

  handleAddOutgoing = (evt) => {
    const mapProperty = evt.target.title === 'incomes' ? this.state.incomes: this.state.outgoings;
    const debit = evt.target.title === 'incomes' ? false: true;
      this.setState({
        [evt.target.title]: mapProperty.concat([{ description: '', cost: '', debit, regularity: 'monthly', transactionDate: ''}])
    });
  }

  handleRemoveOutgoing = (idx) => (evt) => {
    const mapProperty = evt.target.title === 'incomes' ? this.state.incomes: this.state.outgoings;
    this.setState({
      [evt.target.title]: mapProperty.filter((s, sidx) => idx !== sidx)
    });
  }

  handleChange(event) {
    this.setState({ initBalance: Number(event.target.value) });
  }

  handleSubmit = (evt) => {
    const outgoings = this.state.outgoings;
    const incomes = this.state.incomes;
    const initBalance = this.state.initBalance;
    const startDate = this.state.startDate._d;
    const endDate = this.state.endDate._d;
     this.setState({
       transactions: this.generateTransactions(outgoings, incomes, initBalance, startDate, endDate),
       showChart: true,
     })
  }

  render() {
    return (
      <div>

        <div style={divStyle}>
          <p>
            Visualise your cash flow! In the outgoings box, enter each of your
            regular expenses, and the date of the month they go out on.
            Enter the start date as today, and the end date for your next pay
            day (for example), and your current balance.

            Instantly understand your cash flow in an easy to use,
            interactive format!
          </p>
        </div>

        <table>
          <tr>
            <th>Starting Date</th>
            <th>Starting Balance</th>
            <th>End Date</th>
          </tr>
          <tr>
            <td>
              <DatePicker selected={this.state.startDate} onChange={this.handleStartDateChange}/>
            </td>
            <td>
              <input type="number" value={this.state.initBalance} onChange={this.handleChange} />
            </td>
            <td>
            <DatePicker selected={this.state.endDate} onChange={this.handleEndDateChange} />
            </td>
          </tr>
        </table>

        <Outgoings
          title='incomes'
          buttonDescrip='Add income'
          outgoings={this.state.incomes}
          recurrenceOptions={recurrenceOptions}
          handleChange={this.handleOutgoingChange}
          handleAdd={this.handleAddOutgoing}
          handleRemove={this.handleRemoveOutgoing}
          handleDateChange={this.handleOutgoingDateChange}
        />

        <Outgoings
          title='outgoings'
          buttonDescrip='Add outgoing'
          outgoings={this.state.outgoings}
          recurrenceOptions={recurrenceOptions}
          handleChange={this.handleOutgoingChange}
          handleAdd={this.handleAddOutgoing}
          handleRemove={this.handleRemoveOutgoing}
          handleDateChange={this.handleOutgoingDateChange}
        />

      <button type='button' onClick={this.handleSubmit} classdescription='small'>Update</button>

      <Chart showChart={this.state.showChart} transactions={this.state.transactions}/>

      <BootstrapTable data={this.state.transactions}>
          <TableHeaderColumn isKey dataField='transactionID'>
          ID
          </TableHeaderColumn>
          <TableHeaderColumn dataField='date'>
          Date
          </TableHeaderColumn>
          <TableHeaderColumn dataField='initBalance'>
          initBalance
          </TableHeaderColumn>
          <TableHeaderColumn dataField='description'>
          Description
          </TableHeaderColumn>
          <TableHeaderColumn dataField='cost'>
          Cost
          </TableHeaderColumn>
          <TableHeaderColumn dataField='finalBalance'>
          finalBalance
          </TableHeaderColumn>
        </BootstrapTable>
    </div>
    )
  }
}

export default App;
