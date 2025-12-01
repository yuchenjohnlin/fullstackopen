import { useState } from 'react'

const BlogForm = ({createBlog, notifyUser}) => {
    const [newBlog, setNewBlog] = useState({
          title: '',
          author: '',
          url: '',
          likes: 0
        })
    const handleBlogChange = (e) => {
        // the name and value here corresponds with the attributes in the input
        const { name, value } = e.target;
        setNewBlog(prev => ({ ...prev, [name]: value }));
    };

    const addBlog = event => {
        event.preventDefault()
        // const blogObject = 
        createBlog({
          ...newBlog
        })
        setNewBlog({ title: '', author: '', url: '', likes: 0 })
        notifyUser(`a new blog ${newBlog.title} by ${newBlog.author} added`, 'success')
      }
    
    
    return (
            <>
            <h2>create new</h2>
            <form onSubmit={addBlog}>
                <input name="title" value={newBlog.title} onChange={handleBlogChange} placeholder="title" />
                <input name="author" value={newBlog.author} onChange={handleBlogChange} placeholder="author" />
                <input name="url" value={newBlog.url} onChange={handleBlogChange} placeholder="url" />
                <input name="likes" value={newBlog.likes} onChange={handleBlogChange} placeholder="likes" />
                <button type="submit">save</button>
            </form>
            </>
        )
}
export default BlogForm