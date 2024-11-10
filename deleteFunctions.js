// import modules
const { ToolModel, MaterialModel, UserModel } = require("./schemas.js");
const {
  showAllTools,
  showAllMaterials,
  showAllUsers,
  askQuestion,
} = require("./operationFunctions.js");

// Function for deleting a tool(s)
const deleteTool = async () => {
  console.log("You are going to delete a tool(s).\n");
  try {
    // display all the tools available
    const check = await showAllTools();
    // if at least one tool exists in the DB -> then
    if (check) {
      var tmpObject = {}; // Object to bypass * input
      const select = await askQuestion(
        `\nWhich tool do you want to delete (input * to delete all the tools)? `
      );
      console.clear();
      // if not * search for the inputed tool
      if (select !== "*") tmpObject = { name: select };
      // get inputed tool(s)
      const toDelete = await ToolModel.find(tmpObject);
      // if nothing found -> then
      if (Object.keys(toDelete).length === 0) {
        if (select === "*") {
          console.log("There are no any tools in the DB\n");
        } else {
          console.log(`Tool ${select} is not found in the DB\n`);
        }
      } else {
        // delete all the tools found
        for (const current of toDelete) {
          await ToolModel.deleteOne(current);
        }
        if (select === "*") {
          console.log(`All the tools were successfully deleted from the DB.\n`);
        } else console.log(`${select} was successfully deleted from the DB.\n`);
      }
    }
  } catch (error) {
    // in case of something is wrong with the DB
    console.clear();
    console.log(
      "something went wrong, try again (probably DB connection problems): " +
        error +
        "\n"
    );
  }
};

// Function for deleteng a material(s)
const deleteMaterial = async () => {
  console.log("You are going to delete a material(s).\n");
  try {
    // display all the materials available
    const check = await showAllMaterials();
    // if at least one material exists in the DB -> then
    if (check) {
      var tmpObject = {}; // Object to bypass * input
      const select = await askQuestion(
        `\nWhich material do you want to delete (input * to delete all the materials)? `
      );
      console.clear();
      // if not * search for the inputed tool
      if (select !== "*") tmpObject = { name: select };
      // get inputed material(s)
      const toDelete = await MaterialModel.find(tmpObject);
      // if nothing found -> then
      if (Object.keys(toDelete).length === 0) {
        if (select === "*") {
          console.log("There are no any materials in the DB\n");
        } else {
          console.log(`Material ${select} is not found in the DB\n`);
        }
      } else {
        // delete all the materials found
        for (const current of toDelete) {
          await MaterialModel.deleteOne(current);
        }
        if (select === "*") {
          console.log(
            `All the materials were successfully deleted from the DB.\n`
          );
        } else console.log(`${select} was successfully deleted from the DB.\n`);
      }
    }
  } catch (error) {
    // in case of something is wrong with the DB
    console.clear();
    console.log(
      "something went wrong, try again (probably DB connection problems): " +
        error +
        "\n"
    );
  }
};

// Function for deleteng a user(s)
const deleteUser = async () => {
  console.log("You are going to delete a user(s).\n");
  try {
    // display all the materials available
    const check = await showAllUsers();
    // if at least one user exists in the DB -> then
    if (check) {
      var tmpObject = {}; // Object to bypass * input
      const select = await askQuestion(
        `\nWhich user do you want to delete (input * to delete all the users)? `
      );
      console.clear();
      // if not * search for the inputed tool
      if (select !== "*") tmpObject = { name: select };
      // get inputed user(s)
      const toDelete = await UserModel.find(tmpObject);
      // if nothing found -> then
      if (Object.keys(toDelete).length === 0) {
        if (select === "*") {
          console.log("There are no any users in the DB\n");
        } else {
          console.log(`User ${select} is not found in the DB\n`);
        }
      } else {
        // delete all the users found
        for (const current of toDelete) {
          // get all the tools containing current user ID in borrowedBy field
          const tools = await ToolModel.find({ borrowedBy: current._id });
          // delete all the IDs of the user from ToolModel before deleting the user
          for (let curTool of tools) {
            curTool.borrowedBy = curTool.borrowedBy.filter(
              (item) => item != current.id
            );
            await curTool.save();
          }
          await UserModel.deleteOne(current);
        }
        if (select === "*") {
          console.log(`All the users were successfully deleted from the DB.\n`);
        } else console.log(`${select} was successfully deleted from the DB.\n`);
      }
    }
  } catch (error) {
    // in case of something is wrong with the DB
    console.clear();
    console.log(
      "something went wrong, try again (probably DB connection problems): " +
        error +
        "\n"
    );
  }
};

// export modules to use in another file
module.exports = {
  deleteTool,
  deleteMaterial,
  deleteUser,
};
