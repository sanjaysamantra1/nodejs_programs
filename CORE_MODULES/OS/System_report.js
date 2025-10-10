// systemReport.js
const os = require('os');

// Helper to format bytes as GB
const toGB = (bytes) => (bytes / (1024 ** 3)).toFixed(2);

// Helper to format uptime in hh:mm:ss
const formatUptime = (seconds) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return `${h}h ${m}m ${s}s`;
};

// Function to get IPv4 addresses
const getIPAddresses = () => {
  const nets = os.networkInterfaces();
  const results = [];

  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === 'IPv4' && !net.internal) {
        results.push({ interface: name, address: net.address });
      }
    }
  }

  return results;
};

// Generate system report
const generateSystemReport = () => {
  const cpus = os.cpus();

  console.log('🧾 SYSTEM REPORT');
  console.log('===============================');
  console.log(`🖥️  Hostname      : ${os.hostname()}`);
  console.log(`🧭 OS Type        : ${os.type()} (${os.platform()})`);
  console.log(`⚙️  OS Release     : ${os.release()}`);
  console.log(`🏗️  Architecture  : ${os.arch()}`);
  console.log(`⏱️  Uptime         : ${formatUptime(os.uptime())}`);
  console.log('-------------------------------');
  console.log(`💾 Total Memory   : ${toGB(os.totalmem())} GB`);
  console.log(`📉 Free Memory    : ${toGB(os.freemem())} GB`);
  console.log('-------------------------------');
  console.log(`🧠 CPU Cores      : ${cpus.length}`);
  console.log(`🔹 Model          : ${cpus[0].model}`);
  console.log(`⚡ Speed/Core     : ${cpus[0].speed} MHz`);
  console.log('-------------------------------');
  console.log('🌐 Network Interfaces:');
  getIPAddresses().forEach((net) =>
    console.log(`   ${net.interface}: ${net.address}`)
  );
  console.log('===============================');
  console.log(`📅 Report Generated: ${new Date().toLocaleString()}`);
};

// Run report
generateSystemReport();
