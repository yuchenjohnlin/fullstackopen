import { useDispatch, useSelector } from 'react-redux'
import {  voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    const state = useSelector(state => state)
    // return state.anecdotes.filter(a => a.content.toLowerCase().includes(state.filter.toLowerCase()))
    // this is not a good approach because it returns a new state

    const filtered = state.anecdotes.filter(a => a.content.toLowerCase().includes(state.filter.toLowerCase()))
    // so this way there are errros, but I think this is how OFS teached
    const dispatch = useDispatch()

    const vote = id => {
        dispatch(voteAnecdote(id))
    }

    return (
        <>
        {filtered.map(anecdote => (
            <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
            </div>
        ))}
        </>
    )
}

export default AnecdoteList
