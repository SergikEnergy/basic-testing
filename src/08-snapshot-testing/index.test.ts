// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  const testArr = [1, 2, 3, 4];
  const testResultList = {
    value: 1,
    next: {
      value: 2,
      next: { value: 3, next: { value: 4, next: { value: null, next: null } } },
    },
  };
  test('should generate linked list from values 1', () => {
    const result = generateLinkedList(testArr);

    expect(result).toStrictEqual(testResultList);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const result = generateLinkedList(testArr.concat(5));

    expect(result).toMatchSnapshot();
  });
});
