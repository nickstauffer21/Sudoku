import React, { useEffect, useState } from "react";

export default function SolveBoard({ sudBoard, setSudBoard }) {
  const [isShown, setIsShown] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [fixedCells, setFixedCells] = useState(
    sudBoard.map((row) => row.map((cell) => cell !== ""))
  );
  const [solvedBoard, setSolvedBoard] = useState(sudBoard);

  useEffect(() => {
    setFixedCells(sudBoard.map((row) => row.map((cell) => cell !== "")));
  }, [sudBoard]);

  const squareIndex = (row, col) => {
    return Math.floor(row / 3) * 3 + Math.floor(col / 3);
  };

  const checkIsValid = async (board) => {
    try {
      setIsValid(true);
      const rows = new Array(9).fill().map(() => new Set());
      const columns = new Array(9).fill().map(() => new Set());
      const squares = new Array(9).fill().map(() => new Set());

      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          if (board[i][j] === "") {
            continue;
          }

          if (rows[i].has(board[i][j])) {
            setIsValid(false);
          }
          rows[i].add(board[i][j]);

          if (columns[j].has(board[i][j])) {
            setIsValid(false);
          }
          columns[j].add(board[i][j]);

          if (squares[squareIndex(i, j)].has(board[i][j])) {
            setIsValid(false);
          }
          squares[squareIndex(i, j)].add(board[i][j]);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    checkIsValid(sudBoard);
  }, [sudBoard]);

  const solve = async () => {
    const solveRecurse = async (board, row, col) => {
      if (row === 9) return board;

      if (fixedCells[row][col]) {
        const [nextRow, nextCol] = getNextCell(row, col);
        return solveRecurse(board, nextRow, nextCol);
      }

      for (let num = 1; num <= 9; num++) {
        const strNum = num.toString();
        if (isValidPlacement(board, row, col, strNum)) {
          board[row][col] = strNum;

          const [nextRow, nextCol] = getNextCell(row, col);
          const result = await solveRecurse(board, nextRow, nextCol);
          if (result) return result;
          board[row][col] = "";
        }
      }
      return false;
    };

    const boardCopy = sudBoard.map((row) => [...row]);
    const solved = await solveRecurse(boardCopy, 0, 0);
    if (solved) setSudBoard(solved);
  };

  const getNextCell = (row, col) => {
    return col === 8 ? [row + 1, 0] : [row, col + 1];
  };

  const isValidPlacement = (board, row, col, num) => {
    for (let i = 0; i < 9; i++) {
      if (board[row][i] === num || board[i][col] === num) return false;
    }
    const squareStartRow = Math.floor(row / 3) * 3;
    const squareStartCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[squareStartRow + i][squareStartCol + j] === num) return false;
      }
    }

    return true;
  };

  useEffect(() => {
    setSolvedBoard(sudBoard);
  }, [sudBoard]);

  return (
    <>
      <div>
        <button onClick={() => checkIsValid(sudBoard)}>Check</button>
        <button
          onClick={async () => {
            if (!isValid) return;
            await solve();
          }}
        >
          Solve
        </button>
        <h3>{isValid ? "True" : "False"}</h3>
      </div>
    </>
  );
}
