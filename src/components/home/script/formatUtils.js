export function shortenName(name, maxLength = 47) {
  if (name.length <= maxLength) return name

  const cutoff = name.substring(0, maxLength)
  const lastSplit = cutoff.lastIndexOf(' -')
  return lastSplit !== -1 ? cutoff.substring(0, lastSplit) : cutoff
}
