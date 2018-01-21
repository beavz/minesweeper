import React, { Component } from 'react';
import './Mine.css';

class Mine extends Component {
  render() {
    const handleClick = () => {
      this.props.endGame(this.props.i);
    }

    return (
      <div className={`square`} onClick={handleClick}>
      { this.props.i }
      B
      </div>
    );
  }
}

export default Mine;
