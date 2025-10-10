const fs = require('fs');

// === CONFIGURATION ===
const LOG_DIR = 'logs';
const ARCHIVE_DIR = `${LOG_DIR}/archive`;
const LOG_FILE = `${LOG_DIR}/${getCurrentDate()}.log`;
const RETENTION_DAYS = 3; // delete logs older than 3 days

// === INITIAL SETUP ===
if (!fs.existsSync(LOG_DIR)) fs.mkdirSync(LOG_DIR);
if (!fs.existsSync(ARCHIVE_DIR)) fs.mkdirSync(ARCHIVE_DIR);

// === FUNCTIONS ===

// 1️⃣ Get current date as YYYY-MM-DD
function getCurrentDate() {
    const now = new Date();
    return now.toISOString().slice(0, 10);
}

// 2️⃣ Add a log entry
function addLog(message) {
    const timestamp = new Date().toLocaleString();
    const logEntry = `[${timestamp}] ${message}\n`;
    fs.appendFileSync(LOG_FILE, logEntry);
    console.log(`✅ Log added to ${LOG_FILE}`);
}

// 3️⃣ Read today’s log file
function readTodayLog() {
    if (fs.existsSync(LOG_FILE)) {
        const data = fs.readFileSync(LOG_FILE, 'utf-8');
        console.log(`📖 Today's Logs:\n${data}`);
    } else {
        console.log('⚠️ No log file found for today.');
    }
}

// 4️⃣ Archive yesterday’s log file
function archiveOldLogs() {
    const files = fs.readdirSync(LOG_DIR).filter(f => f.endsWith('.log'));
    const today = getCurrentDate();

    files.forEach(file => {
        if (file < today) {
            const oldPath = `${LOG_DIR}/${file}`;
            const newPath = `${ARCHIVE_DIR}/${file}`;
            fs.renameSync(oldPath, newPath);
            console.log(`📦 Archived log: ${file}`);
        }
    });
}

// 5️⃣ Delete logs older than RETENTION_DAYS
function cleanOldLogs() {
    const files = fs.readdirSync(ARCHIVE_DIR).filter(f => f.endsWith('.log'));
    const now = Date.now();

    files.forEach(file => {
        const filePath = `${ARCHIVE_DIR}/${file}`;
        const stats = fs.statSync(filePath);
        const ageInDays = (now - stats.birthtimeMs) / (1000 * 60 * 60 * 24);

        if (ageInDays > RETENTION_DAYS) {
            fs.unlinkSync(filePath);
            console.log(`🗑️ Deleted old log: ${file}`);
        }
    });
}

// === DEMO EXECUTION ===
console.log('🚀 Log Manager Started');
addLog('Server started successfully.');
addLog('User logged in.');
addLog('Database connected.');
addLog('Data fetched From Database.');
archiveOldLogs();
cleanOldLogs();
readTodayLog();
console.log('✅ Log Manager Completed');
