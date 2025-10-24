# Food Advisor App - TODO List

## Project Overview
**Pet Food Advisor Web App** - Interactive questionnaire to recommend pet food products
- **Brands**: Nutram (primary), Brit Care (future), Carnilove (future)
- **Languages**: Hebrew, English, Russian, Arabic
- **Tech Stack**: React (Vite), Firebase Hosting, PWA (Progressive Web App)
- **Design**: Dark theme with purple accents, modern card layout
- **PWA Features**: Offline support, installable, mobile-optimized

---

## Phase 1: Data Structure & Foundation ✅ IN PROGRESS

### 1.1 Nutram Data
- [x] Fix nutram_navigation.json syntax error (line 67 comma)
- [ ] Create complete Nutram product database (nutram_products.json)
  - [ ] T-Series (Total): T22, T23, T24, T25, T26, T27, T28, T29
  - [ ] S-Series (Sound): S1, S2, S3, S5, S6, S7, S8, S9, S10, S11, S46, S49
  - [ ] I-Series (Ideal): I12, I14, I17, I18, I19, I20
  - Each product needs:
    - Product code
    - Full name
    - Description
    - Benefits/advantages (brief)
    - Target audience (age, size, special needs)
    - Image path reference

### 1.2 Translation System
- [ ] Create `/assets/translations/` folder structure
- [ ] Create `he.json` (Hebrew - primary language)
- [ ] Create `en.json` (English)
- [ ] Create `ru.json` (Russian)
- [ ] Create `ar.json` (Arabic)
- [ ] Translation keys for:
  - All questions in navigation flows
  - All button texts
  - Product names & descriptions
  - UI elements (Back, Next, Results, etc.)
  - Error messages

### 1.3 Future Brands (Placeholders)
- [ ] Create `britcare_navigation.json` (placeholder structure)
- [ ] Create `carnilove_navigation.json` (placeholder structure)
- [ ] Create `britcare_products.json` (placeholder)
- [ ] Create `carnilove_products.json` (placeholder)

---

## Phase 2: React Project Setup

### 2.1 Vite Initialization
- [ ] Run `npm create vite@latest`
- [ ] Choose React + JavaScript template
- [ ] Install dependencies: `npm install`
- [ ] Clean up default Vite template files

### 2.2 Project Structure
```
src/
├── assets/              (move existing assets here)
├── components/
│   ├── BrandSelector/
│   ├── QuestionPage/
│   ├── ResultPage/
│   ├── LanguageSelector/
│   ├── ProgressBar/
│   └── Navigation/
├── context/
│   └── AppContext.jsx
├── hooks/
│   ├── useNavigation.js
│   └── useTranslation.js
├── utils/
│   └── navigationEngine.js
├── data/              (JSON files)
└── styles/            (CSS modules or styled-components)
```

### 2.3 Dependencies to Install
- [ ] `react-router-dom` (routing)
- [ ] `i18next` + `react-i18next` (translations)
- [ ] `vite-plugin-pwa` (PWA support)
- [ ] `workbox-window` (service worker management)
- [ ] Consider: `framer-motion` (smooth animations)
- [ ] Consider: `react-icons` (icons)

### 2.4 PWA Configuration
- [ ] Install vite-plugin-pwa: `npm install -D vite-plugin-pwa`
- [ ] Configure PWA in vite.config.js
- [ ] Create app icons (192x192, 512x512)
- [ ] Set up manifest.json (name, theme colors, icons)
- [ ] Configure service worker for offline support
- [ ] Test "Add to Home Screen" functionality
- [ ] Enable caching strategy for assets and data

---

## Phase 3: Core Components Development

### 3.1 Context Setup (State Management)
- [ ] Create `AppContext.jsx`
  - [ ] selectedBrand state
  - [ ] currentLanguage state
  - [ ] navigationHistory state (for back button)
  - [ ] currentPage state
  - [ ] Functions: navigateToPage(), goBack(), selectBrand(), changeLanguage()
- [ ] Wrap App with AppContextProvider
- [ ] Add extensive comments for React beginners

### 3.2 Language System
- [ ] Create `useTranslation` hook
- [ ] Implement RTL support for Hebrew/Arabic
- [ ] Language selector dropdown component
- [ ] Persist language choice in localStorage

