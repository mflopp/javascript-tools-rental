// importing functions from other files to call from user menu
const {
  printOptInfo,
  printOptMain,
  printOptCreate,
  printOptOps,
  printOptDel,
  printOptInfoTools,
  printOptInfoMaterial,
  printOptInfoUser,
  rl,
  action,
  closeDB,
} = require("./menuFunctions.js");
const {
  toolCondition,
  toolUsers,
  toolInfo,
  materialAmount,
  materialWorth,
  materiallInfo,
  userTools,
  userlInfo,
} = require("./infoFunctions.js");
const {
  useTool,
  fixTool,
  addMaterial,
  useMaterial,
  buildSmth,
} = require("./operationFunctions.js");
const {
  createTool,
  createMaterial,
  createUser,
} = require("./createFunctions.js");
const {
  deleteTool,
  deleteMaterial,
  deleteUser,
} = require("./deleteFunctions.js");

// Main menu
function handleOptMain(input) {
  console.clear();
  switch (input) {
    case "1":
      currentMenu = printOptCreate; // current menu position
      currentMenu(); // calling create menu
      break;
    case "2":
      currentMenu = printOptInfo; // current menu position
      currentMenu(); // calling info menu
      break;
    case "3":
      currentMenu = printOptOps; // current menu position
      currentMenu(); // calling operations menu
      break;
    case "4":
      currentMenu = printOptDel; // current menu position
      currentMenu(); // calling delete menu
      break;
    case "0":
      // exit application and close the DB connection and readline interface
      console.log("Buy\n");
      rl.close();
      closeDB();
      process.exit(0);
    default:
      // incorrect input
      console.log("Incorrect input. Try again\n");
      currentMenu(); // calling the same menu again
  }
}

// Create section of menu
async function handleOptCreate(input) {
  console.clear();
  switch (input) {
    case "1":
      await createTool(); // call function for tool creation
      currentMenu = printOptCreate; // current menu position
      currentMenu(); // calling the same menu again
      break;
    case "2":
      await createMaterial(); // call function for material creation
      currentMenu = printOptCreate; // current menu position
      currentMenu(); // calling the same menu again
      break;
    case "3":
      await createUser(); // call function for user creation
      currentMenu = printOptCreate; // current menu position
      currentMenu(); // calling the same menu again
      break;
    case "0":
      currentMenu = printOptMain; // current menu position
      printOptMain(); // calling the main menu
      break;
    default:
      // incorrect input
      console.log("Incorrect input. Try again\n");
      currentMenu(); // calling the same menu again
  }
}

// Information section of menu
async function handleOptInfo(input) {
  console.clear();
  switch (input) {
    case "1":
      currentMenu = printOptInfoTools; // current menu position
      currentMenu(); // calling tool info menu
      break;
    case "2":
      currentMenu = printOptInfoMaterial; // current menu position
      currentMenu(); // calling material info menu
      break;
    case "3":
      currentMenu = printOptInfoUser; // current menu position
      currentMenu(); // calling user info menu
      break;
    case "0":
      currentMenu = printOptMain; // current menu position
      printOptMain(); // calling the main menu
      break;
    default:
      // incorrect input
      console.log("Incorrect input. Try again\n");
      currentMenu(); // calling the same menu again
  }
}

// Operation section of menu
async function handleOptOps(input) {
  console.clear();
  switch (input) {
    case "1":
      await useTool(); // call function for using a tool
      currentMenu = printOptOps; // current menu position
      currentMenu(); // calling the same menu again
      break;
    case "2":
      await fixTool(); // call function for fixing a tool
      currentMenu = printOptOps; // current menu position
      currentMenu(); // calling the same menu again
      break;
    case "3":
      await addMaterial(); // call function for increasing material amount
      currentMenu = printOptOps; // current menu position
      currentMenu(); // calling the same menu again
      break;
    case "4":
      await useMaterial(); // call function for using a material
      currentMenu = printOptOps; // current menu position
      currentMenu(); // calling the same menu again
      break;
    case "5":
      await buildSmth(); // call function for build something
      currentMenu = printOptOps; // current menu position
      currentMenu(); // calling the same menu again
      break;
    case "0":
      currentMenu = printOptMain; // current menu position
      printOptMain(); // calling the main menu
      break;
    default:
      // incorrect input
      console.log("Incorrect input. Try again\n");
      currentMenu(); // calling the same menu again
  }
}

