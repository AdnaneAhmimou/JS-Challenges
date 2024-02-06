const readline = require("readline");

const { stdin, stdout } = process;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let contacts = [];

function addContact() {
  rl.question("Enter the name: ", (name) => {
    rl.question("Enter the phone number: ", (phoneNumber) => {
      contacts.push({ name, phoneNumber });
      console.log(`Contact added: ${name}, ${phoneNumber}`);
      mainMenu();
    });
  });
}

function viewAllContacts() {
  console.log("\nAll Contacts:");
  contacts.forEach((contact) => {
    console.log(`Name: ${contact.name}, Phone Number: ${contact.phoneNumber}`);
  });
  mainMenu();
}

function searchContact() {
  rl.question("Search for a contact : ", (name) => {
    let contactFound = false;

    for (const contact of contacts) {
      if (contact.name === name) {
        console.log(
          `Contact: Name : ${contact.name}, Phone Number : ${contact.phoneNumber}`
        );
        contactFound = true;
        break;
      }
    }

    if (!contactFound) {
      console.log("Contact not found.");
    }
    mainMenu();
  });
}

function mainMenu() {
  console.log('-------------------------------------------------------------------------');
  rl.question(
    "Choose an option:\n1. Add a contact\n2. View all contacts\n3. Search for a contact\n4. Exit\n",
    (option) => {
      switch (option) {
        case "1":
          addContact();
          break;
        case "2":
          viewAllContacts();
          break;
        case "3":
          searchContact();
          break;
        case "4":
          console.log("Exiting the application...");
          rl.close();
          break;
        default:
          console.log("Invalid option. Please try again.");
          console.log('-------------------------------------------------------------------------');
          mainMenu();
          break;
      }
    }
  );
}

mainMenu();
