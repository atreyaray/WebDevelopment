import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'



const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newBlog, setNewBlog] = useState({
    title : "",
    author : "",
    url : ""
  })

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  },[])

  const loginForm = () => {
    return (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
              <input type="text"
              value={username}
              name="username"
              onChange={({ target }) => setUsername(target.value)} />
          </div>
          <div>
            password
              <input type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)} />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  const blogForm = () => {
    return(
      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('error', exception)
    }
    console.log('Logging in',)
  }

  const handleClick = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
    blogService.setToken(null)
  }

  const handleCreateClick = async () => {
   blogService.create(newBlog).then(
      _ => {
        console.log('New blog posted!!!',)
        const emptyBlog = {
          title: "",
          author: "",
          url: ""
        }
        setNewBlog(emptyBlog)
      }).catch(error => console.log('error while posting new blog'))
  }

  console.log('title locally stored ', newBlog)
  return (
    <>
      {user === null ?
        loginForm() :
        <div>
          <h2>blogs</h2>
          <p>
            {user.name} logged-in
            <button onClick={handleClick}>logout</button>
          </p>
          <div>
            <h2>create new</h2>
            <form>
              <div>
                title:  
                <input type="text"
                  value={newBlog.title}
                  name="title"
                  onChange={({target}) => setNewBlog({...newBlog, title:target.value})}
                />
              </div>
              <div>
                author:  
                <input type="text"
                  value={newBlog.author}
                  name="author"
                  onChange={({ target }) => setNewBlog({ ...newBlog, author: target.value })}
                />
              </div>
              <div>
                url:
                <input type="text"
                  value={newBlog.url}
                  name="url"
                  onChange={({ target }) => setNewBlog({ ...newBlog, url: target.value })}
                />
              </div>
              <button onClick={handleCreateClick}>create</button>
            </form>
          </div>
          {blogForm()}
        </div>
      }
   </>
  )
}

export default App