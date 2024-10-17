// Uncomment the code below and write your tests
import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');
  return {
    __esModule: true,
    ...originalModule,
    mockOne: jest.fn(() => 1),
    mockTwo: jest.fn(() => '2'),
    mockThree: jest.fn(() => '3'),
  };
});

describe('partial mocking', () => {
  let spyConsole: jest.SpyInstance;
  beforeEach(() => {
    spyConsole = jest.spyOn(console, 'log');
  });

  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    mockOne();
    mockTwo();
    mockThree();

    expect(spyConsole).not.toHaveBeenCalled();
    expect(spyConsole).toHaveBeenCalledTimes(0);
  });

  test('unmockedFunction should log into console', () => {
    unmockedFunction();
    unmockedFunction();

    expect(spyConsole).toHaveBeenCalled();
    expect(spyConsole).toHaveBeenCalledTimes(2);
  });
});
