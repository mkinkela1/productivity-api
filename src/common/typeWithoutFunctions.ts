/* give me a function that will return a type of an object just made of primitive properties */
export type TWithoutFunctions<T> = {
  [P in keyof T]: T[P] extends (...args: any[]) => any ? never : T[P];
};
