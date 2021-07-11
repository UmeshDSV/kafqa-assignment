# kafqa-assignment

Steps to Deploy:
Node Version 15.14.0 is required
1. Clone the repository.
2. Do 'npm install' inside the repository
3. Use 'npm start' to start the local server


API's:

1. To Create New User - \
Type of the request - POST\
Request URL - http://localhost:3000/user/create \
Request Body - {\
    "name":"sample name",\
    "email":"sample email",\
    "phone":"9999999999",\
    "address":"sample"\
}

2. To Fetch Used details (Need to pass any one of the following parameters - name , phone or email) - \
Request Type - GET\
Request URL (for searching by name) - http://localhost:3000/user/get?name=samplename \
Request URL (for searching by phone) - http://localhost:3000/user/get?name=9999999 \
Request URL (for searching by email) - http://localhost:3000/user/get?name=sampleemail

3. To update user details (Can update one or more parameters) - \
Request Type - PATCH\
Request URL - http://localhost:3000/User/update/:userid \
Example URL(If userid is 2) - http://localhost:3000/User/update/2 \
Request Body - [\
    {\
        "type":"give column name here",\
        "value":"give value to be updated here"\
    },\
    {\
        "type":"give column name here",\
        "value":"give value to be updated here"\
    }\
]

4. To Delete a user by userid - \
Request Type - DELETE\
Request URL - http://localhost:3000/user/delete/:userid \
Example URL(If userid is 2) - http://localhost:3000/User/delete/2

5. To fetch all users - \
Request Type - GET\
Request URL - http://localhost:3000/user/getAll