/**
 * Pure Mathematical Utilities for Quant Competitive Exams
 * (SSC CGL, Railway NTPC/Group D, LIC AAO, FCI, WBPSC)
 */

// 1. UNIT DIGITS
export function calculateUnitDigit(base: number, power: number): number {
  if (power === 0) return 1;
  const lastDigit = Math.abs(base) % 10;
  if ([0, 1, 5, 6].includes(lastDigit)) return lastDigit;
  
  // Cyclicity is 4 or 2 for other digits
  const modPower = power % 4 === 0 ? 4 : power % 4;
  return Math.pow(lastDigit, modPower) % 10;
}

// 2. MODULAR ARITHMETIC / REMAINDER
export function modularPower(base: bigint, exponent: bigint, modulus: bigint): bigint {
  if (modulus === 1n) return 0n;
  let result = 1n;
  base = base % modulus;
  while (exponent > 0n) {
    if (exponent % 2n === 1n) {
      result = (result * base) % modulus;
    }
    exponent = exponent / 2n;
    base = (base * base) % modulus;
  }
  return result;
}

// 3. GCD & LCM
export function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
}

export function lcm(a: number, b: number): number {
  if (a === 0 || b === 0) return 0;
  return Math.abs(a * b) / gcd(a, b);
}

// 4. RECURRING DECIMAL TO FRACTION
// e.g. 0.333... -> 1/3; 0.1666... -> 1/6; 0.2727... -> 3/11
export function recurringDecimalToFraction(nonRepeatingStr: string, repeatingStr: string): { numerator: number; denominator: number } {
  const p1 = nonRepeatingStr ? parseInt(nonRepeatingStr, 10) : 0;
  const fullNumStr = (nonRepeatingStr || '') + repeatingStr;
  const p2 = parseInt(fullNumStr, 10);
  
  const d9 = '9'.repeat(repeatingStr.length);
  const d0 = '0'.repeat(nonRepeatingStr.length);
  const denom = parseInt(d9 + d0, 10);
  const numer = p2 - p1;
  
  const commonDiv = gcd(numer, denom);
  return {
    numerator: numer / commonDiv,
    denominator: denom / commonDiv
  };
}

// 5. SQUARE ROOT & CUBE ROOT
export function isPerfectSquare(n: number): boolean {
  if (n < 0) return false;
  const s = Math.round(Math.sqrt(n));
  return s * s === n;
}

export function isPerfectCube(n: number): boolean {
  const c = Math.round(Math.cbrt(n));
  return c * c * c === n;
}

// 6. MIXTURE & ALLIGATION
export interface AlligationResult {
  cheaperRatio: number;
  dearerRatio: number;
  simplifiedRatio: string;
  explanation: string;
}

export function calculateAlligation(cheaperPrice: number, dearerPrice: number, meanPrice: number): AlligationResult {
  if (meanPrice <= cheaperPrice || meanPrice >= dearerPrice) {
    throw new Error('Mean price must strictly lie between cheaper price and dearer price.');
  }

  const dearerDiff = dearerPrice - meanPrice;
  const cheaperDiff = meanPrice - cheaperPrice;

  const scale = 1000;
  const num1 = Math.round(dearerDiff * scale);
  const num2 = Math.round(cheaperDiff * scale);
  const common = gcd(num1, num2);

  const ratio1 = num1 / common;
  const ratio2 = num2 / common;

  return {
    cheaperRatio: ratio1,
    dearerRatio: ratio2,
    simplifiedRatio: `${ratio1} : ${ratio2}`,
    explanation: `By Rule of Alligation:\n(Quantity of Cheaper) / (Quantity of Dearer) = (${dearerPrice} - ${meanPrice}) / (${meanPrice} - ${cheaperPrice}) = ${dearerDiff} / ${cheaperDiff} = ${ratio1} : ${ratio2}`
  };
}

// 7. REPEATED DILUTION FORMULA
export function repeatedDilution(initialQty: number, capacity: number, takenOutEachTime: number, times: number): number {
  if (capacity <= 0 || takenOutEachTime > capacity) return 0;
  const fractionRemaining = Math.pow(1 - takenOutEachTime / capacity, times);
  return Number((initialQty * fractionRemaining).toFixed(4));
}

// 8. TIME, SPEED & DISTANCE
export function averageSpeedTwoParts(speed1: number, speed2: number): number {
  if (speed1 <= 0 || speed2 <= 0) return 0;
  return Number(((2 * speed1 * speed2) / (speed1 + speed2)).toFixed(2));
}

export function relativeSpeed(speed1: number, speed2: number, sameDirection: boolean): number {
  return sameDirection ? Math.abs(speed1 - speed2) : speed1 + speed2;
}

export function trainCrossingTimeSeconds(trainLengthMeters: number, objectLengthMeters: number, relativeSpeedKmph: number): number {
  if (relativeSpeedKmph <= 0) return 0;
  const speedMps = relativeSpeedKmph * (5 / 18);
  const totalDist = trainLengthMeters + objectLengthMeters;
  return Number((totalDist / speedMps).toFixed(2));
}

