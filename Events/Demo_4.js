const EventEmitter = require("events");
const event = new EventEmitter();

//event with parameters
event.on("greet", (name, msg) => {
  console.log(`Hi ${name} ${msg}`);
});
event.emit("greet", "sanjay", "good morning");
