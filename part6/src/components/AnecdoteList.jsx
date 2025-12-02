import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)

  const filtered = filter === ''
    ? anecdotes
    : anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))

  const dispatch = useDispatch()

  const vote = anecdote => {
      dispatch(voteAnecdote(anecdote))
      dispatch(showNotification(`You voted '${anecdote.content}'`, 5));
  }

  return (
    <>
      {filtered.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  )
}

export default AnecdoteList
