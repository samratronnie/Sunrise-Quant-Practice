import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateUnitDigit,
  modularPower,
  gcd,
  lcm,
  recurringDecimalToFraction,
  calculateAlligation,
  repeatedDilution,
  averageSpeedTwoParts,
  boatsAndStreams,
  triangleIncenterAngle,
  triangleOrthocenterAngle,
  triangleCircumcenterAngle,
  degreeToRadian,
  radianToDegree,
  apNthTerm,
  apSumNTerms,
  detectSeriesPattern
} from './quantMath.ts';

test('calculateUnitDigit finds correct cyclicity unit digit', () => {
  // 7^1 = 7, 7^2 = 9, 7^3 = 3, 7^4 = 1, 7^5 = 7
  assert.equal(calculateUnitDigit(7, 105), 7);
  // 3^4 = 81 -> 1
  assert.equal(calculateUnitDigit(3, 40), 1);
  // 2^10 = 1024 -> 4
  assert.equal(calculateUnitDigit(2, 10), 4);
  // 6^99 -> 6
  assert.equal(calculateUnitDigit(6, 99), 6);
});

test('modularPower computes large powers under modulus', () => {
  // (2^10) % 1000 = 1024 % 1000 = 24
  assert.equal(modularPower(2n, 10n, 1000n), 24n);
  // Fermat's Little Theorem: 2^(7-1) = 2^6 = 64 = 1 mod 7
  assert.equal(modularPower(2n, 6n, 7n), 1n);
});

test('gcd and lcm work correctly', () => {
  assert.equal(gcd(24, 36), 12);
  assert.equal(lcm(12, 18), 36);
});

test('recurringDecimalToFraction converts pure and mixed repeating decimals', () => {
  // 0.3333... -> 1/3
  const f1 = recurringDecimalToFraction('', '3');
  assert.equal(f1.numerator, 1);
  assert.equal(f1.denominator, 3);

  // 0.16666... (1 non repeating, 6 repeating) -> 1/6
  const f2 = recurringDecimalToFraction('1', '6');
  assert.equal(f2.numerator, 1);
  assert.equal(f2.denominator, 6);
});

test('calculateAlligation computes correct mixing ratio', () => {
  // Rice at 15/kg mixed with rice at 20/kg to get 16.50/kg
  // (20 - 16.5) : (16.5 - 15) = 3.5 : 1.5 = 7 : 3
  const res = calculateAlligation(15, 20, 16.5);
  assert.equal(res.cheaperRatio, 7);
  assert.equal(res.dearerRatio, 3);
  assert.equal(res.simplifiedRatio, '7 : 3');
});

test('repeatedDilution correctly computes remaining pure liquid', () => {
  // A container contains 40 litres of milk. 4 litres taken out and replaced with water. Repeated 3 times.
  // 40 * (1 - 4/40)^3 = 40 * (0.9)^3 = 40 * 0.729 = 29.16
  const remaining = repeatedDilution(40, 40, 4, 3);
  assert.equal(remaining, 29.16);
});

test('averageSpeedTwoParts computes harmonic mean speed', () => {
  // 60 km/h and 40 km/h -> 2*60*40 / 100 = 48 km/h
  assert.equal(averageSpeedTwoParts(60, 40), 48);
});

test('boatsAndStreams calculates still water and stream speeds', () => {
  // Downstream = 15 km/h, Upstream = 9 km/h -> Still = 12, Stream = 3
  const b = boatsAndStreams(15, 9);
  assert.equal(b.stillWaterSpeed, 12);
  assert.equal(b.streamSpeed, 3);
});

test('triangle centers angles match standard exam theorems', () => {
  // Incenter: 90 + A/2. If A = 60, angle = 120
  assert.equal(triangleIncenterAngle(60), 120);
  // Orthocenter: 180 - A. If A = 60, angle = 120
  assert.equal(triangleOrthocenterAngle(60), 120);
  // Circumcenter: 2A. If A = 60, angle = 120
  assert.equal(triangleCircumcenterAngle(60), 120);
});

test('degree and radian conversions work accurately', () => {
  const d30 = degreeToRadian(30);
  assert.equal(d30.piFraction, 'π/6');
  const d45 = degreeToRadian(45);
  assert.equal(d45.piFraction, 'π/4');
  assert.equal(radianToDegree(Math.PI / 2), 90);
});

test('AP calculations and series pattern detector', () => {
  // a = 3, d = 5. T_10 = 3 + 9*5 = 48
  assert.equal(apNthTerm(3, 5, 10), 48);
  // S_5 = 5/2 * (2*3 + 4*5) = 2.5 * 26 = 65
  assert.equal(apSumNTerms(3, 5, 5), 65);

  const ap = detectSeriesPattern([3, 8, 13, 18, 23]);
  assert.ok(ap);
  assert.equal(ap?.nextNumber, 28);
  assert.equal(ap?.type, 'Arithmetic Progression (AP)');

  const sq = detectSeriesPattern([4, 9, 16, 25, 36]);
  assert.ok(sq);
  assert.equal(sq?.nextNumber, 49);
});
