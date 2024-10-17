// Uncomment the code below and write your tests
import path from 'path';
import fs from 'fs';
import fsPromises from 'fs/promises';
import {
  readFileAsynchronously,
  doStuffByTimeout,
  doStuffByInterval,
} from './index';

jest.mock('fs');
jest.mock('fs/promises');

describe('doStuffByTimeout', () => {
  let spyTimeOut: jest.SpyInstance;
  beforeEach(() => {
    spyTimeOut = jest.spyOn(global, 'setTimeout');
  });
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const testCallback = jest.fn();
    const testTimerMs = 2000;

    doStuffByTimeout(testCallback, testTimerMs);

    expect(spyTimeOut).toHaveBeenCalled();
    expect(spyTimeOut).toHaveBeenCalledTimes(1);
    expect(spyTimeOut).toHaveBeenCalledWith(testCallback, testTimerMs);
  });

  test('should call callback only after timeout', () => {
    const testCallback = jest.fn();
    const testTimerMs = 2000;

    doStuffByTimeout(testCallback, testTimerMs);

    expect(testCallback).not.toHaveBeenCalled();
    jest.runAllTimers();

    expect(testCallback).toHaveBeenCalled();
    expect(testCallback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  let spyTimeInterval: jest.SpyInstance;
  beforeEach(() => {
    spyTimeInterval = jest.spyOn(global, 'setInterval');
  });

  test('should set interval with provided callback and timeout', () => {
    const testCallback = jest.fn();
    const testInterval = 2000;

    doStuffByInterval(testCallback, testInterval);

    expect(spyTimeInterval).toHaveBeenCalled();
    expect(spyTimeInterval).toHaveBeenCalledWith(testCallback, testInterval);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const testCallback = jest.fn();
    const testInterval = 1000;
    doStuffByInterval(testCallback, testInterval);
    expect(testCallback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(testInterval);
    expect(testCallback).toHaveBeenCalled();
    expect(testCallback).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(testInterval);
    expect(testCallback).toHaveBeenCalled();
    expect(testCallback).toHaveBeenCalledTimes(2);

    jest.advanceTimersByTime(testInterval);
    expect(testCallback).toHaveBeenCalled();
    expect(testCallback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  let spyJoin: jest.SpyInstance;
  let existsSyncSpy: jest.SpyInstance;
  let readFileSpy: jest.SpyInstance;
  let fakeFilePath: string;

  beforeEach(() => {
    spyJoin = jest.spyOn(path, 'join');
    existsSyncSpy = jest.spyOn(fs, 'existsSync');
    readFileSpy = jest.spyOn(fsPromises, 'readFile');
    fakeFilePath = 'testFile.txt';
  });

  afterEach(() => {
    spyJoin.mockRestore();
    existsSyncSpy.mockRestore();
    readFileSpy.mockRestore();
  });

  afterAll(() => {
    jest.unmock('fs');
    jest.unmock('fs/promises');
  });

  test('should call join with pathToFile', async () => {
    existsSyncSpy.mockReturnValue(true);
    readFileSpy.mockResolvedValue(Buffer.from('some text'));

    await readFileAsynchronously(fakeFilePath);

    expect(spyJoin).toHaveBeenCalled();
    expect(spyJoin).toHaveBeenCalledWith(__dirname, fakeFilePath);
  });

  test('should return null if file does not exist', async () => {
    const nonExistPath = './no-found.txt';
    existsSyncSpy.mockReturnValue(false);

    const result = await readFileAsynchronously(nonExistPath);
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const fileContent = 'some text inside a file';

    existsSyncSpy.mockReturnValue(true);
    readFileSpy.mockResolvedValue(Buffer.from(fileContent));

    const content = await readFileAsynchronously(fakeFilePath);
    expect(content).toBe(fileContent);
  });
});
