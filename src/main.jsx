/**
 * Main Entry Point
 *
 * This is the entry point for the React application.
 * It sets up the root of the app and renders it to the DOM.
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/theme.css'

// Initialize i18n before rendering the app
import './i18n.js'

// Get the root element from index.html
const rootElement = document.getElementById('root')

// Create React root and render the app
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
