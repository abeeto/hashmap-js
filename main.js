import HashMap from "./HashMap.js";

const test = new HashMap(); // or HashMap() if using a factory
test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

test.set("ice cream", "bubblegum");
test.set("carrot", "red");
test.set("frog", "blue");
test.set("elephant", "mexican");

test.set("moon", "silver");

console.log(test.get("moon"));
console.log(test.get("frog"));
console.log(test.get("apple"));

console.log(test.length());
test.remove("hat");
console.log(test.get("hat"));
console.log(test.get("grape"));
console.log(test.length());

console.log(test.entries());
