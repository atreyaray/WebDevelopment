import React,{useState} from 'react'
const Blog = ({ blog, addLike, removeBlog }) => {
  const [blogVisible, setBlogVisible] = useState(false) 
  const [showOrHide, setShowOrHide] = useState("show")
  
  const showWhenVisible = { display: blogVisible ? '' : 'none' } 
  

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const handleButtonClick =  () => {
    setBlogVisible(!blogVisible)
    blogVisible ? setShowOrHide("show") : setShowOrHide("hide")
  }
  return(
  <div style={blogStyle}>
      <div>{blog.title}<button onClick={handleButtonClick}>{showOrHide}</button></div>
      <div style={showWhenVisible}>
        <div>{blog.url}</div>
        <div>{blog.likes}<button onClick={() => addLike(blog)}>likes</button></div>
        <div>{blog.author}</div>
        <button onClick={() => removeBlog(blog)}>remove</button>
      </div>
  </div>
)}

export default Blog
