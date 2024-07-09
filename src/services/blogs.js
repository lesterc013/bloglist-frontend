import axios from 'axios'
const baseUrl = '/api/blogs'

const createConfig = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async (blog, token) => {
  const response = await axios.post(baseUrl, blog, createConfig(token))
  return response.data
}

const update = async (blog, token) => {
  const response = await axios.put(
    `${baseUrl}/${blog.id}`,
    blog,
    createConfig(token)
  )
  return response.data
}

const remove = async (blog, token) => {
  const response = await axios.delete(
    `${baseUrl}/${blog.id}`,
    createConfig(token)
  )
  return response.data
}

export default { getAll, create, update, remove }
