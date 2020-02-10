import React, { Component } from 'react';

import Board from "./board";

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

class Game extends Component{
    constructor(props){
        super(props);
        this.state = {
            history : [
                { squares : Array(9).fill(null), }
            ],
            xIsNext : true,
            stepNumber: 0,
        }
    }

    handleClick = (i) => {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if(calculateWinner(squares) || squares[i]){
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([
                {
                    squares : squares,
                }
            ]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo = (step) => {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }
    

    render(){
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        console.log();

        const moves = history.map((step, move) => {
            const description = move ? 'Go to move #' + move : 'Start new game';
            return(
                <li key={move}>
                    <button className="history-btn" onClick={() => this.jumpTo(move)}>
                        {description}
                    </button>
                </li>
            )
        })

        let status;
        if(winner){
            status= 'Winner is : ' + winner;
        }
        else{
            status= 'Next player is : ' + (this.state.xIsNext ? 'X' : "O");
        }
        return(
            <div className="game-main">
                <div className="game">
                    <div className={winner ? "satsus-winer" : "status"}>{status}</div>
                </div>
                <div className="game">
                    <Board 
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    /> 
                    <ul>{moves}</ul>
                </div>
            </div>
        )
    }
}

export default Game