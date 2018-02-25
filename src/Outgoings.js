import React from 'react';

class Outgoings extends React.Component {
  render() {
    return (
      <form>
        <h4>{this.props.title}:</h4>
        {this.props.outgoings.map((outgoing, idx) => (
          <div key={'outgoingDiv'+idx} classdescription='outgoing'>
            <input
              type='text'
              key='description'
              placeholder={`Outgoing #${idx + 1} description`}
              name='description'
              value={outgoing.description}
              onChange={this.props.handleChange(idx)}
            />
            <input
              type='number'
              key='cost'
              placeholder={`Outgoing #${idx + 1} cost`}
              name='cost'
              pattern='[0-9]'
              min='0'
              step='0.01'
              value={outgoing.cost}
              onChange={this.props.handleChange(idx)}
            />
            <select
              type='text'
              key='regulairty'
              placeholder={`regularity`}
              name='regularity'
              value={outgoing.regularity}
              onChange={this.props.handleChange(idx)}
            >
              {this.props.recurrenceOptions.map((x) =>
                <option key={x} value={x}>{x}</option>
              )}
            </select>
            <input
              type='number'
              key='transactionDate'
              placeholder={`transactionDate`}
              name='transactionDate'
              min='1'
              max='31'
              step='1'
              value={outgoing.transactionDate}
              onChange={this.props.handleChange(idx)}
            />

          <button key='removeButton' type='button' onClick={this.props.handleRemove(idx)} classdescription='small'>-</button>
          </div>
        ))}
        <button type='button' onClick={this.props.handleAdd} classdescription='small'>{this.props.buttonDescrip}</button>
      </form>
    )
  }
}

export default Outgoings;
