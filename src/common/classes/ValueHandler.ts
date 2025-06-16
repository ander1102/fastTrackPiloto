export class ValueHandler<T> {
  value: T;

  constructor(initial: T) {
    this.value = initial;
  }

  get() {
    return this.value;
  }

  set(value: T) {
    this.value = value;
  }

  getDeepCopy() {
    return structuredClone(this.value);
  }
}
