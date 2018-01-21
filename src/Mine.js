import React, { Component } from 'react';
import mine from './mine.svg';

class Mine extends Component {
  render() {
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
      <div
        className={className}
        onClick={this.props.onClick}
        onContextMenu={this.props.onContextMenu}>
        { this.props.flagged ? 'F' : renderImage()}
      </div>
    );
  }
}

export default Mine;
