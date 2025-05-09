import { useState, useEffect } from 'react'
import axios from 'axios'
import Layout from '../../components/Layout'
import MaterialCard from '../../components/MaterialCard'
import SearchBar from '../../components/SearchBar'

export default function MaterialsPage() {
  const [materials, setMaterials] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/materials/')
        setMaterials(res.data)
      } catch (err) {
        console.error('Error fetching materials:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchMaterials()
  }, [])

  const filteredMaterials = materials.filter(material =>
    material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    material.course?.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Layout title="Study Materials">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Study Materials</h1>
          <SearchBar 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search materials..."
          />
        </div>

        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredMaterials.length === 0 ? (
          <p className="text-center text-gray-500">No materials found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMaterials.map(material => (
              <MaterialCard key={material.id} material={material} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  )
}