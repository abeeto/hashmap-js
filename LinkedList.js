class Node {
  #value;
  #nextNode;

  constructor(value) {
    this.#value = value;
    this.#nextNode = null;
  }

  set next(node) {
    this.#nextNode = node;
  }
  get next() {
    return this.#nextNode;
  }
  get value() {
    return this.#value;
  }
}

export default class LinkedList {
  #head;
  #tail;
  #size;
  constructor() {
    this.#head = null;
    this.#tail = null;
    this.#size = 0;
  }

  append(value) {
    let newNode = new Node(value);
    if (this.#size === 0) {
      this.#head = newNode;
      this.#tail = newNode;
    } else {
      this.#tail.next = newNode;
      this.#tail = newNode;
    }
    this.#size = this.#size + 1;
  }

  prepend(value) {
    let newNode = new Node(value);
    let temp = this.#head;
    this.#head = newNode;
    if (this.#size === 0) this.#tail = newNode;
    newNode.next = temp;
    this.#size = this.#size + 1;
  }

  pop() {
    let popped = this.#tail;
    this.#tail = this.at(this.#size - 2);
    this.#tail.next = null;
    this.#size = this.#size - 1;
    return popped;
  }

  at(index) {
    let target = this.#head;
    let step = 0;
    while (target.next && step < index) {
      target = target.next;
      step++;
    }
    return step === index ? target : null;
  }

  contains(value) {
    let target = this.#head;
    while (target) {
      if (
        (typeof value === "object" && target.value === value.value) ||
        target.value === value
      ) {
        return true;
      }
      target = target.next;
    }
    return false;
  }
  find(value) {
    if (this.contains(value) === false) return null;
    let target = this.#head;
    let index = 0;
    while (target) {
      if (
        (typeof value === "object" && target.value === value.value) ||
        target.value === value
      ) {
        return index;
      }
      index++;
      target = target.next;
    }
    return null;
  }
  insertAt(value, index) {
    let backNode = this.at(index - 1);
    let oldNode = backNode.next;
    let newNode = new Node(value);
    backNode.next = newNode;
    newNode.next = oldNode;
  }

  removeAt(index) {
    let toRemove = this.at(index);
    if (index === 0 && this.#size === 1) {
      this.#head = null;
      this.#tail = null;
    } else if (index === 0 && toRemove) {
      this.#head = toRemove.next;
    } else if (toRemove) {
      let backNode = this.at(index - 1);
      backNode.next = toRemove.next;
    }
    this.#size = this.#size - 1;
  }

  toString() {
    if (this.#size === 0) return "Empty linkedList! Add nodes!";
    let target = this.#head;
    let output = "";
    while (target) {
      output += `( ${target.value} )`;
      if (target.next) {
        output += ` -> `;
      }
      target = target.next;
    }
    output += " -> null";
    return output;
  }

  get head() {
    return this.#head;
  }
  get tail() {
    return this.#tail;
  }
  get size() {
    return this.#size;
  }

  get entries() {
    let allNodes = [];
    let target = this.#head;
    while (target) {
      allNodes.push(target);
      target = target.next;
    }
    return allNodes;
  }
}
