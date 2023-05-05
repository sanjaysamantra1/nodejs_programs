const TicketManager = require("./ticketManager");
const EmailService = require("./EmailService");

const ticketManager = new TicketManager(2);
const emailService = new EmailService();

ticketManager.on("buy", (person, price, time) => {
  console.log(`${person} bought a ticket for Rs.${price} at ${time}`);
  emailService.send(person);
});

ticketManager.on("error", (error) => {
  console.error(error);
});

ticketManager.buy("person-1@gmail.com", 200);
ticketManager.buy("person-2@gmail.com", 300);
ticketManager.buy("person-3@gmail.com", 100);

