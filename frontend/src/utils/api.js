import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8000/api/',
})

export const fetchMaterials = async (search = '') => {
  const params = search ? { search } : {}
  const response = await api.get('materials/', { params })
  return response.data
}

export const fetchMaterialById = async (id) => {
  const response = await api.get(`materials/${id}/`)
  return response.data
}

export const uploadMaterial = async (materialData) => {
  const formData = new FormData()
  formData.append('title', materialData.title)
  formData.append('description', materialData.description)
  formData.append('material_type', materialData.material_type)
  formData.append('course', materialData.course)
  formData.append('file', materialData.file)
  
  const response = await api.post('materials/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}