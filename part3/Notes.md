# What we did
1. Setup backend with Node.js 
    - Node.js
        - = JavaScript outside the browser. 
        - This is the part that transforms JavaScript from a "web scripting language" → to a "general-purpose backend language".
    - We use http from node to create a server

2. Use Express to create more scalable server
    - using built-in http is cumbersome
    - Express
        - a library that simplifies
        - routing
        - JSON handling
        - middleware
        - error handling
    - Start to define endpoints based on REST API 
3. Use Postman to test the server APIs

4. Middleware 
    - Middleware are functions that can be used for handling request and response objects.

## Now we connect the frontend from part2 to part3      
3. Same origin policy and CORS
    - The same-origin policy is a security mechanism implemented by browsers in order to prevent session hijacking among other security vulnerabilities 
    - In order to enable legitimate cross-origin requests (requests to URLs that don't share the same origin) W3C came up with a mechanism called CORS(Cross-Origin Resource Sharing).

## Now we put the whole app onto render
4. Create a whole new github repo to run on render
    - Have to make some modifications of how you run the code with npm

## The data we have been using were stored locally on backend, and now we want to start using databases.
5. MongoDB
    - Schema has to be planned rather carefully compare to relational databases 
    - we use mongoose to access the mongoDB

6. Refactor code to put all db configuration to its own module

7. Define env vars with dotenv

8. Add error handling

9. Move error handling to middleware

10. ESLint

