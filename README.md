# 🐾 TechBox

TechBox is a mobile-first veterinary technician toolbox designed for high-stress, high-impact clinical use — from crash cart moments to daily drug math.

Built by techs, for techs.

## 🚨 Key Features

- Emergency Mode (CPR timer, code logging, PDF summary)
- CRI Calculator (multi-drug support, infusion math)
- Drug Reference (dosing, delivery details, prep guides)
- Common Additive Calculators (KCl, Dextrose, Sodium Bicarb)
- Nutrition Calculators (RER/MER, slurry kcal)
- Protocols (shock, HIT, hyperkalemia, seizures, etc.)
- Persistent patient weight (used across all modules)
- Mobile-optimized, offline-ready (eventually)

## 🛠️ Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS
- LocalStorage for persistent context (e.g., weight)
- PWA support planned

## 🗺️ Roadmap

See `TODO.md` for detailed feature planning.

---

## 💻 Getting Started

```bash
npm install
npm run dev


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
