import * as inputs from './inputs.js';
import {AdventOfCode} from "../runner";

new AdventOfCode(inputs, {
  sampleOne: 3,
  challengeOne: 664,
  sampleTwo: 14,
  challengeTwo: 350780324308385
}, (input, {partOne}) => {
  if (partOne) {
    const [rangesRaw, ingredients] = input.split('\n\n').map(s => s.trim().split('\n'))
    const ranges = rangesRaw.map(r => r.split('-').map(Number));
    return ingredients.map(Number).map(ingredient => ranges.some(range => range[0] <= ingredient && ingredient <= range[1])).filter(i => i).length
  } else {
    let prev: number[];
    return input.split('\n\n')[0].trim().split('\n').map(r => r.split('-').map(Number)).sort((a, b) => a[0] - b[0]).map((range) => {
      if (prev && prev[1] + 1 > range[1]) return false;
      if (prev && range[0] <= prev[1]) range = [prev[1] + 1, range[1]];
      prev = range;
      return range;
    }).filter(Boolean).reduce((acc, r) => acc + r[1] - r[0] + 1, 0)
  }
}).runAll()


