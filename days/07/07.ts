import { getRawInput } from '../../utils';

function part1() {
  const data = getRawInput().split(',').map(Number);
  const min = Math.min(...data);
  const max = Math.max(...data);

  let result = {} as { [key: number]: number };
  for (let i = min; i < max; i++) {
    if (result[i] == undefined) {
      result[i] = 0;
    }

    data.forEach((d) => {
      const delta = Math.abs(d - i);
      result[i] += delta;
    });
  }

  return Math.min(...Object.values(result));
}

function part2() {
  const data = getRawInput().split(',').map(Number);
  const min = Math.min(...data);
  const max = Math.max(...data);

  const deltaSum = (n: number) => ((1 + n) * n) / 2;

  let result = {} as { [key: number]: number };
  for (let i = min; i < max; i++) {
    if (result[i] == undefined) {
      result[i] = 0;
    }

    data.forEach((d) => {
      const delta = Math.abs(d - i);
      result[i] += deltaSum(delta);
    });
  }

  return Math.min(...Object.values(result));
}

export function run() {
  // return part1();
  return part2();
}
