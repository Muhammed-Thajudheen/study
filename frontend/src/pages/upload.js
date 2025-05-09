import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'

export default function UploadMaterial() {
  const { user } = useAuth()
  const router = useRouter()
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    material_type: 'PDF',
    course: '',
    file: null
  })
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/courses/')
        setCourses(res.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchCourses()
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      file: e.target.files[0]
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user) {
      setError('You must be logged in to upload materials')
      return
    }

    try {
      const data = new FormData()
      data.append('title', formData.title)
      data.append('description', formData.description)
      data.append('material_type', formData.material_type)
      data.append('course', formData.course)
      data.append('file', formData.file)

      await axios.post('http://localhost:8000/api/materials/', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      router.push('/dashboard')
    } catch (err) {
      console.error(err)
      setError('Failed to upload material. Please try again.')
    }
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-semibold mb-4">Please log in to upload materials</h2>
        <Link href="/auth/login">
          <a className="text-blue-600 hover:underline">Go to Login</a>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Upload Study Material</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="title">
            Title*
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            className="w-full p-2 border rounded"
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows="4"
            className="w-full p-2 border rounded"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="material_type">
              Material Type*
            </label>
            <select
              id="material_type"
              name="material_type"
              required
              className="w-full p-2 border rounded"
              value={formData.material_type}
              onChange={handleChange}
            >
              <option value="PDF">PDF</option>
              <option value="VIDEO">Video</option>
              <option value="AUDIO">Audio</option>
              <option value="DOC">Document</option>
              <option value="PPT">Presentation</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2" htmlFor="course">
              Course*
            </label>
            {loading ? (
              <p>Loading courses...</p>
            ) : (
              <select
                id="course"
                name="course"
                required
                className="w-full p-2 border rounded"
                value={formData.course}
                onChange={handleChange}
              >
                <option value="">Select a course</option>
                {courses.map(course => (
                  <option key={course.id} value={course.id}>
                    {course.name} ({course.code})
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="file">
            File Upload*
          </label>
          <input
            type="file"
            id="file"
            name="file"
            required
            className="w-full p-2 border rounded"
            onChange={handleFileChange}
          />
          <p className="text-sm text-gray-500 mt-1">
            Supported formats: PDF, DOC, PPT, MP4, MP3
          </p>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Upload Material
        </button>
      </form>
    </div>
  )
}