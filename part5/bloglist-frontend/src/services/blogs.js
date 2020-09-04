import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null 

const setToken = (newToken) => {
  token =  `bearer ${newToken}`
}

const getAll = () => {
  const data =  axios.get(baseUrl).then(
    response =>response.data)
  return data
}


const create = (newObject) => {
  const config = {
    headers : {'authorization' : token},
  }
  const data = axios.post(baseUrl, newObject, config).then(
    response =>  response.data
  )  
  return data
}

export default { getAll, setToken, create }