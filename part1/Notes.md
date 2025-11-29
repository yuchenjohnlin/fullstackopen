# React
## Section 1
1. We start to create a web application with React and will introduce some components of React.
2. Creating a React app (with Vite)
    - `npm create vite@latest ... --template react`
    - Install dependencies
    - Start the development server, 
3. Components and JSX
    - JSX is a syntax extension that looks like HTML but resides in JavaScript. Under the hood it’s compiled to vanilla JS
    - Because of components + JSX, you can build UIs by composing small, reusable pieces. For example, you might make a `<Hello name="Alice" />` component and reuse it
    - Props
        - Components can accept props (properties) — parameters passed from parent components — to customize their output
        - Props enable reuse: the same component logic, but different data → different rendered results. Acts like a function
    - Rather than stuffing everything into a single component, the course encourages splitting UI into meaningful sub-components (e.g. Header, Content, Total, Part), each responsible for a small piece of the UI. Props are used to pass data down. 
    - This makes code more maintainable and easier to reason about — a core philosophy of React.
## Takeaways
- React shifts the mindset: instead of manipulating the DOM directly (like “vanilla JS + HTML + CSS”), you work in terms of components + data flow — which scales much better as apps grow.

## Section 2
4. useState: making a component stateful
    - 
5. eventHandlers & updating state on user interaction
6. splitting UI into smaller components: data + behavior via props

## Takeaways
- Declarative = Describe WHAT the UI should look like based on state
    - because we said that react turns the mindset from changing DOM -> components you have defined, adding another layer
    - and declarative UI means that you can declare what you want component to be (like declaring a variable)
    - compared to traditional, you have to describe the steps to update the UI

## Section 3
7. As the complexity of the system increases, more states are being used, Simple State Becomes Insufficient, you can have multiple states or states as object or arrays but then you have to be careful about the initialization

8. Immutability — Why You Must Avoid Direct Mutation, always create a new object or array when updating state.React relies on comparing previous and new state (or immutable references) to know when to re-render. In the back, react still works as javascript and html.



# Javascript
Basically go through what is in javascript
## Takeaways
- Many web-dev and React-based projects rely deeply on modern JS features (arrow functions, destructuring, classes or functional patterns, let/const, dynamic typing, etc.). Having a firm grasp on JS core ensures you're not confused when you run into unexpected behavior.

- Knowing about transpilation & runtime differences (browser vs Node) helps when debugging issues or writing cross-environment code (frontend + backend).
- Today, the most popular way to do transpiling is by using Babel. Transpilation is automatically configured in React applications created with Vite

- Understanding dynamic typing, prototypal inheritance, and this helps avoid common JS pitfalls — especially in larger codebases or when integrating with frameworks.


# What we did 
We were still working on examples instead of building an actual project.  
I think undrstanding how functions are declared is pretty important