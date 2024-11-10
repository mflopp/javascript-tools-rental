// import modules
const { ToolModel, MaterialModel, UserModel } = require("./schemas.js");
const {
  showAllTools,
  showAllMaterials,
  showAllUsers,
  askQuestion,
} = require("./operationFunctions.js");

// Function display tool(s) condition
const toolCondition = async () => {
  console.log("You want to know a condition of a tool(s).\n");
  try {
    // display all the tools available
    const toolCheck = await showAllTools();
    // if at least one tool exists in the DB -> then
    if (toolCheck) {
      var tmpObject = {}; // Object to bypass * input
      const name = await askQuestion(
        "\nName of the tool or * to get information about all the tools? "
      );
      console.clear();
      // if not * search for the inputed tool
      if (name !== "*") tmpObject = { name: name };
      // get inputed tool(s)
      const tool = await ToolModel.find(tmpObject);
      // if nothing found -> then
      if (Object.keys(tool).length === 0) {
        if (name === "*") {
          console.log("There are no any tools in the DB\n");
        } else {
          console.log(`${name} is not found in the DB\n`);
        }
      } else {
        // display list of tools conditions
        console.log(`Tool(s) condition: \n`);
        for (const currTool of tool) {
          console.log(`${currTool.name} condition is ${currTool.condition}`);
        }
        console.log(""); // just an empty output tolook neat
      }
    }
  } catch (error) {
    // in case of something is wrong with the DB
    console.clear();
    console.log("something went wrong, try again (probably DB connection problems): " + error + "\n");
  }
};

// Function display list of tool's users (as many times as tool was used)
const toolUsers = async () => {
  console.log("You are going to get a list of users of the tool.\n");
  try {
    // display all the tools available
    const toolCheck = await showAllTools();
    // if at least one tool exists in the DB -> then
    if (toolCheck) {
      // if at least one tool exists in the DB -> then
      var tmpObject = {}; // Object to bypass * input
      const selectTool = await askQuestion(
        `\nUserlist of which tool do you want to see (input * to get information about all tools)? `
      );
      console.clear();
      // if not * search for the inputed tool
      if (selectTool !== "*") tmpObject = { name: selectTool };
      // get inputed tool(s), populating borrowedBy field
      const tool = await ToolModel.find(tmpObject).populate(
        "borrowedBy",
        "name"
      );
      // if nothing found -> then
      if (Object.keys(tool).length === 0) {
        if (selectTool === "*") {
          console.log("There are no any tools in the DB\n");
        } else {
          console.log(`Tool ${selectTool} is not found in the DB\n`);
        }
      } else {
        // display list of users who used the tools(s) (on order of using)
        if (selectTool === "*") {
          console.log(`All the tools userlist: \n`);
        } else console.log(`${selectTool} userlist: \n`);
        for (const currTool of tool) {
          const names = currTool.borrowedBy.map((item) => item.name);
          if (names.length > 0) {
            console.log(`${currTool.name} used next people: ${names}`);
          } else console.log(`${currTool.name} hasn't been used yet`); //nobody used the tool
        }
        console.log(""); // just an empty output tolook neat
      }
    }
  } catch (error) {
    // in case of something is wrong with the DB
    console.clear();
    console.log("something went wrong, try again (probably DB connection problems): " + error + "\n");
  }
};

// Function display common information about the tool
const toolInfo = async () => {
  console.log("You are going to get all the information about the tool.\n");
  try {
    // display all the tools available
    const toolCheck = await showAllTools();
    // if at least one tool exists in the DB -> then
    if (toolCheck) {
      const selectTool = await askQuestion(
        `\nWhich tool do you want to get information about? `
      );
      console.clear();
      try {
        // get inputed tool, populating borrowedBy field
        const tool = await ToolModel.findOne({ name: selectTool }).populate(
          "borrowedBy",
          "name"
        );
        // if nothing found -> then
        if (Object.keys(tool).length === 0) {
          console.log(`Tool ${selectTool} is not found in the DB\n`);
        } else {
          // display all the information about the tools(s)
          let names = tool.borrowedBy.map((item) => item.name);
          if (names.length == 0) names = "nobody"; // nobody used the tool
          console.log(`${selectTool} information: \n`);
          console.log(
            `name: ${tool.name}\ncost: ${tool.cost}\nusage: ${tool.usage}\n` +
              `borrowedBy: ${names}\ncondition: ${tool.condition}\n`
          );
        }
      } catch (errorFind) {
        // tool not found in the DB
        console.log(`Unable to find ${selectTool} in DB:\n`);
      }
    }
  } catch (error) {
    // in case of something is wrong with the DB
    console.clear();
    console.log("something went wrong, try again (probably DB connection problems): " + error + "\n");
  }
};

// Function display material amount
const materialAmount = async () => {
  try {
    console.log("You want to know a total amount of available material(s).");
    // display all the materials available
    await showAllMaterials();
    console.log(""); // just an empty output tolook neat
  } catch (error) {
    // in case of something is wrong with the DB
    console.clear();
    console.log("something went wrong, try again (probably DB connection problems): " + error + "\n");
  }
};

