import { getInput } from '../../utils';

function extendStorageX(board: number[][], size: number) {
  let result = [...board];
  const delta = size - board[0].length;
  for (let i = 0; i < board.length; i++) {
    result[i] = [...result[i], ...new Array(delta).fill(0)];
  }

  return result;
}

function extendStorageY(board: number[][], size: number) {
  let result = [...board];
  const delta = size - board.length;
  for (let i = 0; i < delta; i++) {
    result = [...result, new Array(board[0].length).fill(0)];
  }

  return result;
}

function part1() {
  let lines = getInput().map((l) => l.split('->').map((p) => p.split(',').map(Number)));
  lines = lines.filter((l) => l[0][0] == l[1][0] || l[0][1] == l[1][1]);

  let board: number[][] = [];
  lines.forEach((line) => {
    let x = 0;
    let y = 0;
    let xMin = 0;
    let xMax = 0;
    let yMin = 0;
    let yMax = 0;
    if (line[0][0] == line[1][0]) {
      xMin = xMax = x = line[0][0];
      yMin = Math.min(line[0][1], line[1][1]);
      yMax = Math.max(line[0][1], line[1][1]);

      if (!board.length) {
        board = new Array(yMax + 1).fill(0).map(() => new Array(x + 1).fill(0));
      }
    } else if (line[0][1] == line[1][1]) {
      yMin = yMax = y = line[0][1];
      xMin = Math.min(line[0][0], line[1][0]);
      xMax = Math.max(line[0][0], line[1][0]);

      if (!board.length) {
        board = new Array(y + 1).fill(0).map(() => new Array(xMax + 1).fill(0));
      }
    }

    if (board.length < yMax + 1) {
      board = extendStorageY(board, yMax + 1);
    }

    if (board[0] && board[0].length < xMax + 1) {
      board = extendStorageX(board, xMax + 1);
    }

    if (x != 0) {
      for (let i = yMin; i <= yMax; i++) {
        board[i][x] += 1;
      }
    }

    if (y != 0) {
      for (let i = xMin; i <= xMax; i++) {
        board[y][i] += 1;
      }
    }
  });

  let count = 0;
  board.forEach((row) => {
    row.forEach((cell) => {
      if (cell >= 2) {
        count++;
      }
    });
  });

  return count;
}

function part2() {
  let lines = getInput().map((l) => l.split('->').map((p) => p.split(',').map(Number)));
  lines = lines.filter(
    (l) =>
      l[0][0] == l[1][0] ||
      l[0][1] == l[1][1] ||
      (l[0][0] - l[1][0] == l[0][1] - l[1][1]) ||
      (l[0][0] - l[1][0] == l[1][1] - l[0][1])
  );

  let board: number[][] = [];
  lines.forEach((line) => {
    let x = 0;
    let y = 0;
    let xMin = 0;
    let xMax = 0;
    let yMin = 0;
    let yMax = 0;
    let diag1 = false;
    let diag2 = false;
    if (line[0][0] == line[1][0]) {
      xMin = xMax = x = line[0][0];
      yMin = Math.min(line[0][1], line[1][1]);
      yMax = Math.max(line[0][1], line[1][1]);

      if (!board.length) {
        board = new Array(yMax + 1).fill(0).map(() => new Array(x + 1).fill(0));
      }
    } else if (line[0][1] == line[1][1]) {
      yMin = yMax = y = line[0][1];
      xMin = Math.min(line[0][0], line[1][0]);
      xMax = Math.max(line[0][0], line[1][0]);

      if (!board.length) {
        board = new Array(y + 1).fill(0).map(() => new Array(xMax + 1).fill(0));
      }
    } else if (line[0][0] - line[1][0] == line[0][1] - line[1][1]) {
      xMin = Math.min(line[0][0], line[1][0]);
      xMax = Math.max(line[0][0], line[1][0]);
      yMin = Math.min(line[0][1], line[1][1]);
      yMax = Math.max(line[0][1], line[1][1]);
      diag1 = true;

      if (!board.length) {
        board = new Array(yMax + 1).fill(0).map(() => new Array(xMax + 1).fill(0));
      }
    } else if (line[0][0] - line[1][0] == line[1][1] - line[0][1]) {
      xMin = Math.min(line[0][0], line[1][0]);
      xMax = Math.max(line[0][0], line[1][0]);
      yMin = Math.min(line[0][1], line[1][1]);
      yMax = Math.max(line[0][1], line[1][1]);
      diag2 = true;

      if (!board.length) {
        board = new Array(yMax + 1).fill(0).map(() => new Array(xMax + 1).fill(0));
      }
    }

    if (board.length < yMax + 1) {
      board = extendStorageY(board, yMax + 1);
    }

    if (board[0] && board[0].length < xMax + 1) {
      board = extendStorageX(board, xMax + 1);
    }

    if (x != 0) {
      for (let i = yMin; i <= yMax; i++) {
        board[i][x] += 1;
      }
    }

    if (y != 0) {
      for (let i = xMin; i <= xMax; i++) {
        board[y][i] += 1;
      }
    }

    if (diag1) {
      for (let i = 0; i <= (xMax - xMin); i++) {
        board[yMin+i][xMin+i] += 1;
      }
    }

    if (diag2) {
      for (let i = 0; i <= (xMax - xMin); i++) {
        board[yMax-i][xMin+i] += 1;
      }
    }
  });

  let count = 0;
  board.forEach((row) => {
    row.forEach((cell) => {
      if (cell >= 2) {
        count++;
      }
    });
  });

  return count;
}

export function run() {
  // return part1();
  return part2();
}
