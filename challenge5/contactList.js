//disable echoing the input
const { stdin, stdout } = process;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');


const readline = require("readline");


let contacts = [];

function addContact() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question("Enter the name: ", (name) => {
    rl.question("Enter the phone number: ", (phoneNumber) => {
      contacts.push({ name, phoneNumber });
      console.log(`Contact added: ${name}, ${phoneNumber}`);
      rl.close();
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
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question("Enter the name of the contact you want to search for: ", (name) => {
      let contactFound = false;

      for (const contact of contacts) {
        if (contact.name === name) {
          console.log(
            `Found contact: Name : ${contact.name}, Phone Number : ${contact.phoneNumber}`
          );
          contactFound = true;
          break;
        }
      }

      if (!contactFound) {
        console.log("Contact not found.");
      }

      rl.close();
      mainMenu(); 
    }
  );
}

function mainMenu() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question("Choose an option:\n1. Add a contact\n2. View all contacts\n3. Search for a contact\n4. Exit\n", (option) => {
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
          rl.close();
          break;
      }
    }
  );
}

mainMenu();
