const fs = require('fs').promises;

async function mergeFiles() {
  try {
    const [data1, data2] = await Promise.all([
      fs.readFile('./content/first.txt', 'utf8'),
      fs.readFile('./content/second.txt', 'utf8')
    ]);
    await fs.writeFile('./content/file3.txt', `${data1}\n${data2}`);
    console.log('Successful');
  } catch (err) {
    console.error('Error:', err);
  }
}
mergeFiles();
