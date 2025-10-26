/**
 * i18n Configuration
 *
 * Sets up internationalization (i18n) for the Food Advisor app
 * using i18next and react-i18next libraries.
 *
 * Hebrew only - RTL
 *
 * All translations are loaded from JSON files in assets/translations/
 */

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import Hebrew translation
import heTranslations from '../assets/translations/he.json';

// ========================================
// I18N CONFIGURATION
// ========================================

i18n
  // Connect i18next with React
  .use(initReactI18next)

  // Initialize i18next with configuration
  .init({
    // ========================================
    // RESOURCES (Translation Files)
    // ========================================
    resources: {
      he: {
        translation: heTranslations
      }
    },

    // ========================================
    // LANGUAGE SETTINGS
    // ========================================

    // Default language (Hebrew only)
    lng: 'he',

    // Fallback language
    fallbackLng: 'he',

    // Debug mode - set to true during development to see missing keys
    debug: false,

    // ========================================
    // INTERPOLATION
    // ========================================

    interpolation: {
      // React already protects from XSS attacks
      // No need to escape values
      escapeValue: false,

      // Format dates, numbers, etc. based on locale
      format: (value, format, lng) => {
        // Custom formatters can be added here
        // Example: {date, date} or {price, currency}

        if (format === 'uppercase') return value.toUpperCase();
        if (format === 'lowercase') return value.toLowerCase();

        return value;
      }
    },

    // ========================================
    // REACT SPECIFIC OPTIONS
    // ========================================

    react: {
      // Use Suspense for async loading (if needed in future)
      useSuspense: false
    },

    // ========================================
    // MISSING KEY HANDLING
    // ========================================

    // What to show when a translation key is missing
    saveMissing: false,

    // Show missing key in square brackets during development
    // Example: [missing.translation.key]
    parseMissingKeyHandler: (key) => {
      if (process.env.NODE_ENV === 'development') {
        console.warn(`Missing translation key: ${key}`);
        return `[${key}]`;
      }
      return key;
    }
  });

// ========================================
// HELPER FUNCTIONS
// ========================================

/**
 * Get the text direction (always RTL for Hebrew)
 *
 * @returns {string} 'rtl'
 */
export const getDirection = () => {
  return 'rtl';
};

// Export configured i18n instance
export default i18n;
