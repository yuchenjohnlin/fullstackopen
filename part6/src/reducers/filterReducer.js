import {createSlice} from '@reduxjs/toolkit'

// basically we have to add a reducer that does some action according to the action but now we want to change the state of the filter

const filterSlice = createSlice({
    name: 'filter',
    initialState: '',
    reducers: {
        inputFilter(state, action){
            // I have to mutate or return a new value
            return action.payload
        }
    }
})

export const { inputFilter } = filterSlice.actions
export default filterSlice.reducer
