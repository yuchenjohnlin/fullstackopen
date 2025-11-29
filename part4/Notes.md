I think this is the part that I got pretty confused, maybe because I started a whole other project rather than using the existing one. But now I will completely go through this module.

# What we did 

## Modify project structure into Node.js best practices
```
├── controllers
│   └── notes.js
├── dist
│   └── ...
├── models
│   └── note.js
├── utils
│   ├── config.js
│   ├── logger.js
│   └── middleware.js  
├── app.js
├── index.js
├── package-lock.json
├── package.json
```

## Separate logger.js to print error messages

## Separate config file to extract environment variables

## Separate route handlers into controllers folder
This defines the routes that we have created for the frontend to access  
Inside each route, the database component might also be accessed to update content

## The database
The database connection is established in the app.js file, which kind of sets up the application with all of the middleware

## Index file
The index file is the entry point to the application as we have specified in the script in package.json

# Testing 
We write test files to check the funcionality of the system 
1. Add test in the script to run `npm test`
2. create a tests folder and put testing files into it.
3. Supertests
    Supertest allows you to test your Express server routes directly in memory, without:

    - ❌ starting an actual HTTP server
    - ❌ using a real network port
    - ❌ needing axios/fetch
    - ❌ running your entire backend

    Instead, Supertest:

    - ✔ loads your Express app object
    - ✔ injects mock HTTP requests into it
    - ✔ captures the response
    - ✔ lets you assert status codes, headers, JSON
    - ✔ runs extremely fast
    - ✔ isolates your tests from the browser/network

# User administration 
1. define user schema
2. use password hashes before storing the actual password with bcrypt lib
3. make the username field unique and 

# Token Authentication
1. Token-based authentication gives the user a token whenever the user logs in, so that we know that the user is "using" the system.
2. Create login routes 
3. When the user logs in (confirming that the username and password is correct) we generate a token according to the username and user id along with a secret string.
4. This token will be returned to the user by the authorization header, along with the authentication scheme being used.

5. Since this token will be sent back to the server when people want to do anything, we add the token verification in each route function.

6. However, there is a small problem here, that is jwt uses time to deactivate the token so if someone has a token then he still has the ability to work on behalf of the user before the token expires.

7. refactor the token authorization into a middleware.

8. Basically if you don't add any token authentication in the server side, then nothing will actually break the server. 

9. So this isn't something necessary for backend to work but you have to bear in mind that security is a service you have to provide to the users.

# Exercise 
1. Create blog list app
    - Connect to database
    - define database schema
    - add routes in the app for frontend to access 
        - get 
        - post
    - start up the app with listen on hardcoded port
    - setup the application with npm and use node -watch
2. Refactor the app
    - move database connection to 
    - define schemas in models folder 
    - put routes to the controller
    - move hardcoded port to env config file
3. Added simple tests
    - we don't want to change the database when testing so need to specify a different environment variable when testing

4. change the syntax used in supertests into async and await

5. Change to async and await in the backend

6. User administration - add user schema, write tests for it, include the user into the notes and make sure that we are able to to get the notes information as well as the user information 

7. Populate, is a way in Mongoose db to do something like join

8. add user administration 

9. Add token authorization