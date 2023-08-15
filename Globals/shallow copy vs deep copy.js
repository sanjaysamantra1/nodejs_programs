let user1 = { name: "dhiraj", age: 25, add: { city: "kolkata", state: "WB" } };

let user2 = { ...user1 }; // Shallow Copy, nested properties are copied by address
user2.name = "aditya";
user2.add.city = "howrah";
console.log("user1- ", user1);
console.log("user2- ", user2);

let user3 = structuredClone(user1); // Deep Copy,everything is copied by value
user3.name = "sachin";
user3.add.city = "mumbai";
console.log("user1- ", user1);
console.log("user3- ", user3);
