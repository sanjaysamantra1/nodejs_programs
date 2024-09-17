const os = require('os');

setInterval(() => {
    const freeMem = os.freemem();
    const totalMem = os.totalmem();
    const usedMem = totalMem - freeMem;
    const memUsage = (usedMem / totalMem) * 100;

    console.clear();
    console.log(`Free Memory: ${(freeMem / 1024 / 1024).toFixed(2)} MB`);
    console.log(`Total Memory: ${(totalMem / 1024 / 1024).toFixed(2)} MB`);
    console.log(`Memory Usage: ${memUsage.toFixed(2)}%`);
}, 1000);
