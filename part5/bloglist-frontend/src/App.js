import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/Blogform'
import Togglable from './components/Togglable'



const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
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

  const blogFormRef = useRef()
  const ref2 = useRef()

  const footerStyle = {
    color:  errorMessage.color,
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
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
//change set Visibility
  const create = (blogObject) => {
    blogFormRef.current.toggleVisibility() 
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
      })
  }
  const handleUsernameChange = ({ target }) => setUsername(target.value)
  const handlePasswordChange = ({ target }) => setPassword(target.value)

  console.log('error message', errorMessage.message)
  return (
    <>
      {user === null ?
        <div>
          {errorMessage.visible && <div style={footerStyle}> {errorMessage.message}</div>}
        <Togglable buttonLabel='login' ref={ref2}>
          <LoginForm  
            handleLogin={handleLogin}
            handleUsernameChange={handleUsernameChange}
            handlePasswordChange={handlePasswordChange}
            username={username}
            password={password}
          />
        </Togglable>
        </div>:
        <div>
          <h2>blogs</h2>
          {errorMessage.visible && <div style={footerStyle}> {errorMessage.message}</div>}
          <p>
            {user.name} logged-in
            <button onClick={handleClick}>logout</button>
          </p>
          <Togglable buttonLabel='new note' ref={blogFormRef}>
            <BlogForm
              create={create}
            />
          </Togglable>
          {blogForm()}
        </div>
      }
   </>
  )
}

export default App


  // const handleBlogCreation = (event) => {
  //   event.preventDefault()
  //   console.log('posted',)
  //   blogService.create(newBlog).then(
      // _ => {
      //   console.log('New blog posted!!!',)
      //   setErrorMessage({
      //     message :  `a new blog ${newBlog.title} by ${newBlog.author} added`,
      //     color : "green",
      //     visible : true
      //   })

        // setTimeout(() => setErrorMessage({
        //   message : "",
        //   color : "green",
        //   visible : false
        // }), 5000)
        // const emptyBlog = {
        //   title: "",
        //   author: "",
        //   url: ""
        // }
        // setNewBlog(emptyBlog)
      // }).catch(error => console.log('error while posting new blog'))
  // }