import * as inputs from './inputs.js';
import {AdventOfCode} from "../runner";

new AdventOfCode(inputs, {
  sampleOne: 4277556,
  challengeOne: 4693159084994,
  sampleTwo: 3263827
}, (input, {partOne}) => {
  const lines = input.split('\n')
  const numberLines = lines.slice(0, -1).map(line => line.split(' ').map(s => s.trim()))
  const operations = lines[lines.length - 1].split(' ').map(o => o.trim()).filter(s => s.length)

  return operations.reduce((runningTotal, op, i) => {
    let parsedNumbers = [];
    if (partOne) {
      parsedNumbers = numberLines.map(l => Number(l.filter(Boolean)[i]));
    } else {
      throw new Error('part 2 not completed')
    }
    return runningTotal + parsedNumbers.reduce((acc, num) => acc === 0 ? num : op === '+' ? acc + num : acc * num, 0);
  }, 0)
}).partOne()