const minimist = require("minimist");

const argsArr = process.argv.slice(2); // ['name=sanjay','add=bangalore']
const argsObj = minimist(argsArr); //{name: 'sanjay', add: 'bangalore' }
console.log(argsArr, argsObj);


// node minimist_demo_1.js --name=sanjay --add=bangalore
