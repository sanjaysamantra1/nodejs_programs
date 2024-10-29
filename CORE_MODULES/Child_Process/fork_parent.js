// parent.js
const { fork } = require('child_process');

// Fork the child process, loading child.js as the module
const child = fork(`${__dirname}/fork_child_demo.js`);

// Listen for messages from the child process
child.on('message', (message) => {
    console.log('Message from child:', message);

    // Send acknowledgment back to the child
    child.send({ ack: `Received: ${message.data}` });
});

// Handle any errors from the child
child.on('error', (error) => {
    console.error('Error in child process:', error);
});

// Close event when child process is closed
child.on('exit', (code) => {
    console.log(`Child process exited with code ${code}`);
});
