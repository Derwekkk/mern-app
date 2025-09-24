# MERN Stack Application – Machine Test

_This is a MERN stack application with the following features:_

#### Admin Login (JWT authentication)
#### Agent Creation & Management
#### CSV Upload & Task Distribution

## Features

1. Admin authentication with JWT
2. Add multiple agents (with name, email, mobile, password)
3. Upload CSV/XLSX/AXLS files
4. Validate uploaded file format
5. Distribute tasks equally among agents
6. Save distributed lists in MongoDB
7. Display lists per agent on the frontend

## Tech Stack

- Frontend: React.js + Tailwind CSS
- Backend: Node.js + Express.js
- Database: MongoDB / MongoDB Atlas
- Authentication: JSON Web Tokens (JWT)
- File Uploads: Multer + CSV Parser

## Setup Instructions
# Clone the Repository  
```bash   
git clone <your-repo-url>  
cd mern-app
````

# Backend setup 
````bash 
cd backend  
npm install
````

Create a .env file inside backend/ and add:
````env   
PORT=5000  
MONGO_URI=mongodb://localhost:27017/mern-distributor  
JWT_SECRET=your_secret_key
````
Run backend:  
````bash  
npm run dev
````
# Frontend Setup  
````bash
cd frontend
npm install
````
Run frontend:  
````bash
npm start
````

### 1. Project structure  
````bash
mern-app/
│
├── backend/
│   ├── models/         # Mongoose schemas
│   ├── config/         # database
│   ├── middleware/     # token assignment
│   ├── routes/         # API routes
│   ├── server.js       # Express entry point
│   └── .env            # Backend config
│
├── frontend/
│   ├── src/components/ # React components
│   ├── src/App.js      # Main app
└── README.md
````


## 1. Admin Registration & Login  
_Register Admin (via Postman)_  
Send a POST request to:

http://localhost:5000/api/auth/register-admin  
### Body (JSON):  

```json
{    
  "email": "admin@example.com",  
  "password": "password123",  
}
````
Authenticate the user by matching the credentials with the registered user data in the MongoDB database.

_Login_  
Go to the frontend localhost → Login with the created admin credentials.

## 2. Agent Creation
### The application features a section for you to enter an agent's information via the frontend page.  

To do this via postman, use POST: `http://localhost:5000/api/auth/login` and in the body add user credentials:  
````json
{
    "email": "admin@example.com",
    "password": "Password123"
}
````
If successful, you should see a message like:  
````json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZDIzMzhlNjZkNDZjY2MzZDVjYjZmZiIsImVtYWlsIjoiYWRtaW5AZXhhbXBsZS5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NTg2OTE0OTgsImV4cCI6MTc1ODcyMDI5OH0.Cd0uSfMbKtzbnZFqbjOqj6CkSAIDgu9gNgETR4iw06k",
    "user": {
        "id": "68d2338e66d46ccc3d5cb6ff",
        "email": "admin@example.com",
        "role": "admin"
    }
}
````

Use this token as a bearer token in the creation of an agent, use POST `http://localhost:5000/api/agents` and in the body add name, email, password, and mobile:
````json
{
    "name": "Derek Doe",
    "email": "ag@example.com",
    "mobile": "+91-9876543210",
    "password": "AgentPass123"
}
````

If successful, you should see: 
````json
{
    "message": "Agent created",
    "agent": {
        "id": "68d389779373dd6d66a3e234",
        "name": "Derek Doe",
        "email": "ag@example.com",
        "mobile": "+91-9876543210"
    }
}
````
The same should reflect in mongodb  

## 3. Upload CSV and Distribute Lists

The added CSV file should have three columns: FirstName of type text, Phone of type number, and Notes of type text.  
This function can be done via the frontend page of the application upon logging in.  
To do this via Postman:  
POST: `http://localhost:5000/api/upload`  
In the body, select *form data* and select the file option from key and change *text* to file. In value, upload the csv file.  
Under the authorization tab, select and assign the bearer token.  
Upon clicking send, you should see:  
````json
{
    "message": "File distributed successfully",
    "distribution": [
        {
            "agent": "68d23bc053ac58f9caad944f",
            "items": [
                {
                    "firstName": "Alice",
                    "phone": "+911234567890",
                    "notes": "Follow up",
                    "_id": "68d39fe59373dd6d66a3e239"
                },
                {
                    "firstName": "Dave",
                    "phone": "+914567890123",
                    "notes": "Schedule meeting",
                    "_id": "68d39fe59373dd6d66a3e23a"
                },
                {
                    "firstName": "Grace",
                    "phone": "+917890123456",
                    "notes": "Verify documents",
                    "_id": "68d39fe59373dd6d66a3e23b"
                }
            ],
            "_id": "68d39fe59373dd6d66a3e238",
            "createdAt": "2025-09-24T07:38:13.289Z",
            "updatedAt": "2025-09-24T07:38:13.289Z",
            "__v": 0
        },
        {
            "agent": "68d2f72d9373dd6d66a3e21f",
            "items": [
                {
                    "firstName": "Bob",
                    "phone": "+912345678901",
                    "notes": "Call back",
                    "_id": "68d39fe59373dd6d66a3e23e"
                },
                {
                    "firstName": "Eve",
                    "phone": "+915678901234",
                    "notes": "Check details",
                    "_id": "68d39fe59373dd6d66a3e23f"
                }
            ],
            "_id": "68d39fe59373dd6d66a3e23d",
            "createdAt": "2025-09-24T07:38:13.291Z",
            "updatedAt": "2025-09-24T07:38:13.291Z",
            "__v": 0
        },
        {
            "agent": "68d389779373dd6d66a3e234",
            "items": [
                {
                    "firstName": "Carol",
                    "phone": "+913456789012",
                    "notes": "Send email",
                    "_id": "68d39fe59373dd6d66a3e242"
                },
                {
                    "firstName": "Frank",
                    "phone": "+916789012345",
                    "notes": "Send invoice",
                    "_id": "68d39fe59373dd6d66a3e243"
                }
            ],
            "_id": "68d39fe59373dd6d66a3e241",
            "createdAt": "2025-09-24T07:38:13.292Z",
            "updatedAt": "2025-09-24T07:38:13.292Z",
            "__v": 0
        }
    ]
}
````

