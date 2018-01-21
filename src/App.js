import React, { Component } from 'react';
import Square from './Square';
import Mine from './Mine';
import { flagged, uniqueFilter, newState, bombCount, emptyNeighbors, revealed, isBomb } from './stateHelpers.js';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = newState(10,20,40);
  }

  render() {
    const size = new Array(this.state.width*this.state.height).fill(undefined);

    const endGame = i => {
      return (() => {
        if (this.state.gameEnder === null && !flagged(i, this.state)) {
          this.setState({ gameEnder: i });
        }
      });
    }

    const flag = i => {
      return ((e) => {
        e.preventDefault();

        if (this.state.gameEnder === null) {
          if (flagged(i, this.state)) {
            this.setState({ flagged: this.state.flagged.filter(e => (e !== i)) });
          } else {
            this.setState({ flagged: this.state.flagged.concat([i]) });
          }
        }
      });
    }

    const reveal = i => {
      return (() => {
        if (this.state.gameEnder === null && !flagged(i, this.state)) {
          this.setState(
            { revealed: this.state.revealed.concat(squaresToReveal([i], this.state.revealed)) }
          );
        }
      });
    }

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
        return (
          <Mine
            i={i}
            key={i}
            flagged={flagged(i, this.state)}
            onClick={endGame(i)}
            onContextMenu={flag(i)}
            gameEnder={this.state.gameEnder}/>
        );
      } else {
        return (
          <Square
            i={i}
            key={i}
            count={bombCount(i, this.state)}
            revealed={revealed(i, this.state)}
            flagged={flagged(i, this.state)}
            onClick={reveal(i)}
            onContextMenu={flag(i)}
            gameOver={this.state.gameEnder !== null} />
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
      </header>
      <div className="board" style={style}>
      {size.map(renderSquare)}
      </div>
      </div>
    );
  }
}

export default App;
