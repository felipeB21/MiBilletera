export function arsToUsd(ars: number, rate: number | null) {
  if (!rate) return 0;

  return ars / rate;
}
