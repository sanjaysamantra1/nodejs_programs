const EventEmitter = require("events");
const event = new EventEmitter();

// multiple listeners
event.on("sayHi", () => {
  console.log("Hi Sanjay!!!");
});
event.addListener("sayHi", () => {
  console.log("Hi Samantra!!!");
});
event.emit("sayHi");
