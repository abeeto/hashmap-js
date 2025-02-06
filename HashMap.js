class HashMap {
  #capacity;
  #loadFactor;
  constructor() {
    this.#capacity = 16;
    this.#loadFactor = 0.7;
  }

  hash(key) {
    let hashCode = 0;
    const primeNum = 33;
    for (let i = 0; i < primeNum; i++) {
      hashCode = (primeNum * hashCode + key.charCodeAt(i)) % this.#capacity;
    }
    return hashCode;
  }
}
