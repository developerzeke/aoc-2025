import * as inputs from './inputs';
import {AdventOfCode} from "../runner";

new AdventOfCode(inputs, {
  sampleOne: 1227775554,
  challengeOne: 24747430309,
  sampleTwo: 4174379265,
  challengeTwo: 30962646823,
}, (input, {partOne, partTwo}) => {
  let invalid: number[] = []

  function checkId(id: string) {
    if (id.length % 2 === 0 && partOne) {
      if (id.slice(0, (id.length / 2)-1).repeat(2) === id) return false;
    }
    for (let i = 0; i < id.length; i++) {
      if (id.length % i !== 0) continue; // (for speed, can omit)
      const chunks = id.split(id.slice(0, i));
      if (chunks.every(s => s.length === 0) && (partTwo ? chunks.length > 2 : chunks.length === 3)) {
        return false;
      }
    }
    return true;
  }

  input.split(',').forEach(range => {
    const [low, high] = range.split('-').map(Number);
    for (let idRaw = low; idRaw-1 < high; idRaw++) {
      if (!checkId(String(idRaw))) invalid.push(idRaw);
    }
  })

  return invalid.reduce((acc, i) => acc + i, 0)
}).runAll()