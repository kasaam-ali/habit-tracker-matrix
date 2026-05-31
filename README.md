
# ⚡ Habit Tracker Matrix

A highly interactive, production-grade productivity dashboard built with React and Tailwind CSS. This application features dynamic consecutive streak calculation engines, responsive calendar viewports, and automated persistent local storage synchronization. Developed as part of the frontend assessment for the **Dev Weekends Fellowship 2026**.

---



## 🛠️ Tech Stack & Key Features

### Core Technologies
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

### Application Highlights
- **Dynamic Streak Calculation Engine:** Sequential backward parsing mechanism evaluating chronological daily completion logs natively without performance overheads.
- **Responsive Workspace Containers:** Full fluid layout transitions mapping 7 distinct horizontal weekday blocks into clean isolated mobile scroll bounds.
- **Fluid Visual Indicators:** Optimized system-level layout contrast targeting relative daily nodes and dark-surface accessibility anchors.
- **Local Persistence Layers:** Synchronous state serialization matching `window.localStorage` changes on immediate input actions.

---

## 📁 Project Architecture Overview

```text
habit-tracker/
├── public/                 # Static assets and site icons
├── src/
│   ├── assets/             # Graphical modules and vectors
│   ├── App.jsx             # Core React application logic & state engines
│   ├── index.css           # Global CSS injection and Tailwind setups
│   └── main.jsx            # Native DOM root mapping
├── ANSWERS.md              # Technical assessment question responses
├── index.html              # Main application markup shell
├── package.json            # Project dependencies and deployment configurations
└── tailwind.config.js      # Global Tailwind structural content configurations

```
## 💻 Local Installation & Setup

Follow these simple steps to spin up the local development server workspace on your laptop:

1. **Clone the Repository:**
```bash
   git clone [https://github.com/kasaam-ali/habit-tracker-matrix.git](https://github.com/kasaam-ali/habit-tracker-matrix.git)
   cd habit-tracker-matrix
```
Install Required System Dependencies:

```Bash
   npm install
   npm install lucide-react
```
Launch the Local Micro-Service Server:
```Bash
   npm run dev
```
Open http://localhost:5173 inside your modern web browser instance to monitor active viewport configurations.

## 📝 Technical Inclusions Documentation
Detailed conceptual analysis documentation, engineering decisions, visual hierarchy logic justifications, accessibility compromises, and product scaling vectors are explicitly documented under the ANSWERS.md directory configuration map.

Developed with 💙 by Kasaam Ali for the Dev Weekends Fellowship Selection Committee.
