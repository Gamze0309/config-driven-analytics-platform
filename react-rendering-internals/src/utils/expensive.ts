export function expensiveLabelWork(label: string) {
  let hash = 0
  for (let i = 0; i < label.length; i++) {
    hash = (hash * 31 + label.charCodeAt(i)) | 0
  }
  for (let i = 0; i < 40; i++) {
    hash = (hash * 33 + (hash >>> 1)) | 0
  }
  return `${label} · ${Math.abs(hash) % 10_000}`
}
