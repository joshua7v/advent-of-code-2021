import { getInput } from '../../utils';

function part1() {
  const bindaryPacks = getInput().map((pack) => pack.split('').map(Number));
  const sumPack = new Array(bindaryPacks[0].length).fill(0);

  bindaryPacks.forEach((pack) => {
    pack.forEach((bit, i) => {
      sumPack[i] = sumPack[i] + bit;
    });
  });

  const gamma = sumPack.map((bit) => (bit > bindaryPacks.length / 2 ? 1 : 0));
  const epsilon = sumPack.map((bit) => (bit > bindaryPacks.length / 2 ? 0 : 1));

  return parseInt(gamma.join(''), 2) * parseInt(epsilon.join(''), 2);
}

function part2() {
  const bindaryPacks = getInput().map((pack) => pack.split('').map(Number));
  let sumPack = new Array(bindaryPacks[0].length).fill(0);

  let filteredPacksO2 = bindaryPacks;
  let filteredPacksCO2 = bindaryPacks;
  let bitPosition = 0;
  while (bitPosition < bindaryPacks[0].length) {
    sumPack = new Array(bindaryPacks[0].length).fill(0);
    filteredPacksO2.forEach((pack) => {
      pack.forEach((bit, i) => {
        sumPack[i] = sumPack[i] + bit;
      });
    });

    const targetBit = sumPack[bitPosition] >= filteredPacksO2.length / 2 ? 1 : 0;
    filteredPacksO2 = filteredPacksO2.filter((pack) => pack[bitPosition] == targetBit);

    if (filteredPacksO2.length == 1) {
      break;
    }

    bitPosition++;
  }

  bitPosition = 0;
  while (bitPosition < bindaryPacks[0].length) {
    sumPack = new Array(bindaryPacks[0].length).fill(0);
    filteredPacksCO2.forEach((pack) => {
      pack.forEach((bit, i) => {
        sumPack[i] = sumPack[i] + bit;
      });
    });

    const targetBit = sumPack[bitPosition] >= filteredPacksCO2.length / 2 ? 0 : 1;
    filteredPacksCO2 = filteredPacksCO2.filter((pack) => pack[bitPosition] == targetBit);

    if (filteredPacksCO2.length == 1) {
      break;
    }

    bitPosition++;
  }

  return parseInt(filteredPacksO2[0].join(''), 2) * parseInt(filteredPacksCO2[0].join(''), 2);
}

export function run() {
  // return part1();
  return part2();
}
