# mevn-auth-api

Learning to create a simple RESTful API for Authentication using Node.js + Express + MongoDB

## Getting started

This is a basic API skeleton written in JavaScript ES2015. Very useful to building a RESTful web APIs for our front-end platforms like Angular, Reactjs, etc.

This project will run on **NodeJs** using **MongoDB** as database. The code structure easy as any beginner can also adopt the flow and start building an API.

## Software Requirements

- Node.js **8+**
- MongoDB **3.6+** (Recommended **4+**)

## How to install

### Using Git (recommended)

1.  Clone the project from github. Change "myproject" to your project name.

```bash
git clone https://github.com/palashmon/mevn-auth-api.git ./myproject
```

### Install npm dependencies after installing

```bash
cd myproject
npm install
```

### Setting up environments

1.  You will find a file named `.env.example` on root directory of project.
2.  Create a new file by copying and pasting the file and then renaming it to just `.env`
    ```bash
    cp .env.example .env
    ```
3.  The file `.env` is already ignored, so you never commit your credentials.

## How to run

### Running API server locally

```bash
npm run dev
```

### Creating new models

If you need to add more models to the project just create a new file in `/models/` and use them in the controllers.

### Creating new routes

If you need to add more routes to the project just create a new file in `/routes/` and add it in `/routes/api.js` it will be loaded dynamically.

### Creating new controllers

If you need to add more controllers to the project just create a new file in `/controllers/` and use them in the routes.

## Current Routes

- `api/users/register` - Register the User
- `api/users/login` - Signing in the User
- `api/users/profile` - Return the User's data
- `api/users/logout` - Remove the req.user property and clear the login session (if any)
