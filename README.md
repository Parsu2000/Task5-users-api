# Task 5: User Management RESTful API

A beginner-friendly REST API for managing users using Node.js, Express, and MongoDB with Mongoose.

This project demonstrates core CRUD operations with validation, filtering, and error handling for a simple user management application.

## Features

- Create a new user
- Fetch all users
- Filter users by `role` and `age`
- Fetch a single user by ID
- Update a user with `PUT`
- Partially update a user with `PATCH`
- Delete a user
- Validate MongoDB ObjectId format
- Reject empty required fields
- Prevent duplicate email entries

## Tech Stack

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- dotenv

## Project Structure

```text
Task5-users-api/
├── config/
│   └── db.js
├── controllers/
│   └── userController.js
├── models/
│   └── userModel.js
├── routes/
│   └── userRoutes.js
├── Screenshots/
├── .gitignore
├── .env
├── package.json
├── README.md
├── server.js
└── package-lock.json
```

## Prerequisites

- Node.js installed
- MongoDB Atlas account or local MongoDB instance
- A `.env` file with your database configuration

## Environment Setup

Create a `.env` file in the project root:

```env
PORT=9000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/task5_users_db?retryWrites=true&w=majority
```

> The `.env` file is ignored by Git via `.gitignore`.

## Installation

```bash
npm install
```

## Run the Server

```bash
node server.js
```

You should see output similar to:

```bash
Server listening on port 9000
MongoDB Connected: <cluster-host>
```

## API Endpoints

### 1) Create User

- Method: `POST`
- Endpoint: `/users`
- Body:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "age": 28,
  "role": "Lead_Tech_support"
}
```

### 2) Get All Users

- Method: `GET`
- Endpoint: `/users`

Optional filters:

```bash
GET /users?role=Lead_Tech_support
GET /users?age=28
```

### 3) Get User By ID

- Method: `GET`
- Endpoint: `/users/:id`

### 4) Update User (Full Update)

- Method: `PUT`
- Endpoint: `/users/:id`
- Body must include all required fields: `name`, `email`, `age`, `role`

### 5) Partial Update

- Method: `PATCH`
- Endpoint: `/users/:id`

### 6) Delete User

- Method: `DELETE`
- Endpoint: `/users/:id`

## Example Response

```json
{
  "_id": "64f9d7a9c91d7e2b3d21e3c5",
  "name": "John Doe",
  "email": "john@example.com",
  "age": 28,
  "role": "Lead_Tech_support",
  "createdAt": "2025-01-01T10:00:00.000Z",
  "updatedAt": "2025-01-01T10:00:00.000Z"
}
```

## Error Handling

The API returns appropriate HTTP status codes for common errors:

- `400 Bad Request` for invalid IDs or missing fields
- `404 Not Found` when the user does not exist
- `500 Internal Server Error` for server-side issues

## Notes

This project is intended for learning and demonstration purposes, especially for understanding RESTful CRUD APIs in Express and MongoDB.
