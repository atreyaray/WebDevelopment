import React, { useState } from 'react'
const BlogForm = ({
    create
}) => {
    const [newBlog, setNewBlog] = useState({
        title: '',
        author: '',
        url: ''
    })

    const handleTitleChange = ({ target }) => setNewBlog({ ...newBlog, title: target.value })
    const handleAuthorChange = ({ target }) => setNewBlog({ ...newBlog, author: target.value })
    const handleUrlChange = ({ target }) => setNewBlog({ ...newBlog, url: target.value })

    const addBlog = (event) => {
        event.preventDefault()
        console.log('New blog posted!!!',)
        create(newBlog)
        const emptyBlog = {
            title: '',
            author: '',
            url: ''
        }
        setNewBlog(emptyBlog)
    }

    return(
        <div>
            <h2>create new</h2>
            <form onSubmit={addBlog}>
                <div>
                    title:
                    <input type="text"
                        value={newBlog.title}
                        name="title"
                        id ="title"
                        onChange={handleTitleChange}
                        className='title'
                    />
                </div>
                <div>
                    author:
                    <input type="text"
                        value={newBlog.author}
                        name="author"
                        onChange={handleAuthorChange}
                        id='author'
                        className='author'
                    />
                </div>
                <div>
                    url:
                    <input type="text"
                        value={newBlog.url}
                        name="url"
                        onChange={handleUrlChange}
                        className='url'
                        id ="url"
                    />
                </div>
                <button type="submit" id='create-button'>create</button>
            </form>
        </div>
    )
}

export default BlogForm