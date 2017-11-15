//npm install -g create-react-app
//create-react-app my-app
//cd my-app
//rm -f src/*

import React from 'react';
import ReactDOM from 'react-dom';

import {cyan500} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import './index.css';

const muiTheme = getMuiTheme({
  palette: {
    textColor: cyan500,
  },
});

//react components can have state . In order to initialise the state, we need to add a constrcutor
//Whenever this.setState is called an update to the componet is scheduled.
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  )}

  //This is square's render method. We want the square to show the value board's
  //square value, so we passed the value prop into this render method.
  //We can give methods props too. Here we are giving the Squares
  //render method a onClick prop to make the Square component interactive
//   render() {
//     return (
//       <button className="square" onClick={() =>
//         this.props.onClick({value:'X'})}>
//         {this.props.value}
//       </button>
//     );
//   }
// }

//Board is a react Component
//renderSquare is the method for the Square Component
//value represents a prop of Square and Board's renderSquare method
//now has the prop of value.
//Add a constructor with an array containing 9 nulls
class Board extends React.Component {
  constructor(props) {
    super(props);
  this.state = {
    squares: Array(9).fill(null),
    xIsNext: true,
    };
  }
//Square now receives its value from its parent Board and informs its parent
//when it's clicked.
// In Board's constructor, we default the first move to be 'X' by modifying the
// starting state.
// Each time amove is made we will toggle xIsNext by flipping the boolean.
// Here we have changed the 'setState' method of the click handler
// to flip the boolean to the opposite of whatever xIsNext was with the !.
  handleClick(i) {
    const squares =this.state.squares.slice();
    if(calculateWinner(squares) || squares[i]){
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  renderSquare(i) {
    return <Square
      value={this.state.squares[i]}
      onClick={() => this.handleClick(i)}
    />;
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsnNext ? 'X' : 'O');
    }

    return (
      <div>
        <div className="header"><h1> Tic Tac Toe </h1></div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
        <div className="footer"><p> TicTacToe by Morgan Hirsch with React JS </p></div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
