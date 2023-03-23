const { spawn } = require("child_process");

for (var i = 1; i <= 3; i++) {
  const fileName = `test_${i}.js`;
  const childProcess = spawn("node", [fileName]);

  childProcess.stdout.on("data", function (data) {
    console.log("stdout: " + data);
  });
  childProcess.stderr.on("data", function (data) {
    console.log("stderr: " + data);
  });
  childProcess.on("close", function (code) {
    console.log("child process exited with code " + code);
  });
}
