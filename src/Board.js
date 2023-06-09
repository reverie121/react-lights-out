import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(initializeBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit
   * THIS IS NOW LEGACY. NEW BOARD CREATION SYSTEM IMPLEMENTED BELOW
   */
  // DONE: create array-of-arrays of true/false values
  // function createBoard() {
  //   let initialBoard = [];
  //   for (let i = 0; i < nrows; i++) {
  //     const newRow = [];
  //     for (let i = 0; i < ncols; i++) {
  //       newRow.push(Math.random() <= chanceLightStartsOn);
  //     }
  //     initialBoard.push(newRow);
  //   }
  //   return initialBoard;
  // }

  /** create a board nrows high/ncols wide, each cell unlit */
  function createBoard() {
    let initialBoard = [];

    for (let i = 0; i < nrows; i++) {
      const newRow = [];
      for (let i = 0; i < ncols; i++) {
        newRow.push(false);
      }
      initialBoard.push(newRow);
    }

    return initialBoard;
  }

  /** takes a new, unlit board and simulates clicking a new 
   * random cell between 25 and 50 times */
  function initializeBoard() {
    let board = createBoard();
    const randomIterations = 25 + Math.floor(Math.random() *26 );
    console.log(randomIterations)
    const flipCell = (y, x, board) => {
      // if this coord is actually on board, flip it
      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
      
    };
    for (let i = 0; i <= randomIterations; i++) {
      const y = Math.floor(Math.random() * nrows);
      const x = Math.floor(Math.random() * ncols);
      flipCell(y, x, board);
      flipCell(y+1, x, board);
      flipCell(y-1, x, board);
      flipCell(y, x+1, board);
      flipCell(y, x-1, board);
    }
    return board;
  }

  function hasWon() {
    // DONE: check the board in state to determine whether the player has won.
    const cellValues = board.flat();
    // If a true value is found in flattened board array, 
    // return false (player has not won). Otherwise
    // return true (player has won, all lights are out).

    return (cellValues.includes(Boolean(true))) ? false : true;
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);
      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // DONE: Make a (deep) copy of the oldBoard
      const newBoard = [...oldBoard];
      // DONE: in the copy, flip this cell and the cells around it
      flipCell(y, x, newBoard);
      flipCell(y+1, x, newBoard);
      flipCell(y-1, x, newBoard);
      flipCell(y, x+1, newBoard);
      flipCell(y, x-1, newBoard);
      // DONE: return the copy
      return newBoard;
    });
  }

  // if the game is won, just show a winning msg & render nothing else

  // DONE
  if (hasWon()) {
    return (<h1>Y<span className="o">o</span>u W<span className="o">o</span>n</h1>);
  }

  // make table board

  // DONE
  return (
    <div className="Board">
      {board.map((r, rIDX) => 
        <div>{r.map((c, cIDX) => <Cell flipCellsAroundMe={() => flipCellsAround(`${rIDX}-${cIDX}`)} isLit={c}/>)}</div>
      )}
    </div>
  )
}

Board.defaultProps = { nrows: 5, ncols: 5, chanceLightStartsOn: 0.35 };

export default Board;
