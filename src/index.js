import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

/*
9-17-2021
React component class, or React component type. A component takes in parameters, called props
(short for “properties”), and returns a hierarchy of views to display via the render method.

entered with <Square value={i}/>
called with this.props.values  {this.props.value}

To collect data from multiple children, or to have two child components communicate with each other,
you need to declare the shared state in their parent component instead. The parent component can pass the
state back down to the children by using props; this keeps the child components in sync with each other and
with the parent component.
 */



// create the tic-tac-toe board
class Board extends React.Component {
    /*
    this.state = {squares} will store the state of each square, intialized as null
     */
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
        };
    }

    handleClick(i) {
        // create a copy of the squares array instead of modifying the original
        /*
        Benefits of immutability:
            1) Complex features become simple (detecting changes in data)
                a) mutable data requires checking the entire data set for changes
                b) if the immutable object does not equal the copy, then the object has changed
            2) Determining when to re-render in React
                a) immutable components are considered "pure components" in React.  Once a change is detected,
                    the components can be re-rendered.
                b) using built-in function shouldComponentUpdate()
         */
        const squares = this.state.squares.slice();
        //toggle placing and X or an O based on xIsNext
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            squares:squares,
            // toggle xIsNext true/false to track game moves
            xIsNext: !this.state.xIsNext,
        });
    }
    renderSquare(i) {
        // returns the values from the squares Array, expect X, O, null
        // passes down props "this.state.value and this.props.value from Board to Square
        return <Square value={this.state.squares[i]} onClick={() => this.handleClick(i)}/>;
    }

    render() {
        const status = 'Next player: X';
        return (
            <div>
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
            </div>
        );
    }
}

// creates a game
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

// props are passed down from the parent
function Square(props) {
    /*
    This function renders a square on the game board.  onClick fills the square
    with an X or an O based on the parents prop.value.
     */
    return(
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}



// create a tic-tac-toe square
// The square_component can be simplified into a function component, see function Square
// components that only contain a render method can be simplified in this way
class Square_component extends React.Component {
    render() {
        return (
            //this.props is inherited from the parent class Board
            <button className="square" onClick={()=> this.props.onClick()}>
                {this.props.value}
            </button>
        );
    }
}

// ============================

//render to the DOM
ReactDOM.render(
    <Game />,
    document.getElementById('root')
);

