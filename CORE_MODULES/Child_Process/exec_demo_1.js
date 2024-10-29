const { exec } = require('child_process');

let urls = [
    'https://www.w3schools.com/',
    'https://www.tutorialspoint.com/index.htm',
    'https://www.geeksforgeeks.org/'
]
for (url of urls) {
    exec(`start chrome ${url}`)
}
for (let i = 1; i <= 15000; i++) {
    console.log('Main Thread Runs::: ', i);
}