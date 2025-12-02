import {createSlice} from '@reduxjs/toolkit'

// basically we have to add a reducer that does some action according to the action but now we want to change the state of the filter

const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        setNotification(state, action){
            // I have to mutate or return a new value
            console.log(action)
            return action.payload
        },
        clearNotification(state, action){
            return null
        }
    }
})

// showNotification function involves asynchronous logic (the setTimeout timer), which fundamentally violates the rules of a Redux reducer.
// things with side efect have to use these thunks
export const showNotification = (message, seconds = 5) => dispatch => {
  dispatch(setNotification(message));
  setTimeout(() => dispatch(clearNotification()), seconds * 1000);
};

export const { setNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer
