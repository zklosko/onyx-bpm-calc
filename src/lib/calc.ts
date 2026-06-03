const knownData: [number, number][] = [
  [0, 0],
  [50, 1],
  [100, 3],
  [150, 7],
  [200, 12],
  [250, 19],
  [300, 28],
  [350, 38],
  [400, 50],
  [450, 62],
  [500, 80],
  [550, 90],
  [600, 113],
  [650, 144],
  [700, 164],
  [750, 180],
  [800, 189],
  [850, 212],
  [900, 240],
  [950, 300],
  [1000, 360],
]

/**
 *
 * @param val
 * @returns
 */
function forwardInterp(val: number) {
  if (val <= 0) return 0
  if (val >= 1000) return 360
  for (let i = 0; i < knownData.length - 1; i++) {
    const [v0, b0] = knownData[i]! // non-null assertation
    const [v1, b1] = knownData[i + 1]!
    if (val >= v0 && val <= v1) {
      const t = (val - v0) / (v1 - v0)
      return b0 + t * (b1 - b0)
    }
  }
  return 360
}

/**
 * Calculates speed wheel value from BPM
 * @param bpm
 * @returns
 */
function bpmToSpeed(bpm: number): { val: number; method: string } {
  if (bpm <= 0) return { val: 0, method: 'exact' }
  if (bpm >= 360) return { val: 1000, method: 'exact' }
  for (let i = 0; i < knownData.length - 1; i++) {
    const [v0, b0] = knownData[i]!
    const [v1, b1] = knownData[i + 1]!
    if (bpm >= b0 && bpm <= b1) {
      const t = (bpm - b0) / (b1 - b0)
      const val = v0 + t * (v1 - v0)
      const method = bpm === b0 || bpm === b1 ? 'exact' : 'interpolated'
      return { val: Math.round(val), method }
    }
  }
  return { val: 1000, method: 'exact' }
}

/**
 *
 * @param bpm
 * @returns
 */
function getNear(bpm: number) {
  return knownData
    .map(([v, b]) => ({ v, b, diff: Math.abs(b - bpm) }))
    .sort((a, b) => a.diff - b.diff)
    .slice(0, 4)
}

/**
 * Main BPM calculation function, exported to Vue app
 * @param {number} bpm
 */
export function update(bpm: number): {
  val: number
  actualBpm: number
  err: number
  methodText: string
} {
  bpm = Math.max(0, Math.min(360, bpm))
  const { val, method } = bpmToSpeed(bpm)
  const actualBpm = forwardInterp(val)
  const err = Math.round((actualBpm - bpm) * 100) / 100

  const methodText =
    method === 'exact'
      ? 'This is a known calibration point — no interpolation needed.'
      : 'Linearly interpolated between two known calibration points.'

  return {
    val: val,
    actualBpm: actualBpm,
    err: err,
    methodText: methodText,
  }
}
