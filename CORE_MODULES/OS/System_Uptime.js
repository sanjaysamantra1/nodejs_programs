const os = require('os');

setInterval(() => {
    const uptime = os.uptime();
    const hours = Math.floor(uptime / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = uptime % 60;

    console.clear();  // Clear console for real-time effect
    console.log(`System Uptime: ${hours}h ${minutes}m ${seconds}s`);
}, 1000);
