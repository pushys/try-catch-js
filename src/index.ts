export interface SuccessType<D> {
  caught: false;
  value: D;
}
export interface FailureType<E> {
  caught: true;
  value: E;
}
export type ResultType<D, E> = SuccessType<D> | FailureType<E>;

export async function tryAsync<D = any, E = any>(
  target: (...args: any[]) => Promise<D>,
  ...args: any[]
): Promise<ResultType<D, E>>;
export async function tryAsync<D = any, E = any>(
  target: Promise<D>
): Promise<ResultType<D, E>>;

/**
 * Asynchronous version.
 *
 * @param target  - Promise or an asynchronous function.
 * @param args    - Optional list of arguments (for async func).
 *
 * @return {Promise}
 */
export async function tryAsync<D = any, E = any>(
  target: ((...args: any[]) => Promise<D>) | Promise<D>,
  ...args: any[]
): Promise<ResultType<D, E>> {
  // If target is an async function then
  // apply optional arguments and execute
  if (typeof target === 'function') {
    try {
      const value = await target.apply(null, args);
      return { caught: false, value };
    } catch (e) {
      return { caught: true, value: e };
    }
  }

  // If target is already a baked
  // promise then just wrap it up
  return target
    .then<SuccessType<D>>((d: D) => ({
      caught: false,
      value: d,
    }))
    .catch<FailureType<E>>((e: E) => ({
      caught: true,
      value: e,
    }));
}

/**
 * Synchronous version.
 *
 * @param fn    - Function.
 * @param args  - Optional list of arguments.
 *
 * @return {Promise}
 */
export function trySync<T = any, U = any>(
  fn: (...args: any[]) => T,
  ...args: any[]
): ResultType<T, U> {
  try {
    const value = fn.apply(null, args);
    return { caught: false, value };
  } catch (e) {
    return { caught: true, value: e };
  }
}
