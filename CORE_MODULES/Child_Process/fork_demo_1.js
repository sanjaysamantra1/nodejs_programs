const express = require("express");
const app = express()
const cp = require("child_process")

app.get("/one", (req, res) => {
  console.log('Request Received...on /one')
  const sum = longComputation();
  res.send({ sum: sum });
});
app.get("/two", async (req, res) => {
  const sum = await longComputationPromise();
  res.send({ sum: sum });
});
app.get("/three", (req, res) => {
  const child = cp.fork("./longTask.js");
  child.send("start");
  child.on("message", function (sum) {
    res.send({ sum: sum });
  });
});

function longComputation() {
  let sum = 0;
  // 10 to the power 9
  for (let i = 0; i < 1000000000; i++) {
    sum = sum + i;
  }
  return sum;
}
function longComputationPromise() {
  return new Promise((resolve) => {
    let sum = 0;
    for (let i = 0; i < 1000000000; i++) {
      sum = sum + i;
    }
    resolve(sum);
  });
}

app.listen(5000, () => {
  console.log("server is listening on port 5000...");
})

// npm install loadtest -g
// loadtest -n 10 -c 10 http://localhost:5000/one
