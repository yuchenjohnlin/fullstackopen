import { useDispatch } from 'react-redux'
import { appendAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    // If I use useDispatch() directly in the function then it is not on the top level which makes an invalid hook call
    
    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        // set the anecdote
        dispatch(appendAnecdote(event.target.anecdote.value))
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