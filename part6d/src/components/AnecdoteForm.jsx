import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'
import { notify, useNotificationDispatch } from '../NotificationContext.jsx'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()
  const newMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (created) => {
      // append to cache to avoid refetch
      queryClient.setQueryData(['anecdotes'], (old = []) => old.concat(created))
      notify(dispatch, `anecdote '${created.content}' added`)
    },
    onError: (error) => {
      notify(dispatch, error.message || 'anecdote creation failed')
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newMutation.mutate({ content, votes: 0 })

    console.log('new anecdote')
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
