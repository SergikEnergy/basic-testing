// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const config = {
  baseURL: 'https://jsonplaceholder.typicode.com',
};

const mockPath = '/testApi';

const testResponse = {
  data: {
    id: 333,
    title: 'test',
    body: 'test body',
  },
};

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.runAllTimers();
  });

  test('should create instance with provided base url', async () => {
    mockedAxios.create.mockReturnThis();
    mockedAxios.get.mockResolvedValue(testResponse);

    await throttledGetDataFromApi(mockPath);

    expect(mockedAxios.create).toHaveBeenCalledTimes(1);
    expect(mockedAxios.create).toHaveBeenCalledWith(config);
  });

  test('should perform request to correct provided url', async () => {
    mockedAxios.create.mockReturnThis();
    mockedAxios.get.mockResolvedValue(testResponse);

    await throttledGetDataFromApi(mockPath);

    expect(mockedAxios.create).toHaveBeenCalledTimes(1);
    expect(mockedAxios.get).toHaveBeenCalledWith(mockPath);
  });

  test('should return response data', async () => {
    mockedAxios.create.mockReturnThis();
    mockedAxios.get.mockResolvedValue(testResponse);

    const result = await throttledGetDataFromApi(mockPath);

    expect(result).toEqual(testResponse.data);
  });
});
