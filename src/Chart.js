import React, { Component } from 'react';
import { LineChart } from 'react-easy-chart';
import ToolTip from './ToolTip';

class Chart extends Component {
  constructor(props) {
    super(props);

    this.mouseOverHandler = this.mouseOverHandler.bind(this);
    this.mouseOutHandler = this.mouseOutHandler.bind(this);
    this.mouseMoveHandler = this.mouseMoveHandler.bind(this);

    this.state = {
      showToolTip: true,
    };
  }

  mouseOverHandler(d, e) {
    this.setState({
      showToolTip: true,
      top: `${e.screenY - 1000}px`,
      left: `${e.screenX + 1000}px`,
      y: d.y,
      x: d.x});
  }

  mouseMoveHandler(e) {
    if (this.state.showToolTip) {
      this.setState({top: `${e.y - 10}px`, left: `${e.x + 10}px`});
    }
  }

  mouseOutHandler() {
    this.setState({showToolTip: true});
  }

  createTooltip() {
    console.log(this.state.showToolTip);
    if (this.state.showToolTip) {
      return (
        <ToolTip
          top={this.state.top}
          left={this.state.left}
        >
            The x value is {this.state.x} and the y value is {this.state.y}
        </ToolTip>
      );
    }
    return false;
  }

  render() {
    if (this.props.showChart){
      return (
        <div className="Chart">
          {this.props.test}
          <LineChart
            axes
            dataPoints
            grid
            xDomainRange={[0, 100]}
            yDomainRange={[0, 100]}
            mouseOverHandler={this.mouseOverHandler}
            mouseOutHandler={this.mouseOutHandler}
            mouseMoveHandler={this.mouseMoveHandler}
            width={700}
            height={350}
            data={this.props.balanceData}
          />
        </div>
      );
    }
    return <p>no chart</p>
  }
}

export default Chart;
