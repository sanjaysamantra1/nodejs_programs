const { execFile } = require('child_process');
const path = require('path');

execFile(path.resolve(__dirname, 'demo_1.bat'), { shell: true },(error, stdout, stderr) => {
    // if command not found
    if (error) {
        console.log(error.message);
        return;
    }
    // if error while executing the command
    if (stderr) {
        console.log(stderr);
        return;
    }
    console.log(stdout);
});