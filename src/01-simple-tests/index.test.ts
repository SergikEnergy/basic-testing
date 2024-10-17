// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 1, b: 3, action: Action.Add })).toBe(4);
    expect(simpleCalculator({ a: 0, b: 3, action: Action.Add })).toBe(3);
    expect(simpleCalculator({ a: -1, b: 1, action: Action.Add })).toBe(0);
    expect(simpleCalculator({ a: NaN, b: 1, action: Action.Add })).toBeNaN();
    expect(simpleCalculator({ a: NaN, b: NaN, action: Action.Add })).toBeNaN();
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 1, b: 3, action: Action.Subtract })).toBe(-2);
    expect(simpleCalculator({ a: 0, b: 3, action: Action.Subtract })).toBe(-3);
    expect(simpleCalculator({ a: 1, b: -1, action: Action.Subtract })).toBe(2);
    expect(
      simpleCalculator({ a: NaN, b: 1, action: Action.Subtract }),
    ).toBeNaN();
    expect(
      simpleCalculator({ a: Infinity, b: 1, action: Action.Subtract }),
    ).toBe(Infinity);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 1, b: 3, action: Action.Multiply })).toBe(3);
    expect(simpleCalculator({ a: 0, b: 3, action: Action.Multiply })).toBe(0);
    expect(simpleCalculator({ a: 1, b: -1, action: Action.Multiply })).toBe(-1);
    expect(
      simpleCalculator({ a: NaN, b: 1, action: Action.Multiply }),
    ).toBeNaN();
    expect(
      simpleCalculator({ a: Infinity, b: 1, action: Action.Multiply }),
    ).toBe(Infinity);
    expect(
      simpleCalculator({ a: Infinity, b: -1, action: Action.Multiply }),
    ).toBe(-Infinity);
    expect(
      simpleCalculator({ a: Infinity, b: 0, action: Action.Multiply }),
    ).toBe(NaN);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 1, b: 0, action: Action.Divide })).toBe(
      Infinity,
    );
    expect(simpleCalculator({ a: 0, b: 5, action: Action.Divide })).toBe(0);
    expect(simpleCalculator({ a: 2, b: 1, action: Action.Divide })).toBe(2);
    expect(simpleCalculator({ a: 2, b: -1, action: Action.Divide })).toBe(-2);
    expect(simpleCalculator({ a: 0, b: NaN, action: Action.Divide })).toBeNaN();
    expect(simpleCalculator({ a: NaN, b: 3, action: Action.Divide })).toBeNaN();
    expect(
      simpleCalculator({ a: NaN, b: NaN, action: Action.Divide }),
    ).toBeNaN();
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 3, action: Action.Exponentiate })).toBe(
      8,
    );
    expect(simpleCalculator({ a: 8, b: -2, action: Action.Exponentiate })).toBe(
      0.015625,
    );
  });

  test('should return null for invalid action', () => {
    const invalidAction = { a: 2, b: 3, action: '%' };
    expect(simpleCalculator(invalidAction)).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: '2', b: 3, action: '-' })).toBe(null);
    expect(simpleCalculator({ a: '2', b: '3', action: '+' })).toBeNull();
    expect(
      simpleCalculator({ a: null, b: '3', action: Action.Multiply }),
    ).toBeNull();
  });
});
