// import modules
const { ToolModel, MaterialModel, UserModel } = require("./schemas.js");
const { buildSets } = require("./buildSets.js");
const { rl } = require("./menuFunctions.js");
// const { materialAmount } = require("./infoFunctions.js");

// Function displays a list of all the tools
const showAllTools = async () => {
  const toolList = await ToolModel.find({});
  if (toolList.length > 0) {
    console.log("Here is the list of tools:\n");
    for (const currTool of toolList) {
      console.log(`${currTool.name} `);
    }
  } else {
    console.log("There are no any tools in DB:\n");
    return false;
  }
  return true;
};

// Function displays a list of all the users
const showAllUsers = async () => {
  const userList = await UserModel.find({});
  if (userList.length > 0) {
    console.log("Here is the list of users:\n");
    for (const currUser of userList) {
      console.log(`${currUser.name} `);
    }
  } else {
    console.log("There are no any users in DB:\n");
    return false;
  }
  return true;
};

// Function displays a list of all the materials
const showAllMaterials = async () => {
  const materialList = await MaterialModel.find({});
  if (materialList.length > 0) {
    console.log("Here is the list of materials with its amount:\n");
    for (const currMaterial of materialList) {
      console.log(
        `${currMaterial.name}, available amount: ${currMaterial.amount}`
      );
    }
  } else {
    console.log("There are no any materials in DB:\n");
    return false;
  }
  return true;
};

// user input function. Everything goes in lowercase with trimming
const askQuestion = async (query) => {
  let userAnswer = await new Promise((resolve) => rl.question(query, resolve));
  userAnswer = userAnswer.toLowerCase().trim();
  return userAnswer;
};

// Function for using a new tool
const useTool = async () => {
  console.log("You are going to use a tool.\n");
  try {
    // display a list of all the users
    const userCheck = await showAllUsers();
    // if at least one user exists in the DB -> then
    if (userCheck) {
      const selectUser = await askQuestion(
        "\nWhich user is going to use a tool? "
      );
      try {
        // checking if selected user exists in the DB
        const userUsing = await UserModel.findOne({ name: selectUser });
        // if user found
        if (userUsing != null) {
          console.clear();
          // display a list of all the tools
          const toolCheck = await showAllTools();
          // if at least one tool exists in the DB -> then
          if (toolCheck) {
            const selectTool = await askQuestion(
              `\nWhich tool ${selectUser} is going to use? `
            );
            console.clear();
            // calling useTool method of userSchema. It checks if the tool exists in the DB
            const result = await userUsing.useTool(selectTool);
            if (result) {
              console.log(`${selectUser} successfully used ${selectTool}\n`);
            } else {
              console.log(`${selectUser} failed to use ${selectTool}\n`);
            }
          }
        } else {
          // else user not found
          console.clear();
          console.log(`Unable to find user ${selectUser} in DB:\n`);
        }
      } catch (errorFind) {
        // selected user was not found in the DB with error
        console.clear();
        console.log(`Unable to find user ${selectUser} in DB:\n`);
      }
    }
  } catch (error) {
    // in case of something is wrong with the DB
    console.log(
      "something went wrong, try again (probably DB connection problems): " +
        error +
        "\n"
    );
  }
};

// function for fixing a tool
const fixTool = async () => {
  console.log("You are going to fix a tool.\n");
  try {
    // display a list of all the tools
    const toolCheck = await showAllTools();
    // if at least one tool exists in the DB -> then
    if (toolCheck) {
      const selectTool = await askQuestion(`\nWhich tool do you want to fix? `);
      console.clear();
      try {
        // checking if selected tool exists in the DB
        const toolFixing = await ToolModel.findOne({ name: selectTool });
        // if tool exists call fixTool method of toolSchema
        const result = await toolFixing.fixTool();
        if (result) {
          console.log(
            `${selectTool} successfully fixed. New condition: ${toolFixing.condition}\n`
          );
        } else {
          //something wrong with the DB
          console.log(`Failed to fix ${selectTool}\n`);
        }
      } catch (errorFind) {
        // selected tool was not found in the DB
        console.clear();
        console.log(`Unable to find tool ${selectTool} in DB:\n`);
      }
    }
  } catch (error) {
    // in case of something is wrong with the DB
    console.log(
      "something went wrong, try again (probably DB connection problems): " +
        error +
        "\n"
    );
  }
};

