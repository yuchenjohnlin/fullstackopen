import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    // If I use useDispatch() directly in the function then it is not on the top level which makes an invalid hook call
    
    const addAnecdote = event => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        // set the anecdote
        dispatch(createAnecdote(content))
    }
    return (
    <>
        <h2>create new</h2>
        <form onSubmit={addAnecdote}>
            <div>
            <input name="anecdote" />
            </div>
            <button>create</button>
        </form>
    </>
    )
}
export default AnecdoteForm