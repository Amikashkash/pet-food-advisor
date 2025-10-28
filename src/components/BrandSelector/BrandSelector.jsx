/**
 * BrandSelector Component
 *
 * Landing page where users choose which pet food brand they want recommendations for.
 *
 * Brands:
 * - Nutram: Active and fully functional
 * - Brit Care: Coming Soon (placeholder)
 * - Carnilove: Coming Soon (placeholder)
 *
 * Features:
 * - Card-based layout with brand information
 * - Dark theme with purple accents
 * - Responsive design (mobile, tablet, desktop)
 * - Smooth animations
 * - Disabled state for upcoming brands
 */

import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppContext } from '../../context/AppContext';
import styles from './BrandSelector.module.css';

/**
 * BrandSelector Component
 */
const BrandSelector = () => {
  // ========================================
  // HOOKS
  // ========================================

  // Translation hook for i18n
  const { t } = useTranslation();

  // Navigation hook from react-router
  const navigate = useNavigate();

  // App context for brand selection
  const { selectBrand } = useAppContext();

  // ========================================
  // HANDLERS
  // ========================================

  /**
   * Handle brand selection and navigate to questionnaire
   *
   * @param {string} brand - Brand name ('nutram', 'britcare', 'carnilove')
   */
  const handleBrandSelect = (brand) => {
    // Set selected brand in context
    selectBrand(brand);

    // Navigate to questionnaire
    navigate('/question');
  };

  // ========================================
  // BRAND DATA
  // ========================================

  const brands = [
    {
      id: 'nutram',
      name: 'Nutram',
      description: t('brandSelector.nutram'),
      available: true,
      color: '#8b5cf6', // Purple
      logo: '/assets/pic/nutram_logo.png',
      features: [
        t('brandSelector.features.total'),
        t('brandSelector.features.sound'),
        t('brandSelector.features.ideal')
      ]
    },
    {
      id: 'britcare',
      name: 'Brit Care',
      description: t('brandSelector.britcare'),
      available: true,
      color: '#ef4444', // Red
      logo: '/assets/pic/logo-brit.png',
      features: [
        'נטול דגנים',
        'היפואלרגני',
        'פתרונות ממוקדים'
      ]
    },
    {
      id: 'carnilove',
      name: 'Carnilove',
      description: t('brandSelector.carnilove'),
      available: true,
      color: '#f59e0b', // Orange
      logo: null,
      features: [
        'נטול דגנים 100%',
        'עתיר בשר',
        'מרכיבים טבעיים'
      ]
    }
  ];

  // ========================================
  // RENDER
  // ========================================

  return (
    <div className={styles.container}>
      {/* Header section */}
      <header className={styles.header}>
        <h1 className={styles.title}>
          {t('brandSelector.title')}
        </h1>
        <p className={styles.subtitle}>
          {t('brandSelector.subtitle')}
        </p>
      </header>

      {/* Brand cards grid */}
      <div className={styles.brandGrid}>
        {brands.map((brand) => (
          <div
            key={brand.id}
            className={`${styles.brandCard} ${
              !brand.available ? styles.brandCardDisabled : ''
            }`}
            onClick={() => brand.available && handleBrandSelect(brand.id)}
            style={{
              '--brand-color': brand.color
            }}
          >
            {/* Brand logo area */}
            <div className={styles.brandLogo}>
              {brand.logo ? (
                <img
                  src={brand.logo}
                  alt={`${brand.name} logo`}
                  className={styles.brandLogoImage}
                />
              ) : (
                <div
                  className={styles.brandLogoCircle}
                  style={{ backgroundColor: brand.color }}
                >
                  {brand.name[0]}
                </div>
              )}
            </div>

            {/* Brand name */}
            <h2 className={styles.brandName}>{brand.name}</h2>

            {/* Brand description */}
            <p className={styles.brandDescription}>
              {brand.description}
            </p>

            {/* Brand features (only for available brands) */}
            {brand.available && brand.features.length > 0 && (
              <ul className={styles.featureList}>
                {brand.features.map((feature, index) => (
                  <li key={index} className={styles.featureItem}>
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
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Coming soon badge */}
            {!brand.available && (
              <div className={styles.comingSoonBadge}>
                {t('brandSelector.comingSoon')}
              </div>
            )}

            {/* Select button (only for available brands) */}
            {brand.available && (
              <button className={styles.selectButton}>
                {t('common.select')}
                <svg
                  className={styles.arrowIcon}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Footer with app info */}
      <footer className={styles.footer}>
        <p className={styles.footerText}>
          {t('brandSelector.footer.title')}
        </p>
        <p className={styles.footerSubtext}>
          {t('brandSelector.footer.subtitle')}
        </p>
      </footer>
    </div>
  );
};

export default BrandSelector;
