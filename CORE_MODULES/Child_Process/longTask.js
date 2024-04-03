function longComputation() {
  let sum = 0;
  // 10 to the power 9
  for (let i = 0; i < 1000000000; i++) {
    sum = sum + i;
  }
  return sum;
}

process.on("message", (message) => {
  if (message === "start") {
    const sum = longComputation();
    process.send(sum);
  }
});
