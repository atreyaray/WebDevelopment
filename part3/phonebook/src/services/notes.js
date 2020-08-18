import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const create = (name,number) => {
    const request = axios.post(baseUrl,{name,number})
    return request.then(response =>response.data)
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const getOne = (id) => {
    const request = axios.get(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const remove = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request
}

const update = (id,object) => {
    const request = axios.put(`${baseUrl}/${id}`, object)
    return request.then(request => request.data)
}

export default {create, getAll,remove,update, getOne}