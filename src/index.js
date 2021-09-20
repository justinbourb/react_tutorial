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
    renderSquare(i) {
        // returns the values from the squares Array, expect X, O, null
        // passes down props "this.state.value and this.props.value from Board to Square
        return <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)}/>;
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

// creates a game
class Game extends React.Component {
    /*
    this.history will store the array containing moves, one array stored for each move taken
    this.state = {squares} will store the state of each square, intialized as null
    this.xIsNext: keeps track of the turns in the game
     */
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
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
        /*
        The const declaration creates a read-only reference to a value. It does not mean the value it holds is
        immutable—just that the variable identifier cannot be reassigned.
         */

        // if the user clicks on one of the history buttons
        // any history after that point will be dropped
        const history = this.state.history.slice(0, this.state.stepNumber+1);
        const current = history[history.length-1];
        const squares = current.squares.slice();
        //exit function if there is a winner or the square is already filled
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        //toggle placing and X or an O based on xIsNext
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            // .concat() is used in a similar manner to .push(), however it does not mutate the original array
            history: history.concat([{
                squares:squares,
            }]),
            stepNumber: history.length,
            // toggle xIsNext true/false to track game moves
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        })
    }
    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        /*
        Using the map method, we can map our history of moves to React elements representing buttons on the screen,
        and display a list of buttons to “jump” to past moves.
         */
        const moves = history.map((step, move) => {
            const desc = move ? 'Go to move #' + move : 'Go to game start';
            return (
                /*
                key is a special and reserved property in React (along with ref, a more advanced feature).
                React uses the key property to create or destroy components on updates
                 */
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        let status;
        // check the game status, Winner, X turn or O turn
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={current.squares} onClick={(i) => this.handleClick(i)}/>
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
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

function calculateWinner(squares) {
    /*
    This function will calculate the winner of tic-tac-toe.
    cont lines stores all the possible winning combinations of tic-tact-toe
     */
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
    // loop through all winning combinations to check for a winner
    for (let i=0; i<lines.length; i++) {
        const [a, b, c] = lines[i];
        // check if the first square is filled a
        // && checks if squares b and c match a
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            // if yes there is a winner
            return squares[a];
        }
    }
    // else return null - no winner yet
    return null;
}