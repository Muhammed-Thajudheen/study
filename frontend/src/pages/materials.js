// frontend/pages/materials.js
import { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'

export default function Materials() {
  const [materials, setMaterials] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/materials/')
        setMaterials(res.data)
        setLoading(false)
      } catch (err) {
        console.error(err)
      }
    }
    fetchMaterials()
  }, [])

  const filteredMaterials = materials.filter(material =>
    material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    material.course.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Study Materials</h1>
      
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search materials..."
          className="w-full p-2 border rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMaterials.map(material => (
            <div key={material.id} className="border rounded-lg p-4 shadow hover:shadow-md transition-shadow">
              <h2 className="text-xl font-semibold mb-2">{material.title}</h2>
              <p className="text-gray-600 mb-2">{material.course.name}</p>
              <p className="text-sm text-gray-500 mb-4">{material.material_type}</p>
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