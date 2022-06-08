import React, { Component } from 'react'
import Board from './components/Board';

export class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [
                {
                    squares: Array(9).fill(null)
                }
            ],
            stepNumber: 0,
            next: true,
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (this.calculateWinner(squares).result || squares[i]) {
            return;
        }
        squares[i] = this.state.next ? "X" : "O";
        this.setState({
            history: history.concat([
                {
                    squares: squares
                }
            ]),
            stepNumber: history.length,
            next: !this.state.next
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            next: (step % 2) === 0
        });
    }

    calculateWinner(squares) {
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
                return { winner: squares[a], result: 1 };
            }
        }
        if (!squares.some(item => item === null)) {
            return { winner: false, result: 2 };
        } else {
            return { winner: false, result: 0 };
        }

    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const final = this.calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ?
                'Go to move #' + move :
                'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        let status;
        if (final.result === 1) {
            status = "Winner: " + final.winner;
        } else if (final.result === 2) {
            status = 'Tie'
        } else {
            status = "Next player: " + (this.state.next ? "X" : "O");
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

export default App;