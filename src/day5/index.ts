import * as inputs from './inputs.js';
import {AdventOfCode} from "../runner";

new AdventOfCode(inputs, {sampleOne: 3, challengeOne: 664, sampleTwo: 14}, (input, {partOne}) => {
  if (partOne) {
    const [rangesRaw, ingredients] = input.split('\n\n').map(s => s.trim().split('\n'))
    const ranges = rangesRaw.map(r => r.split('-').map(Number));
    return ingredients.map(Number).map(ingredient => ranges.some(range => range[0] <= ingredient && ingredient <= range[1])).filter(i => i).length
  } else {
    // part two works on the sample, but not the real input, so I'm not sure how to debug it further.
    let dedupedRanges: (number[] | null)[] = input.split('\n\n')[0].trim().split('\n').map(r => r.split('-').map(Number));

    dedupedRanges.forEach((_, i1) => {
      let rangeOne = dedupedRanges[i1];
      if (rangeOne === null) return;
      let keep = true;
      dedupedRanges.forEach((rangeTwo, i2) => {
        if (i1 === i2 || rangeTwo === null || !keep) return;

        const leftInside = rangeTwo[0] <= rangeOne[0] && rangeTwo[1] >= rangeOne[0]; // whether the left of rangeOne is inside rangeTwo
        const rightInside = rangeTwo[0] <= rangeOne[1] && rangeTwo[1] >= rangeOne[1]; // whether the right of rangeOne is inside rangeTwo
        if (leftInside && rightInside) {
          keep = false;
          return;

        } else if (leftInside) {
          keep = false;
          rangeTwo[1] = rangeOne[1];
          return;

        } else if (rightInside) {
          keep = false;
          rangeTwo[0] = rangeOne[0];
          return;
        }
      })

      if (!keep) {
        dedupedRanges = dedupedRanges.map(r => r === null ? null : r[0] === rangeOne[0] && r[1] === rangeOne[1] ? null : r)
      }
    })
    return dedupedRanges.filter(r => r !== null).reduce((acc, r) => acc + r[1] - r[0] + 1, 0)

  }
}).partOne().sampleTwo()