Project:
Storage application.

Description:
The app manages tools, materials and user alowing to control the amount, maintain records of income and usage and so on.

Functionality:
App allows to create new items (users, tools, materials), get necessary information about the items, update information about items (add amount of materials, use materials and tools, improving tools condition, using the tools, building some presetted items) and delete items. All the item information stores in MongoDB.

installation (Windows + Visual Studio Code):
1. unpack ProjectFinalDB.zip to any folder (Disk:\somePath\ProjectFinalDB)
2. Open menuFunctions.js file from ProjectFinalDB directory in any text editor, find "await mongoose.connect(" and replace the MongoDB uri to yours (the following thing in "": "mongodb+srv://...")
3. open Visual Studio Code, switch to terminal and open the directory ProjectFinalDB with the project files (cd Disk:\somePath\ProjectFinalDB)
4. install mongoose (type in the same terminal: npm install mongoose)
5. start the code (type in the same terminal: node ./main.js)
6. use the app


-----------------
Developement.readme
The application is written in javascript with mongoose and consists of 8 files:
buildSets.js
createFunctions.js
deleteFunctions.js
infoFunctions.js
main.js
menuFunctions.js
operationFunctions.js
schemas.js

main.js: starts the app and organize the user menu. all the main functions are called from the code in this files
menuFunctions.js: stores MongoDB connection uri, connect and disconnec to DB functions, console read interface and all the functions to display menu items
createFunctions.js: stores 3 functions to create a tool, a material and a user
infoFunctions.js: stores all the information menu block functions
operationFunctions.js: stores all the operations menu block items, plus functions displaying all the tools, materials and users available in DB and user input function
deleteFunctions.js: stores 3 functions to delete a tool, a material and a user
schemas.js: stores 4 mongoose schemas (itemSchema, toolSchema, materialSchema, userSchema) and 3 models (ToolModel, MaterialModel, UserModel)
buildSets.js: stores set of presetted items a user can buid. Structure must be strict and it's not not checking properly (there was no such task)

Common information:
1. toolSchema and materialSchema inherit itemSchema
2. there is custom validation for almost every field of every schema (except name uniqueness because i didn't allow me to use .save() and i could solve it). But this validation will never work because all the user input checks before saving to the DB. There aren't any othe ways incorrect data can be saved in the DB according to this project requirements
3. All the edge cases are taken into account and the app doesn't crash. It doesn't show user system messages, only usual console.log() containing unestandable messages. The app doesn't even crush when DB is offline.
4. Deleting a user deletes also all the information about the tools this user used
5. Excessive amount of code is due to the need to organize interaction with the user through the terminal and to handle all edge cases
6. Tools amount I assumed always equals to 1
7. Accorsing to project requirements userSchema should have methods useItem and usedItems. But for better understanding, I've replaced these methods with my own useTool and usedTools

A brief description of my functions and algorithms should follow, but no one needs it within the framework of this project. I write this part just to show that I understand it

======================
User.readme

Using the app:
after start if DB is connected you will see the main menu. It consists of 5 elements:
 1: Create
 2: Get Info
 3: Operations
 4: Delete something
 0: Quit
It's prety simple:
1. Create menu leads to creation of a tool, material or user.
2. Get Info menu leads to a submenu, containing sets of different information options for tools, materials and users.
3. Operations menu leads to all the possible update type operations with tools, materials and users
4. Delete something menu leads to deleting of a tool, material or user
5. Quit menu exits the app.

Get info menu has a submenu where user have to choose which type of documents he wants to get information about:
 1: Tools information
 2: Materials information
 3: User Information
 0: Main menu

All the action has simple hints. For example "enter your choise", "which use is going to use a tool?" etc. If there is some problem the app informs user about it and continues to work.
To stop app user must follow through the menu to the main menu and select 0.

The description of how each function works should follow, with features, limitations and explanations for each step. I will not describe it, because nobody needs it within the framework of this project, and I wrote this part only to show that I understand that detailed instructions should be written for the user.

========================================
Original project task:
Project Overview: - final mongoose and express restAPI
We are building an Express.js server connected to MongoDB via Mongoose with features
for Users, Posts, and Categories.
User Model:
● Fields:
○ Name
○ Unique username
○ Password (hashed in the database)
○ Email
○ Favorite posts (array of ObjectIds)
○ Virtual field: All posts authored by the user
● Password Reset:
○ Users can reset their password by providing their email. The system sends a
password reset link to the user’s registered email, allowing them to securely
update their password. (low level, just making sure that its the same email
and then changing the password, hard level sending an email with a code or
a link)
Post Model:
● Fields:
○ Author (linked to User ID)
○ Title
○ Body
○ Categories (linked to Category IDs for many-to-many relationship)
Category Model:
● Fields:
○ Name
○ Virtual field: All posts belonging to this category
Endpoints:
● CRUD operations for Users and Posts and Categories
● When fetching a specific user, their posts are populated.
● Search posts (one route for all) by:
○ Title
○ Author
○ Category
● Category Management:
○ Link posts to categories (many-to-many).
○ Print all posts in certain category.
Authentication & Authorization:
● JWT and Cookies are used for authentication.
● Environment variables store sensitive data securely.
● CORS is configured for secure cross-origin requests.
● Important: Users must sign in or create an account to access any functionality
related to posts or categories. Without authentication, users cannot view, create, or
modify any content.
● Default route: User sign-in or sign-up. Posts can only be accessed or modified after
signing in.
Logging:
● All requests are logged with the debug library for easy tracking and debugging,
providing clear and readable logs of each action performed,.
Error Handling:
● Comprehensive error handling is implemented for both server-side and
request-side errors, ensuring robust fault tolerance.
Documentation:
● Detailed documentation is provided, explaining how to perform actions like signing in,
creating posts, searching posts by category, and password resetting, including URLs
for each action.