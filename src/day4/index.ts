import * as inputs from './inputs.js';
import {AdventOfCode} from "../runner";


new AdventOfCode(inputs, {sampleOne: 13, challengeOne: 1549, sampleTwo: 43, challengeTwo: 8887}, (input, {partOne, partTwo}) => {
  let accessibleCells = 0;
  const rows = input.split('\n').map(row => row.split('') as ('@' | '.' | 'x')[]);

  while (true) {
    const prev = accessibleCells;
    rows.forEach((targetRow, thisRowIndex) => {
      targetRow.forEach((targetCell, thisCellIndex) => {
        if (targetCell !== '@') return;
        const adjacents = rows.reduce((acc, scanRow, scanRowIndex) => {
          if (Math.abs(thisRowIndex - scanRowIndex) < 2) {
            return acc + scanRow.reduce((acc, scanCell, scanCellIndex) => {
              if (scanCell === '@' && Math.abs(thisCellIndex - scanCellIndex) < 2) {
                return acc + 1
              }
              return acc;
            }, 0)
          }
          return acc;
        }, 0);
        if (adjacents - 1 <= 3) {
          accessibleCells += 1;
          if (partTwo) rows[thisRowIndex][thisCellIndex] = 'x'
        }
      })
    })
    if (partOne || prev === accessibleCells) break;
  }


  return accessibleCells
}).partOne().partTwo()