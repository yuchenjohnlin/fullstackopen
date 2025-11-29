# What we did
1. Display multiple components from an array.
    - Need Higher-Order functions
    - Map
    - Reduce
    - to help use work with arrays easily
    - some functions like map, concat and reduce create new arrays which acan be used directly when setting states. However, some functions are not. 

2. Access React states in a form 
    - Use onChange or functions in `<input>` or some attributes
    - There are also other ways of accessing
        - useRef() - DOM owns the data
        - FormData - uncontrolled forms ? 

3. Filter the components in an array being displayed 
    - Use filter function

## After being able to display array data from the process, we want to move the data towards the backend
4. Use Json Server as db and access data from there.
    - Axios and Promises
        - axios is built in npm so we can use it directly and is also pleasent to use
        - axios return promises - A Promise is an object representing the eventual completion or failure of an asynchronous operation.
        - [pending, fulfilled, rejected] will be stored in the promise so that we know what happened during the async operation
    - Then 
        - then register the runtime environment with a callback function, and you could provide an object as parameter to the callback function.
    - However, simply by axios and then functions wouldn't be a good scalable way to fetch data 
    - Effect-hooks
        - Effects let a component connect to and synchronize with external systems. This includes dealing with network, browser DOM, animations, widgets written using a different UI library, and other non-React code.
        - Effects let a component connect to and synchronize with external systems. This includes dealing with network, browser DOM, animations, widgets written using a different UI library, and other non-React code.
            - You would see this when printing things inside the hook (or in effect), it would only show the previous state instead of the new one after changing because it hasn't been rendered yet. 
            - This is due to how react renders pages and implement effects
5. Alter data on the server
    - REST
        - In REST terminology, individual data objects are refered as resources, where each resource should have a unique address associated with it, the URL
        - so that the method wouldn't have anything to do with the resource id, 
    - here are a few things to point out. Why did we make a copy of the note object we wanted to modify when the following code also appears to work?
        - This is not recommended because the variable note is a reference to an item in the notes array in the component's state, and as we recall we must never mutate state directly in React.
        - It's also worth noting that the new object changedNote (created with {...notes,important=True}) is only a so-called shallow copy, meaning that the values of the new object are the same as the values of the old object. If the values of the old object were objects themselves, then the copied values in the new object would reference the same objects that were in the old object.
## Now we are able to access backend with REST, but the code becomes huge
6. Extract communication into a separate module
    - In the spirit of the single responsibility principle, we deem it wise to extract this communication into its own module.
    - We can use 2 then functions to not have the backend access function return promises and return the data itself.
    - then function would return a promise but the second promise would be resolved straight away.

7. Errors
    - We can use catch to get error messages and act upon it.

8. Add styles to the page
    - We can change the color dynamically by assigning it with a different class.