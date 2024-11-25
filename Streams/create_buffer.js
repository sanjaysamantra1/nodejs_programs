const { Buffer } = require('buffer');

// 1. create a buffer of given size
const buffer1 = Buffer.alloc(5);
console.log(buffer1);

// 2. create buffer from an array
const buffer2 = Buffer.from([1,2,3,4,5]);
console.log(buffer2)

// 4. create buffer from a string
const buffer3 = Buffer.from('Hello World!!');
console.log(buffer3)

// buffer to string
console.log(buffer3.toString());

