import { useState } from 'react'

export default function DebugPage() {
  const [debugInfo, setDebugInfo] = useState(null)
  const [loading, setLoading] = useState(false)
  const [testMessage, setTestMessage] = useState('')

  const checkDebugInfo = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/debug')
      const data = await response.json()
      setDebugInfo(data)
      setTestMessage('✅ Debug info fetched successfully!')
    } catch (error) {
      setTestMessage(`❌ Error: ${error.message}`)
    }
    setLoading(false)
  }

  const testContactAPI = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullname: 'Test User',
          email: 'test@example.com',
          message: 'This is a test message from debug page'
        })
      })
      const data = await response.json()
      setTestMessage(`API Response (${response.status}): ${JSON.stringify(data, null, 2)}`)
    } catch (error) {
      setTestMessage(`❌ Error: ${error.message}`)
    }
    setLoading(false)
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace', background: '#1a1a1a', color: '#00ff00', minHeight: '100vh' }}>
      <h1>🔧 Debug Console</h1>

      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={checkDebugInfo} 
          disabled={loading}
          style={{ 
            padding: '10px 20px', 
            marginRight: '10px',
            background: '#333',
            color: '#00ff00',
            border: '1px solid #00ff00',
            cursor: 'pointer'
          }}
        >
          Check Debug Info
        </button>
        <button 
          onClick={testContactAPI} 
          disabled={loading}
          style={{ 
            padding: '10px 20px',
            background: '#333',
            color: '#00ff00',
            border: '1px solid #00ff00',
            cursor: 'pointer'
          }}
        >
          Test Contact API
        </button>
      </div>

      {testMessage && (
        <div style={{ background: '#0a0a0a', padding: '10px', marginBottom: '20px', borderLeft: '3px solid #00ff00' }}>
          <pre>{testMessage}</pre>
        </div>
      )}

      {debugInfo && (
        <div style={{ background: '#0a0a0a', padding: '10px', marginTop: '20px' }}>
          <h2>📊 Environment Info:</h2>
          <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
        </div>
      )}

      <hr style={{ borderColor: '#00ff00', marginTop: '40px' }} />
      <p style={{ fontSize: '12px', color: '#888' }}>
        This debug page helps identify issues with the API and environment configuration.
      </p>
    </div>
  )
}
