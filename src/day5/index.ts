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

    // ORIGINAL SOLUTION (0.3ms):
    //    let prev: number[];
    //    return input.split('\n\n')[0].trim().split('\n').map(r => r.split('-').map(Number)).sort((a, b) => a[0] - b[0]).map((range) => {
    //      if (prev && prev[1] + 1 > range[1]) return false;
    //      if (prev && range[0] <= prev[1]) range = [prev[1] + 1, range[1]];
    //      prev = range;
    //      return range;
    //    }).filter(Boolean).reduce((acc, r) => acc + r[1] - r[0] + 1, 0)

    // OPTIMIZED VERSION (0.1ms):
    return input.split('\n\n')[0].trim().split('\n').map(r => r.split('-').map(Number)) // get all the ranges as number[][]
      .sort((a, b) => a[0] - b[0]) // sort them by the first number
      .reduce(({prev, acc}, range) => {
        if (prev + 1 > range[1]) return {prev, acc}; // if the end of the prev array plus one is greater than the end of this array, omit the range entirely
        if (range[0] <= prev) range = [prev + 1, range[1]]; // if the start of this array is less than the previous range's end, set the start to be the previous range + 1 so that there's no overlap
        return {
          prev: range[1], // the end of this range
          acc: acc + range[1] - range[0] + 1 // the total span of this array
        }
      }, {acc: 0, prev: -Infinity} as { prev: number, acc: number }).acc;

    // MINIFIED OPTIMIZED VERSION:
    // return input.split("\n\n")[0].trim().split("\n").map(r=>r.split("-").map(Number)).sort((a,b)=>a[0]-b[0]).reduce(({prev,acc},range)=>{if(prev+1>range[1])return{prev,acc};if(range[0]<=prev)range=[prev+1,range[1]];return{prev:range[1],acc:acc+range[1]-range[0]+1}},{acc:0,prev:-Infinity}).acc
  }
}).runAll()
