let str = "Hello";

let encryptedStr = btoa(str); // encrypt
console.log(encryptedStr);

let decryptedStr = atob(encryptedStr); //decrypt
console.log(decryptedStr);
