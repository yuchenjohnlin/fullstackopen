import {createSlice} from '@reduxjs/toolkit'
import anecdotesService from '../services/anecdotes'

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
    updateAnecdote(state,action){
      let toChange = state.find( a => a.id === action.payload)
      if (toChange) toChange.votes += 1
      state.sort((a,b) => b.votes - a.votes)      
    },
    setAnecdotes(state, action) {
      return action.payload
      // this basically does state = action.payload, but because changing the current state doesn't actually work so you have to return 
    }
  }
})

export const { createAnecdote, setAnecdotes, updateAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const appendAnecdote = (content) => {
  return async (dispatch) => {
    const newNote = await anecdotesService.createNew(content)
    dispatch(createAnecdote(newNote))
  }
}

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const updated = await anecdotesService.updateVote(anecdote)
    dispatch(updateAnecdote(updated.id))
  }
}

export default anecdoteSlice.reducer
