const fs = require('fs');

function main() {
   fs.readFile('./file_1.txt', function(err, data){
      setTimeout(()=> console.log("timeout inside fs"),0); // 7
      setImmediate(()=> console.log("immediate inside fs")); //6
      Promise.resolve().then(()=> console.log("promise inside fs")); // 5
      process.nextTick(()=>{console.log("process.nextTick")}); // 4
      console.log("inside fs"); // 3
   })
   console.log("inside main"); // 1
}

main();
console.log("global"); // 2