import React, { useState, useEffect } from "react";
import { Auth } from "./comps/auth";
import { fetchBoard } from "./GetAPI";
import { db } from "./firebase-config";
import { getDocs, collection, addDoc } from "firebase/firestore";
import "./App.css";

function Sudoku() {
  const [sudBoard, setSudBoard] = useState(
    Array(9)
      .fill()
      .map(() => Array(9).fill(""))
  );
  const [boards, setBoards] = useState([]);

  const boardsCollectionRef = collection(db, "test1");
  useEffect(() => {
    const getBoards = async () => {
      try {
        const data = await getDocs(boardsCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setBoards(filteredData);
      } catch (err) {
        console.error(err);
      }
    };
    getBoards();
  }, []);

  const handleBoardChange = (row, col, val) => {
    const newGrid = [...sudBoard];
    newGrid[row][col] = val;
    setSudBoard(newGrid);
  };

  const handleDifficulty = async (difficulty) => {
    try {
      const board = await fetchBoard(difficulty);
      setSudBoard(board);
    } catch (err) {
      throw err;
    }
  };

  return (
    <>
      <div>
        {boards.map((board) => (
          <div className="main-board">
            {sudBoard.map((row, rowIdx) =>
              row.map((cell, colIdx) => {
                const cellClasses = [
                  (rowIdx + 1) % 3 === 0 ? "bottom-border" : "",
                  (colIdx + 1) % 3 === 0 ? "right-border" : "",
                ].join(" ");
                return (
                  <div
                    key={`${rowIdx}-${colIdx}`}
                    className={`cells-default ${cellClasses}`}
                  >
                    <input
                      className="cell-item"
                      type="text"
                      value={cell}
                      maxLength="1"
                      onChange={(e) =>
                        handleBoardChange(rowIdx, colIdx, e.target.value)
                      }
                    />
                  </div>
                );
              })
            )}
          </div>
        ))}
      </div>
      <div className="board-difficulty">
        <button onClick={() => handleDifficulty("easy")}>Easy</button>
        <button onClick={() => handleDifficulty("medium")}>Medium</button>
        <button onClick={() => handleDifficulty("hard")}>Hard</button>
        <button onClick={() => handleDifficulty("random")}>Random</button>
      </div>
    </>
  );
}

export default Sudoku;
