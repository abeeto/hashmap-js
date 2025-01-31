import LinkedList from "./LinkedList.js";
let list = new LinkedList();
list.prepend("A");
console.log(list.toString());

list.append("B");
console.log(list.toString());

list.prepend("C");
console.log(list.toString());

list.prepend("D");
console.log(list.toString());

list.insertAt("F", 2);
console.log(list.toString());

list.append("J");
console.log(list.toString());

list.removeAt(2);
console.log(list.toString());

console.log(list.size);
console.log(list.find("B"));
