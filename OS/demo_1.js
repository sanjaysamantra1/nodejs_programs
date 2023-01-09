const os = require('os');
console.log(os.userInfo());
console.log("Type: " + os.type());
console.log("Platform: " + os.platform());
console.log("Architecture: " + os.arch());
console.log("Free Memory: " + os.freemem()/1024/1024/1024); // bytes
console.log("Total Memory: " + os.totalmem()/1024/1024/1024); // bytes