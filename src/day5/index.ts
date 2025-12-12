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
    // PART TWO

    // ORIGINAL SOLUTION (~0.3ms):
    //    let prev: number[];
    //    return input.split('\n\n')[0].trim().split('\n').map(r => r.split('-').map(Number)).sort((a, b) => a[0] - b[0]).map((range) => {
    //      if (prev && prev[1] + 1 > range[1]) return false;
    //      if (prev && range[0] <= prev[1]) range = [prev[1] + 1, range[1]];
    //      prev = range;
    //      return range;
    //    }).filter(Boolean).reduce((acc, r) => acc + r[1] - r[0] + 1, 0)

    // READABLE OPTIMIZED VERSION (~0.1ms):
    return input.split('\n\n')[0].split('\n').map(r => r.split('-').map(Number)) // get all the ranges as number[][]
      .sort((a, b) => a[0] - b[0]) // sort them by the first number
      .reduce(({p, a}, r) => p + 1 > r[1] ? {p, a} : { // if the end of the prev array plus one is greater than the end of this array (aka this array is engulfed by the previous array), omit the range entirely
        p: r[1], // the end of this range
        a: a + r[1] - (r[0] <= p ? p + 1 : r[0]) + 1 // the total span of this array
      }, {a: 0, p: 0}).a;

    // MINIFIED OPTIMIZED VERSION (~0.1ms):
    // return input.split('\n\n')[0].split('\n').map(x=>x.split('-').map(Number)).sort(([a],[b])=>a-b).reduce(([p,a],[s,e])=>p+1>e?[p,a]:[e,a+e-(s<=p?p+1:s)+1],[0,0])[1]
  }
}).runAll()
