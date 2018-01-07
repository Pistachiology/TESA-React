import Immutable from 'immutable'
export function splitIntoChunks(list, chunkSize = 1) {
  return Immutable.Range(0, list.count(), chunkSize).map(chunkStart => list.slice(chunkStart, chunkStart + chunkSize))
}
