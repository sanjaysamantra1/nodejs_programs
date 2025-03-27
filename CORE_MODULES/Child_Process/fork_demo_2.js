const { fork } = require("child_process");
const os = require("os");

const numCPUs = os.cpus().length; // Get the number of CPU cores

// Fork workers
for (let i = 0; i < numCPUs; i++) {
  const worker = fork("worker.js"); // Create a child process for each CPU

  worker.on("message", (msg) => {
    console.log(`Message from Worker ${worker.pid}: ${msg}`);
  });

  worker.send("Start Server"); // Send a message to child process
}
