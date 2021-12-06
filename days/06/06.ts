import { getRawInput } from '../../utils';

type PackedData = { [key: number]: number };

function produce(data: PackedData) {
  let zeroCount = data[0];
  data[0] = data[1];
  data[1] = data[2];
  data[2] = data[3];
  data[3] = data[4];
  data[4] = data[5];
  data[5] = data[6];
  data[6] = data[7];
  data[7] = data[8];
  data[6] += zeroCount;
  data[8] = zeroCount;
}

function pack(timers: number[]) {
  let packed: { [key: number]: number } = {};

  new Array(9).fill(0).forEach((_, i) => {
    packed[i] = 0;
  });

  timers.forEach((n) => {
    packed[n]++;
  });

  return packed;
}

function part1() {
  let data = getRawInput().split(',').map(Number);

  let packedData = pack(data);
  for (let i = 1; i <= 256; i++) {
    produce(packedData);
  }

  let count = 0;
  Object.keys(packedData)
    .map(Number)
    .forEach((n) => {
      count += packedData[n];
    });

  return count;
}

export function run() {
  return part1();
}
