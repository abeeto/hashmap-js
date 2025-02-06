import LinkedList from "./LinkedList";

class HashMap {
  #map;
  #capacity;
  #size;
  #loadFactor;
  constructor() {
    this.#capacity = 16;
    this.#loadFactor = 0.7;
    this.#size = 0;
    this.#map = [];
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
    if (bucketIndex < 0 || bucketIndex >= buckets.length) {
      throw new Error("Trying to access index out of bounds");
    } else if (this.#size >= Math.floor(this.#capacity * this.#loadFactor)) {
      // TODO: find way to resize map to double capacity
      console.log("Should resize here!");
    }
    let bucketList = this.#map[bucketIndex];
    if (bucketList === undefined) {
      bucketList = new LinkedList();
    }
    let currentPairValue = bucketList?.at(bucketList?.find(key));
    if (currentPairValue) {
      currentPairValue.value = value;
    } else {
      bucketList.append({ key, value });
      this.#size = this.#size + 1;
    }
  }
}
