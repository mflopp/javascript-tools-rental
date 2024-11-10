//mandatory structure of buidSets object (code doesn't check the structure):
// [
// {name: "Name1",
//  assets: ["MaterialName", MaterialAmount, "ToolName"] //any order
// },
// {name: "Name2",
//     assets: ["MaterialName", MaterialAmount, "ToolName"] //any order
//    },
// ]
//name field MUST be unique (code doesn't check it) not sensitive to case
//MaterialAmount should follow after "MaterialName". The code check this, if not - user gets a message

//sets of items which could be build using method buildsomething of userSchema
const buildSets = [
  { name: "House", assets: ["cement", 1500, "sand", 1500, "wood", 2000,"steel",1000,"nails", 20000,"bricks",800,"plastic",400,"screwdriver","hammer","pliers","mixer","level","tape measure"] },
  { name: "Table", assets: ["wood",200,"screws",100,"screwdriver","hammer","paint",50,"nails",20,"glue",30,"tape measure"] },
  { name: "Fence", assets: ["wood",300,"steel",300,"nails",1000,"screws",500,"cement",400,"sand",400,"hammer","screwdriver","saw","tape measure"] },
  { name: "Kitchen", assets: ["wood",200,"steel",200,"screws",100,"nails",100,"glue",70,"paint",90,"plastic",60] },
  { name: "Test", assets: ["wood", 40, "saw"]},
  { name: "bad", assets: [1,2,3]},
  { name: "ok", assets: ["wood", 10,  "hammer"]},
]

module.exports = {
  buildSets,
};
