# Quick Start Guide - Food Advisor App

## Current Status: Ready for React Development! 🚀

All data structures, translations, and product information are complete for the Nutram brand. You can now start building the React application.

---

## What's Already Done ✅

- ✅ Complete Nutram navigation flow (101 pages)
- ✅ Complete Nutram product database (25 products with images)
- ✅ 4 languages fully translated (Hebrew, English, Russian, Arabic)
- ✅ Design guidelines established (dark theme + purple accents)
- ✅ Placeholder structures for Brit Care & Carnilove
- ✅ Comprehensive documentation (TODO.md + PROJECT_SETUP_SUMMARY.md)

---

## Next Steps to Build the App

### Step 1: Initialize Vite React Project

Open your terminal in the `c:\react\food-advisor` directory:

```bash
# Initialize Vite with React template
npm create vite@latest . -- --template react

# Install dependencies
npm install

# Install additional required packages
npm install react-router-dom i18next react-i18next
```

### Step 2: Move Assets to src/ Directory

```bash
# Create src/assets if it doesn't exist
mkdir src/assets

# Move your existing assets folder contents to src/assets
# (or update import paths to reference ../assets/)
```

### Step 3: Project Structure to Create

Create these folders in `src/`:

```
src/
├── components/
│   ├── BrandSelector/
│   │   ├── BrandSelector.jsx
│   │   └── BrandSelector.module.css
│   ├── QuestionPage/
│   │   ├── QuestionPage.jsx
│   │   └── QuestionPage.module.css
│   ├── ResultPage/
│   │   ├── ResultPage.jsx
│   │   └── ResultPage.module.css
│   ├── LanguageSelector/
│   │   ├── LanguageSelector.jsx
│   │   └── LanguageSelector.module.css
│   └── ProgressBar/
│       ├── ProgressBar.jsx
│       └── ProgressBar.module.css
├── context/
│   └── AppContext.jsx
├── hooks/
│   ├── useNavigation.js
│   └── useTranslation.js
├── utils/
│   └── navigationEngine.js
└── styles/
    └── theme.css
```

### Step 4: Start Development Server

```bash
npm run dev
```

Visit `http://localhost:5173` (or the port Vite assigns)

---

## Development Order (Recommended)

### Priority 1: Core Setup
1. **Create AppContext.jsx** - Set up state management
2. **Create i18n configuration** - Set up translations
3. **Create theme.css** - Define color variables

### Priority 2: Utility Functions
4. **Create navigationEngine.js** - Logic to read JSON navigation
5. **Create useTranslation.js hook** - Wrapper for i18n
6. **Create useNavigation.js hook** - Navigation state logic

### Priority 3: UI Components
7. **BrandSelector** - Landing page (Nutram active, others "coming soon")
8. **LanguageSelector** - Dropdown to switch languages
9. **QuestionPage** - Display questions & buttons dynamically
10. **ProgressBar** - Show progress through questionnaire
11. **ResultPage** - Display product recommendations

---

## Code Snippets to Get You Started

### 1. AppContext.jsx (State Management)

```jsx
// src/context/AppContext.jsx
import { createContext, useContext, useState } from 'react';

// Create the context
const AppContext = createContext();

// Provider component
export const AppProvider = ({ children }) => {
  // Selected brand state (nutram, britcare, carnilove)
  const [selectedBrand, setSelectedBrand] = useState(null);

  // Current language (he, en, ru, ar)
  const [currentLanguage, setCurrentLanguage] = useState('he');

  // Navigation history for back button
  const [navigationHistory, setNavigationHistory] = useState([]);

  // Current page number in the flow
  const [currentPage, setCurrentPage] = useState(1);

  // Navigate to a new page
  const navigateToPage = (pageNumber) => {
    setNavigationHistory([...navigationHistory, currentPage]);
    setCurrentPage(pageNumber);
  };

  // Go back to previous page
  const goBack = () => {
    if (navigationHistory.length > 0) {
      const previousPage = navigationHistory[navigationHistory.length - 1];
      setCurrentPage(previousPage);
      setNavigationHistory(navigationHistory.slice(0, -1));
    }
  };

  // Reset to start
  const resetFlow = () => {
    setSelectedBrand(null);
    setCurrentPage(1);
    setNavigationHistory([]);
  };

  const value = {
    selectedBrand,
    setSelectedBrand,
    currentLanguage,
    setCurrentLanguage,
    currentPage,
    navigationHistory,
    navigateToPage,
    goBack,
    resetFlow,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Custom hook to use the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};
```

### 2. i18n Configuration

```javascript
// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import he from '../assets/translations/he.json';
import en from '../assets/translations/en.json';
import ru from '../assets/translations/ru.json';
import ar from '../assets/translations/ar.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      he: { translation: he },
      en: { translation: en },
      ru: { translation: ru },
      ar: { translation: ar },
    },
    lng: 'he', // Default language (Hebrew)
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already protects from XSS
    },
  });

export default i18n;
```

### 3. Theme CSS Variables

