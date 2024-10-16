// Uncomment the code below and write your tests
import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const messages = [
      'Hi, this is correct message!',
      2,
      null,
      undefined,
      '',
      0,
      [],
      { a: 'dd' },
    ];

    const resultsPromises = messages.map((elem) => resolveValue(elem));

    const results = await Promise.all(resultsPromises);

    results.forEach((elem, index) => {
      expect(elem).toBe(messages[index]);
    });
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const message = 'Failed!';
    expect(() => throwError(message)).toThrow(message);
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => throwError()).toThrowError('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrowError(
      'This is my awesome custom error!',
    );
    expect(() => throwCustomError()).toThrow(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(rejectCustomError()).rejects.toThrowError(
      'This is my awesome custom error!',
    );

    await expect(rejectCustomError()).rejects.toBeInstanceOf(MyAwesomeError);
  });
});
