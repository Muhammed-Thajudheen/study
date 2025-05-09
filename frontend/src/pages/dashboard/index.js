import { useState, useEffect } from 'react'
import { useAuth } from '../../../context/AuthContext'
import axios from 'axios'
import Link from 'next/link'

export default function Dashboard() {
  const { user } = useAuth()
  const [materials, setMaterials] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      const fetchUserMaterials = async () => {
        try {
          const res = await axios.get(`http://localhost:8000/api/materials/?uploaded_by=${user.id}`)
          setMaterials(res.data)
        } catch (err) {
          console.error(err)
        } finally {
          setLoading(false)
        }
      }
      fetchUserMaterials()
    }
  }, [user])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Your Dashboard</h1>
        <Link href="/upload">
          <a className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Upload New Material
          </a>
        </Link>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Your Uploads</h2>
      
      {loading ? (
        <p>Loading your materials...</p>
      ) : materials.length === 0 ? (
        <p>You haven't uploaded any materials yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {materials.map(material => (
            <div key={material.id} className="border rounded-lg p-4 shadow hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-2">{material.title}</h3>
              <p className="text-gray-600 mb-2">{material.course_name}</p>
              <p className="text-sm text-gray-500 mb-4">
                Downloads: {material.download_count} | {new Date(material.upload_date).toLocaleDateString()}
              </p>
              <Link href={`/materials/${material.id}`}>
                <a className="text-blue-600 hover:underline">View Details</a>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}