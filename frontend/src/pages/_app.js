import { AuthProvider } from '../context/AuthContext'
import '../styles/globals.css'
import Navbar from '../components/Navbar'

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Component {...pageProps} />
        </main>
        <footer className="bg-gray-800 text-white p-4 text-center">
          © {new Date().getFullYear()} StudyPlatform
        </footer>
      </div>
    </AuthProvider>
  )
}

export default MyApp