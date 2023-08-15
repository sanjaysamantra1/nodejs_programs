const os = require("os");

console.log("Type: " + os.type());
console.log("Platform: " + os.platform());
console.log("Architecture: " + os.arch());
console.log("Release: " + os.release());
console.log("Version: " + os.version());
console.log("Machine: " + os.machine());
console.log("Free RAM Memory: " + os.freemem() / 1024 / 1024 / 1024 + " GB"); // bytes
console.log("Total RAM Memory: " + os.totalmem() / 1024 / 1024 / 1024 + " GB"); // bytes
