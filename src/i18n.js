/**
 * i18n Configuration
 *
 * Sets up internationalization (i18n) for the Food Advisor app
 * using i18next and react-i18next libraries.
 *
 * Supports 4 languages:
 * - Hebrew (he) - Primary, RTL
 * - English (en) - LTR
 * - Russian (ru) - LTR
 * - Arabic (ar) - RTL
 *
 * All translations are loaded from JSON files in assets/translations/
 */

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation JSON files
// These contain all UI text, questions, product descriptions, etc.
import heTranslations from '../assets/translations/he.json';
import enTranslations from '../assets/translations/en.json';
import ruTranslations from '../assets/translations/ru.json';
import arTranslations from '../assets/translations/ar.json';

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
      },
      en: {
        translation: enTranslations
      },
      ru: {
        translation: ruTranslations
      },
      ar: {
        translation: arTranslations
      }
    },

    // ========================================
    // LANGUAGE SETTINGS
    // ========================================

    // Default language (Hebrew - primary language)
    lng: 'he',

    // Fallback language if translation is missing
    fallbackLng: 'en',

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
 * Get the text direction for a language
 *
 * @param {string} language - Language code (he, en, ru, ar)
 * @returns {string} 'rtl' or 'ltr'
 */
export const getDirection = (language) => {
  const rtlLanguages = ['he', 'ar'];
  return rtlLanguages.includes(language) ? 'rtl' : 'ltr';
};

/**
 * Get language display name
 *
 * @param {string} langCode - Language code
 * @returns {string} Language name in its own language
 */
export const getLanguageName = (langCode) => {
  const names = {
    he: 'עברית',
    en: 'English',
    ru: 'Русский',
    ar: 'العربية'
  };
  return names[langCode] || langCode;
};

/**
 * Get all available languages
 *
 * @returns {Array} Array of language objects with code and name
 */
export const getAvailableLanguages = () => {
  return [
    { code: 'he', name: 'עברית', direction: 'rtl' },
    { code: 'en', name: 'English', direction: 'ltr' },
    { code: 'ru', name: 'Русский', direction: 'ltr' },
    { code: 'ar', name: 'العربية', direction: 'rtl' }
  ];
};

// Export configured i18n instance
export default i18n;
