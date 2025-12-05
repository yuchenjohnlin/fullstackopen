# Frontend
1. BlogForm 
2. Notification
3. Togglable
4. LoginForm

The basic functions of the app is 
the user is able to login (the login button is done with togglable)
where the login will send apis to the backend with token authorization and sessions
after that we will know if the user has logged in or not and will render the blog list if the user is logged in. 
then the user will be able to create new blogs, add likes, and look at blogs

# Changes
## Notification
First of all, we are still using useState and sending the state as a prop into the conponent for the notification messages. 

1. We don't want to pass the state to the component because that is inefficient and have risk of prop drilling. 
2. other components canont easily use this state, for example, the function is called by addBlog and all kinds of functions.

so we change the notification state into a notification reducer where the state is also defined in the reducer.


## Why don't we do react query for user ? 
1. Server State vs. Client State
Blogs (Server State): The list of blogs lives on the database. Other users might add new blogs, delete them, or like them at any time. We need React Query to fetch this data, cache it, and keep it synchronized (refetching when it changes).
User (Client State): In this specific application, the "User" is just a token and some details (name, username) that we received once when we logged in. The server isn't constantly updating who we are. Once we have that token, it's our responsibility (the client's) to remember it.
2. Why not React Query for User?
React Query is designed for fetching data.

If we had an endpoint like GET /api/users/me that we needed to check every time the user switched tabs to see if their session was still valid, then React Query would be perfect.
However, our backend (and the standard JWT implementation in this course) doesn't work like that. We log in once (a mutation), get a token, and then store it in localStorage. We don't "fetch" the user again; we just read what we saved.
