const mongoose = require("mongoose");
const User = require("./userSchema");

mongoose
  .connect("mongodb://localhost:27017/mydb")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Could not connect to MongoDB", err));

async function createUser(name, email, age, createdAt) {
  try {
    const user = new User({ name, email, age, createdAt });
    const result = await user.save();
    console.log("User created successfully: ", result);
  } catch (err) {
    console.log(err.message);
  }
}

createUser("Mike Ross", "mike.ross@arkx.group", 30, new Date());

async function fetchUsers() {
  try {
    const users = await User.find();
    console.log(users);
  } catch (err) {
    console.log(err.message);
  }
}

fetchUsers();

async function fetchByName(name){
    try{
        const user = await User.find({name: name});
        console.log(user);
    }catch(err){
        console.log(err.message);
    }
}
fetchByName("Mike Ross");


async function fetchByEmail(email){
    try{
        const user = await User.find({email: email});
        console.log(user);
    }catch(err){
        console.log(err.message);
    }
}

fetchByEmail("mike.ross@arkx.group");

async function updateEmailByName(name, email){
    try{
        const updatedUser = await User.updateOne({name: name}, {$set: {email: email}});
        if(updatedUser){
            console.log("User updated successfully");
            fetchByName(name);
        }else{
            console.log("User not found");
        }
    }catch(err){
        console.log(err.message);
    }
}


updateEmailByName("Mike Ross", "mike.ross@pearsonspecter.com");

async function deleteuserBeforeDate(date){
    try{
        const result = await User.deleteMany({createdAt: {$lt: Date.now()}});
        console.log(result);
        console.log("Users deleted successfully");
    }catch(err){
        console.log(err.message);
    }
}

deleteuserBeforeDate();

