/**
 * AppContext - Global State Management
 *
 * This context manages the application's global state using React Context API.
 * It provides state and functions to all components without prop drilling.
 *
 * State managed:
 * - selectedBrand: Current brand (nutram, britcare, carnilove)
 * - currentLanguage: Current UI language (he, en, ru, ar)
 * - navigationHistory: Array of visited pages for back button
 * - currentPage: Current page number in the questionnaire
 */

import { createContext, useContext, useState, useEffect } from 'react';

// Create the context with default undefined value
// This helps catch errors if context is used outside provider
const AppContext = createContext(undefined);

/**
 * AppProvider Component
 * Wraps the entire app to provide global state
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 */
export const AppProvider = ({ children }) => {
  // ========================================
  // STATE DECLARATIONS
  // ========================================

  /**
   * Selected brand state
   * null = no brand selected (show brand selector)
   * 'nutram' | 'britcare' | 'carnilove'
   */
  const [selectedBrand, setSelectedBrand] = useState(null);

  // Language is fixed to Hebrew - no need for state

  /**
   * Navigation history for back button functionality
   * Array of page numbers the user has visited
   * Example: [1, 2, 5, 12]
   */
  const [navigationHistory, setNavigationHistory] = useState([]);

  /**
   * Current page number in the questionnaire flow
   * Starts at 1 (first question page)
   */
  const [currentPage, setCurrentPage] = useState(1);

  /**
   * Loading state for async operations
   */
  const [isLoading, setIsLoading] = useState(false);

  // ========================================
  // SIDE EFFECTS
  // ========================================

  /**
   * Set HTML to Hebrew RTL on mount
   */
  useEffect(() => {
    const htmlElement = document.documentElement;
    htmlElement.lang = 'he';
    htmlElement.dir = 'rtl';
  }, []);

  // ========================================
  // NAVIGATION FUNCTIONS
  // ========================================

  /**
   * Navigate to a specific page in the questionnaire
   * Adds current page to history before navigating
   *
   * @param {number} pageNumber - Target page number to navigate to
   */
  const navigateToPage = (pageNumber) => {
    console.log('🔄 NAVIGATE: From page', currentPage, '→ To page', pageNumber);

    // Add current page to history (for back button)
    setNavigationHistory(prev => [...prev, currentPage]);

    // Navigate to new page
    setCurrentPage(pageNumber);

    // Scroll to top when navigating to new page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /**
   * Go back to the previous page
   * Removes last page from history and navigates to it
   */
  const goBack = () => {
    if (navigationHistory.length > 0) {
      // Get the last page from history
      const previousPage = navigationHistory[navigationHistory.length - 1];

      // Remove it from history
      setNavigationHistory(prev => prev.slice(0, -1));

      // Navigate to it
      setCurrentPage(previousPage);

      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  /**
   * Check if back button should be enabled
   * @returns {boolean} True if there's history to go back to
   */
  const canGoBack = () => {
    return navigationHistory.length > 0;
  };

  // ========================================
  // RESET FUNCTIONS
  // ========================================

  /**
   * Reset the entire flow - return to brand selection
   * Clears all navigation state
   */
  const resetFlow = () => {
    setSelectedBrand(null);
    setCurrentPage(1);
    setNavigationHistory([]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /**
   * Reset only the navigation (keep the brand selected)
   * Useful for "Try Again" on result page
   */
  const resetNavigation = () => {
    setCurrentPage(1);
    setNavigationHistory([]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ========================================
  // BRAND SELECTION
  // ========================================

  /**
   * Select a brand and start the questionnaire
   *
   * @param {string} brand - Brand name ('nutram', 'britcare', 'carnilove')
   */
  const selectBrand = (brand) => {
    setSelectedBrand(brand);
    setCurrentPage(1); // Start at first question
    setNavigationHistory([]); // Clear any previous history
  };

  // ========================================
  // LANGUAGE FUNCTIONS
  // ========================================

  // ========================================
  // CONTEXT VALUE
  // ========================================

  /**
   * All state and functions exposed to consuming components
   */
  const value = {
    // State
    selectedBrand,
    currentPage,
    navigationHistory,
    isLoading,

    // Navigation functions
    navigateToPage,
    goBack,
    canGoBack,
    resetFlow,
    resetNavigation,

    // Brand selection
    selectBrand,
    setSelectedBrand,

    // Loading state
    setIsLoading,
  };

  // ========================================
  // RENDER
  // ========================================

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// ========================================
// CUSTOM HOOK
// ========================================

/**
 * Custom hook to use the AppContext
 *
 * Usage:
 * const { currentPage, navigateToPage, selectedBrand } = useAppContext();
 *
 * @returns {Object} Context value with state and functions
 * @throws {Error} If used outside of AppProvider
 */
export const useAppContext = () => {
  const context = useContext(AppContext);

  // Throw error if hook is used outside provider
  // This helps catch bugs early in development
  if (context === undefined) {
    throw new Error('useAppContext must be used within AppProvider');
  }

  return context;
};

// Export AppContext for advanced use cases (testing, etc.)
export default AppContext;
