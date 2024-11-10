// import modules
const { ToolModel, MaterialModel, UserModel } = require("./schemas.js");
const { askQuestion } = require("./operationFunctions.js"); //user input function

// Function for creating a new tool. Amount is always = 1
const createTool = async () => {
  try {
    const newTool = {}; //new object to store user input data before saving to the DB
    console.log(
      "You are about to create a new tool. Please fill all the information about your tool:\n"
    );
    // user input and validation for new tool creation
    newTool.name = await askQuestion("Name of the tool? ");
    while (await ToolModel.findOne({ name: newTool.name })) {
      console.log(
        `${newTool.name} already exists in the DB. Please enter another tool name\n`
      );
      newTool.name = await askQuestion("Name of the tool? ");
    }
    newTool.amount = 1; //We only have 1 tool of each type
    newTool.cost = Number(await askQuestion("Tool cost (0 or above)? "));
    while (isNaN(newTool.cost) || newTool.cost < 0) {
      console.log(
        `Incorrect cost. Cost must be 0 or above. Please enter correct tool cost\n`
      );
      newTool.cost = Number(await askQuestion("Tool cost (0 or above)? "));
    }
    newTool.usage = await askQuestion("The purpose of using the tool? ");
    newTool.condition = Number(
      await askQuestion("The tool condition (1-100)? ")
    );
    while (
      isNaN(newTool.condition) ||
      newTool.condition < 1 ||
      newTool.condition > 100
    ) {
      console.log(
        `Incorrect tool condition. Condition must be between 1 and 100 Please enter correct tool condition\n`
      );
      newTool.condition = Number(
        await askQuestion("The tool condition (1-100)? ")
      );
    }
    console.clear();
    // creating tool model and saving it to the DB
    const tool = new ToolModel({
      name: newTool.name,
      amount: newTool.amount,
      cost: newTool.cost,
      usage: newTool.usage,
      condition: newTool.condition,
    });
    try {
      await tool.save(); // mongoose validation will not work, everything is checked already
      console.log(`Tool ${newTool.name} added successfully!\n`);
    } catch (errSave) {
      console.log(`Failed creating a tool. ${errSave.message}\n`);
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

// Function for creating a new material
const createMaterial = async () => {
  try {
    const newMaterial = {}; // new object to store user input data before saving to the DB
    console.log(
      "You are about to create a new material. Please fill all the information about your material:\n"
    );
    newMaterial.name = await askQuestion("Name of the material? ");
    while (await MaterialModel.findOne({ name: newMaterial.name })) {
      console.log(
        `${newMaterial.name} already exists in the DB. Please enter another material name\n`
      );
      newMaterial.name = await askQuestion("Name of the material? ");
    }
    newMaterial.amount = Number(
      await askQuestion("Material amount (0 or above)? ")
    );
    while (isNaN(newMaterial.amount) || newMaterial.amount < 0) {
      console.log(
        `Incorrect amount. Amount must be 0 or above. Please enter correct material amount\n`
      );
      newMaterial.amount = Number(
        await askQuestion("Material amount (0 or above)? ")
      );
    }
    newMaterial.cost = Number(
      await askQuestion("Material cost (0 or above)? ")
    );
    while (isNaN(newMaterial.cost) || newMaterial.cost < 0) {
      console.log(
        `Incorrect cost. Cost must be 0 or above. Please enter correct material cost\n`
      );
      newMaterial.cost = Number(
        await askQuestion("Material cost (0 or above)? ")
      );
    }
    newMaterial.supplier = await askQuestion("Name of the supplier? ");
    newMaterial.quality = await askQuestion("Describe quality? ");
    console.clear();
    // reating material model and saving it to the DB
    const material = new MaterialModel({
      name: newMaterial.name,
      amount: newMaterial.amount,
      cost: newMaterial.cost,
      supplier: newMaterial.supplier,
      quality: newMaterial.quality,
    });
    try {
      await material.save(); // mongoose validation will not work, everything is checked already
      console.log(`Material ${newMaterial.name} added successfully!\n`);
    } catch (errSave) {
      console.log(`Failed creating a material. ${errSave.message}\n`);
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

// Function for creating a new user
const createUser = async () => {
  try {
    const newUser = {}; // new object to store user input data before saving to the DB
    console.log(
      "You are about to create a new user. Please fill all the information about your user:\n"
    );
    // user input and validation for new user creation
    newUser.name = await askQuestion("Name of the user? ");
    while (await UserModel.findOne({ name: newUser.name })) {
      console.log(
        `${newUser.name} already exists in the DB. Please enter another user name\n`
      );
      newUser.name = await askQuestion("Name of the user? ");
    }
    newUser.age = Number(await askQuestion("User age (18 or above)? "));
    while (isNaN(newUser.age) || newUser.age < 18) {
      console.log(
        `Incorrect age. Age must be 18 or above. Please enter correct age\n`
      );
      newUser.age = Number(await askQuestion("User age (18 or above)? "));
    }
    console.clear();
    // creating user model and saving it to the DB
    const user = new UserModel({
      name: newUser.name,
      age: newUser.age,
    });
    try {
      await user.save();
      console.log(`User ${newUser.name} added successfully!\n`);
    } catch (errSave) {
      console.log(`Failed creating a user. ${errSave.message}\n`);
    }
  } catch (error) {
    // in case of something is wrong with the DB
    console.log(
      "something went wrong, try again (probably DB connection problems)3: " +
        error +
        "\n"
    );
  }
};

// export modules to use in another file
module.exports = {
  createTool,
  createMaterial,
  createUser,
};
