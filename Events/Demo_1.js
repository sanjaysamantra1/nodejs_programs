const events = require("events");
const eventEmitter = new events.EventEmitter();
// const EventEmmiterObj = new events<Module>.EventEmitter<Class>

eventEmitter.on("customEvent", function () { // Subscribe the Event
  console.log("A customEvent is detected!");
});
eventEmitter.emit("customEvent"); // trigger Event
