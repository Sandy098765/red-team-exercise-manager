import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import ExerciseList from './pages/ExerciseList'
import ExerciseForm from './pages/ExerciseForm'
import Login from './pages/Login'
import { useAuth } from './context/AuthContext'

function Navbar() {
  const { token, logout } = useAuth()
  return (
    <nav className="bg-blue-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Red Team Exercise Manager</h1>
      {token && (
        <button
          onClick={logout}
          className="px-4 py-2 bg-white text-blue-800 rounded hover:bg-gray-100 font-medium"
        >
          Logout
        </button>
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
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App