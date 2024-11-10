// import modules
const mongoose = require("mongoose");
const readline = require("readline");

// Function for connecting to MongoDB
const action = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://mf:PassPass1@cluster0.amheo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
      { serverSelectionTimeoutMS: 5000 } // every db operation timeout 5sec 
    );
    console.log("The DB connected");
    return true;
  } catch (error) {
    console.log("Can't connect to the DB");
    return false;
  }
};

// function for closing MongoDB connection
const closeDB = async () => {
  await mongoose.connection.close();
  console.log("DB connection closed");
};

// console read variable rl
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// main menu options
const printOptMain = () => {
  console.log(
    "Options:\n 1: Create\n 2: Get Info\n" +
      " 3: Operations\n 4: Delete something\n 0: Quit\n"
  );
};

// create menu options
const printOptCreate = async () => {
  console.log(
    "Options:\n 1: Create a Tool\n 2: Create a material\n" +
      " 3: Create a user\n 0: Main menu\n"
  );
};

// information menu option
const printOptInfo = () => {
  console.log(
    "Options:\n 1: Tools information\n 2: Materials information\n" +
      " 3: User Information\n 0: Main menu\n"
  );
};

// operation menu option
const printOptOps = () => {
  console.log(
    "Options:\n 1: Use a tool\n 2: Fix a tool\n" +
      " 3: Increase a material amount\n 4: Use a material\n" +
      " 5: Build something\n 0: Main menu\n"
  );
};

// delete menu option
const printOptDel = () => {
  console.log(
    "Options:\n 1: Delete a tool\n 2: Delete material\n" +
      " 3: Delete user\n 0: Main menu\n"
  );
};

// tools info menu option
const printOptInfoTools = () => {
  console.log(
    "Options:\n 1: Tool's condition\n 2: Tool's users\n" +
      " 3: Tool's information\n 0: Previous menu\n"
  );
};

// materials info menu option
const printOptInfoMaterial = () => {
  console.log(
    "Options:\n 1: Material's amount\n 2: Material's worth\n" +
      " 3: Material's information\n 0: Previous menu\n"
  );
};

// users info menu option
const printOptInfoUser = () => {
  console.log(
    "Options:\n 1: User's tools usage\n 2: User's information\n" +
      " 0: Previous menu\n"
  );
};

// export modules to use in another file
module.exports = {
  rl,
  action,
  printOptMain,
  printOptCreate,
  printOptInfo,
  printOptOps,
  printOptDel,
  closeDB,
  printOptInfoTools,
  printOptInfoMaterial,
  printOptInfoUser,
};
