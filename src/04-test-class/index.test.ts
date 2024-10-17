// Uncomment the code below and write your tests
import {
  getBankAccount,
  BankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from './index';

describe('BankAccount', () => {
  const initialBalance = 300;
  let myDeposit: BankAccount;
  let myFriendDeposit: BankAccount;
  let currentBalance: number;

  beforeEach(() => {
    myDeposit = getBankAccount(initialBalance);
    myFriendDeposit = getBankAccount(initialBalance);
    currentBalance = myDeposit.getBalance();
  });

  test('should create account with initial balance', () => {
    const balance = [0, 45, -34];

    const accounts = balance.map((elem) => getBankAccount(elem));
    accounts.forEach((elem, index) => {
      expect(elem).toBeInstanceOf(BankAccount);
      expect(elem.getBalance()).toBe(balance[index]);
    });
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const withDrawSum = 400;
    try {
      myDeposit.withdraw(withDrawSum);
    } catch (err: unknown) {
      if (err) {
        expect(err).toBeInstanceOf(InsufficientFundsError);
      }
    }

    expect(() => myDeposit.withdraw(withDrawSum)).toThrow(
      InsufficientFundsError,
    );

    expect(() => myDeposit.withdraw(withDrawSum)).toThrowError(
      `Insufficient funds: cannot withdraw more than ${myDeposit.getBalance()}`,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const sumToTransfer = initialBalance + 200;
    try {
      myDeposit.transfer(sumToTransfer, myFriendDeposit);
    } catch (err: unknown) {
      if (err) {
        expect(err).toBeInstanceOf(InsufficientFundsError);
      }
    }

    expect(() => myDeposit.transfer(sumToTransfer, myFriendDeposit)).toThrow(
      InsufficientFundsError,
    );

    expect(() =>
      myDeposit.transfer(sumToTransfer, myFriendDeposit),
    ).toThrowError(
      `Insufficient funds: cannot withdraw more than ${myDeposit.getBalance()}`,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const sumToTransfer = initialBalance + 300;

    try {
      myDeposit.transfer(sumToTransfer, myDeposit);
    } catch (err: unknown) {
      if (err) {
        expect(err).toBeInstanceOf(TransferFailedError);
      }
    }

    expect(() => myDeposit.transfer(sumToTransfer, myDeposit)).toThrow(
      TransferFailedError,
    );

    expect(() => myDeposit.transfer(sumToTransfer, myDeposit)).toThrowError(
      'Transfer failed',
    );
  });

  test('should deposit money', () => {
    const SALARY = 400;
    const BONUS = SALARY * 0.1;

    myDeposit.deposit(SALARY);
    expect(myDeposit.getBalance()).toBe(currentBalance + SALARY);

    myDeposit.deposit(BONUS);
    expect(myDeposit.getBalance()).toBe(currentBalance + SALARY + BONUS);
  });

  test('should withdraw money', () => {
    const TAXES = 20;
    const FINES = currentBalance * 0.1;

    myDeposit.withdraw(TAXES);
    expect(myDeposit.getBalance()).toBe(currentBalance - TAXES);

    myDeposit.withdraw(FINES);
    expect(myDeposit.getBalance()).toBe(currentBalance - TAXES - FINES);
  });

  test('should transfer money', () => {
    const GIFT = 200;

    if (currentBalance > GIFT) {
      const MY_FRIEND_BALANCE = myFriendDeposit.getBalance();
      myDeposit.transfer(GIFT, myFriendDeposit);

      expect(myDeposit.getBalance()).toBe(currentBalance - GIFT);
      expect(myFriendDeposit.getBalance()).toBe(MY_FRIEND_BALANCE + GIFT);
    }
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const fakeAccount = new BankAccount(initialBalance);

    fakeAccount.fetchBalance = jest.fn().mockResolvedValue(30);
    const balance = await fakeAccount.fetchBalance();

    fakeAccount.fetchBalance = jest.fn().mockResolvedValue(0);
    const balance2 = await fakeAccount.fetchBalance();

    expect(balance).toBe(30);
    expect(balance2).toBe(0);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const fakeBalance = 300;
    const fakeAccount = new BankAccount(initialBalance);

    fakeAccount.fetchBalance = jest.fn().mockResolvedValue(fakeBalance);
    await fakeAccount.synchronizeBalance();
    expect(fakeAccount.getBalance()).toBe(fakeBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const emptyBalance = null;
    const fakeAccount = new BankAccount(initialBalance);
    fakeAccount.fetchBalance = jest.fn().mockResolvedValue(emptyBalance);

    expect(() => fakeAccount.synchronizeBalance()).rejects.toThrowError(
      new SynchronizationFailedError(),
    );

    expect(() => fakeAccount.synchronizeBalance()).rejects.toThrowError(
      'Synchronization failed',
    );

    try {
      await fakeAccount.synchronizeBalance();
    } catch (err: unknown) {
      if (err) {
        expect(err).toBeInstanceOf(SynchronizationFailedError);
      }
    }
  });
});
