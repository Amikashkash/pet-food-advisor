/**
 * QuestionPage Component
 *
 * Displays questionnaire questions and answer buttons
 * Reads from navigation JSON files
 * Handles navigation through the flow
 */

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppContext } from '../../context/AppContext';
import useNavigation from '../../hooks/useNavigation';
import styles from './QuestionPage.module.css';

/**
 * QuestionPage Component
 */
const QuestionPage = () => {
  // ========================================
  // HOOKS
  // ========================================

  // Translation hook
  const { t } = useTranslation();

  // Router navigation
  const navigate = useNavigate();

  // App context
  const { selectedBrand, resetFlow } = useAppContext();

  // Navigation hook
  const {
    currentPageData,
    currentPage,
    isResult,
    canGoBack,
    goBack,
    handleButtonClick,
    progress
  } = useNavigation();

  // Animation state
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState('forward');
  const [prevPage, setPrevPage] = useState(currentPage);

  // ========================================
  // EFFECTS
  // ========================================

  /**
   * Redirect to home if no brand selected
   */
  useEffect(() => {
    if (!selectedBrand) {
      navigate('/');
    }
  }, [selectedBrand, navigate]);

  /**
   * Navigate to result page if current page is a result
   */
  useEffect(() => {
    if (isResult) {
      navigate('/result');
    }
  }, [isResult, navigate]);

  /**
   * Trigger page transition animation when page changes
   */
  useEffect(() => {
    if (currentPage !== prevPage) {
      // Determine direction: forward if page number increased, backward if decreased
      const direction = currentPage > prevPage ? 'forward' : 'backward';
      setTransitionDirection(direction);

      // Trigger exit animation
      setIsTransitioning(true);

      // After animation completes, update page and trigger enter animation
      const timer = setTimeout(() => {
        setPrevPage(currentPage);
        setIsTransitioning(false);
      }, 300); // Match this with CSS animation duration

      return () => clearTimeout(timer);
    }
  }, [currentPage, prevPage]);

  // ========================================
  // HANDLERS
  // ========================================

  /**
   * Handle answer button click
   */
  const onButtonClick = (button) => {
    handleButtonClick(button);
  };

  /**
   * Handle back button click
   */
  const onBackClick = () => {
    goBack();
  };

  /**
   * Handle home button click
   */
  const onHomeClick = () => {
    resetFlow();
    navigate('/');
  };

  // ========================================
  // RENDER
  // ========================================

  // Show loading if no page data
  if (!currentPageData) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div className="spinner"></div>
          <p>{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  // Debug logging
  console.log('=== QuestionPage Debug ===');
  console.log('Current Page Number:', currentPageData?.page_number);
  console.log('Current Page Data:', currentPageData);
  console.log('Is Result Page:', isResult);
  console.log('Buttons:', currentPageData?.buttons);

  // Get question text (check if it's a translation key or direct text)
  const questionText = currentPageData.question?.startsWith('questions.')
    ? t(currentPageData.question)
    : currentPageData.question;

  return (
    <div className={styles.container}>
      {/* Header with navigation */}
      <div className={styles.header}>
        {/* Home button */}
        <button
          className={styles.iconButton}
          onClick={onHomeClick}
          aria-label="Go to home"
        >
          <svg
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        </button>

        {/* Back button */}
        <button
          className={`${styles.iconButton} ${!canGoBack() ? styles.iconButtonDisabled : ''}`}
          onClick={onBackClick}
          disabled={!canGoBack()}
          aria-label="Go back"
        >
          <svg
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          <span>{t('common.back')}</span>
        </button>
      </div>

      {/* Progress bar */}
      {progress > 0 && (
        <div className={styles.progressContainer}>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span className={styles.progressText}>{progress}%</span>
        </div>
      )}

      {/* Question card */}
      <div
        className={`${styles.questionCard} ${
          isTransitioning
            ? (transitionDirection === 'forward' ? styles.slideOutLeft : styles.slideOutRight)
            : (transitionDirection === 'forward' ? styles.slideInRight : styles.slideInLeft)
        }`}
      >
        {/* Brand badge */}
        <div className={styles.brandBadge}>
          {selectedBrand}
        </div>

        {/* Question text */}
        <h1 className={styles.question}>
          {questionText}
        </h1>

        {/* Answer buttons */}
        <div className={styles.buttonGrid}>
          {currentPageData.buttons && currentPageData.buttons.map((button, index) => {
            // Get button text (check if it's a translation key)
            const buttonText = button.text?.startsWith('buttons.')
              ? t(button.text)
              : button.text;

            return (
              <button
                key={index}
                className={styles.answerButton}
                onClick={() => onButtonClick(button)}
              >
                <span className={styles.answerText}>{buttonText}</span>
                <svg
                  className={styles.answerArrow}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            );
          })}
        </div>
      </div>

      {/* Debug info (remove in production) */}
      {process.env.NODE_ENV === 'development' && (
        <div className={styles.debug}>
          Page: {currentPageData.page_number} | {currentPageData.page_name}
        </div>
      )}
    </div>
  );
};

export default QuestionPage;
