import {input} from './input'

let num = 50; // starts at 50
let password = 0;

const tickLeft = () => num = (num === 0 ? 99 : num - 1);
const tickRight = () => num = (num === 99 ? 0 : num + 1);

input.forEach(cmd => {
  const [dir, ...numRaw] = cmd.split('');
  let ticksLeft = Number(numRaw.join(''))
  while (ticksLeft !== 0) {
    if (dir === 'L') tickLeft(); else tickRight()
    if (num === 0) password++
    ticksLeft -= 1
  }
})

console.log('RESULT: ', password)