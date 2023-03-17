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

ticketManager.buy("test-111@email.com", 200);
ticketManager.buy("test-222@email.com", 300);
ticketManager.buy("test-333@email.com", 100);
