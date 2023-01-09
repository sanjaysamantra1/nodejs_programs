const EventEmitter = require("events");
const event = new EventEmitter();

event.on("sayHi", () => {
  console.log("Hi Sanjay!!!");
});
event.emit("sayHi");
