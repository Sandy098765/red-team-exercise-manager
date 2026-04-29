import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../services/api'

export default function ExerciseList() {
  const navigate = useNavigate()
  const [exercises, setExercises] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchExercises()
  }, [])

  const fetchExercises = async () => {
    try {
      setLoading(true)
      const response = await API.get('/exercises')
      setExercises(response.data)
    } catch (err) {
      setError('Failed to load exercises')
    } finally {
      setLoading(false)
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800"></div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="text-center p-8 text-red-500">
        <p>{error}</p>
        <button
          onClick={fetchExercises}
          className="mt-4 px-4 py-2 bg-blue-800 text-white rounded hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    )
  }

  // Empty state
  if (exercises.length === 0) {
    return (
      <div className="text-center p-8 text-gray-500">
        <p className="text-xl">No exercises found</p>
        <p className="mt-2">Create your first red team exercise!</p>
      </div>
    )
  }

  // Data table
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-blue-800">
          Red Team Exercises
        </h2>
        <button 
          onClick={() => navigate('/create')}
          className="px-4 py-2 bg-blue-800 text-white rounded hover:bg-blue-700">
          + New Exercise
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead className="bg-blue-800 text-white">
            <tr>
              <th className="px-6 py-3 text-left">Title</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Severity</th>
              <th className="px-6 py-3 text-left">Assigned To</th>
              <th className="px-6 py-3 text-left">Created At</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {exercises.map((exercise, index) => (
              <tr
                key={exercise.id}
                className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
              >
                <td className="px-6 py-4 font-medium">{exercise.title}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold
                    ${exercise.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                      exercise.status === 'IN_PROGRESS' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'}`}>
                    {exercise.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold
                    ${exercise.severity === 'HIGH' ? 'bg-red-100 text-red-800' :
                      exercise.severity === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'}`}>
                    {exercise.severity}
                  </span>
                </td>
                <td className="px-6 py-4">{exercise.assignedTo || '-'}</td>
                <td className="px-6 py-4">
                  {new Date(exercise.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <button 
                    onClick={() => navigate(`/edit/${exercise.id}`)}
                    className="text-blue-600 hover:text-blue-800 mr-3">
                    Edit
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}