const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await fetch(baseUrl)

  if (!response.ok) {
    throw new Error('Failed to fetch anecdotes')
  }

  const data = await response.json()
  return data
}

const getId = () => (100000 * Math.random()).toFixed(0)
const asObject = anecdote => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const createNew = async(content) => {
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(asObject(content))
    }

    const response = await fetch(baseUrl, options)
    if (!response.ok) {
        throw new Error('Failed to create note')
    }
    
    return await response.json()
}

const updateVote = async( anecdoteToVote ) => {
    const options = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({...anecdoteToVote, votes: anecdoteToVote.votes + 1}) // need serialize, from memory object to json strings
    }
    console.log(options)
    const response = await fetch(`${baseUrl}/${anecdoteToVote.id}`, options)
    if (!response.ok) {
        throw new error('Failed to update vote')
    }
    return await response.json()
}

export default { getAll, createNew, updateVote }