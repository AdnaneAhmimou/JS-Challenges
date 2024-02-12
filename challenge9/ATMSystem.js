const fs = require('fs').promises; // Using promises version of fs
const readline = require('readline');

class ATMSystem {
  constructor() {
    this.users = [];
    this.currentUser = null;
  }

  async loadUsers() {
    try {
      const usersData = await fs.readFile("users.json");
      this.users = JSON.parse(usersData);
    } catch (error) {
      console.error("Error loading users:", error);
    }
  }

  async saveUsers() {
    try {
      const usersData = JSON.stringify(this.users, null, 2);
      await fs.writeFile("users.json", usersData);
    } catch (error) {
      console.error("Error saving users:", error);
    }
  }

  async authenticateUser(accountID, pin) {
    const user = this.users.find(
      (user) => user.accountID === accountID && user.pin === pin
    );
    if (user) {
      this.currentUser = user;
      console.log("Authentication successful!");
      await this.showMenu();
    } else {
      console.log("Invalid accountID or pin. Please try again.");
      await this.showLogin();
    }
  }

  async showLogin() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    await new Promise((resolve) => {
      rl.question("Enter your accountID: ", (accountID) => {
        rl.question("Enter your pin: ", (pin) => {
          this.authenticateUser(accountID, pin);
          rl.close();
          resolve();
        });
      });
    });
  }

  async showMenu() {
    console.log("Welcome to the ATM system!");
    console.log("1. Check Balance");
    console.log("2. Deposit Money");
    console.log("3. Withdraw Money");
    console.log("4. View Transaction History");
    console.log("5. Exit");

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    await new Promise((resolve) => {
      rl.question("Enter your choice: ", async (choice) => {
        switch (choice) {
          case "1":
            await this.checkBalance();
            rl.close();
            break;
          case "2":
            await this.depositMoney();
            rl.close();
            break;
          case "3":
            await this.withdrawMoney();
            rl.close();
            break;
          case "4":
            await this.viewTransactionHistory();
            rl.close();
            break;
          case "5":
            console.log("Thank you for using the ATM system. Goodbye!");
            rl.close();
            break;
          default:
            console.log("Invalid choice. Please try again.");
            await this.showMenu();
            break;
        }
        resolve();
      });
    });
  }

  async checkBalance() {
    console.log(`Your current balance is: $${this.currentUser.balance}`);
    await this.showMenu();
  }

  async depositMoney() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    await new Promise((resolve) => {
      rl.question("Enter the amount to deposit: ", async (amount) => {
        const depositAmount = parseFloat(amount);
        if (isNaN(depositAmount) || depositAmount <= 0) {
          console.log("Invalid amount. Please try again.");
          await this.depositMoney();
        } else {
          this.currentUser.balance += depositAmount;
          this.currentUser.transactions.push({
            type: "deposit",
            amount: depositAmount,
            date: new Date().toISOString().split("T")[0],
          });
          await this.saveUsers();
          console.log(`Successfully deposited $${depositAmount}.`);
          await this.showMenu();
        }
        rl.close();
        resolve();
      });
    });
  }

  async withdrawMoney() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    await new Promise((resolve) => {
      rl.question("Enter the amount to withdraw: ", async (amount) => {
        const withdrawAmount = parseFloat(amount);
        if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
          console.log("Invalid amount. Please try again.");
          await this.withdrawMoney();
        } else if (withdrawAmount > this.currentUser.balance) {
          console.log("Insufficient funds. Please try again.");
          await this.withdrawMoney();
        } else {
          this.currentUser.balance -= withdrawAmount;
          this.currentUser.transactions.push({
            type: "withdraw",
            amount: withdrawAmount,
            date: new Date().toISOString().split("T")[0],
          });
          await this.saveUsers();
          console.log(`Successfully withdrew $${withdrawAmount}.`);
          await this.showMenu();
        }
        rl.close();
        resolve();
      });
    });
  }

  async viewTransactionHistory() {
    console.log("Transaction History:");
    this.currentUser.transactions.forEach((transaction) => {
      console.log(
        `- ${transaction.type}: $${transaction.amount} on ${transaction.date}`
      );
    });
    await this.showMenu();
  }
}

module.exports = ATMSystem;
