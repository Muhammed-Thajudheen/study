import axios from 'axios'
import { useAuth } from '../context/AuthContext'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

export default function useApi() {
  const { token } = useAuth()

  const api = axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    }
  })

  const get = async (url, params = {}) => {
    try {
      const response = await api.get(url, { params })
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  }

  const post = async (url, data) => {
    try {
      const response = await api.post(url, data)
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  }

  const put = async (url, data) => {
    try {
      const response = await api.put(url, data)
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  }

  const del = async (url) => {
    try {
      const response = await api.delete(url)
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  }

  return { get, post, put, del }
}