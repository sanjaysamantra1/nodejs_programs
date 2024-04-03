const cp = require('child_process');

const output = cp.execSync('node test.js');
// return buffer

console.log(output.toString());