### 3.3 Navigation Engine
- [ ] Create `navigationEngine.js` utility
  - [ ] Load navigation JSON by brand
  - [ ] Find page by page_number
  - [ ] Validate navigation flow
  - [ ] Build breadcrumb trail
- [ ] Create `useNavigation` hook
  - [ ] Get current page data
  - [ ] Handle button clicks
  - [ ] Navigate forward/backward

---

## Phase 4: UI Components

### 4.1 Brand Selector (Landing Page)
- [ ] Component: `BrandSelector.jsx`
- [ ] Display 3 brand cards (Nutram active, others "coming soon")
- [ ] Each card shows brand logo + description
- [ ] onClick → set brand in context → navigate to first question
- [ ] Styling: Dark theme + purple accents (match design screenshots)

### 4.2 Question Page Component
- [ ] Component: `QuestionPage.jsx`
- [ ] Display question text (translated)
- [ ] Render buttons dynamically from navigation data
- [ ] Button onClick → navigate to target_page
- [ ] Add Back button (except on first page)
- [ ] Progress indicator (e.g., "Question 3 of 5")

### 4.3 Result Page Component
- [ ] Component: `ResultPage.jsx`
- [ ] Display recommended product(s)
- [ ] Show product image (from assets/pic/)
- [ ] Show product name, description, benefits
- [ ] Styled cards (match design: dark bg, purple buttons)
- [ ] Action buttons:
  - [ ] "Start Over" → reset to brand selection
  - [ ] "Go Back" → return to last question
  - [ ] Optional: "Share Results" or "Download PDF"

### 4.4 Progress Bar
- [ ] Component: `ProgressBar.jsx`
- [ ] Calculate progress based on page depth or total questions
- [ ] Visual indicator (bar or steps)
- [ ] Show current position

### 4.5 Language Selector
- [ ] Component: `LanguageSelector.jsx`
- [ ] Dropdown or flag icons for 4 languages
- [ ] Switch language → update context → re-render with new translations
- [ ] Persist selection in localStorage

---

## Phase 5: Styling & Design

