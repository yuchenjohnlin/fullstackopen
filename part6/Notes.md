Fundamental concepts behind using a centralized store for state management

1. Flux and Redux

Redux is the most popular implementation of the Flux pattern. It is designed to make state changes predictable and easy to debug by introducing strict rules:

Single Source of Truth: All application state is stored in a single JavaScript object called the Store.

State is Read-Only: The only way to change the state is by dispatching an Action. You never modify the state directly.

Reducers are Pure: A Reducer is a pure function that takes the previousState and an action, and returns the newState. It cannot perform side effects (like API calls)

Store: The centralized container for the state.

Actions: Plain JavaScript objects that describe the event. They must have a type property.

Reducers: Functions that specify how the state changes in response to an action.

Provider: You wrap your entire React application in the <Provider store={store} /> component. This makes the store accessible to all components.

useSelector Hook: Allows a component to read specific parts of the state from the Redux store.

useDispatch Hook: Allows a component to send Actions to the Redux store to trigger a state change.


The problem with Redux, as highlighted in later parts of the course (and in your own questions), is that it was designed for Client State (UI state) but is most often used for Server State (API data).

When Redux handles asynchronous data fetching, it gets complicated:

Because Reducers must be pure (no side effects), you cannot do API calls inside them.

You must introduce middleware (like Redux Thunk or Redux Saga) to handle the async API requests, leading to a lot of boilerplate (extra code) just to get data.

Usually when you want to call apis, you wouldn't do it directly in the reducer, but redux thunk can create a reducer (kind of like wraping the reducer with another layer  of function) to provide a better code structure

In summary, the Redux Toolkit doesn't change the underlying principles, but it fixes the problem of "too much boilerplate" that historically made Redux difficult and time-consuming to use. It makes Redux much more modern and efficient to write, especially when paired with the useSelector and useDispatch hooks

Then to React Query, a lot of people found out that Redux is an overkill after Query came out because a lot of the states in the store are used to keep track of API data, which could be done by React query.

Only several states are managed by Redux. This led to redux being a overkill where using built in useReducer with context is enough to handle the left states.