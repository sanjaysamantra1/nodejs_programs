// Send a message to the parent every second
setInterval(() => {
  process.send({ data: 'Hello from child!' });
}, 1000);

setTimeout(() => {
  process.exit(0);
}, 10000);

// Listen for messages from the parent process
process.on('message', (message) => {
  console.log('Message from parent:', message);
});

