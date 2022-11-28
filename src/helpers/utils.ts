import { add, format, fraction } from 'mathjs';

export function getNumberValue (input: number | string | undefined) {
  return +(input ?? 0);
}

export function roundDecimal (input: number, decimals: number) {
  if (decimals > 0) {
    return Math.round(input * (10 ** decimals)) / (10 ** decimals);
  }

  return Math.round(input);
}

export function addDecimal (n1: number, n2: number) {
  return +format(add(fraction(n1), fraction(n2)), { fraction: 'decimal' });
}
