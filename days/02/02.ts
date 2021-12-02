import { getInput } from '../../utils';

function part1() {
  const commands = getInput();

  let x = 0;
  let y = 0;
  commands.forEach((c) => {
    const [direction, distance] = c.split(' ');
    if (direction == 'forward') {
      x += Number(distance);
    }
    if (direction == 'down') {
      y += Number(distance);
    }

    if (direction == 'up') {
      y -= Number(distance);
    }
  });

  return x * y;
}

function part2() {
  const commands = getInput();

  let x = 0;
  let y = 0;
  let aim = 0;
  commands.forEach((c) => {
    const [direction, distance] = c.split(' ');
    if (direction == 'forward') {
      x += Number(distance);
      y += aim * Number(distance);
    }
    if (direction == 'down') {
      aim += Number(distance);
    }

    if (direction == 'up') {
      aim -= Number(distance);
    }
  });

  return x * y;
}

export function run() {
  // return part1();
  return part2();
}
