✅ TechBox — To-Do List

---

## 🧱 MVP Structure

- [ ] Global weight input (persistent across sessions)
- [ ] Homepage layout (Emergency button + module nav)
- [ ] Emergency Mode
  - [ ] CPR timer (start/stop/reset)
  - [ ] Tap-to-log events (Epi, Atropine, ROSC, etc.)
  - [ ] PDF/printable crash summary
  - [ ] Optional metronome toggle

- [ ] Calculators Module
  - [ ] CRI builder (multi-drug support)
  - [ ] KCl additive calculator
  - [ ] Dextrose dilution calculator
  - [ ] Transfusion dose
  - [ ] RER/MER calculator
  - [ ] Shock dose calculator

- [ ] Drug Guide
  - [ ] Searchable drug list
  - [ ] Individual drug cards (dose range, prep, delivery notes)
  - [ ] Drug card schema (JSON or TypeScript types)

- [ ] Protocols Module
  - [ ] Hyperkalemia
  - [ ] HIT
  - [ ] Seizure
  - [ ] CPR (RECOVER)
  - [ ] Custom protocol format

- [ ] Reference Tools
  - [ ] Tube sizing chart
  - [ ] Radiology positioning cheatsheets
  - [ ] Dental charting reference
  - [ ] Central line checklist

---

## ⚙️ Infrastructure / Dev Tools

- [ ] Setup Tailwind CSS
- [ ] LocalStorage handling
- [ ] Add global context/store (e.g., for weight)
- [ ] Add routing (React Router or TanStack Router)
- [ ] Responsive layout for phones + tablets
- [ ] Dark mode toggle

---

## 🌐 Deployment Goals

- [ ] Host on Netlify/Vercel
- [ ] Add PWA support (offline Emergency Mode)
- [ ] Shareable crash logs (print or export)

---

## 🧠 Stretch Goals

- [ ] Clinic-specific protocols (config-based or backend)
- [ ] Drug compatibility checker (can X mix with Y?)
- [ ] Vet student mode (quiz, learn, practice)
- [ ] Quick access voice commands or Siri Shortcut support
- [ ] Native app via React Native or Expo