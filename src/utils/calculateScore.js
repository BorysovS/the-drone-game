export function calculateScoreIncrement(caveSpeed, caveOffset, complexity) {
  return caveSpeed * (caveOffset + complexity);
}
