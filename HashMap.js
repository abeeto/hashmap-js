import LinkedList from "./LinkedList.js";

class HashMap {
  #buckets;
  #capacity;
  #size;
  #loadFactor;
  constructor() {
    this.#capacity = 16;
    this.#loadFactor = 0.7;
    this.#size = 0;
    this.#buckets = new Array(this.#capacity);
  }

  hash(key) {
    let hashCode = 0;
    const primeNum = 33;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNum * hashCode + key.charCodeAt(i)) % this.#capacity;
    }
    return hashCode;
  }

  set(key, value) {
    let bucketIndex = this.hash(key);
    if (bucketIndex < 0 || bucketIndex >= this.#buckets.length) {
      throw new Error("Trying to access index out of bounds");
    } else if (this.#size >= Math.floor(this.#capacity * this.#loadFactor)) {
      // TODO: find way to resize map to double capacity
      console.log("Should resize here!");
    }
    if (this.#buckets[bucketIndex] === undefined) {
      this.#buckets[bucketIndex] = new LinkedList();
    }
    let bucketList = this.#buckets[bucketIndex];
    bucketList.append({ key, value });
    this.#size = this.#size + 1;
  }

  get(key) {
    let bucketIndex = this.hash(key);
    if (bucketIndex < 0 || bucketIndex >= this.#buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }
    let bucketList = this.#buckets[bucketIndex];
    if (bucketList === undefined) return null;
    bucketList.entries.forEach((node) => {
      if (node.value.key === key) {
        console.log(node.value.value);
        return node.value.value;
      }
    });
  }

  length() {
    return this.#size;
  }
}
