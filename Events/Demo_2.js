const EventEmitter = require("events");
const eventObj = new EventEmitter();

eventObj.on("sayHi", () => {
  console.log("Hi Sanjay!!!");
});

eventObj.emit("sayHi");
