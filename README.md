# Pet Food Advisor 🐾

A beautiful, interactive web application that helps pet owners find the perfect food for their cats and dogs.

**Live Demo:** [https://pet-food-advisor-bcfa0.web.app](https://pet-food-advisor-bcfa0.web.app)

![Pet Food Advisor](assets/pic/Screenshot%202025-10-23%20212711.png)

## Features

- 🌍 **Multi-language support** - Hebrew (RTL), English, Russian, Arabic (RTL)
- 🎨 **Beautiful dark theme** with purple accents
- 📱 **Progressive Web App (PWA)** - Install on mobile devices
- 🧭 **Smart questionnaire flow** - 101 decision points to find the perfect food
- 🍖 **Nutram product database** - 25 products across T-Series, S-Series, and I-Series
- ♿ **Fully accessible** - RTL support, keyboard navigation
- ⚡ **Fast and responsive** - Built with React + Vite

## Tech Stack

- **Frontend Framework:** React 18.3.1
- **Build Tool:** Vite 5.4.9
- **Routing:** React Router v6
- **Internationalization:** i18next & react-i18next
- **PWA:** vite-plugin-pwa with Workbox
- **Hosting:** Firebase Hosting
- **State Management:** React Context API
- **Styling:** CSS Modules

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/Amikashkash/pet-food-advisor.git

# Navigate to project directory
cd pet-food-advisor

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
# Create production build
npm run build

# Preview production build locally
npm run preview
```

### Deploy to Firebase

```bash
# Build the app
npm run build

# Deploy to Firebase Hosting
firebase deploy --only hosting
```

## Project Structure

```
pet-food-advisor/
├── assets/
│   ├── nutram_navigation.json       # Navigation flow (101 pages)
│   ├── nutram_products.json         # Product database (25 products)
│   ├── pic/                         # Product images
│   └── translations/                # i18n files (he, en, ru, ar)
├── src/
│   ├── components/
│   │   ├── BrandSelector/           # Landing page with brand selection
│   │   ├── LanguageSelector/        # Language switcher
│   │   ├── QuestionPage/            # Interactive questionnaire
│   │   └── ResultPage/              # Product recommendations
│   ├── context/
│   │   └── AppContext.jsx           # Global state management
│   ├── hooks/
│   │   └── useNavigation.js         # Navigation logic hook
│   ├── utils/
│   │   └── navigationEngine.js      # Navigation data utilities
│   ├── styles/
│   │   └── theme.css                # Global styles & design system
│   ├── i18n.js                      # i18next configuration
│   ├── App.jsx                      # Main app component
│   └── main.jsx                     # App entry point
├── firebase.json                    # Firebase Hosting config
├── vite.config.js                   # Vite configuration
└── package.json
```

## How It Works

1. **Brand Selection** - User chooses between Nutram, Brit Care, or Carnilove (only Nutram is currently active)
2. **Questionnaire Flow** - Smart navigation through questions about:
   - Pet type (cat/dog)
   - Grain preferences
   - Age/life stage
   - Size (for dogs)
   - Special needs
   - Activity level
   - Health concerns
3. **Product Recommendations** - Based on answers, the app recommends suitable products with:
   - Product images
   - Detailed descriptions
   - Benefits list
   - Perfect for whom

## Data Structure

The app is **data-driven** using JSON files:

- **Navigation Flow:** `nutram_navigation.json` - 101 pages with questions and buttons
- **Products:** `nutram_products.json` - 25 products with series, names, descriptions, benefits
- **Translations:** 4 language files with all UI text and product information

This makes it easy to update products or add new brands without changing code.

## Supported Products

### Nutram Total Series (T-Series) - Grain-Free
- T22, T24, T25, T26, T27, T28, T29

### Nutram Sound Series (S-Series) - Balanced Wellness
- S1, S2, S3, S5, S6, S7, S8, S9, S10, S11, S46, S49

### Nutram Ideal Series (I-Series) - Targeted Solutions
- I12, I14, I17, I18, I19, I20

## Future Enhancements

- [ ] Add Brit Care brand support
- [ ] Add Carnilove brand support
- [ ] Product comparison feature
- [ ] Save/share recommendations
- [ ] Admin panel for updating products
- [ ] Analytics integration

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

This project was created for personal/commercial use.

## Acknowledgments

- Built with [React](https://react.dev/)
- Powered by [Vite](https://vitejs.dev/)
- Hosted on [Firebase](https://firebase.google.com/)
- Translations powered by [i18next](https://www.i18next.com/)

---

**Made with ❤️ and 🤖 [Claude Code](https://claude.com/claude-code)**
