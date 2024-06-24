ACCOUNT MANAGEMENT

This project allows users to manage their accounts, including features for login, signup, and account editing.

Technologies Used

- Frontend: React (Vite)
- Backend: Node.js, Express
- Database: MongoDB (using Mongoose for ODM)

Installation

To run this project locally, follow the steps below:

1. Clone the repository

'
  git clone https://github.com/Bernardo0529/account-management.git
  cd account-management
'

2. Install server dependencies

'
  cd server
  npm install
'

3. Install client(web) dependencies

'
  cd ../web
  npm install
'

Running the project

1. Start the server

'
  cd server
  npm run dev
'

2. Start the client(web)

'
  cd web
  npm run dev
'

Usage

Features:

- Signup: New users can create an account with name, email and password
- Login: Existing user can authenticate using their credencials (email and password)
- Account Editing: Users can update their account information, logout and delete account