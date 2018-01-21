import React, { Component } from 'react';
import './Square.css';

class Square extends Component {

  render() {
    const displayCount = (this.props.revealed && this.props.count > 0) ?
      this.props.count : '';

    const colors = [
      'noop',
      'blue',
      'green',
      'red',
      'navy',
      'purple',
      'cyan'
    ];

    const style = this.props.revealed ?
      { color: colors[this.props.count] } :
      { color: 'black' }

    let className = "square";
    if (this.props.revealed) { className += ' revealed' }

    return (
      <div
        style={style} className={className}
        onClick={this.props.onClick}
        onContextMenu={this.props.onContextMenu}>
        { this.props.flagged ? 'F' : displayCount }
      </div>
    );
  }
}

export default Square;
