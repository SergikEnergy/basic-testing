// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCasesAdd = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 0, b: 2, action: Action.Add, expected: 2 },
  { a: -1, b: 1, action: Action.Add, expected: 0 },
  { a: NaN, b: 2, action: Action.Add },
];

const testCasesSubtract = [
  { a: 3, b: 2, action: Action.Subtract, expected: 1 },
  { a: 0, b: -3, action: Action.Subtract, expected: 3 },
  { a: 1, b: -1, action: Action.Subtract, expected: 2 },
  { a: NaN, b: 2, action: Action.Subtract },
  { a: -Infinity, b: -1, action: Action.Subtract, expected: -Infinity },
];

const testCasesMultiple = [
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  { a: 0, b: -3, action: Action.Multiply, expected: -0 },
  { a: 1, b: -1, action: Action.Multiply, expected: -1 },
  { a: NaN, b: 2, action: Action.Multiply },
  { a: -Infinity, b: -1, action: Action.Multiply, expected: Infinity },
];

const testCasesDivide = [
  { a: 3, b: 2, action: Action.Divide, expected: 1.5 },
  { a: 0, b: -3, action: Action.Divide, expected: -0 },
  { a: 1, b: -1, action: Action.Divide, expected: -1 },
  { a: NaN, b: 2, action: Action.Divide },
  { a: -4, b: 0, action: Action.Divide, expected: -Infinity },
  { a: NaN, b: NaN, action: Action.Divide },
];

const testCasesPow = [
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 8, b: -2, action: Action.Exponentiate, expected: 0.015625 },
  { a: 8, b: NaN, action: Action.Exponentiate },
];

const testCasesWrongArgsOrAction = [
  { a: 2, b: 3, action: '%' as Action },
  { a: '2', b: 3, action: Action.Add },
  { a: '2', b: '3', action: Action.Add },
  { a: null, b: '3', action: Action.Subtract },
];

const messages = [
  'test cases of sum two elements',
  'test cases of subtract two elements',
  'test cases of multiple two elements',
  'test cases of divide two elements',
  'test cases of pow two elements',
  'test cases of invalid args or action',
];

describe('simpleCalculator', () => {
  describe.each(testCasesAdd)(
    `${messages[0]}`,
    ({ a, b, action, expected }) => {
      test('check equality', () => {
        if (expected !== undefined && !isNaN(expected)) {
          expect(simpleCalculator({ a, b, action }) as number).toBe(expected);
        } else {
          expect(simpleCalculator({ a, b, action }) as number).toBeNaN();
        }
      });
    },
  );

  describe.each(testCasesSubtract)(
    `${messages[1]}`,
    ({ a, b, action, expected }) => {
      test('check equality', () => {
        if (expected !== undefined && !isNaN(expected)) {
          expect(simpleCalculator({ a, b, action }) as number).toBe(expected);
        } else {
          expect(simpleCalculator({ a, b, action }) as number).toBeNaN();
        }
      });
    },
  );

  describe.each(testCasesMultiple)(
    `${messages[2]}`,
    ({ a, b, action, expected }) => {
      test('check equality', () => {
        if (expected !== undefined && !isNaN(expected)) {
          expect(simpleCalculator({ a, b, action }) as number).toBe(expected);
        } else {
          expect(simpleCalculator({ a, b, action }) as number).toBeNaN();
        }
      });
    },
  );

  describe.each(testCasesDivide)(
    `${messages[3]}`,
    ({ a, b, action, expected }) => {
      test('check equality', () => {
        if (expected !== undefined && !isNaN(expected)) {
          expect(simpleCalculator({ a, b, action }) as number).toBe(expected);
        } else {
          expect(simpleCalculator({ a, b, action }) as number).toBeNaN();
        }
      });
    },
  );

  describe.each(testCasesPow)(
    `${messages[4]}`,
    ({ a, b, action, expected }) => {
      test('check equality', () => {
        if (expected !== undefined && !isNaN(expected)) {
          expect(simpleCalculator({ a, b, action }) as number).toBe(expected);
        } else {
          expect(simpleCalculator({ a, b, action }) as number).toBeNaN();
        }
      });
    },
  );

  describe.each(testCasesWrongArgsOrAction)(
    `${messages[5]}`,
    ({ a, b, action }) => {
      test('check equality', () => {
        expect(simpleCalculator({ a, b, action })).toBeNull();
      });
    },
  );
});
