const EventEmitter = require("events");
const event = new EventEmitter();

const cars = ["tata", "honda", "toyota", "bmw"];

event.on("add", (car) => {
  cars.push(car);
  console.log(cars);
});
event.on("deleteLast", () => {
  cars.pop();
  console.log(cars);
});
event.on("deleteFirst", () => {
  cars.shift();
  console.log(cars);
});

event.emit("add", "maruti");