// function for adding a material
const addMaterial = async () => {
  console.log("You are going to add a material amount.\n");
  try {
    // display a list of all the materials
    const materialCheck = await showAllMaterials();
    // if at least one material exists in the DB -> then
    if (materialCheck) {
      const selectMaterial = await askQuestion(
        `\nWhich material do you want to add? `
      );
      try {
        // checking if selected material exists in the DB
        const materialAdd = await MaterialModel.findOne({
          name: selectMaterial,
        });
        // if material found
        if (materialAdd != null) {
          // validate amount of material to add
          let selectAmount = Number(
            await askQuestion(
              `\nHow much do you want to add (positive number)? `
            )
          );
          while (isNaN(selectAmount) || selectAmount <= 0) {
            console.log(
              `Invalid input. Please enter a valid positive number.\n`
            );
            selectAmount = Number(
              await askQuestion(
                `\nHow much do you want to add (positive number)? `
              )
            );
          }
          console.clear();
          // calling newArrival method of materialSchema
          const result = await materialAdd.newArrival(selectAmount);
          if (result) {
            console.log(
              `${materialAdd.name} successfully added. New amount: ${materialAdd.amount}\n`
            );
          } else {
            //something wrong with the DB
            console.log(`Failed to add ${selectMaterial}\n`);
          }
        } else {
          // selected material was not found in the DB
          console.clear();
          console.log(`Unable to find material ${selectMaterial} in DB:\n`);
        }
      } catch (errorFind) {
        // selected material was not found in the DB with catched error
        console.clear();
        console.log(`Unable to find material ${selectMaterial} in DB:\n`);
      }
    }
  } catch (error) {
    // in case of something is wrong with the DB
    console.log(
      "something went wrong, try again (probably DB connection problems):" +
        error +
        "\n"
    );
  }
};

// function for using a material
const useMaterial = async () => {
  console.log("You are going to use a material.\n");
  try {
    // display a list of all the materials
    const materialCheck = await showAllMaterials();
    // if at least one material exists in the DB -> then
    if (materialCheck) {
      const selectMaterial = await askQuestion(
        `\nWhich material do you want to use? `
      );
      try {
        // checking if selected material exists in the DB
        const materialUse = await MaterialModel.findOne({
          name: selectMaterial,
        });
        // if material found
        if (materialUse != null) {
          // validate amount of material to use
          let selectAmount = Number(
            await askQuestion(
              `\nHow much do you want to use (positive number)? `
            )
          );
          while (isNaN(selectAmount) || selectAmount <= 0) {
            console.log(
              `Invalid input. Please enter a valid positive number.\n`
            );
            selectAmount = Number(
              await askQuestion(
                `\nHow much do you want to use (positive number)? `
              )
            );
          }
          console.clear();
          // calling use method of materialSchema
          const result = await materialUse.use(selectAmount);
          if (result) {
            console.log(
              `${materialUse.name} successfully used. New amount: ${materialUse.amount}\n`
            );
          } else {
            //something wrong with the DB
            console.log(`Failed to use ${selectMaterial}\n`);
          }
        } else {
          // selected material was not found in the DB
          console.clear();
          console.log(`Unable to find material ${selectMaterial} in DB:\n`);
        }
      } catch (errorFind) {
        // selected material was not found in the DB with catched error
        console.clear();
        console.log(`Unable to find material ${selectMaterial} in DB:\n`);
      }
    }
  } catch (error) {
    // in case of something is wrong with the DB
    console.log(
      "something went wrong, try again (probably DB connection problems): " +
        error +
        "\n"
    );
  }
};

// function for building something
const buildSmth = async () => {
  console.log(`Here is a list of items you can try to build:\n`);
  for (set of buildSets) {
    // in case one of the objects is empty
    if (set.name != undefined) {
      console.log(set.name);
    } else {
      console.log("something is wrong with buildSets structure\n");
      return;
    }
  }
  const select = await askQuestion(`\nWhich item do you want to build? `);
  console.clear();
  // Find the selected item in buildSets
  const item = buildSets.find(
    (set) => set.name.toLowerCase().trim() === select
  );
  // if item found -> then
  if (item) {
    // check if the array of assets is not empty
    if (item.assets.length > 0) {
      try {
        const userCheck = await showAllUsers();
        // if at least one user exists in the DB -> then
        if (userCheck) {
          // asking the username
          const selectUser = await askQuestion(
            `\nWhich user is going to build ${select}? `
          );
          console.clear();
          try {
            // checking if selected user exists in the DB
            const user = await UserModel.findOne({ name: selectUser });
            if (user) {
              // calling buildSomething method of userSchema
              const result = await user.buildSomething(item.assets);
              if (!result) {
                console.log(`${item.name} successfully built\n`);
              } else {
                // display the reason of unsuccessful building
                console.log(result);
              }
            } else console.log(`Unable to find user ${selectUser} in DB:\n`);
          } catch (errorFind) {
            console.log(
              `Unable to find user ${selectUser} in DB (catch): ${errorFind}\n`
            );
          }
        }
      } catch (error) {
        // in case of something is wrong with the DB
        console.log(
          "something went wrong, try again (probably DB connection problems): " +
            error +
            "\n"
        );
      }
    } else {
      console.log(
        // list of required tools and materials is empty
        `${select} can't be built, list of required tools and materials is empty\n`
      );
    }
  } else {
    // inputed item was not found in buildSets
    console.log(`Item ${select} not exist\n`);
    return;
  }
};

//export modules to use in another file
module.exports = {
  useTool,
  fixTool,
  addMaterial,
  useMaterial,
  showAllTools,
  showAllUsers,
  showAllMaterials,
  askQuestion,
  buildSmth,
};
