import React from 'react';
import './App.css';
import Chart from './Chart.js';
import Outgoings from './Outgoings.js';
import {BootstrapTable,
       TableHeaderColumn} from 'react-bootstrap-table';
import '../node_modules/react-bootstrap-table/css/react-bootstrap-table.css'

const recurrenceOptions = ['weekly', 'monthly', 'quaterly'];

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      outgoings: [{ description: '', cost: '', regulairty: '', transactionDate: '' }],
      transactions: [],
    };
  }

  handleOutgoingChange = (idx) => (evt) => {
    const newoutgoings = this.state.outgoings.map((outgoing, sidx) => {
      if (idx !== sidx) return outgoing;
      return { ...outgoing, [evt.target.name]: evt.target.value };
    });

    this.setState({ outgoings: newoutgoings });
  }

  handleSubmit = (evt) => {
    evt.preventDefault;
    const outgoings = this.state.outgoings;
    let transactions = [];

    const date1 = new Date('November 27, 1995 03:24:00');
    const date2 = new Date('December 31, 1996 03:24:00');

    const one_day=1000*60*60*24;
    const daysDifference = (date2 - date1)/one_day;

    let runningDate = date1;
    for (let x=0; x <= daysDifference; x++){
      for (let i=0; i < this.state.outgoings.length; i++){

        if (outgoings[i].transactionDate == runningDate.getDate()){
          console.log('match!, date=', runningDate);
          transactions.push({
             date: new Date(runningDate),
             description: outgoings[i].description,
             cost: outgoings[i].cost
           });
        }

      }
      runningDate.setDate(runningDate.getDate() + 1);
    }

    // No need to sort by date as already generated in order.
    this.setState({ transactions: transactions })
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

  render() {
    return (
      <div>
        <Outgoings
          outgoings={this.state.outgoings}
          recurrenceOptions={recurrenceOptions}
          handleOutgoingChange={this.handleOutgoingChange}
          handleAddOutgoing={this.handleAddOutgoing}
          handleRemoveOutgoing={this.handleRemoveOutgoing}
          handleSubmit={this.handleSubmit}
        />

      <BootstrapTable data={this.state.transactions}>

          <TableHeaderColumn isKey dataField='date'>
          ID
          </TableHeaderColumn>

          <TableHeaderColumn dataField='description'>
          Description
          </TableHeaderColumn>

          <TableHeaderColumn dataField='cost'>
          Cost
          </TableHeaderColumn>


        </BootstrapTable>
    </div>
    )
  }
}

export default App;
