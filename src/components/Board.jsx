import React, { Component } from 'react'
import Square from './Square'

export class Board extends Component {
    renderSquare(i, id) {
        return (
            <Square
                id={'square' + id} value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
                name={'button' + id}
            />
        )
    }

    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0, 1)}
                    {this.renderSquare(1, 2)}
                    {this.renderSquare(2, 3)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3, 4)}
                    {this.renderSquare(4, 5)}
                    {this.renderSquare(5, 6)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6, 7)}
                    {this.renderSquare(7, 8)}
                    {this.renderSquare(8, 9)}
                </div>
            </div>
        );
    }
}

export default Board