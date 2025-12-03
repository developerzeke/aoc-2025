import * as inputs from './inputs';
import {AdventOfCode} from "../runner";

new AdventOfCode(inputs, {
  sampleOne: 357,
  challengeOne: 16973,
  sampleTwo: 3121910778619,
  challengeTwo: 168027167146027,
}, (input, {partOne}) => {
  const maxDigits = partOne ? 2 : 12;
  return input.split('\n').map(bank => {
    let result = ``;
    let remainingDigits = bank.split('').map(Number);
    for (let i = 0; i < maxDigits; i++) {
      const usableDigits = i + 1 === maxDigits ? remainingDigits : remainingDigits.slice(0, -maxDigits + 1 + i)
      const highestUsable = Math.max(...usableDigits);
      remainingDigits = remainingDigits.slice(remainingDigits.findIndex((n) => n === highestUsable) + 1)
      result += highestUsable;
    }
    return Number(result);
  }).reduce((acc, i) => acc + i, 0)
}).runAll()