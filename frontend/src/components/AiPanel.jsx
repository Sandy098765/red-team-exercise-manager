import { useState } from 'react'
import API from '../services/api'

export default function AiPanel({ exerciseId, exerciseTitle }) {
  const [aiDescription, setAiDescription] = useState('')
  const [aiRecommendation, setAiRecommendation] = useState('')
  const [aiReport, setAiReport] = useState('')
  const [loadingDesc, setLoadingDesc] = useState(false)
  const [loadingRec, setLoadingRec] = useState(false)
  const [loadingReport, setLoadingReport] = useState(false)

  const getDescription = async () => {
    try {
      setLoadingDesc(true)
      setAiDescription('')
      const response = await API.post('/ai/describe', {
        exerciseId,
        title: exerciseTitle
      })
      setAiDescription(response.data.description || response.data)
    } catch (err) {
      setAiDescription('AI service not connected yet. This will work on Demo Day!')
    } finally {
      setLoadingDesc(false)
    }
  }

  const getRecommendation = async () => {
    try {
      setLoadingRec(true)
      setAiRecommendation('')
      const response = await API.post('/ai/recommend', {
        exerciseId,
        title: exerciseTitle
      })
      setAiRecommendation(response.data.recommendation || response.data)
    } catch (err) {
      setAiRecommendation('AI service not connected yet. This will work on Demo Day!')
    } finally {
      setLoadingRec(false)
    }
  }

  const generateReport = async () => {
    try {
      setLoadingReport(true)
      setAiReport('')
      const response = await API.post('/ai/generate-report', {
        exerciseId,
        title: exerciseTitle
      })
      setAiReport(response.data.report || response.data)
    } catch (err) {
      setAiReport('AI service not connected yet. This will work on Demo Day!')
    } finally {
      setLoadingReport(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 mt-6">
      <h3 className="text-lg font-bold text-blue-800 mb-4">
        🤖 AI Assistant
      </h3>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <button
          onClick={getDescription}
          disabled={loadingDesc}
          className="py-2 px-4 bg-blue-800 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loadingDesc ? (
            <span className="flex items-center justify-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Loading...
            </span>
          ) : '🔍 Describe'}
        </button>

        <button
          onClick={getRecommendation}
          disabled={loadingRec}
          className="py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
        >
          {loadingRec ? (
            <span className="flex items-center justify-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Loading...
            </span>
          ) : '💡 Recommend'}
        </button>

        <button
          onClick={generateReport}
          disabled={loadingReport}
          className="py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
        >
          {loadingReport ? (
            <span className="flex items-center justify-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Loading...
            </span>
          ) : '📄 Generate Report'}
        </button>
      </div>

      {aiDescription && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <p className="text-sm font-bold text-blue-800 mb-2">🔍 AI Description</p>
          <p className="text-gray-700 text-sm">{aiDescription}</p>
        </div>
      )}

      {aiRecommendation && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
          <p className="text-sm font-bold text-green-800 mb-2">💡 AI Recommendation</p>
          <p className="text-gray-700 text-sm">{aiRecommendation}</p>
        </div>
      )}

      {aiReport && (
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
          <p className="text-sm font-bold text-purple-800 mb-2">📄 AI Report</p>
          <p className="text-gray-700 text-sm">{aiReport}</p>
        </div>
      )}
    </div>
  )
}