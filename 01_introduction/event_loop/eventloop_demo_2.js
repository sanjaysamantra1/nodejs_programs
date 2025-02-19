const fs = require('fs');

console.log('Synchronous Code Starts');

// Timer (executed in Timer Phase)
setTimeout(() => {
    console.log('setTimeout with 1000 wait');
}, 1000);

// Timer (executed in Timer Phase)
setTimeout(() => {
    console.log('setTimeout with 0 wait');
}, 0);

// Check Phase (executed after poll phase)
setImmediate(() => {
    console.log('setImmediate');
});

// Microtask (executed before moving to the next phase)
Promise.resolve().then(() => {
    console.log('Promise');
});

// Microtask (process.nextTick always executes before Promise)
process.nextTick(() => {
    console.log('nextTick');
});

// File I/O (goes to Poll Phase first)
fs.readFile(__filename, () => {
    console.log('File Read CallBack Starts');

    // Inside I/O, queue an immediate function (Check Phase)
    setImmediate(() => {
        console.log('setImmediate inside File Read');
    });

    // Inside I/O, queue a timer (Timer Phase)
    setTimeout(() => {
        console.log('setTimeout inside File Read with 0 wait');
    }, 0);

    // Inside I/O, queue a timer (Timer Phase)
    setTimeout(() => {
        console.log('setTimeout inside File Read with 1000 wait');
    }, 1000);

    // Microtask inside I/O
    process.nextTick(() => {
        console.log('nextTick inside File Read');
    });

    // Promise Microtask inside I/O
    Promise.resolve().then(() => {
        console.log('Promise inside File Read');
    });

    console.log('File Read CallBack Ends');
});

console.log('Synchronous Code Ends');
