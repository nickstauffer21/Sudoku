export async function fetchBoard(difficulty) {
  try {
    const validDifficulties = ["easy", "medium", "hard", "random"];
    if (!validDifficulties.includes(difficulty)) {
      throw new Error(`Invalid difficulty: ${difficulty}`);
    }

    const response = await fetch(
      `https://sugoku.onrender.com/board?difficulty=${difficulty}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const board = data.board;

    const formatedBoard = board.map((row) =>
      row.map((col) => (col === 0 ? "" : col.toString()))
    );
    return formatedBoard;
  } catch (err) {
    throw err;
  }
}
