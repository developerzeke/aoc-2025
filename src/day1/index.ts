import * as inputs from './inputs'
import {AdventOfCode} from "../utils";

new AdventOfCode(inputs, {
  sampleOne: 3,
  challengeOne: 1007,
  sampleTwo: 6,
  challengeTwo: 5820,
}, (input, {partTwo}) => {
  let pos = 50; // starts at 50
  let password = 0;

  input.split('\n').forEach(cmd => {
    const [dir, ...numRaw] = cmd.split('');
    const num = Number(numRaw.join(''));
    for (let i = 0; i < num; i++) {
      if (dir === 'L') pos--; else pos++; // increase or decrease
      pos = pos === -1 ? 99 : pos === 100 ? 0 : pos; // wrap around if needed
      if ((i === num - 1 || partTwo) && pos === 0) password++
      //  ^ last iteration or part two and ^ dial points to 0
    }
  })

  return password;
}).runAll()