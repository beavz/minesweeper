import React, { Component } from 'react';
import mine from './mine.svg';

class Mine extends Component {
  render() {
    const handleClick = () => {
      if (this.props.gameEnder === null) {
        this.props.endGame(this.props.i);
      }
    }

    const renderImage = () => {
      if (this.props.gameEnder !== null) {
        return <img src={mine} alt="mine"/>;
      } else {
        return '';
      }
    }

    let className = 'square';
    if (this.props.gameEnder === this.props.i) {
      className += ' exploded'
    } else if (this.props.gameEnder !== null) {
      className += ' revealed'
    }


    return (
      <div className={className} onClick={handleClick}>
        {renderImage()}
      </div>
    );
  }
}

export default Mine;
