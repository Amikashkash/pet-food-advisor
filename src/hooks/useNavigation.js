/**
 * useNavigation Hook
 *
 * Custom hook to manage questionnaire navigation
 * Provides current page data, navigation functions, and utilities
 */

import { useMemo } from 'react';
import { useAppContext } from '../context/AppContext';
import { getNavigationData, findPage, isResultPage } from '../utils/navigationEngine';

/**
 * useNavigation Hook
 *
 * @returns {Object} Navigation state and functions
 */
const useNavigation = () => {
  // Get context values
  const {
    selectedBrand,
    currentPage,
    navigationHistory,
    navigateToPage,
    goBack,
    canGoBack
  } = useAppContext();

  // Get navigation data for selected brand
  // useMemo ensures we only recalculate when brand changes
  const navigationData = useMemo(() => {
    if (!selectedBrand) return [];
    return getNavigationData(selectedBrand);
  }, [selectedBrand]);

  // Get current page data
  // useMemo ensures we only recalculate when page or data changes
  const currentPageData = useMemo(() => {
    if (!navigationData || navigationData.length === 0) return null;
    return findPage(navigationData, currentPage);
  }, [navigationData, currentPage]);

  // Check if current page is a result page
  const isResult = useMemo(() => {
    return isResultPage(currentPageData);
  }, [currentPageData]);

  // Calculate total pages for progress
  const totalPages = useMemo(() => {
    return navigationData.length;
  }, [navigationData]);

  // Calculate progress percentage
  const progress = useMemo(() => {
    if (!totalPages || totalPages === 0) return 0;
    return Math.round((currentPage / totalPages) * 100);
  }, [currentPage, totalPages]);

  /**
   * Handle button click - navigate to target page
   *
   * @param {Object} button - Button object from navigation data
   */
  const handleButtonClick = (button) => {
    if (button && button.target_page) {
      navigateToPage(button.target_page);
    }
  };

  // Return navigation state and functions
  return {
    // Current page data
    currentPageData,
    currentPage,
    isResult,

    // Navigation data
    navigationData,
    totalPages,
    progress,

    // Navigation history
    navigationHistory,
    canGoBack,

    // Navigation functions
    navigateToPage,
    goBack,
    handleButtonClick,

    // Brand info
    selectedBrand
  };
};

export default useNavigation;
