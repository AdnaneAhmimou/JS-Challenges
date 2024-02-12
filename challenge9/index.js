const ATMSystem = require('./ATMSystem');

const atm = new ATMSystem();
atm.loadUsers();
atm.showLogin();