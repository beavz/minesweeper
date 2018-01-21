import React, { Component } from 'react';
import './Square.css';

class Square extends Component {

  render() {
    const reveal = this.props.reveal;
    const handleClick =  () => {
      reveal(this.props.i);
    }

    let className = "square";
    if (this.props.revealed) { className += ' revealed' }
    return (
      <div className={className} onClick={handleClick}>
        { this.props.revealed ? this.props.count : '' }
      </div>
    );
  }
}

export default Square;
