const bcrypt = require("bcryptjs");

const myPlainPassword = "Sanjay@1234";

let encryptedPwd = bcrypt.hashSync(myPlainPassword, 8);
console.log(encryptedPwd);

const enteredPassword = "Sanjay@123";
const isMatching = bcrypt.compareSync(enteredPassword, encryptedPwd);
console.log(isMatching);
