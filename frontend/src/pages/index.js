import Link from 'next/link'
import { useAuth } from '../context/AuthContext'
import SearchBar from '../components/SearchBar'

export default function Home() {
  const { user } = useAuth()

  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6">Welcome to StudyPlatform</h1>
        <p className="text-xl text-gray-600 mb-8">
          Access thousands of study materials for various subjects and courses in one place.
        </p>
        
        <div className="mb-12">
          <SearchBar />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-3">Find Resources</h3>
            <p className="text-gray-600">
              Browse through our extensive collection of study materials.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-3">Upload & Share</h3>
            <p className="text-gray-600">
              Contribute your own materials to help others learn.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-3">Track Progress</h3>
            <p className="text-gray-600">
              Monitor your downloads and uploads in your personal dashboard.
            </p>
          </div>
        </div>
        
        {!user && (
          <div className="space-x-4">
            <Link href="/auth/register" className="btn-primary px-6 py-3">
              
                Get Started
              
            </Link>
            <Link
              href="/materials"
              className="border border-blue-600 text-blue-600 px-6 py-3 rounded hover:bg-blue-50">
              
                Browse Materials
              
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}