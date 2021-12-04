import { getRawInput } from '../../utils';

const N = 5;

function checkWin(board: number[][]) {
  let result = false;
  board.forEach((row) => {
    if (row.join('') === '11111') {
      result = true;
    }
  });

  transpose(board).forEach((row) => {
    if (row.join('') === '11111') {
      result = true;
    }
  });

  return result;
}

function transpose(board: number[][]) {
  let result: number[][] = new Array(N).fill(0).map(() => new Array(N).fill(0));
  board.forEach((row, y) => {
    row.forEach((cell, x) => {
      result[x][y] = cell;
    });
  });
  return result;
}

function part1() {
  let [numberString, ...boardStrings] = getRawInput().trim().split('\n\n');
  const numbersToCome = numberString.split(',').map(Number);
  const boards = boardStrings.map((board) => board.split('\n').map((row) => row.trim().split(/\s+/).map(Number)));
  const marks = new Array(boards.length).fill(0).map(() => new Array(N).fill(0).map(() => new Array(N).fill(0)));

  let num = numbersToCome[0];
  let boardIndex = -1;
  while (numbersToCome.length) {
    for (let i = 0; i < boards.length; i++) {
      const board = boards[i];
      const mark = marks[i];

      board.forEach((row, y) => {
        row.forEach((cell, x) => {
          if (cell == num) {
            mark[y][x] = 1;
          }
        });
      });

      if (checkWin(mark)) {
        boardIndex = i;
        break;
      }
    }

    if (boardIndex !== -1) {
      break;
    }

    num = numbersToCome.shift()!;
  }

  let sum = 0;
  marks[boardIndex].forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell == 0) {
        sum += boards[boardIndex][y][x];
      }
    });
  });

  return sum * num;
}

function part2() {
  let [numberString, ...boardStrings] = getRawInput().trim().split('\n\n');
  const numbersToCome = numberString.split(',').map(Number);
  const boards = boardStrings.map((board) => board.split('\n').map((row) => row.trim().split(/\s+/).map(Number)));
  const marks = new Array(boards.length).fill(0).map(() => new Array(N).fill(0).map(() => new Array(N).fill(0)));

  let num = 0;
  let boardIndex = -1;
  let finishedBoards: { [key: number]: number } = {};
  while (numbersToCome.length) {
    num = numbersToCome.shift()!;

    for (let i = 0; i < boards.length; i++) {
      if (finishedBoards[i] != undefined) {
        continue;
      }

      const board = boards[i];
      const mark = marks[i];

      board.forEach((row, y) => {
        row.forEach((cell, x) => {
          if (cell == num) {
            mark[y][x] = 1;
          }
        });
      });

      if (checkWin(mark)) {
        boardIndex = i;
        finishedBoards[i] = num;
      }
    }
  }

  let sum = 0;
  marks[boardIndex].forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell == 0) {
        sum += boards[boardIndex][y][x];
      }
    });
  });

  return sum * finishedBoards[boardIndex];
}

export function run() {
  // return part1();
  return part2();
}
