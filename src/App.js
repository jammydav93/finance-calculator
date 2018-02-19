import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Chart from './Chart.js';

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
    const { description, outgoings } = this.state;
    alert(this.state.outgoings);
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
      <form onSubmit={this.handleSubmit}>
        <h4>outgoings</h4>

        {this.state.outgoings.map((outgoing, idx) => (
          <div classdescription="outgoing">
            <input
              type="text"
              placeholder={`Outgoing #${idx + 1} description`}
              name="description"
              value={outgoing.description}
              onChange={this.handleOutgoingChange(idx)}
            />
            <input
              type="text"
              placeholder={`Outgoing #${idx + 1} cost`}
              name="cost"
              value={outgoing.cost}
              onChange={this.handleOutgoingChange(idx)}
            />
            <select
              type="text"
              placeholder={`regularity`}
              name="regularity"
              value={outgoing.regularity}
              onChange={this.handleOutgoingChange(idx)}
            >
              <option value="weekly">Grapefruit</option>
              <option value="monthly">Lime</option>
              <option value="quaterly">Coconut</option>
            </select>
            <input
              type="text"
              placeholder={`transactionDate`}
              name="transactionDate"
              value={outgoing.transactionDate}
              onChange={this.handleOutgoingChange(idx)}
            />

            <button type="button" onClick={this.handleRemoveOutgoing(idx)} classdescription="small">-</button>
          </div>
        ))}
        <button type="button" onClick={this.handleAddOutgoing} classdescription="small">Add Outgoing</button>
        <button>Incorporate</button>
      </form>
    )
  }
}

export default App;
