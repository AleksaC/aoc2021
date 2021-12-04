import fs from "fs";

(() => {
  const [inputPath, ...rest] = process.argv.slice(2);
  if (!inputPath || rest.length !== 0) {
    console.log(
      "Input path needs to be specified, no other arguments are accepted!"
    );
    process.exit(1);
  }

  const input = fs.readFileSync(inputPath, "utf8");

  const [drawInputs, ...boardInputs] = input.split("\n\n");

  const draw = drawInputs.split(",").map((num) => parseInt(num));

  const boardSize = 5;
  let boardRows = [];
  let boardColumns = [];

  for (const board of boardInputs) {
    const columns = [];
    for (const boardRow of board.trim().split("\n")) {
      const row = new Set();
      boardRows.push(row);

      const numbers = boardRow
        .trim()
        .replaceAll("  ", " ")
        .split(" ")
        .map((num) => parseInt(num));

      numbers.forEach((num, index) => {
        row.add(num);
        if (index >= columns.length) {
          columns.push(new Set());
        }
        columns[index].add(num);
      });
    }
    boardColumns.push(...columns);
  }

  for (const num of draw) {
    let bingo = new Set();

    boardRows.forEach((row, idx) => {
      if (row.has(num)) {
        row.delete(num);
      }
      if (row.size === 0) {
        const boardNum = Math.floor(idx / boardSize) * boardSize;
        bingo.add(boardNum);
      }
    });

    boardColumns.forEach((col, idx) => {
      if (col.has(num)) {
        col.delete(num);
      }
      if (col.size === 0) {
        const boardNum = Math.floor(idx / boardSize) * boardSize;
        bingo.add(boardNum);
      }
    });

    if (bingo.size > 0) {
      if (boardColumns.length === boardSize * boardInputs.length) {
        const boardNum = Array.from(bingo).pop();
        const res =
          boardColumns
            .slice(boardNum, boardNum + boardSize)
            .reduce((sum, col) => {
              return sum + Array.from(col).reduce((sum, num) => sum + num, 0);
            }, 0) * num;
        console.log(`Part one: ${res}`);
      } else if (boardColumns.length === boardSize) {
        const res =
          boardColumns.reduce((sum, col) => {
            return sum + Array.from(col).reduce((sum, num) => sum + num, 0);
          }, 0) * num;
        console.log(`Part two: ${res}`);
        process.exit(0);
      }
    }
    boardColumns = boardColumns.filter((_, idx) => {
      return !bingo.has(Math.floor(idx / boardSize) * boardSize);
    });
    boardRows = boardRows.filter((_, idx) => {
      return !bingo.has(Math.floor(idx / boardSize) * boardSize);
    });
  }
})();
