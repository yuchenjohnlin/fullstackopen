# What we did 
1. Add login form according to the newly added login API in the backend

2. Conditional renderring according to different states of the login
    - the Reac trick used to render the forms conditionally : `{!user && loginForm()}`
    -  The second statement will not be eexcuted if the first is evaluated as false

3. Add token authorization to to adding new notes... functions