import axios from 'axios'

const apiClient = axios.create({
  baseURL: "https://dummyjson.com",
  timeout: parseInt(5000),
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.response.use(
  response => response.data,
  error => Promise.reject(error)
)

export default apiClient