### 5.1 Theme Setup
- [ ] Define color palette:
  - Primary: Purple (#8B5CF6 or similar)
  - Background: Dark (#0F0F0F or #1A1A1A)
  - Cards: Slightly lighter dark (#2A2A2A)
  - Text: White/Light gray
  - Accents: Purple gradients
- [ ] Set up CSS variables or theme config
- [ ] Choose styling approach:
  - Option A: CSS Modules (simple, recommended for beginners)
  - Option B: Styled Components
  - Option C: Tailwind CSS (fastest development)

### 5.2 Responsive Design
- [ ] Mobile-first approach
- [ ] Breakpoints: Mobile (<768px), Tablet (768-1024px), Desktop (>1024px)
- [ ] Test on different screen sizes
- [ ] Touch-friendly buttons (min 44px height)

### 5.3 Animations
- [ ] Smooth page transitions
- [ ] Button hover effects
- [ ] Card entrance animations
- [ ] Loading states

### 5.4 Accessibility
- [ ] Proper semantic HTML
- [ ] ARIA labels where needed
- [ ] Keyboard navigation support
- [ ] High contrast for readability
- [ ] Alt text for all product images

---

## Phase 6: Firebase Integration

### 6.1 Firebase Setup
- [ ] Create Firebase project at console.firebase.google.com
- [ ] Enable Firebase Hosting
- [ ] Install Firebase CLI: `npm install -g firebase-tools`
- [ ] Run `firebase login`
- [ ] Run `firebase init` in project directory
  - [ ] Select Hosting
  - [ ] Set public directory to `dist` (Vite build output)
  - [ ] Configure as single-page app (rewrite all to index.html)

### 6.2 Optional: Firebase Storage (for dynamic image updates)
- [ ] Enable Cloud Storage
- [ ] Upload product images to Storage
- [ ] Update product database with Storage URLs
- [ ] Benefits: Update images without redeploying app

### 6.3 Optional: Firebase Analytics
- [ ] Enable Google Analytics
- [ ] Track events:
  - Brand selected
  - Questions answered
  - Products recommended
  - Language changed

### 6.4 Deployment
- [ ] Build production: `npm run build`
- [ ] Deploy: `firebase deploy`
- [ ] Test live site
- [ ] Set up custom domain (optional)

---

## Phase 7: Testing & Refinement

### 7.1 Testing Checklist
- [ ] Test all navigation paths for Nutram (dogs + cats)
- [ ] Verify all products appear correctly
- [ ] Test language switching (4 languages)
- [ ] Test RTL layout (Hebrew/Arabic)
- [ ] Test on mobile devices
- [ ] Test back button functionality
- [ ] Verify all images load correctly
- [ ] Check for broken navigation paths (page_number references)

### 7.2 Code Quality
- [ ] Add comprehensive comments (every function, import, variable)
- [ ] Ensure consistent code formatting
- [ ] Remove console.logs and debug code
- [ ] Optimize bundle size
- [ ] Add error boundaries for graceful error handling

### 7.3 Performance
- [ ] Lazy load components
- [ ] Optimize images (compress, use WebP if supported)
- [ ] Code splitting
- [ ] Lighthouse audit (aim for 90+ score)

---

## Phase 8: Future Enhancements

### 8.1 Brit Care & Carnilove Data
- [ ] Research Brit Care product lines
- [ ] Create complete britcare_navigation.json
- [ ] Create britcare_products.json with all products
- [ ] Add Brit Care product images
- [ ] Repeat for Carnilove
- [ ] Enable brands in BrandSelector

### 8.2 Admin Panel (Optional)
- [ ] Create `/admin` route
- [ ] Add Firebase Authentication
- [ ] Build interface to:
  - [ ] Edit product information
  - [ ] Upload new product images
  - [ ] Modify navigation flows
  - [ ] View analytics

### 8.3 Additional Features
- [ ] Email results to user
- [ ] PDF export of recommendations
- [ ] Compare multiple products
- [ ] "Why was this recommended?" explanation
- [ ] Store recommendation history (localStorage)
- [ ] Social sharing (WhatsApp, Facebook)
- [ ] Multi-pet recommendations (2+ pets)

---

## Current Status
**Last Updated**: 2025-10-23

### Completed ✅
- Fixed nutram_navigation.json syntax error
- Analyzed design preferences (dark theme + purple)
- Identified all product images in assets/pic/
- Established project architecture

### In Progress 🚧
- Creating Nutram product database
- Setting up TODO tracking system

### Next Up 📋
1. Complete Nutram product database
2. Create translation file structure
3. Initialize Vite project
4. Build AppContext and core hooks

---

## Notes & Decisions

### Design Decisions
- **Dark theme** with purple (#8B5CF6) accents
- Inspired by provided screenshots (BarkBite dog food landing page)
- Card-based layout for products
- Clean, modern UI with pet imagery

### Technical Decisions
- **Vite** over Create React App (faster, modern)
- **React Context API** for state (simplest, no external libraries)
- **i18next** for translations (industry standard)
- **CSS Modules** for styling (simple, scoped)
- **Firebase Hosting** (free, fast, reliable)

### Important Considerations
- **Manufacturers change products**: Keep product database easily updatable
- **Brief descriptions**: Show advantages of recommended food on result page
- **No customer login**: Frictionless experience
- **Multi-language**: Hebrew (primary), English, Russian, Arabic with RTL support
- **Clean code**: Extensive comments for learning/maintenance

---

## Contact & Recovery
If context is lost, check:
1. This TODO.md file for current status
2. `/assets/nutram_navigation.json` - main navigation flow (completed)
3. `/assets/pic/` - all product images
4. Design inspiration: Screenshots 212711 & 212804 (dark + purple theme)

**Key Files to Check:**
- `assets/nutram_navigation.json` - Navigation flow ✅
- `assets/nutram_products.json` - Product database (in progress)
- `assets/translations/*.json` - Language files (pending)
- `src/context/AppContext.jsx` - Main state management (pending)
- `TODO.md` - This file!

---

## Questions to Resolve
- [ ] Styling approach: CSS Modules, Styled Components, or Tailwind?
- [ ] Include Firebase Storage from start, or bundle images?
- [ ] Need "Compare Products" feature?
- [ ] Should result page show multiple products or single best match?
- [ ] Add filters/search on result page?
