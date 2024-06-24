<h1>ACCOUNT MANAGEMENT</h1>

>This project allows users to manage their accounts, including features for login, signup, and account editing.

<br>

### Technologies Used

* Frontend: React (Vite)
* Backend: Node.js, Express
* Database: MongoDB (using Mongoose for ODM)

<br>

<h3>Installation</h3>

> To run this project locally, follow the steps below:

<br>

* Clone the repository

```
  git clone https://github.com/Bernardo0529/account-management.git
  cd account-management
```

* Install server dependencies

```
  cd server
  npm install
```

* Install client(web) dependencies

```
  cd ../web
  npm install
```

<br>

<h3>Running the project</h3>

<br>

* Start the server

```
  cd server
  npm run dev
```

* Start the client(web)

```
  cd web
  npm run dev
```

<h3>Usage</h3>

* Signup: New users can create an account with name, email and password
* Login: Existing user can authenticate using their credencials (email and password)
* Account Editing: Users can update their account information, logout and delete account
