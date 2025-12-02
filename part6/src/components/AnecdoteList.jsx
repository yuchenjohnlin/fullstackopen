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

  const vote = id => {
      // 1. FIND the specific anecdote BEFORE dispatching the vote
      const anecdoteToVote = anecdotes.find(a => a.id === id);

      // 2. Dispatch the vote (data manipulation)
      dispatch(voteAnecdote(id));

      // 3. Dispatch the notification (UI feedback)
      // Use the content from the specific anecdoteToVote object
      if (anecdoteToVote) {
        dispatch(showNotification(`You voted '${anecdoteToVote.content}'`, 5));
      }
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
