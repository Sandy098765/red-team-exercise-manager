import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import ExerciseList from './pages/ExerciseList'
import ExerciseForm from './pages/ExerciseForm'
import ExerciseDetail from './pages/ExerciseDetail'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import FileUpload from './pages/FileUpload'
import { useAuth } from './context/AuthContext'
import { useNavigate } from 'react-router-dom'

function Navbar() {
  const { token, logout } = useAuth()
  const navigate = useNavigate()
  return (
    <nav className="bg-blue-800 text-white p-4 flex justify-between items-center">
      <h1
        className="text-xl font-bold cursor-pointer"
        onClick={() => navigate('/')}
      >
        Red Team Exercise Manager
      </h1>
      {token && (
        <div className="flex gap-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-600"
          >
            Dashboard
          </button>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-600"
          >
            Exercises
          </button>
          <button
            onClick={() => navigate('/upload')}
            className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-600"
          >
            Upload
          </button>
          <button
            onClick={logout}
            className="px-4 py-2 bg-white text-blue-800 rounded hover:bg-gray-100 font-medium"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  )
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={
              <ProtectedRoute>
                <ExerciseList />
              </ProtectedRoute>
            } />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/create" element={
              <ProtectedRoute>
                <ExerciseForm />
              </ProtectedRoute>
            } />
            <Route path="/edit/:id" element={
              <ProtectedRoute>
                <ExerciseForm />
              </ProtectedRoute>
            } />
            <Route path="/detail/:id" element={
              <ProtectedRoute>
                <ExerciseDetail />
              </ProtectedRoute>
            } />
            <Route path="/upload" element={
              <ProtectedRoute>
                <FileUpload />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App