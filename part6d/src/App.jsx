import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from './requests'
import { notify, useNotificationDispatch } from './NotificationContext.jsx'

const App = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()
  const handleVote = (anecdote) => {
    voteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
  }

  // const anecdotes = [
  //   {
  //     content: 'If it hurts, do it more often',
  //     id: '47145',
  //     votes: 0,
  //   },
  // ]
  
  const result = useQuery(
  {
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1
  })

  const voteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updated) => {
      queryClient.setQueryData(['anecdotes'], (old = []) =>
        old.map(a => a.id === updated.id ? updated : a)
      )
      notify(dispatch, `anecdote '${updated.content}' voted`)
    },
    onError: (error) => {
      notify(dispatch, error.message || 'voting failed')
    }
  })

  if (result.isLoading) {
    return <div>loading data...</div>
  }
  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
