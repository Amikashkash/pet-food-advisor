/**
 * App Component - Main Application Container
 *
 * This is the root component that sets up:
 * - Global state management (AppContext)
 * - Routing (React Router)
 * - Layout structure
 * - PWA install prompt handler
 *
 * Routes:
 * - / : Brand selection page (landing)
 * - /question : Questionnaire flow
 * - /result : Product recommendation results
 */

import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider } from './context/AppContext'

// Import components
import BrandSelector from './components/BrandSelector/BrandSelector'
import QuestionPage from './components/QuestionPage/QuestionPage'
import ResultPage from './components/ResultPage/ResultPage'

/**
 * App Component
 *
 * Main application component that wraps everything in providers
 * and sets up routing structure.
 */
function App() {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [showInstallButton, setShowInstallButton] = useState(false)

  useEffect(() => {
    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e) => {
      // Prevent default browser install prompt
      e.preventDefault()
      // Save the event for later use
      setDeferredPrompt(e)
      // Show custom install button
      setShowInstallButton(true)
      console.log('📱 PWA install prompt available')
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      console.log('❌ No deferred prompt available')
      return
    }

    // Show the install prompt
    deferredPrompt.prompt()

    // Wait for the user's response
    const { outcome } = await deferredPrompt.userChoice
    console.log(`User response: ${outcome}`)

    // Clear the deferred prompt
    setDeferredPrompt(null)
    setShowInstallButton(false)
  }

  return (
    <AppProvider>
      <Router>
        <div className="app">
          {/* PWA Install Button */}
          {showInstallButton && (
            <button
              onClick={handleInstallClick}
              style={{
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                backgroundColor: '#8b5cf6',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                padding: '12px 24px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(139, 92, 246, 0.4)',
                zIndex: 1000,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.05)'
                e.target.style.boxShadow = '0 6px 16px rgba(139, 92, 246, 0.6)'
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)'
                e.target.style.boxShadow = '0 4px 12px rgba(139, 92, 246, 0.4)'
              }}
            >
              📱 התקן אפליקציה
            </button>
          )}

          {/* Main content area */}
          <main className="app-main">
            <Routes>
              {/* Landing page - Brand selection */}
              <Route path="/" element={<BrandSelector />} />

              {/* Questionnaire flow */}
              <Route path="/question" element={<QuestionPage />} />

              {/* Results page */}
              <Route path="/result" element={<ResultPage />} />

              {/* Catch all - redirect to home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AppProvider>
  )
}

export default App