// Delete section of menu
async function handleOptDel(input) {
  console.clear();
  switch (input) {
    case "1":
      await deleteTool(); // call function for deleting a tool
      currentMenu = printOptDel; // current menu position
      currentMenu(); // calling the same menu again
      break;
    case "2":
      await deleteMaterial(); // call function for deleting a material
      currentMenu = printOptDel; // current menu position
      currentMenu(); // calling the same menu again
      break;
    case "3":
      await deleteUser(); // call function for deleting a user
      currentMenu = printOptDel; // current menu position
      currentMenu(); // calling the same menu again
      break;
    case "0":
      currentMenu = printOptMain; // current menu position
      printOptMain(); // calling the main menu
      break;
    default:
      // incorrect input
      console.log("Incorrect input. Try again\n");
      currentMenu(); // calling the same menu again
  }
}

// Tools information section of menu
async function handleOptInfoTools(input) {
  console.clear();
  switch (input) {
    case "1":
      await toolCondition(); // call function for display tool condition
      currentMenu = printOptInfoTools; // current menu position
      currentMenu(); // calling the same menu again
      break;
    case "2":
      await toolUsers(); // call function for display a list of users of the tool
      currentMenu = printOptInfoTools; // current menu position
      currentMenu(); // calling the same menu again
      break;
    case "3":
      await toolInfo(); // call function for display common information about the tool
      currentMenu = printOptInfoTools; // current menu position
      currentMenu(); // calling the same menu again
      break;
    case "0":
      currentMenu = printOptInfo; // current menu position
      printOptInfo(); // calling the info menu (previous menu)
      break;
    default:
      // incorrect input
      console.log("Incorrect input. Try again\n");
      currentMenu(); // calling the same menu again
  }
}

// Material information section of menu
async function handleOptInfoMaterial(input) {
  console.clear();
  switch (input) {
    case "1":
      await materialAmount(); // call function for display material amount
      currentMenu = printOptInfoMaterial; // current menu position
      currentMenu(); // calling the same menu again
      break;
    case "2":
      await materialWorth(); // call function for display worth of the material
      currentMenu = printOptInfoMaterial; // current menu position
      currentMenu(); // calling the same menu again
      break;
    case "3":
      console.clear();
      // console.log("Common information about available material");
      await materiallInfo(); // call function for display common information about the material
      currentMenu = printOptInfoMaterial; // current menu position
      currentMenu(); // calling the same menu again
      break;
    case "0":
      currentMenu = printOptInfo; // current menu position
      printOptInfo(); // calling the info menu (previous menu)
      break;
    default:
      // incorrect input
      console.log("Incorrect input. Try again\n");
      currentMenu(); // calling the same menu again
  }
}

// User information section of menu
async function handleOptInfoUser(input) {
  console.clear();
  switch (input) {
    case "1":
      await userTools(); // call function for display a list of tools used by user
      currentMenu = printOptInfoUser; // current menu position
      currentMenu(); // calling the same menu again
      break;
    case "2":
      await userlInfo(); // call function for display common information about the user
      currentMenu = printOptInfoUser; // current menu position
      currentMenu(); // calling the same menu again
      break;
    case "0":
      currentMenu = printOptInfo; // current menu position
      printOptInfo(); // calling the info menu (previous menu)
      break;
    default:
      // incorrect input
      console.log("Incorrect input. Try again\n");
      currentMenu(); // calling the same menu again
  }
}

let currentMenu = printOptMain; // current menu position indicator

// function is responsible for the operation of the menu
function startProgram() {
  rl.question("Enter your choice: ", async (input) => {
    if (currentMenu === printOptMain) {
      handleOptMain(input.trim());
    } else if (currentMenu === printOptCreate) {
      await handleOptCreate(input.trim());
    } else if (currentMenu === printOptInfo) {
      await handleOptInfo(input.trim());
    } else if (currentMenu === printOptOps) {
      await handleOptOps(input.trim());
    } else if (currentMenu === printOptDel) {
      await handleOptDel(input.trim());
    } else if (currentMenu === printOptInfoTools) {
      await handleOptInfoTools(input.trim());
    } else if (currentMenu === printOptInfoMaterial) {
      await handleOptInfoMaterial(input.trim());
    } else if (currentMenu === printOptInfoUser) {
      await handleOptInfoUser(input.trim());
    }
    startProgram();
  });
}

// need this function to wait the result of the DB connection attempt
const preStart = async () => {
  if (await action()) {
    // if DB is connected - start the application
    printOptMain(); // display main menu
    startProgram(); // start asking user to choose an option from the menu
  } else {
    // if DB is unavailable stop the application
    console.log("Application can't be started, DB is not available\n");
    rl.close();
  }
};

// Start the program:
console.clear();
preStart();
