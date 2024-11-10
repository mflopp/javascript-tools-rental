const mongoose = require("mongoose");

// itemSchema according to assignment
const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
      // here was a validation of uniqueness but it caused troubles which
      // i didn't have experience to solve
    },
    amount: {
      type: Number,
      required: true,
      min: [0, "Must be at least 0 or more, you entered {VALUE}"],
      default: 0,
      //i added validation but i don't use it for this project because:
      //1. it throws unreadable messages for user
      //2. the only way something can go wrong with the values is
      // during saving document after user input. It's much more convinient
      // to check the values during the input

      // Custom validation function
      validate: {
        validator: function (value) {
          return value >= 0;
        },
        message: "Incorrect amount. Amount must be a number starting from 0.",
      },
    },
    cost: {
      type: Number,
      required: true,
      min: [0, "Minimum 0, you entered {VALUE}"],
      default: 0,
      // Custom validation function
      validate: {
        validator: function (value) {
          return value >= 0;
        },
        message: "Incorrect value. Cost must be a number starting from 0.",
      },
    },
  },
  {
    methods: {
      // method multiplies amount and cost
      async worth() {
        return this.amount * this.cost;
      },
      // method increase amount on custom value
      async newArrival(amount) {
        this.amount += amount;
        try {
          const result = await this.save();
          return true;
        } catch (error) {
          // in case of something is wrong with the DB
          console.log(`Error adding amount of ${this.name} (probably DB connection problems): ${error}\n`);
          return false; // Failed to save, something is wrong with the DB
        }
      },
    },
  }
);

// toolSchema according to assignment
const toolSchema = new mongoose.Schema(
  {
    ...itemSchema.obj, // inheriting from itemSchema
    usage: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    borrowedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // connection with User module of userSchema
      },
    ],
    condition: {
      type: Number,
      min: [1, "Minimum 1, you entered {VALUE}"],
      max: [100, "Maximum 100, you entered {VALUE}"],
      default: 100,
      // Custom validation function
      validate: {
        validator: function (value) {
          return value >= 1 && value <= 100;
        },
        message: "{VALUE} is not a valid condition. Must be between 1 and 100.",
      },
    },
  },
  {
    methods: {
      // method for using the tool (decrease condition on 10 if it is more 15)
      async useTool(userId) {
        if (this.condition > 15) {
          this.condition -= 10;
          this.borrowedBy.push(userId); // saving to borrowedBy userId of user which used the tool
          try {
            await this.save();
            return true; // Successfully used the tool
          } catch (error) {
            // in case of something is wrong with the DB
            console.log("Error saving tool (probably DB connection problems): " + error + `\n`);
            return false; // Failed to save, something is wrong with the DB
          }
        } else {
          console.log(
            `${this.name} can not be used, it's in a bad condition\n`
          );
          return false; // Error attemt of using the tool
        }
      },
      // method repairing the tool by adding 20 to it's condition (max = 100)
      async fixTool() {
        if (this.condition > 80) {
          this.condition = 100;
        } else this.condition += 20;
        try {
          const result = await this.save();
          return true; // true if success
        } catch (error) {
          // in case of something is wrong with the DB
          console.log("Error fixing tool (probably DB connection problems): " + error + `\n`);
          return false; // false if an error
        }
      },
    },
  }
);

// materialSchema according to assignment
const materialSchema = new mongoose.Schema(
  {
    ...itemSchema.obj, // inheriting from itemSchema
    supplier: {
      type: String,
      required: true,
    },
    quality: {
      type: String,
      required: true,
    },
  },
  {
    methods: {
      // method for using customs amount of the material
      async use(amount) {
        if (this.amount >= amount) {
          this.amount -= amount;
          try {
            await this.save();
            return true;
          } catch (error) {
            // in case of something is wrong with the DB
            console.log(
              `Error saving new amount of ${this.name} (probably DB connection problems): ` + error + `\n`
            );
            return false;
          }
        } else {
          console.log(`Not enough amount of ${this.name} to use\n`);
          return false;
        }
      },
    },
  }
);
// this part is fo inherit Item's schema methods
materialSchema.methods = Object.assign(
  {},
  itemSchema.methods,
  materialSchema.methods
);

