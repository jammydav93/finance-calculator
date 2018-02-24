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

const recurrenceOptions = ['monthly'];

const divStyle = {
  backgroundColor: 'yellow',
  colour: 'black'
};

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      startDate: moment(),
      endDate: moment().add(1, 'years'),
      initBalance: 500,
      outgoings: [{ description: 'Council Tax', cost: 42, regulairty: 'monthly', transactionDate: '9' }],
      transactions: [],
      showChart: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
  }

  handleOutgoingChange = (idx) => (evt) => {
    const newoutgoings = this.state.outgoings.map((outgoing, sidx) => {
      if (idx !== sidx) return outgoing;
      return { ...outgoing, [evt.target.name]: evt.target.value };
    });

    this.setState({ outgoings: newoutgoings });
  }

  generateTransactions = (outgoings) => {
    let transactions = [];

    const date1 = this.state.startDate._d;
    const date2 = this.state.endDate._d;

    const one_day=1000*60*60*24;
    const daysDifference = (date2 - date1)/one_day;

    let runningDate = date1;
    let transactionCount = 0;

    for (let x=0; x <= daysDifference; x++){
      for (let i=0; i < this.state.outgoings.length; i++){
        if (outgoings[i].transactionDate == runningDate.getDate()){
          const initBalance = transactionCount > 0 ? transactions[transactionCount - 1].finalBalance : this.state.initBalance;
          const cost = outgoings[i].cost
          console.log('running date = ', runningDate);
          transactions.push({
            transactionID: transactionCount,
             date: new Date(runningDate),
             description: outgoings[i].description,
             cost,
             initBalance,
             finalBalance: initBalance - cost,
           });
          transactionCount = transactionCount + 1;
        }
      }
      runningDate.setDate(runningDate.getDate() + 1);
    }

    // No need to sort by date as already generated in order.
    return transactions;
  }

  handleSubmit = (evt) => {
    evt.preventDefault;
    this.setState({
      transactions: this.generateTransactions(this.state.outgoings),
      showChart: true,
    })
  }

  handleAddOutgoing = () => {
    this.setState({
      outgoings: this.state.outgoings.concat([{ description: '', cost: '', regularity: '', transactionDate: ''}])
    });
  }

  handleRemoveOutgoing = (idx) => () => {
    this.setState({
      outgoings: this.state.outgoings.filter((s, sidx) => idx !== sidx)
    });
  }

  handleChange(event) {
    this.setState({initBalance: event.target.value});
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

        <p>
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
        </p>

        <Outgoings
          outgoings={this.state.outgoings}
          recurrenceOptions={recurrenceOptions}
          handleOutgoingChange={this.handleOutgoingChange}
          handleAddOutgoing={this.handleAddOutgoing}
          handleRemoveOutgoing={this.handleRemoveOutgoing}
          handleSubmit={this.handleSubmit}
        />

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
