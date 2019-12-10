import { tryAsync, trySync } from '../src';

describe('tryAsync (with Promise)', () => {
  it('should return a value from a resolved promise', async () => {
    const promise = async (s: string) => `string ${s}`;
    const result = await tryAsync<string>(promise('value'));

    expect(result.caught).toBe(false);
    expect(result.value).toBe('string value');
  });

  it('should return an error from a rejected promise', async () => {
    const promise = async () => {
      throw new Error('Nice error');
    };
    const result = await tryAsync<any, Error>(promise());

    expect(result.caught).toBe(true);
    expect(result.value).toBeInstanceOf(Error);
    expect(result.value).toHaveProperty('message', 'Nice error');
  });

  it('should return an empty error from a rejected promise', async () => {
    const promise = async () => {
      throw undefined; //eslint-disable-line
    };
    const result = await tryAsync<any, undefined>(promise());

    expect(result.caught).toBe(true);
    expect(result.value).toBe(undefined);
  });
});

describe('tryAsync (with async func)', () => {
  it('should return a value from a resolved promise', async () => {
    const func = async (arg: string) => `${arg} test`;
    const result = await tryAsync(func, 'this is');

    expect(result.caught).toBe(false);
    expect(result.value).toBe('this is test');
  });

  it('should return an error from a rejected promise', async () => {
    const promise = async () => {
      throw new Error('Nice error');
    };
    const result = await tryAsync<any, Error>(promise);

    expect(result.caught).toBe(true);
    expect(result.value).toBeInstanceOf(Error);
    expect(result.value).toHaveProperty('message', 'Nice error');
  });

  it('should return an empty error from a rejected promise', async () => {
    const promise = async () => {
      throw undefined; //eslint-disable-line
    };
    const result = await tryAsync<any, undefined>(promise);

    expect(result.caught).toBe(true);
    expect(result.value).toBe(undefined);
  });
});

describe('trySync', () => {
  it('should return a value from a function', () => {
    const fn = (s: string) => `string ${s}`;
    const result = trySync<string>(fn, 'value');

    expect(result.caught).toBe(false);
    expect(result.value).toBe('string value');
  });

  it('should return an error from a function', () => {
    const fn = () => {
      throw new Error('Nice error');
    };
    const result = trySync<any, Error>(fn);

    expect(result.caught).toBe(true);
    expect(result.value).toBeInstanceOf(Error);
    expect(result.value).toHaveProperty('message', 'Nice error');
  });
});
