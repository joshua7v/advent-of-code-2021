import { getInput } from '../../utils';

function part1() {
  const data = getInput().map(Number);

  let count = 0;
  for (let i = 1; i < data.length; i++) {
    if (data[i] > data[i - 1]) {
      count++;
    }
  }

  return count;
}

function part2() {
  const data = getInput().map(Number);

  let _data = [];
  for (let i = 0; i < data.length; i++) {
    if (i <= data.length - 3) {
      const sum = data[i] + data[i + 1] + data[i + 2];
      _data.push(sum);
    }
  }

  let count = 0;
  for (let i = 1; i < _data.length; i++) {
    if (_data[i] > _data[i - 1]) {
      count++;
    }
  }

  return count;
}

export function run() {
  // return part1();
  return part2();
}
