const os = require("os");

// method returns the system uptime in seconds
console.log(`The System Uptime is ${os.uptime()} seconds`);
console.log(`The System Uptime is ${os.uptime() / 60 / 60} hours`);

// System Information
const cpus = os.cpus(); // [{},{}]
console.log(cpus.length + " core"); // 4 core
console.log(os.homedir()); //current user's home directory
console.log(os.tmpdir()); //current user's temp directory
console.log(os.hostname()); //host name
