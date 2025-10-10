// fileManager.js
const fs = require('fs');

// Directory and file names
const dirName = 'files';
const fileName = `${dirName}/demo.txt`;
const newFileName = `${dirName}/renamed.txt`;

// 1️⃣ Create directory (if it doesn’t exist)
if (!fs.existsSync(dirName)) {
    fs.mkdirSync(dirName);
    console.log('📁 "files" directory created.');
}

// 2️⃣ Create and write to file
fs.writeFileSync(fileName, 'Hello, Node.js FS module!\n');
console.log('📝 File created and written.');

// 3️⃣ Append to file
fs.appendFileSync(fileName, 'This is an appended line.\n');
console.log('➕ Data appended to file.');

// 4️⃣ Read file content
const data = fs.readFileSync(fileName, 'utf-8');
console.log('📖 File Content:\n' + data);

// 5️⃣ Rename file
fs.renameSync(fileName, newFileName);
console.log('✏️ File renamed to "renamed.txt".');

// 6️⃣ Check if file exists
if (fs.existsSync(newFileName)) {
    console.log('✅ File exists after renaming.');
}

// 7️⃣ File stats
const stats = fs.statSync(newFileName);
console.log('📊 File Stats:');
console.log('   Size:', stats.size, 'bytes');
console.log('   Created:', stats.birthtime);
console.log('   Modified:', stats.mtime);

// 8️⃣ List all files in directory
const files = fs.readdirSync(dirName);
console.log('📂 Files in directory:', files);

// 9️⃣ Delete file
fs.unlinkSync(newFileName);
console.log('🗑️ File deleted.');

// 🔟 Remove directory
fs.rmdirSync(dirName);
console.log('🚮 Directory removed.');
