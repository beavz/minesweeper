import React, { Component } from 'react';
import './Square.css';

class Square extends Component {

  render() {
    const reveal = this.props.reveal;
    const handleClick =  () => {
      if (!this.props.gameOver) {
        reveal(this.props.i);
      }
    }

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
    ]

    const style = this.props.revealed ?
      { color: colors[this.props.count] } :
      { color: 'black' }

    let className = "square";
    if (this.props.revealed) { className += ' revealed' }

    return (
      <div style={style} className={className} onClick={handleClick}>
        { displayCount }
      </div>
    );
  }
}

export default Square;
