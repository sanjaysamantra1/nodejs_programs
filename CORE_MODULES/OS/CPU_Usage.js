const os = require('os');

function getCpuUsage() {
    const cpus = os.cpus();
    cpus.forEach((cpu, index) => {
        let total = 0;
        let idle = 0;

        Object.keys(cpu.times).forEach(type => {
            total += cpu.times[type];
        });

        idle += cpu.times.idle;

        const usage = ((total - idle) / total) * 100;

        console.log(`CPU ${index + 1}: ${usage.toFixed(2)}%`);
    });
}

setInterval(() => {
    console.clear();
    getCpuUsage();
}, 1000);