// 9. BOATS & STREAMS
export function boatsAndStreams(downstreamSpeed: number, upstreamSpeed: number): { stillWaterSpeed: number; streamSpeed: number } {
  const stillWater = (downstreamSpeed + upstreamSpeed) / 2;
  const stream = (downstreamSpeed - upstreamSpeed) / 2;
  return {
    stillWaterSpeed: Number(stillWater.toFixed(2)),
    streamSpeed: Number(stream.toFixed(2))
  };
}

// 10. TRIANGLE CENTERS
export function triangleIncenterAngle(angleA: number): number {
  return 90 + angleA / 2;
}

export function triangleOrthocenterAngle(angleA: number): number {
  return 180 - angleA;
}

export function triangleCircumcenterAngle(angleA: number): number {
  return 2 * angleA;
}

export function equilateralTriangleRadii(side: number): { inradius: number; circumradius: number; height: number; area: number } {
  const inradius = side / (2 * Math.sqrt(3));
  const circumradius = side / Math.sqrt(3);
  const height = (Math.sqrt(3) / 2) * side;
  const area = (Math.sqrt(3) / 4) * side * side;
  return {
    inradius: Number(inradius.toFixed(3)),
    circumradius: Number(circumradius.toFixed(3)),
    height: Number(height.toFixed(3)),
    area: Number(area.toFixed(3))
  };
}

// 11. HEIGHT & DISTANCE (Standard Ratios)
export function heightDistanceRatio306090(height: number): { opposite30: number; opposite60: number; hypotenuse: number } {
  const opp30 = height / Math.sqrt(3);
  const opp60 = height;
  const hyp = (2 * height) / Math.sqrt(3);
  return {
    opposite30: Number(opp30.toFixed(2)),
    opposite60: Number(opp60.toFixed(2)),
    hypotenuse: Number(hyp.toFixed(2))
  };
}

// 12. DEGREE AND RADIAN
export function degreeToRadian(deg: number): { radians: number; piFraction: string } {
  const rad = (deg * Math.PI) / 180;
  const common = gcd(Math.round(deg), 180);
  const numer = Math.round(deg) / common;
  const denom = 180 / common;
  
  let piFraction = '';
  if (numer === 0) piFraction = '0';
  else if (denom === 1) piFraction = numer === 1 ? 'π' : `${numer}π`;
  else piFraction = numer === 1 ? `π/${denom}` : `${numer}π/${denom}`;

  return {
    radians: Number(rad.toFixed(4)),
    piFraction
  };
}

export function radianToDegree(rad: number): number {
  return Number(((rad * 180) / Math.PI).toFixed(2));
}

// 13. ARITHMETIC SERIES (AP)
export function apNthTerm(firstTerm: number, commonDiff: number, n: number): number {
  return firstTerm + (n - 1) * commonDiff;
}

export function apSumNTerms(firstTerm: number, commonDiff: number, n: number): number {
  return (n / 2) * (2 * firstTerm + (n - 1) * commonDiff);
}

export function detectSeriesPattern(numbers: number[]): { type: string; nextNumber: number; rule: string } | null {
  if (numbers.length < 3) return null;
  
  const diffs: number[] = [];
  for (let i = 1; i < numbers.length; i++) {
    diffs.push(numbers[i] - numbers[i - 1]);
  }
  const isAP = diffs.every(d => Math.abs(d - diffs[0]) < 1e-9);
  if (isAP) {
    const diff = diffs[0];
    const next = numbers[numbers.length - 1] + diff;
    return {
      type: 'Arithmetic Progression (AP)',
      nextNumber: next,
      rule: `Each term increases by common difference d = ${diff}`
    };
  }

  const secondDiffs: number[] = [];
  for (let i = 1; i < diffs.length; i++) {
    secondDiffs.push(diffs[i] - diffs[i - 1]);
  }
  const isSecondDiff = secondDiffs.every(d => Math.abs(d - secondDiffs[0]) < 1e-9);
  if (isSecondDiff) {
    const lastDiff = diffs[diffs.length - 1];
    const nextDiff = lastDiff + secondDiffs[0];
    const next = numbers[numbers.length - 1] + nextDiff;
    return {
      type: 'Difference of Difference Series',
      nextNumber: next,
      rule: `Differences increase by ${secondDiffs[0]}. Next difference is ${nextDiff}`
    };
  }

  let isGP = true;
  const ratio = numbers[1] / numbers[0];
  for (let i = 2; i < numbers.length; i++) {
    if (Math.abs(numbers[i] / numbers[i - 1] - ratio) > 1e-4) {
      isGP = false;
      break;
    }
  }
  if (isGP && !isNaN(ratio) && isFinite(ratio)) {
    const next = numbers[numbers.length - 1] * ratio;
    return {
      type: 'Geometric Progression (GP)',
      nextNumber: next,
      rule: `Each term multiplied by common ratio r = ${ratio}`
    };
  }

  const isSquare = numbers.every((n) => {
    const root = Math.round(Math.sqrt(n));
    return root * root === n;
  });
  if (isSquare) {
    const lastRoot = Math.round(Math.sqrt(numbers[numbers.length - 1]));
    const next = (lastRoot + 1) * (lastRoot + 1);
    return {
      type: 'Square Series (n²)',
      nextNumber: next,
      rule: `Squares of consecutive integers. Next is (${lastRoot + 1})² = ${next}`
    };
  }

  return null;
}
