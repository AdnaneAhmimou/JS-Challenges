//const fs = require('fs');
const EventEmitter = require('events');
const fs = require('fs');
const readline = require('readline');
class User {
  constructor(accountID, name, pin, balance, transactions) {
    this.accountID = accountID;
    this.name = name;
    this.pin = pin;
    this.balance = balance;
    this.transactions = transactions;
  }

  checkBalance() {
    return this.balance;
  }

  deposit(amount) {
    if (amount <= 0) {
      throw new Error("Invalid amount. Please enter a positive value.");
    }

    this.balance += amount;
    this.transactions.push({
      type: "deposit",
      amount: amount,
      date: new Date().toISOString().split("T")[0],
    });
  }

  "withdraw"(amount) {
    if (amount <= 0) {
      throw new Error("Invalid amount. Please enter a positive value.");
    }

    if (amount > this.balance) {
      throw new Error("Insufficient funds.");
    }

    this.balance -= amount;
    this.transactions.push({
      type: "withdraw",
      amount: amount,
      date: new Date().toISOString().split("T")[0],
    });
  }

  viewTransactions() {
    return this.transactions;
  }
}

//class ATMSystem extends EventEmitter {
//   constructor() {
//     super();
//     this.users = [];
//     this.transactions = [];
//   }

//   loadUsersData() {
//     try {
//       const data = fs.readFileSync('users.json');
//       this.users = JSON.parse(data);
//     } catch (error) {
//       console.error('Error loading users data:', error);
//     }
//   }

//   saveUsersData() {
//     try {
//       fs.writeFileSync('users.json', JSON.stringify(this.users, null, 2));
//     } catch (error) {
//       console.error('Error saving users data:', error);
//     }
//   }

//   loadTransactionsData() {
//     try {
//       const data = fs.readFileSync('transactions.json');
//       this.transactions = JSON.parse(data);
//     } catch (error) {
//       console.error('Error loading transactions data:', error);
//     }
//   }

//   saveTransactionsData() {
//     try {
//       fs.writeFileSync('transactions.json', JSON.stringify(this.transactions, null, 2));
//     } catch (error) {
//       console.error('Error saving transactions data:', error);
//     }
//   }

//   addUser(name, pin) {
//     const accountID = `ACC${this.users.length + 1}`;
//     const newUser = {
//       accountID,
//       name,
//       pin,
//       balance: 0,
//       transactions: [],
//     };
//     this.users.push(newUser);
//     this.saveUsersData();
//     console.log('User added successfully.');
//   }

//   authenticateUser(accountID, pin) {
//     const user = this.users.find((u) => u.accountID === accountID && u.pin === pin);
//     return user;
//   }

//   checkBalance(accountID) {
//     const user = this.users.find((u) => u.accountID === accountID);
//     if (user) {
//       console.log(`Account Balance: $${user.balance}`);
//     } else {
//       console.log('User not found.');
//     }
//   }

//   depositMoney(accountID, amount) {
//     const user = this.users.find((u) => u.accountID === accountID);
//     if (user) {
//       user.balance += amount;
//       user.transactions.push({ type: 'deposit', amount, date: new Date().toISOString() });
//       this.saveUsersData();
//       console.log(`$${amount} deposited successfully.`);
//     } else {
//       console.log('User not found.');
//     }
//   }

//   withdrawMoney(accountID, amount) {
//     const user = this.users.find((u) => u.accountID === accountID);
//     if (user) {
//       if (user.balance >= amount) {
//         user.balance -= amount;
//         user.transactions.push({ type: 'withdraw', amount, date: new Date().toISOString() });
//         this.saveUsersData();
//         console.log(`$${amount} withdrawn successfully.`);
//       } else {
//         console.log('Insufficient funds.');
//       }
//     } else {
//       console.log('User not found.');
//     }
//   }

//   viewTransactionHistory(accountID) {
//     const user = this.users.find((u) => u.accountID === accountID);
//     if (user) {
//       console.log('Transaction History:');
//       user.transactions.forEach((transaction) => {
//         console.log(`- ${transaction.type}: $${transaction.amount} on ${transaction.date}`);
//       });
//     } else {
//       console.log('User not found.');
//     }
//   }
// }


// const atm = new ATMSystem();
// atm.loadUsers();
// atm.showLogin();
// module.exports = ATMSystem;


module.exports = User;