# Task 5: User Management RESTful API

A simple, beginner-friendly RESTful CRUD API built using **Node.js**, **Express**, and **MongoDB Atlas** with **Mongoose**.

All server logic, database connections, schemas, and routes are written cleanly inside a single entry file (`server.js`) for straightforward fresher-level understanding.

---

## Project Structure

Task5-users-api/
??? .env                 # Database URI and PORT (git-ignored)
??? .gitignore           # Excludes node_modules and .env
??? package.json         # Project dependencies & start scripts
??? README.md            # Project documentation
??? server.js            # Single file containing DB, Model, Routes & Server
Features
* Single-File Setup: Easy to read and demonstrate without navigating multiple nested folders.
* Complete CRUD Operations:
o POST /users: Create a new user
o GET /users: Get all users
o GET /users?role=Lead_Tech_support: Filter users by role or age
o GET /users/:id: Get a single user by ID
o PUT /users/:id: Replace all fields of a user record
o PATCH /users/:id: Partially update specific fields
o DELETE /users/:id: Remove a user permanently
* Basic Validations:
o Validates MongoDB 24-character hexadecimal format using mongoose.Types.ObjectId.isValid().
o Checks for mandatory fields on user creation.
o Enforces unique email constraints.
* Negative Error Handling: Returns clean HTTP error responses (400 Bad Request, 404 Not Found, 500 Internal Server Error).
Tech Stack
* Runtime: Node.js
* Framework: Express.js
* Database: MongoDB Atlas
* ODM: Mongoose
* Environment Management: dotenv

Environment Variables

Create a file named .env in the root folder:

Code snippet
PORT=9000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/task5_users_db?retryWrites=true&w=majority

Note: The .env file is excluded from Git via .gitignore to prevent database credentials from being pushed to GitHub.

How to Run Locally
1. Clone the repository:

Bash

git clone [https://github.com/Parsu2000/Task5-users-api.git](https://github.com/Parsu2000/Task5-users-api.git)
cd Task5-users-api

2. Install dependencies:

Bash

npm install

3. Start the server:
Bash

node server.js


Expected terminal output:

Plaintext

Server listening on port 9000
MongoDB Connected: <cluster-host>

API Endpoints
MethodEndpointDescriptionStatus CodePOST/usersCreate user201 CreatedGET/usersFetch all users200 OKGET/users?role=Lead_Tech_supportFilter users by role or age200 OKGET/users/:idFetch single user by ID200 OKPUT/users/:idFull update (requires all fields)200 OKPATCH/users/:idPartial update (specific fields)200 OKDELETE/users/:idDelete user200 OK