```css
/* src/styles/theme.css */
:root {
  /* Colors */
  --color-primary: #8b5cf6;
  --color-primary-dark: #7c3aed;
  --color-background: #0f0f0f;
  --color-card: #2a2a2a;
  --color-card-hover: #353535;
  --color-text: #ffffff;
  --color-text-secondary: #a0a0a0;
  --color-border: #404040;

  /* Spacing */
  --spacing-xs: 0.5rem;
  --spacing-sm: 1rem;
  --spacing-md: 1.5rem;
  --spacing-lg: 2rem;
  --spacing-xl: 3rem;

  /* Border Radius */
  --radius-sm: 0.5rem;
  --radius-md: 1rem;
  --radius-lg: 1.5rem;

  /* Shadows */
  --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 8px rgba(0, 0, 0, 0.4);
  --shadow-lg: 0 8px 16px rgba(0, 0, 0, 0.5);

  /* Transitions */
  --transition-fast: 0.15s ease;
  --transition-normal: 0.3s ease;
  --transition-slow: 0.5s ease;
}

/* RTL Support */
[dir="rtl"] {
  direction: rtl;
  text-align: right;
}

[dir="ltr"] {
  direction: ltr;
  text-align: left;
}

/* Global Styles */
body {
  background-color: var(--color-background);
  color: var(--color-text);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  margin: 0;
  padding: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  box-sizing: border-box;
}
```

### 4. Main App Setup

```jsx
// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import BrandSelector from './components/BrandSelector/BrandSelector';
import QuestionPage from './components/QuestionPage/QuestionPage';
import ResultPage from './components/ResultPage/ResultPage';
import LanguageSelector from './components/LanguageSelector/LanguageSelector';
import './styles/theme.css';
import './i18n'; // Initialize i18n

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="app">
          <LanguageSelector />
          <Routes>
            <Route path="/" element={<BrandSelector />} />
            <Route path="/question" element={<QuestionPage />} />
            <Route path="/result" element={<ResultPage />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
```

### 5. BrandSelector Component (Example)

```jsx
// src/components/BrandSelector/BrandSelector.jsx
import { useTranslation } from 'react-i18next';
import { useAppContext } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import styles from './BrandSelector.module.css';

/**
 * BrandSelector Component
 * Landing page where user chooses which pet food brand they want advice for
 */
const BrandSelector = () => {
  // Translation hook for i18n
  const { t } = useTranslation();

  // App context for state management
  const { setSelectedBrand } = useAppContext();

  // React Router navigation
  const navigate = useNavigate();

  /**
   * Handle brand selection
   * @param {string} brand - Brand name (nutram, britcare, carnilove)
   */
  const handleBrandSelect = (brand) => {
    setSelectedBrand(brand);
    navigate('/question');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        {t('brandSelector.title')}
      </h1>
      <p className={styles.subtitle}>
        {t('brandSelector.subtitle')}
      </p>

      <div className={styles.brandGrid}>
        {/* Nutram - Active */}
        <div
          className={styles.brandCard}
          onClick={() => handleBrandSelect('nutram')}
        >
          <h2>Nutram</h2>
          <p>{t('brandSelector.nutram')}</p>
        </div>

        {/* Brit Care - Coming Soon */}
        <div className={`${styles.brandCard} ${styles.comingSoon}`}>
          <h2>Brit Care</h2>
          <p>{t('brandSelector.britcare')}</p>
        </div>

        {/* Carnilove - Coming Soon */}
        <div className={`${styles.brandCard} ${styles.comingSoon}`}>
          <h2>Carnilove</h2>
          <p>{t('brandSelector.carnilove')}</p>
        </div>
      </div>
    </div>
  );
};

export default BrandSelector;
```

---

## Key Reminders

### Always Use Translation Keys
```jsx
// Good ✅
{t('questions.pet_type')}

// Bad ❌
{"Do you have a dog or cat?"}
```

### Import Product Data
```javascript
// Import navigation flow
import nutramNavigation from '../assets/nutram_navigation.json';

// Import product database
import nutramProducts from '../assets/nutram_products.json';
```

### Handle RTL Languages
```jsx
// Get direction from translation file
const { t, i18n } = useTranslation();
const direction = i18n.dir(); // 'rtl' or 'ltr'

<div dir={direction}>
  {/* Content */}
</div>
```

### Reference Product Images
```jsx
// Product image path
const imagePath = `/assets/pic/${productCode}.png`;

<img src={imagePath} alt={product.name} />
```

---

## Testing Checklist

- [ ] App loads without errors
- [ ] Language switcher works (4 languages)
- [ ] RTL layout works for Hebrew/Arabic
- [ ] Brand selection navigates correctly
- [ ] Question flow follows JSON navigation
- [ ] Back button works
- [ ] Product recommendations display correctly
- [ ] All images load
- [ ] Mobile responsive
- [ ] "Coming Soon" brands are disabled

---

## Common Issues & Solutions

### Issue: Translation not loading
**Solution**: Make sure i18n is imported in App.jsx before components render

### Issue: Images not showing
**Solution**: Check image paths are correct: `/assets/pic/[CODE].png`

### Issue: RTL not working
**Solution**: Add `dir` attribute to root div based on `i18n.dir()`

### Issue: Navigation not following JSON
**Solution**: Verify `target_page` in JSON matches `page_number`

---

## Resources

- **Full TODO**: See [TODO.md](TODO.md) for complete project roadmap
- **Project Summary**: See [PROJECT_SETUP_SUMMARY.md](PROJECT_SETUP_SUMMARY.md) for what's completed
- **Product Data**: `assets/nutram_products.json`
- **Navigation Flow**: `assets/nutram_navigation.json`
- **Translations**: `assets/translations/*.json`

---

## Need Help?

1. Check [TODO.md](TODO.md) for detailed phase breakdown
2. Review [PROJECT_SETUP_SUMMARY.md](PROJECT_SETUP_SUMMARY.md) for current status
3. Reference translation files for exact keys to use
4. Look at navigation JSON to understand flow structure

---

**You're all set to start coding! Good luck! 🚀**

The data layer is 100% complete for Nutram. Now you just need to build the React UI to display it beautifully.
