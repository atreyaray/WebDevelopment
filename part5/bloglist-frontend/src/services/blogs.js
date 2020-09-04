import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null 

const setToken = (newToken) => {
  token =  `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = (newObject) => {
  const config = {
    headers : {'authorization' : token},
  }
  const response = axios.post(baseUrl, newObject, config)
  return response.data
}

export default { getAll, setToken, create }