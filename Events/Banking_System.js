const EventEmitter = require('events');

// Define a BankAccount class extending EventEmitter
class BankAccount extends EventEmitter {
    constructor(accountHolder, balance) {
        super();
        this.accountHolder = accountHolder;
        this.balance = balance;
    }

    // Deposit money to the account
    deposit(amount) {
        this.balance += amount;
        this.emit('deposit', amount);
        this.checkBalance();
    }

    // Withdraw money from the account
    withdraw(amount) {
        if (amount > this.balance) {
            this.emit('insufficientFunds', amount);
        } else {
            this.balance -= amount;
            this.emit('withdraw', amount);
            this.checkBalance();
        }
    }

    // Check the current balance
    checkBalance() {
        this.emit('checkBalance', this.balance);
        if (this.balance < 100) {
            this.emit('lowBalance');
        }
    }
}

// Create a new bank account for a customer
const johnsAccount = new BankAccount('John Doe', 500);

// Event listeners for various events
johnsAccount.on('deposit', (amount) => {
    console.log(`Deposited: $${amount}`);
});

johnsAccount.on('withdraw', (amount) => {
    console.log(`Withdrawn: $${amount}`);
});

johnsAccount.on('checkBalance', (balance) => {
    console.log(`Current balance: $${balance}`);
});

johnsAccount.on('insufficientFunds', (amount) => {
    console.log(`Insufficient funds! Attempted to withdraw $${amount}.`);
});

johnsAccount.on('lowBalance', () => {
    console.log('Warning: Your balance is below $100!');
});

// Simulate various banking transactions
johnsAccount.deposit(200);
johnsAccount.withdraw(100);
johnsAccount.withdraw(650);  // This will trigger insufficient funds
johnsAccount.withdraw(50);   // This will cause low balance warning
johnsAccount.deposit(500);   // Deposit more money
