import Link from 'next/link'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <a className="text-xl font-bold">StudyPlatform</a>
        </Link>
        
        <div className="flex space-x-4">
          <Link href="/materials">
            <a className="hover:underline">Materials</a>
          </Link>
          
          {user ? (
            <>
              <Link href="/dashboard">
                <a className="hover:underline">Dashboard</a>
              </Link>
              <button 
                onClick={logout}
                className="hover:underline"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login">
                <a className="hover:underline">Login</a>
              </Link>
              <Link href="/auth/register">
                <a className="hover:underline">Register</a>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}