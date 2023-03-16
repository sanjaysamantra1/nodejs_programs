const EventEmitter = require("events");

class TicketManager extends EventEmitter {
  constructor(supply) {
    super();
    this.supply = supply;
  }

  buy(email, price) {
    if (this.supply > 0) {
      this.supply--;
      this.emit("buy", email, price, new Date().toLocaleTimeString());
      return;
    }
    this.emit("error", new Error("There are no more tickets left to purchase"));
  }
}
module.exports = TicketManager;
