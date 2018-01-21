import React, { Component } from 'react';
import Square from './Square';
import Mine from './Mine';
import faces from './faces.svg';
import { uniqueFilter, newState, bombCount, emptyNeighbors, revealed, isBomb } from './minesweeper.js';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = newState(10,20,40);
  }

  render() {
    const size = new Array(this.state.width*this.state.height).fill(undefined);

    const endGame = (i) => {
      this.setState({ gameEnder: i });
    }

    const reveal = i => {
      this.setState(
        { revealed: this.state.revealed.concat(squaresToReveal([i], this.state.revealed)) }
      );
    };

    const squaresToReveal = (is, revealed) => {
      if (is.length === 0) { return is; }

      const state = this.state;

      const immediateNeighborsToReveal = is
      .filter(i => (bombCount(i, state) === 0))
      .map(i => (emptyNeighbors(i, state)))
      .reduce((acc, val) => (acc.concat(val)), [])
      .filter(uniqueFilter)
      .filter(i => (revealed.indexOf(i) === -1 && !isBomb(i, state)));

      const allNeighborsToReveal = squaresToReveal(
        immediateNeighborsToReveal,
        revealed.concat(is)
      );

      return [...is, ...allNeighborsToReveal];
    }

    const renderSquare = (ud, i) => {
      if (isBomb(i, this.state)) {
        return <Mine i={i} key={i} endGame={endGame}/>
      } else {
        return (
          <Square
          i={i} key={i}
          count={bombCount(i, this.state)}
          revealed={revealed(i, this.state)}
          reveal={reveal} />
        );
      }
    };

    const style = {
      maxWidth: `${this.state.width * 26}px`,
      minWidth: `${this.state.width * 26}px`
    }


    return (
      <div className="App">
      <header>
        <img src={faces} alt="minesweeper-faces" />
      </header>
      <div className="board" style={style}>
      {size.map(renderSquare)}
      </div>
      </div>
    );
  }
}

export default App;
