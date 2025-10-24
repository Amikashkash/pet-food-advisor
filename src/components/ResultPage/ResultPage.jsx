/**
 * ResultPage Component
 *
 * Displays recommended pet food products based on questionnaire answers
 * Shows product images, names, descriptions, and benefits
 */

import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppContext } from '../../context/AppContext';
import useNavigation from '../../hooks/useNavigation';
import { getProducts, getProductCodes } from '../../utils/navigationEngine';
import styles from './ResultPage.module.css';

/**
 * ResultPage Component
 */
const ResultPage = () => {
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
  const { currentPageData } = useNavigation();

  // ========================================
  // DATA
  // ========================================

  // Get product codes from current page
  const productCodes = useMemo(() => {
    if (!currentPageData) return [];
    const codes = getProductCodes(currentPageData);
    console.log('Current Page:', currentPageData.page_number, currentPageData.page_name);
    console.log('Product Codes:', codes);
    return codes;
  }, [currentPageData]);

  // Get product objects
  const products = useMemo(() => {
    if (!selectedBrand || productCodes.length === 0) return [];
    const prods = getProducts(selectedBrand, productCodes);
    console.log('Products loaded:', prods.map(p => p.code));
    return prods;
  }, [selectedBrand, productCodes]);

  // ========================================
  // EFFECTS
  // ========================================

  /**
   * Redirect to home if no brand selected or no products
   */
  useEffect(() => {
    if (!selectedBrand) {
      navigate('/');
    }
  }, [selectedBrand, navigate]);

  // ========================================
  // HANDLERS
  // ========================================

  /**
   * Handle start over button click
   */
  const onStartOver = () => {
    resetFlow();
    navigate('/');
  };

  // ========================================
  // RENDER
  // ========================================

  // Show loading if no products
  if (!products || products.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div className="spinner"></div>
          <p>{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.brandBadge}>
          {selectedBrand}
        </div>
        <h1 className={styles.title}>
          {t('resultPage.title')}
        </h1>
        <p className={styles.subtitle}>
          {t('resultPage.subtitle')}
        </p>
      </header>

      {/* Products grid */}
      <div className={styles.productsGrid}>
        {products.map((product, index) => (
          <div
            key={product.code}
            className={styles.productCard}
            style={{
              animationDelay: `${index * 0.1}s`
            }}
          >
            {/* Product image */}
            <div className={styles.imageContainer}>
              <img
                src={product.image}
                alt={t(product.nameKey)}
                className={styles.productImage}
                onError={(e) => {
                  // Fallback if image doesn't load
                  e.target.src = '/vite.svg';
                }}
              />
            </div>

            {/* Product series badge */}
            <div className={styles.seriesBadge}>
              {product.series}
            </div>

            {/* Product code */}
            <div className={styles.productCode}>
              {product.code}
            </div>

            {/* Product name */}
            <h2 className={styles.productName}>
              {t(product.nameKey)}
            </h2>

            {/* Product description */}
            <p className={styles.productDescription}>
              {t(product.descriptionKey)}
            </p>

            {/* Benefits list */}
            <div className={styles.benefitsSection}>
              <h3 className={styles.benefitsTitle}>
                {t('resultPage.benefits')}
              </h3>
              <ul className={styles.benefitsList}>
                {product.benefits.map((benefitKey, idx) => (
                  <li key={idx} className={styles.benefitItem}>
                    {/* Checkmark icon */}
                    <svg
                      className={styles.checkIcon}
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
                    <span>{t(benefitKey)}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Perfect for section */}
            <div className={styles.perfectFor}>
              <strong>{t('resultPage.perfectFor')}:</strong>{' '}
              {t(product.forWhomKey)}
            </div>
          </div>
        ))}
      </div>

      {/* Action buttons */}
      <div className={styles.actions}>
        <button
          className={`${styles.actionButton} ${styles.buttonPrimary}`}
          onClick={onStartOver}
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
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          {t('resultPage.actions.startOver')}
        </button>
      </div>

      {/* Footer note */}
      <footer className={styles.footer}>
        <p className={styles.footerText}>
          {t('resultPage.subtitle')}
        </p>
      </footer>
    </div>
  );
};

export default ResultPage;
