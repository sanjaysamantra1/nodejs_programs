// Import required modules
const EventEmitter = require('events');

// Create an instance of EventEmitter
class TicketBookingSystem extends EventEmitter {
    constructor(totalTickets) {
        super();
        this.availableTickets = totalTickets;
    }

    // Book a ticket
    bookTicket(customerName) {
        if (this.availableTickets > 0) {
            this.availableTickets--;
            this.emit('booked', customerName);
        } else {
            this.emit('soldOut', customerName);
        }
    }

    // Cancel a ticket
    cancelTicket(customerName) {
        this.availableTickets++;
        this.emit('canceled', customerName);
    }

    // Check available tickets
    checkAvailability() {
        this.emit('checked', this.availableTickets);
    }
}

// Initialize the Ticket Booking System with 5 available tickets
const ticketSystem = new TicketBookingSystem(5);

// Event listener when a ticket is booked
ticketSystem.on('booked', (customerName) => {
    console.log(`Ticket successfully booked for ${customerName} on ${new Date().toLocaleString()}`);
    console.log(`Tickets remaining: ${ticketSystem.availableTickets}`);
});

// Event listener when tickets are sold out
ticketSystem.on('soldOut', (customerName) => {
    console.log(`Sorry, ${customerName}. Tickets are sold out!`);
});

// Event listener when a ticket is canceled
ticketSystem.on('canceled', (customerName) => {
    console.log(`${customerName} has canceled their ticket on ${new Date().toLocaleString()}`);
    console.log(`Tickets remaining: ${ticketSystem.availableTickets}`);
});

// Event listener to check ticket availability
ticketSystem.on('checked', (remainingTickets) => {
    console.log(`Tickets remaining: ${remainingTickets}`);
});

// Simulating booking and canceling tickets
ticketSystem.bookTicket('John');
ticketSystem.bookTicket('Alice');
ticketSystem.bookTicket('Bob');
ticketSystem.bookTicket('Eve');
ticketSystem.bookTicket('Charlie');

// Check availability after booking
ticketSystem.checkAvailability();

// Try booking a ticket when sold out
ticketSystem.bookTicket('Dave');

// Cancel a ticket and check availability
ticketSystem.cancelTicket('Alice');
ticketSystem.checkAvailability();

// Book a ticket again after canceling
ticketSystem.bookTicket('Dave');
