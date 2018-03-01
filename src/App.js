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

const recurrenceOptions = ['monthly', 'weekly', '4 weekly', 'quaterly'];

const divStyle = {
  backgroundColor: 'yellow',
  colour: 'black'
};

var weeknumber = moment("30-12-2018", "DD-MM-YYYY").isoWeek();
console.log(weeknumber);

Date.prototype.isLeapYear = function() {
    var year = this.getFullYear();
    if((year & 3) != 0) return false;
    return ((year % 100) != 0 || (year % 400) == 0);
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
  }

  handleOutgoingDateChange(date) {
    this.setState({
      startDate: date
    });
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

  generateTransactions = (outgoings) => {

    console.log(outgoings);

    let transactions = [];

    const date1 = this.state.startDate._d;
    const date2 = this.state.endDate._d;

    const one_day=1000*60*60*24;
    const daysDifference = (date2 - date1)/one_day;

    let runningDate = date1;
    let transactionCount = 0;

    const allRecurrences= this.state.incomes.concat(this.state.outgoings);

    for (let x=0; x <= daysDifference; x++){
      for (let i=0; i < allRecurrences.length; i++){

        const regularity = allRecurrences[i].regularity;
        const transactionDate = allRecurrences[i].transactionDate;

            if (
              ( regularity === 'monthly' && transactionDate === runningDate.getDate()) ||
              ( regularity === '4 weekly' && (runningDate.getDOY() - transactionDate._d.getDOY()) % 28 === 0 ) ||
              ( regularity === 'quaterly' && transactionDate._d.getDate() === runningDate.getDate() && (runningDate.getMonth() - transactionDate._d.getMonth()) % 3 === 0 ) ||
              ( regularity === 'weekly' && transactionDate === runningDate.getDay ())
            ){
              const initBalance = transactionCount > 0 ? transactions[transactionCount - 1].finalBalance : this.state.initBalance;
              const cost = allRecurrences[i].debit ? 0 - allRecurrences[i].cost : allRecurrences[i].cost;
              transactions.push({
                transactionID: transactionCount,
                 date: new Date(runningDate),
                 description: allRecurrences[i].description,
                 cost,
                 initBalance,
                 finalBalance: initBalance + cost,
               });
              transactionCount = transactionCount + 1;
            }
      }
      runningDate.setDate(runningDate.getDate() + 1);
    }

    // No need to sort by date as already generated in order.
    return transactions;
  }

  handleOutgoingChange = (idx) => (evt) => {
    console.log('change! = ', evt.target);
    const newoutgoings = this.state.outgoings.map((outgoing, sidx) => {
      if (idx !== sidx) return outgoing;
      if (evt.hasOwnProperty('_d')){
        return { ...outgoing, transactionDate: evt };
      }
      if (evt.target.name === 'cost') {
        return { ...outgoing, [evt.target.name]: Number(evt.target.value) };
      }
      if (evt.target.name === 'regularity'){
        console.log('a = ', { ...outgoing,  'transactionDate': '', [evt.target.name]: evt.target.value });
        return { ...outgoing,  'transactionDate': '', [evt.target.name]: evt.target.value };
      }
      if (evt.target.name === 'transactionDate') {
        if (outgoing.regularity === 'monthly' || outgoing.regularity === 'weekly'){
          return { ...outgoing, [evt.target.name]: Number(evt.target.value) };
        }
        if (outgoing.regularity === 'quaterly'){
          return { ...outgoing, [evt.target.name]: evt.target.value._d };
        }
      }
      return { ...outgoing, [evt.target.name]: evt.target.value };
    });

    this.setState({ outgoings: newoutgoings });
  }

  handleAddOutgoing = () => {
    this.setState({
      outgoings: this.state.outgoings.concat([{ description: '', cost: '', debit: true, regularity: 'monthly', transactionDate: ''}])
    });
  }

  handleRemoveOutgoing = (idx) => () => {
    this.setState({
      outgoings: this.state.outgoings.filter((s, sidx) => idx !== sidx)
    });
  }

  handleIncomeChange = (idx) => (evt) => {
    const newIncome = this.state.incomes.map((incoming, sidx) => {
      if (idx !== sidx) return incoming;
      if (evt.target.name === 'cost') {
        return { ...incoming, [evt.target.name]: Number(evt.target.value) };
      }
      return { ...incoming, [evt.target.name]: evt.target.value };
    });

    this.setState({ incomes: newIncome });
  }

  handleAddIncome = () => {
    this.setState({
      incomes: this.state.incomes.concat([{ description: '', cost: '', debit: false, regularity: 'monthly', transactionDate: ''}])
    });
  }

  handleRemoveIncome = (idx) => () => {
    this.setState({
      incomes: this.state.incomes.filter((s, sidx) => idx !== sidx)
    });
  }

  handleChange(event) {
    this.setState({initBalance: event.target.value});
  }

  handleSubmit = (evt) => {
    evt.preventDefault;
    this.setState({
      transactions: this.generateTransactions(this.state.outgoings),
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

        <p>
          <label>
            Starting Balance:
            <input type="number" value={this.state.initBalance} onChange={this.handleChange} />
          </label>
        </p>

          <label>
            Start Date:
            <DatePicker
            selected={this.state.startDate}
            onChange={this.handleStartDateChange}
            />
            End Date:
            <DatePicker
            selected={this.state.endDate}
            onChange={this.handleEndDateChange}
            />
          </label>

        <Outgoings
          title='Incomes'
          buttonDescrip='Add income'
          outgoings={this.state.incomes}
          recurrenceOptions={recurrenceOptions}
          handleChange={this.handleIncomeChange}
          handleAdd={this.handleAddIncome}
          handleRemove={this.handleRemoveIncome}
        />

        <Outgoings
          title='Outgoings'
          buttonDescrip='Add outgoing'
          outgoings={this.state.outgoings}
          recurrenceOptions={recurrenceOptions}
          handleChange={this.handleOutgoingChange}
          handleAdd={this.handleAddOutgoing}
          handleRemove={this.handleRemoveOutgoing}
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
