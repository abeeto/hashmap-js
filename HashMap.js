import LinkedList from "./LinkedList.js";

export default class HashMap {
  #buckets;
  #capacity;
  #size;
  #loadFactor;
  constructor() {
    this.#capacity = 16;
    this.#loadFactor = 0.75;
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
    let existingKeys = this.keys();
    let alreadyHaveKey = existingKeys.includes(key);
    if (bucketIndex < 0 || bucketIndex >= this.#buckets.length) {
      throw new Error("Trying to access index out of bounds");
    } else if (alreadyHaveKey) {
      let target = this.#buckets[bucketIndex].head;
      while (target) {
        if (target.value.key === key) {
          target.value.value = value;
        }
        target = target.next;
      }
      return;
    } else if (this.#size >= Math.floor(this.#capacity * this.#loadFactor)) {
      this.#capacity *= 2;
      let allEntries = this.entries().map((entry) => {
        return { key: entry[0], value: entry[1] };
      });
      allEntries.push({ key, value });
      this.clear();
      allEntries.forEach((entry) => {
        this.set(entry.key, entry.value);
      });
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
    let target = bucketList.entries.find((node) => node.value.key === key);
    return target ? target.value.value : null;
  }

  has(key) {
    let bucketIndex = this.hash(key);
    let bucketList = this.#buckets[bucketIndex];
    if (bucketList) {
      let target = bucketList.entries.find((node) => node.value.key === key);
      return target !== undefined;
    }
    return false;
  }

  remove(key) {
    let bucketIndex = this.hash(key);
    let bucketList = this.#buckets[bucketIndex];
    if (bucketList) {
      let nodeToRemove = bucketList.entries.find(
        (node) => node.value.key === key
      );
      let targetIndex = bucketList.find(nodeToRemove);
      bucketList.removeAt(targetIndex);
      this.#size = this.#size - 1;
      return true;
    }
    return false;
  }
  clear() {
    this.#size = 0;
    this.#buckets = new Array(this.#capacity);
  }

  length() {
    return this.#size;
  }

  keys() {
    return this.#buckets
      .map((bucket) =>
        bucket.entries.reduce((keys, currentNode) => {
          keys.push(currentNode.value.key);
          return keys;
        }, new Array())
      )
      .flat();
  }

  values() {
    return this.#buckets
      .map((bucket) =>
        bucket.entries.reduce((values, currentNode) => {
          values.push(currentNode.value.value);
          return values;
        }, new Array())
      )
      .flat();
  }
  entries() {
    return this.#buckets
      .map((bucket) =>
        bucket.entries.reduce((entries, currentNode) => {
          entries.push([currentNode.value.key, currentNode.value.value]);
          return entries;
        }, new Array())
      )
      .flat();
  }
}
