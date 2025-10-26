/**
 * App Component - Main Application Container
 *
 * This is the root component that sets up:
 * - Global state management (AppContext)
 * - Routing (React Router)
 * - Layout structure
 *
 * Routes:
 * - / : Brand selection page (landing)
 * - /question : Questionnaire flow
 * - /result : Product recommendation results
 */

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
  return (
    <AppProvider>
      <Router>
        <div className="app">
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
