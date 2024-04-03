const { exec } = require("child_process");

exec("dir", (error, stdout, stderr) => {
  // if command not found
  if (error) {
    console.error(`error: ${error.message}`);
    return;
  }
  // if error while executing the command
  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }

  console.log(`stdout:\n${stdout}`);
});