// Function display material worth
const materialWorth = async () => {
  console.log("You want to know a total worth of available material(s).\n");
  try {
    // display all the material available
    const toolCheck = await showAllMaterials();
    // if at least one material exists in the DB -> then
    if (toolCheck) {
      var tmpObject = {}; // Object to bypass * input
      const selectMaterial = await askQuestion(
        "\nName of the material or * to get information about all the materials? "
      );
      console.clear();
      // if not * search for the inputed material
      if (selectMaterial !== "*") {
        tmpObject = { name: selectMaterial };
      }
      // get inputed material(s)
      const material = await MaterialModel.find(tmpObject);
      // if nothing found -> then
      if (Object.keys(material).length === 0) {
        if (selectMaterial === "*") {
          console.log("There are no any material in the DB\n");
        } else {
          console.log(`${selectMaterial} is not found in the DB\n`);
        }
      } else {
        // display list of materials with their worths
        console.log(`Material(s) worth: \n`);
        for (const currMaterial of material) {
          const worth = await currMaterial.worth();
          console.log(`${currMaterial.name} worth is ${worth}`);
        }
        console.log(""); // just an empty output tolook neat
      }
    }
  } catch (error) {
    // in case of something is wrong with the DB
    console.clear();
    console.log("something went wrong, try again (probably DB connection problems): " + error + "\n");
  }
};

// Function display common information about the material
const materiallInfo = async () => {
  console.log("You are going to get all the information about the material.\n");
  try {
    // display all the materials available
    const toolCheck = await showAllMaterials();
    // if at least one material exists in the DB -> then
    if (toolCheck) {
      const selectMaterial = await askQuestion(
        `\nWhich material do you want to get information about? `
      );
      console.clear();
      try {
        // get inputed material
        const material = await MaterialModel.findOne({ name: selectMaterial });
        // if not found -> then
        if (Object.keys(material).length === 0) {
          console.log(`Material ${selectMaterial} is not found in the DB\n`);
        } else {
          // display all the information about the material
          console.log(`${selectMaterial} information: \n`);
          console.log(
            `name: ${material.name}\namount: ${material.amount}\ncost: ${material.cost}\n` +
              `supplier: ${material.supplier}\nquality: ${material.quality}\n`
          );
        }
      } catch (errorFind) {
        // failed getting material from the DB
        console.log(`Unable to find ${selectMaterial} in DB:\n`);
      }
    }
  } catch (error) {
    // in case of something is wrong with the DB
    console.clear();
    console.log("something went wrong, try again (probably DB connection problems): " + error + "\n");
  }
};

// Function display list of tool used by users (only list of tools without history)
const userTools = async () => {
  var tmpObject = {}; //Object to bypas * input
  console.log("You are going to get a list of tools used by the user.\n");
  try {
    // display all the users available
    const toolCheck = await showAllUsers();
    // if at least one user exists in the DB -> then
    if (toolCheck) {
      const selectUser = await askQuestion(
        `\nWhich user are you interested in (input * if you want to get information about all users)? `
      );
      console.clear();
      // if not * search for the inputed user
      if (selectUser !== "*") tmpObject = { name: selectUser };
      // get inputed user(s)
      const user = await UserModel.find(tmpObject);
      // if nothing found -> then
      if (Object.keys(user).length === 0) {
        if (selectUser === "*") {
          console.log("There are no any users in the DB\n");
        } else {
          console.log(`User ${selectUser} is not found in the DB\n`);
        }
      } else {
        // display list tools each users used (each tool can be displayed only one time)
        console.log(`List of tools used by user(s): \n`);
        for (const currUser of user) {
          const tools = await currUser.usedTools();
          if (tools.length > 0) {
            console.log(`${currUser.name} used tools: ${tools}`);
          } else console.log(`${currUser.name} haven't used any tools yet`); // user didn't use any tools
        }
        console.log(""); // just an empty output tolook neat
      }
    }
  } catch (error) {
    // in case of something is wrong with the DB
    console.clear();
    console.log("something went wrong, try again (probably DB connection problems): " + error + "\n");
  }
};

// Function display common information about the user
const userlInfo = async () => {
  console.log("You are going to get all the information about the user.\n");
  try {
    // display all the users available
    const toolCheck = await showAllUsers();
    // if at least one user exists in the DB -> then
    if (toolCheck) {
      const selectUser = await askQuestion(
        `\nWhich user do you want to get information about? `
      );
      console.clear();
      try {
        // get inputed user
        const user = await UserModel.findOne({ name: selectUser });
        // if nothing found -> then
        if (Object.keys(user).length === 0) {
          console.log(`User ${selectUser} is not found in the DB\n`);
        } else {
          // display all the information about the user
          let tools = await user.usedTools();
          if (tools.length == 0) tools = "none";
          console.log(`${selectUser} information: \n`);
          console.log(
            `name: ${user.name}\nage: ${user.age}\nused tools: ${tools}\n`
          );
        }
      } catch (errorFind) {
        // failed get user from the DB
        console.log(`Unable to find user ${selectUser} in DB:\n`);
      }
    }
  } catch (error) {
    // in case of something is wrong with the DB
    console.clear();
    console.log("something went wrong, try again (probably DB connection problems): " + error + "\n");
  }
};

// export modules to use in another file
module.exports = {
  toolCondition,
  toolUsers,
  toolInfo,
  materialAmount,
  materialWorth,
  materiallInfo,
  userTools,
  userlInfo,
};
