import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Chart from './Chart.js';
import Outgoings from './Outgoings.js';

const recurrenceOptions = ['weekly', 'monthly', 'quaterly'];

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      outgoings: [{ description: '', cost: '', regulairty: '', transactionDate: '' }],
    };
  }

  handleOutgoingChange = (idx) => (evt) => {
    console.log('targetname=', evt.target.name);
    const newoutgoings = this.state.outgoings.map((outgoing, sidx) => {
      if (idx !== sidx) return outgoing;
      return { ...outgoing, [evt.target.name]: evt.target.value };
    });

    this.setState({ outgoings: newoutgoings });
  }

  handleSubmit = (evt) => {
    evt.preventDefault;
    for (let i=0; i < this.state.outgoings.length; i++){
      console.log(this.state.outgoings[i]);
    }
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
      <Outgoings
        outgoings={this.state.outgoings}
        handleOutgoingChange={this.handleOutgoingChange}
        handleAddOutgoing={this.handleAddOutgoing}
        handleRemoveOutgoing={this.handleRemoveOutgoing}
        handleSubmit={this.handleSubmit}
      />
    )
  }
}

export default App;
