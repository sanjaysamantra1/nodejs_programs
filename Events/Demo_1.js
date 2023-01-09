var events = require("events");
var eventEmitter = new events.EventEmitter();

eventEmitter.on("customEvent", function () {
  console.log("A customEvent is detected!");
});
eventEmitter.emit("customEvent");
