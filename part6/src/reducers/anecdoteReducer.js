import {createSlice} from '@reduxjs/toolkit'



const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action){
      // state.concat(asObject(action.payload.content))
      // concat also doesn't mutate the state so should return 
      // but we can use push
      // state.push(asObject(action.payload))
      state.push(action.payload)
    },
    voteAnecdote(state,action){
      let toChange = state.find( a => a.id === action.payload)
      if (toChange) toChange.votes += 1
      state.sort((a,b) => b.votes - a.votes)      
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { createAnecdote, voteAnecdote, setAnecdotes} = anecdoteSlice.actions
export default anecdoteSlice.reducer
