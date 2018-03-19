import React, { Component } from 'react';
import { LineChart } from 'react-easy-chart';


class Chart extends Component {
  constructor(props) {
    super(props);

    this.mouseOverHandler = this.mouseOverHandler.bind(this);
    this.mouseOutHandler = this.mouseOutHandler.bind(this);
    this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
    this.generateChartData = this.generateChartData.bind(this);
    this.state = {
      showToolTip: false,
      z: null,
    };
  }

  generateChartData = (transactions) => {
    var data = []

    for (let i=0; i < transactions.length; i++){
      const transaction = transactions[i];

      // Format the x timestamp as per react-easy-chart documentation (e.g.
      // 2-Jan-17)

      const t = transaction.date;
      const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ];
      const date = t.getDate() + '-' + months[t.getMonth()] + '-' + t.getFullYear().toString().substring(2);

      data.push({
        x: date,
        y: transaction.finalBalance,
        z: transaction.description,
      })
    }
    return [data]
  }

  mouseOverHandler(d, e) {
    this.setState({
      showToolTip: true,
      top: `${e.screenY - 1000}px`,
      left: `${e.screenX + 1000}px`,
      y: d.y,
      x: d.x,
      z: d.z}
    );
  }

  mouseMoveHandler(e) {
    if (this.state.showToolTip) {
      this.setState({top: `${e.y}px`, left: `${e.x}px`});
    }
  }

  mouseOutHandler() {
    this.setState({showToolTip: false});
  }

  createTooltip() {
    console.log('should sghiw tool tip!');
    if (this.state.showToolTip) {
      return (
        <div>
            Date = {this.state.x}, Description = {this.state.z}, remaining balance = £{this.state.y}
        </div>
      );
    }
    return (
      <div>
        Select a data point for details
      </div>
    );
  }

  render() {
    if (this.props.showChart){
      const data = this.generateChartData(this.props.transactions);
      console.log(data);
      return (
        <div className="Chart">
          {this.props.test}
          {this.createTooltip()}
          <LineChart
            axes
            dataPoints
            grid
            xType={'time'}
            mouseOverHandler={this.mouseOverHandler}
            mouseOutHandler={this.mouseOutHandler}
            mouseMoveHandler={this.mouseMoveHandler}
            width={700}
            height={350}
            data={data}
          />
        </div>
      );
    }
    return null;
  }
}

export default Chart;
