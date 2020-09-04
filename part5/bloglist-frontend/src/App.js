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
  const [errorMessage, setErrorMessage] = useState({
    visible : false,
    message : "",
    color : ""
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

  const footerStyle = {
    color:  errorMessage.color,
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  }

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
      console.log('tried login',)
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
      setUsername('')
      setPassword('')
      setErrorMessage({
        visible : true,
        message : "wrong username or password",
        color : "red"
      })
      setTimeout(() => setErrorMessage({
        message : "",
        color : "green",
        visible : false
      }),5000)
    }
  }

  const handleClick = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    blogService.setToken(null)
  }

  const handleBlogCreation = (event) => {
    event.preventDefault()
    console.log('posted',)
    blogService.create(newBlog).then(
      _ => {
        console.log('New blog posted!!!',)
        setErrorMessage({
          message :  `a new blog ${newBlog.title} by ${newBlog.author} added`,
          color : "green",
          visible : true
        })

        setTimeout(() => setErrorMessage({
          message : "",
          color : "green",
          visible : false
        }), 5000)
        const emptyBlog = {
          title: "",
          author: "",
          url: ""
        }
        setNewBlog(emptyBlog)
      }).catch(error => console.log('error while posting new blog'))
  }

  console.log('title locally stored ', newBlog)
  console.log('error message', errorMessage.message)
  return (
    <>
      {user === null ?
        <div>
          {errorMessage.visible && <div style={footerStyle}> {errorMessage.message}</div>}
        {loginForm()}
        </div>:
        <div>
          <h2>blogs</h2>
          {errorMessage.visible && <div style={footerStyle}> {errorMessage.message}</div>}
          <p>
            {user.name} logged-in
            <button onClick={handleClick}>logout</button>
          </p>
          <div>
            <h2>create new</h2>
            <form onSubmit={handleBlogCreation}>
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
              <button type="submit">create</button>
            </form>
          </div>
          {blogForm()}
        </div>
      }
   </>
  )
}

export default App