import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null 

const setToken = (newToken) => {
  token =  `bearer ${newToken}`
}

const getAll = () => {
  return axios.get(baseUrl).then(
    response =>response.data)

}


const create = (newObject) => {
  const config = {
    headers : {'authorization' : token},
  }
  return axios.post(baseUrl, newObject, config).then(
    response =>  response.data
  )  
}

const addLike = (blog, id) => {
  const data = axios.put(`${baseUrl}/${id}`,blog)
    .then(response => response.data)
return data

}

const remove = (id) => {
  const config = {
    headers: { 'authorization': token },
  }
  return axios.delete(`${baseUrl}/${id}`,config)
                    .then(response => response.data)

}

export default { getAll, setToken, create, addLike, remove }