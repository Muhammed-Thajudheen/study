import axios from 'axios'

const API_URL = 'http://localhost:8000/api/auth/'

// Set auth token in axios headers
export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    localStorage.setItem('token', token)
  } else {
    delete axios.defaults.headers.common['Authorization']
    localStorage.removeItem('token')
  }
}

// Login user
export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}login/`, { email, password })
  
  if (response.data.token) {
    setAuthToken(response.data.token)
  }
  
  return response.data
}

// Register user
export const register = async (userData) => {
  const response = await axios.post(`${API_URL}register/`, userData)
  
  if (response.data.token) {
    setAuthToken(response.data.token)
  }
  
  return response.data
}

// Logout user
export const logout = () => {
  setAuthToken(null)
}

// Get current user
export const getCurrentUser = async () => {
  const token = localStorage.getItem('token')
  
  if (!token) return null
  
  try {
    setAuthToken(token)
    const response = await axios.get(`${API_URL}user/`)
    return response.data
  } catch (error) {
    logout()
    return null
  }
}

// Check if user is authenticated
export const isAuthenticated = async () => {
  const user = await getCurrentUser()
  return !!user
}