// userSchema according to assignment, but methods are different: useTool and usedTools
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
      // Custom validation function
      validate: {
        validator: async function (value) {
          const existingItem = await this.model().findOne({ name: value });
          return !existingItem || false;
        },
        message: (props) => `${props.value} already exists in DB`,
      },
    },
    age: {
      type: Number,
      required: true,
      min: 18,
      default: 18,
      // Custom validation function
      validate: {
        validator: function (value) {
          return value >= 18;
        },
        message: "Incorrect age. Age must be a number starting from 18.",
      },
    },
  },
  {
    methods: {
      // method uses the tool by current user
      async useTool(toolName) {
        try {
          // checking if selected tool exists in the DB
          const tool = await ToolModel.findOne({ name: toolName });
          // if tool exists call method useTool of toolSchema for this user
          if (await tool.useTool(this._id)) {
            return true;
          }
        } catch (errorFind) {
          console.log(`Unable to find tool ${toolName} in DB:\n`);
        }
        return false;
      },
      // method returns a list of tools used by current user (without history of using)
      async usedTools() {
        const usedTools = await ToolModel.find({
          borrowedBy: { $in: [this._id] }, // I don't understand this, but it gets all the tools names
        }).select("name");                 //  containing this user ID in borrowedBy field
        return usedTools.map((tool) => tool.name);
      },
      // method builds an item using an array on required tools and materials
      async buildSomething(buildSmth) {
        let result = null; // return parameter: method's result is null or message
        let validBuild = true; // when false - building is impossible
        let isATool = false; // shows if current element was identified as a tool
        const inputLength = buildSmth.length;
        // Validate input
        for (let i = 0; i < inputLength; i++) {
          const item = buildSmth[i];
          // Check if item is a tool
          try {
            const tool = await ToolModel.findOne({ name: item });
            // item is a tool, checking if condition of the tool is >15
            if (tool.condition <= 15) {
              // exception 1: item is a tool but in bad condition
              result = `Building is impossible, tool ${tool.name} is in bad codition\n`;
              validBuild = false; // building is imposible
              i = inputLength; // end the loop
            }
            isATool = true; // item is a tool, don't check in materials
          } catch (errorFind) {
            // item is was not found in among tools in the DB
            console.clear();
            isATool = false;
          }
          // Check if item is a material
          if (!isATool) {
            try {
              const material = await MaterialModel.findOne({ name: item });
              if (i + 1 < inputLength) {
                i++;
                // checking the next element in the array if it is a valid amount of material to use
                const ifAmount = Number(buildSmth[i]);
                if (
                  isNaN(ifAmount) || //is a number
                  ifAmount > material.amount || // available amount is not less than required to build
                  ifAmount <= 0 // is positive
                ) {
                  // exception 2, something is wrong with MaterialAmount in buildSets
                  result = `Building is impossible, amount value of ${material.name} is insufficient or incorrect\n`;
                  validBuild = false; // building is imposible
                  i = inputLength; // end the loop
                }
              } else {
                // exception 3: missing amount of material after the material name
                result = `Building is impossible, amount of ${material.name} is missing\n`;
                validBuild = false; // building is imposible
                i = inputLength; // end the loop
              }
            } catch (errorFind) {
              //exception 4: item is not a tool and not a material
              result = `${item} is neither tool nor material, building is impossible\n`;
              validBuild = false; // building is imposible
              i = inputLength; // end the loop
            }
          } else console.log(`!isATool = ${!isATool}`);
          isATool = false;
        }
        console.clear();
        // if array is correct and amounts of materials and tools conditions are sufficient -> then
        if (validBuild) {
          isATool = false; // shows if current element was identified as a tool
          for (let i = 0; i < inputLength; i++) {
            const item = buildSmth[i];
            // Check if item is a tool
            try {
              const tool = await ToolModel.findOne({ name: item });
              isATool = true; //item is a tool
              //call useTool for current item
              await tool.useTool(this._id);
            } catch (errorFind) {
              isATool = false; // the item is not a tool
            }
            // if item is not a tool -> then
            if (!isATool) {
              // gets a material with the item's name
              const material = await MaterialModel.findOne({ name: item });
              i++;
              const amount = buildSmth[i]; // amount of the item's amterial
              // calling use method of userSchema
              await material.use(Number(amount));
            }
          }
        }
        return result; // return method result
      },
    },
  }
);

// creating mongoose models
const ToolModel = mongoose.model("Tool", toolSchema);
const MaterialModel = mongoose.model("Material", materialSchema);
const UserModel = mongoose.model("User", userSchema);

// export DB models
module.exports = { ToolModel, MaterialModel, UserModel };
