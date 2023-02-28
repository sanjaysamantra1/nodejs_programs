let user = { name: "sanjay", age: 30, sal: 5000 };

const userStr = JSON.stringify(user);
console.log(userStr);

const userObj = JSON.parse(userStr);
console.log(userObj.name);
