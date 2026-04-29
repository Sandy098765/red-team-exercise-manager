import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ExerciseList from './pages/ExerciseList'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-blue-800 text-white p-4">
          <h1 className="text-xl font-bold">Red Team Exercise Manager</h1>
        </nav>
        <Routes>
          <Route path="/" element={<ExerciseList />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App