let obj1 = { a: 10, b: 20 };
let obj2 = obj1; // Reference Copy

obj1.a = 15;
obj2.b = 25;
console.log("Obj1 ", obj1);
console.log("Obj2 ", obj2);
