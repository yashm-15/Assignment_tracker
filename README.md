# Assignment_tracker
- To test the methods first make the env file and
- then add the port jwt security key and the mondodb url to connect to the db
- Then install the dependencies to run the application
- This application can be run using: npm run dev (as you can see in the package.json)
- Also to check the api's first open postman
- Register the user, and admin
- login with user and admin
- pass the jwt token, id to store assignment and get the assignment
- to pass or reject the assignmet go through the api's

http://localhost:3000/api/user/upload
Headers: Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MDgwZjkwODBhYWIxNDc3NzM4ZTU2MiIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzI4NTgxNTIxLCJleHAiOjE3Mjg1ODUxMjF9.jU2KwLhcupXmjMU_qObgihRPgH2AqTFgdDGuGh-JgWk (Token Generated while logging in or registering the user)
Body: {
"task": "Hello World",
"adminId": "6708101880aab1477738e56a"(Id of the admin)
}

Response: {
"message": "Assignment uploaded successfully",
"assignment": {
"userId": "67080f9080aab1477738e562",
"task": "Hello World",
"adminId": "6708101880aab1477738e56a",
"status": "pending",
"\_id": "670811d780aab1477738e574",
"createdAt": "2024-10-10T17:41:43.624Z",
"updatedAt": "2024-10-10T17:41:43.624Z",
"\_\_v": 0
}
}
