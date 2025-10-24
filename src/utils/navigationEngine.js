/**
 * Navigation Engine
 *
 * Utility functions to manage questionnaire navigation flow
 * Reads from navigation JSON files and provides helper functions
 */

// Import navigation data for all brands
import nutramNavigation from '../../assets/nutram_navigation.json';
import britcareNavigation from '../../assets/britcare_navigation.json';
import carniloveNavigation from '../../assets/carnilove_navigation.json';

// Import product data for all brands
import nutramProducts from '../../assets/nutram_products.json';
import britcareProducts from '../../assets/britcare_products.json';
import carniloveProducts from '../../assets/carnilove_products.json';

/**
 * Get navigation data for a specific brand
 *
 * @param {string} brand - Brand name ('nutram', 'britcare', 'carnilove')
 * @returns {Array} Navigation flow array
 */
export const getNavigationData = (brand) => {
  const navigationMap = {
    nutram: nutramNavigation,
    britcare: britcareNavigation,
    carnilove: carniloveNavigation
  };

  return navigationMap[brand] || nutramNavigation;
};

/**
 * Get product database for a specific brand
 *
 * @param {string} brand - Brand name ('nutram', 'britcare', 'carnilove')
 * @returns {Object} Product database object
 */
export const getProductData = (brand) => {
  const productMap = {
    nutram: nutramProducts,
    britcare: britcareProducts,
    carnilove: carniloveProducts
  };

  return productMap[brand] || nutramProducts;
};

/**
 * Find a specific page in the navigation flow
 *
 * @param {Array} navigationData - Navigation flow array
 * @param {number} pageNumber - Page number to find
 * @returns {Object|null} Page object or null if not found
 */
export const findPage = (navigationData, pageNumber) => {
  return navigationData.find(page => page.page_number === pageNumber) || null;
};

/**
 * Check if a page is a result page
 * Result pages have question === "תוצאה" or "questions.result"
 *
 * @param {Object} page - Page object
 * @returns {boolean} True if this is a result page
 */
export const isResultPage = (page) => {
  if (!page) return false;

  const question = page.question?.toLowerCase() || '';
  return question === 'תוצאה' ||
         question === 'questions.result' ||
         question.includes('result') ||
         question.includes('תוצאה');
};

/**
 * Get product codes from a result page
 * Extracts all product codes from button texts
 *
 * @param {Object} page - Result page object
 * @returns {Array<string>} Array of product codes
 */
export const getProductCodes = (page) => {
  if (!page || !page.buttons) return [];

  return page.buttons.map(button => button.text);
};

/**
 * Get product details by code
 *
 * @param {string} brand - Brand name
 * @param {string} productCode - Product code (e.g., 'T29', 'S2')
 * @returns {Object|null} Product object or null if not found
 */
export const getProduct = (brand, productCode) => {
  const productData = getProductData(brand);
  return productData.products?.[productCode] || null;
};

/**
 * Get multiple products by codes
 *
 * @param {string} brand - Brand name
 * @param {Array<string>} productCodes - Array of product codes
 * @returns {Array<Object>} Array of product objects
 */
export const getProducts = (brand, productCodes) => {
  return productCodes
    .map(code => getProduct(brand, code))
    .filter(product => product !== null);
};

/**
 * Validate navigation flow
 * Checks if all target_page references exist
 *
 * @param {Array} navigationData - Navigation flow array
 * @returns {Object} Validation result { valid: boolean, errors: Array }
 */
export const validateNavigation = (navigationData) => {
  const errors = [];
  const pageNumbers = new Set(navigationData.map(p => p.page_number));

  navigationData.forEach(page => {
    page.buttons?.forEach(button => {
      if (!pageNumbers.has(button.target_page)) {
        errors.push({
          page: page.page_number,
          button: button.text,
          missingTarget: button.target_page
        });
      }
    });
  });

  return {
    valid: errors.length === 0,
    errors
  };
};

/**
 * Calculate progress through questionnaire
 * Simple heuristic based on page number
 *
 * @param {number} currentPage - Current page number
 * @param {number} totalPages - Total number of pages
 * @returns {number} Progress percentage (0-100)
 */
export const calculateProgress = (currentPage, totalPages) => {
  if (!totalPages || totalPages === 0) return 0;
  return Math.round((currentPage / totalPages) * 100);
};

/**
 * Get all available brands
 *
 * @returns {Array<Object>} Array of brand objects
 */
export const getAvailableBrands = () => {
  return [
    { id: 'nutram', name: 'Nutram', available: true },
    { id: 'britcare', name: 'Brit Care', available: false },
    { id: 'carnilove', name: 'Carnilove', available: false }
  ];
};

export default {
  getNavigationData,
  getProductData,
  findPage,
  isResultPage,
  getProductCodes,
  getProduct,
  getProducts,
  validateNavigation,
  calculateProgress,
  getAvailableBrands
};
