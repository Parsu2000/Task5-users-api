# Task 5: User Management RESTful API

A modular Express.js REST API with MongoDB Atlas integration using Mongoose. This service implements full CRUD capabilities, schema validation, query filtering, and standardized HTTP error responses.

---

## Architecture Overview

```text
Task5-users-api/
├── config/
│   └── db.js              # MongoDB Atlas connection lifecycle
├── models/
│   └── userModel.js       # Mongoose Schema & User model definition
├── routes/
│   └── userRoutes.js      # Express router handlers for all CRUD endpoints
├── .env                   # Environment variables (ignored by git)
├── .gitignore             # Git ignore configuration
├── package.json           # Dependencies and project metadata
├── package-lock.json      # Dependency lockfile
├── README.md              # Project documentation
└── server.js              # Application entry point and middleware configuration

```

---

## Features

* **Modular Separation of Concerns**: Config, schema models, routes, and server bootstrap are maintained in separate dedicated modules.
* **Complete CRUD Operations**: Create (`POST`), Read all/single (`GET`), Full Update (`PUT`), Partial Update (`PATCH`), and Delete (`DELETE`).
* **Dynamic Query Filtering**: Supports filtering users via URL query parameters (e.g., `?role=developer`, `?age=32`).
* **Data Validation**: Strict schema-level constraints on all fields (`required`, `unique`, `trim`, `lowercase`).
* **Status Codes & Error Handling**:
* `201 Created` for resource creation
* `200 OK` for successful fetches, updates, and deletions
* `400 Bad Request` for missing required fields, duplicate emails, and malformed ObjectIDs
* `404 Not Found` for non-existent user IDs
* `500 Internal Server Error` for unhandled database/server exceptions



---

## Tech Stack

* **Runtime**: Node.js
* **Framework**: Express.js
* **Database**: MongoDB Atlas
* **ODM**: Mongoose
* **Environment Management**: dotenv

---

## Environment Variables

Create a `.env` file in the project root directory:

```env
PORT=10000
MONGO_URI=your_mongodb_atlas_connection_string

```

> **Note**: `.env` and `node_modules/` are explicitly added to `.gitignore` to prevent credential leaks and repository bloat.

---

## Installation & Setup

1. **Clone the repository:**
```bash
git clone [https://github.com/Parsu2000/Task5-users-api.git](https://github.com/Parsu2000/Task5-users-api.git)
cd Task5-users-api

```


2. **Install project dependencies:**
```bash
npm install

```


3. **Start the server:**
```bash
node server.js

```



The server should log:

```text
MongoDB Connected: <cluster-host>
Server listening on port 10000

```

---

## API Endpoints

| Method | Endpoint | Description | Request Body | Status Code |
| --- | --- | --- | --- | --- |
| `POST` | `/users` | Create a new user | JSON object (`name`, `email`, `age`, `role`) | `201 Created` |
| `GET` | `/users` | Fetch all users | None | `200 OK` |
| `GET` | `/users?role=developer` | Filter users by query param | None | `200 OK` |
| `GET` | `/users/:id` | Fetch a single user by MongoDB `_id` | None | `200 OK` |
| `PUT` | `/users/:id` | Full replacement of user document | JSON object (all fields required) | `200 OK` |
| `PATCH` | `/users/:id` | Partial update of user document | JSON object (any field to update) | `200 OK` |
| `DELETE` | `/users/:id` | Remove user by MongoDB `_id` | None | `200 OK` |

---

## Sample Request & Response Payloads

### 1. Create User (`POST /users`)

**Request Body:**

```json
{
  "name": "Anudeep",
  "email": "anudeep@example.com",
  "age": 32,
  "role": "developer"
}

```

**Response (`201 Created`):**

```json
{
  "_id": "6ab4e60397cdb46dd56de348",
  "name": "Anudeep",
  "email": "anudeep@example.com",
  "age": 32,
  "role": "developer",
  "createdAt": "2026-09-24T08:57:39.136Z",
  "updatedAt": "2026-09-24T08:57:39.136Z",
  "__v": 0
}

```

### 2. Full Update (`PUT /users/:id`)

**Request Body:**

```json
{
  "name": "Anudeep Updated",
  "email": "anudeep.new@example.com",
  "age": 33,
  "role": "senior-developer"
}

```

**Response (`200 OK`):**

```json
{
  "_id": "6ab4e60397cdb46dd56de348",
  "name": "Anudeep Updated",
  "email": "anudeep.new@example.com",
  "age": 33,
  "role": "senior-developer",
  "createdAt": "2026-09-24T08:57:39.136Z",
  "updatedAt": "2026-09-24T09:10:12.441Z",
  "__v": 0
}

```

### 3. Partial Update (`PATCH /users/:id`)

**Request Body:**

```json
{
  "role": "team-lead"
}

```

**Response (`200 OK`):**

```json
{
  "_id": "6ab4e60397cdb46dd56de348",
  "name": "Anudeep Updated",
  "email": "anudeep.new@example.com",
  "age": 33,
  "role": "team-lead",
  "createdAt": "2026-09-24T08:57:39.136Z",
  "updatedAt": "2026-09-24T09:12:05.109Z",
  "__v": 0
}

```

### 4. Delete User (`DELETE /users/:id`)

**Response (`200 OK`):**

```json
{
  "message": "User deleted successfully",
  "user": {
    "_id": "6ab4e60397cdb46dd56de348",
    "name": "Anudeep Updated",
    "email": "anudeep.new@example.com",
    "age": 33,
    "role": "team-lead"
  }
}

```

---

## Negative Test Cases

* **Invalid ID Format (`GET /users/123`):**
* **Status**: `400 Bad Request`
* **Body**: `{"message": "Invalid User ID format"}`


* **Non-Existent User (`GET /users/64abc123456789abcdef1234`):**
* **Status**: `404 Not Found`
* **Body**: `{"message": "User not found"}`


* **Missing Required Fields (`POST /users` without email):**
* **Status**: `400 Bad Request`
* **Body**: `{"message": "All fields (name, email, age, role) are required"}`



```

```
