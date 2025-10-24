/**
 * LanguageSelector Component
 *
 * Allows users to switch between 4 supported languages:
 * - Hebrew (עברית) - RTL
 * - English - LTR
 * - Russian (Русский) - LTR
 * - Arabic (العربية) - RTL
 *
 * Features:
 * - Dropdown menu with language options
 * - Updates HTML lang and dir attributes
 * - Persists selection in localStorage
 * - Smooth transitions between languages
 */

import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppContext } from '../../context/AppContext';
import { getAvailableLanguages } from '../../i18n';
import styles from './LanguageSelector.module.css';

/**
 * LanguageSelector Component
 */
const LanguageSelector = () => {
  // ========================================
  // HOOKS
  // ========================================

  // Translation hook from react-i18next
  const { i18n } = useTranslation();

  // App context for language state
  const { currentLanguage, changeLanguage } = useAppContext();

  // Dropdown open/close state
  const [isOpen, setIsOpen] = useState(false);

  // Ref for dropdown element (for click outside detection)
  const dropdownRef = useRef(null);

  // ========================================
  // DATA
  // ========================================

  // Get all available languages
  const languages = getAvailableLanguages();

  // Find current language object
  const selectedLanguage = languages.find(lang => lang.code === currentLanguage);

  // ========================================
  // HANDLERS
  // ========================================

  /**
   * Toggle dropdown open/closed
   */
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  /**
   * Handle language selection
   * @param {string} langCode - Language code (he, en, ru, ar)
   */
  const handleLanguageChange = (langCode) => {
    // Change language in i18n
    i18n.changeLanguage(langCode);

    // Update app context
    changeLanguage(langCode);

    // Close dropdown
    setIsOpen(false);
  };

  /**
   * Close dropdown when clicking outside
   */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // ========================================
  // RENDER
  // ========================================

  return (
    <div className={styles.languageSelector} ref={dropdownRef}>
      {/* Current language button */}
      <button
        className={styles.languageButton}
        onClick={toggleDropdown}
        aria-label="Select Language"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {/* Language icon (globe) */}
        <svg
          className={styles.icon}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
          />
        </svg>

        {/* Current language name */}
        <span className={styles.languageName}>
          {selectedLanguage?.name}
        </span>

        {/* Dropdown arrow */}
        <svg
          className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className={styles.dropdown}>
          {languages.map((language) => (
            <button
              key={language.code}
              className={`${styles.dropdownItem} ${
                language.code === currentLanguage ? styles.dropdownItemActive : ''
              }`}
              onClick={() => handleLanguageChange(language.code)}
              dir={language.direction}
            >
              {/* Language name in its own script */}
              <span className={styles.dropdownLanguageName}>
                {language.name}
              </span>

              {/* Checkmark for selected language */}
              {language.code === currentLanguage && (
                <svg
                  className={styles.checkmark}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
