
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import $ from 'jquery'; 

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      
      <div>
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
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true,
      Player1:"Player1",
      Player2:"Player2"
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "🍎" : "🍊";
    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

  onChangeHandler =  name => event =>{    
    this.setState({
      [name]:event.target.value
    }) 
  }

  onClickHandler =  name => event =>{    
    this.setState({
      [name]:""
    }) 
  }
  
  componentDidMount(){

    $("header").append("<div class='glitch-window'></div>");
    //fill div with clone of real header
    $( "h1.glitched" ).clone().appendTo( ".glitch-window" );

  }
  
  

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    var Player1= this.state.Player1;
    var Player2= this.state.Player2;
    

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move ' + move :
        'Restart';
      return (
        <li key={move}>
          <button className="btn1" onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + (this.state.xIsNext ?  Player2+"🍊" : Player1+"🍎" );
    } else if (this.state.stepNumber > 8){
      status = "Match Tied";

    }else {
      status = "Next player: " + (this.state.xIsNext ? Player1+"🍎" : Player2+"🍊" );
    }

    return (
      <div>
        <header class="header">
          <h1 class="glitched">TIC TAC TOE</h1>
        </header>
        <input name="Player1" id="Player1" type="text" value={this.state.Player1} onChange={this.onChangeHandler("Player1")} onClick={this.onClickHandler("Player1")} class="form-control" /><br/>
        <input name="Player2" id="Player2" type="text" value={this.state.Player2} onChange={this.onChangeHandler("Player2")} onClick={this.onClickHandler("Player2")}  class="form-control" /> 
        <div className="game">
          <div className="game-board">
            <Board
              squares={current.squares}
              onClick={i => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div className="status rotate-scale-up">{status}</div>
            <ol >{moves}</ol>
          </div>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
