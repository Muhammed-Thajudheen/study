// frontend/pages/materials/[id].js
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function MaterialDetail() {
  const router = useRouter()
  const { id } = router.query
  const [material, setMaterial] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) {
      const fetchMaterial = async () => {
        try {
          const res = await axios.get(`http://localhost:8000/api/materials/${id}/`)
          setMaterial(res.data)
          setLoading(false)
        } catch (err) {
          console.error(err)
        }
      }
      fetchMaterial()
    }
  }, [id])

  const handleDownload = async () => {
    try {
      // Increment download count
      await axios.patch(`http://localhost:8000/api/materials/${id}/`, {
        download_count: material.download_count + 1
      })
      
      // Trigger download
      window.open(`http://localhost:8000${material.file}`, '_blank')
      
      // Update local state
      setMaterial({
        ...material,
        download_count: material.download_count + 1
      })
    } catch (err) {
      console.error(err)
    }
  }

  if (loading) return <p>Loading...</p>
  if (!material) return <p>Material not found</p>

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{material.title}</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600 mb-2">
          <span className="font-semibold">Course:</span> {material.course.name}
        </p>
        <p className="text-gray-600 mb-2">
          <span className="font-semibold">Type:</span> {material.material_type}
        </p>
        <p className="text-gray-600 mb-4">
          <span className="font-semibold">Uploaded:</span> {new Date(material.upload_date).toLocaleDateString()}
        </p>
        
        <p className="mb-6">{material.description}</p>
        
        <div className="flex items-center justify-between">
          <button
            onClick={handleDownload}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Download ({material.download_count} downloads)
          </button>
        </div>
      </div>
    </div>
  )
}