import {input as ranges} from './input';

let invalid = [] as number[]

ranges.forEach(range => {
  const [low, high] = range.split('-').map(a => Number(a))

  for (let idRaw = low; idRaw !== high; idRaw++) {
    const id = String(idRaw)

    for (let i = 0; i < id.length; i++) {
      if (!invalid.includes(idRaw)) {
      if (id.split(id.slice(0, i)).every(s => s.length === 0) && id.split(id.slice(0, i)).length > 2) {
        invalid.push(idRaw)
      }
      }
    }
  }
})

console.log(invalid.reduce((acc, i) => acc + i, 0))