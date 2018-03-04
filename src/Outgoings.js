import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import 'moment/locale/en-au'  // without this line it didn't work

function DateField (props) {

  switch(props.outgoing.regularity){
    case 'monthly':
      const MonthlyList = Array.apply(null, {length: 31}).map(Number.call, Number);
      return <select
        type='text'
        key='regularity'
        placeholder={`regularity`}
        name='regularity'
        value={props.outgoing.transactionDate}
        onChange={props.onChange}
      >
      {MonthlyList.map((x) =>
        <option key={x} value={x}>{x}</option>
      )}
      </select>;

      case 'weekly':
        const WeeklyList =[
          { num: 0, day: 'Mon' },
          { num: 1, day: 'Tue' },
          { num: 2, day: 'Wed' },
          { num: 3, day: 'Thu' },
          { num: 4, day: 'Fri' },
          { num: 5, day: 'Sat' },
          { num: 6, day: 'Sun' },
         ];

        return <select
          type='text'
          key='regularity'
          placeholder={`regularity`}
          name='regularity'
          value={props.outgoing.transactionDate}
          onChange={props.onChange}
        >
        {WeeklyList.map((x) =>
          <option key={x.num} value={x.num}>{x.day}</option>
        )}
        </select>;
    case 'quaterly':
    case '4 weekly':
      const date = props.outgoing.transactionDate === '' ? null: moment(props.outgoing.transactionDate);
      return <DatePicker title={props.title} key='calendarInput' name='transactionDate' selected={date}  onChange={props.onChange} />;
    case 'daily':
    case 'week daily':
    default:
      return null;
  }
}

class Outgoings extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      recurranceType: 'monthly',
    };
  }

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
              title={this.props.title}
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
              title={this.props.title}
            />
            <select
              type='text'
              key='regularity'
              placeholder={`regularity`}
              name='regularity'
              value={outgoing.regularity}
              onChange={this.props.handleChange(idx)}
              title={this.props.title}
            >
              {this.props.recurrenceOptions.map((x) =>
                <option key={x} value={x}>{x}</option>
              )}
            </select>

            <DateField title={this.props.title} outgoing={outgoing} onChange={this.props.handleDateChange(idx, this.props.title)}/>

          <button title={this.props.title} key='removeButton' type='button' onClick={this.props.handleRemove(idx)} classdescription='small'>-</button>
          </div>
        ))}
        <button title={this.props.title} type='button' onClick={this.props.handleAdd} classdescription='small'>{this.props.buttonDescrip}</button>
      </form>
    )
  }
}

export default Outgoings;
