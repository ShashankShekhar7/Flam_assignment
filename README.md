# 📱 Springy Bottom Sheet in React (with Vite)

This is a React application built using **Vite** that demonstrates a sleek **bottom sheet component** with:

- 🎯 Multiple screen snap points: **Closed**, **Half Open**, **Fully Open**
- 🌈 Smooth custom **spring motion animations**
- 🖐️ Drag-and-release interaction and control buttons
- ✅ **No third-party animation libraries** like `framer-motion` or `react-spring`

---

## 🚀 Features

- 📌 Snap points: `0% (open)`, `50% (half)`, `90% (closed)`
- 🧠 Pure spring animation logic with `requestAnimationFrame`
- ✋ Drag to move & release to snap to the nearest point
- 🧩 Buttons for manual control
- 📱 Fully responsive on mobile & desktop
- 🎨 Simple and clean UI (no Tailwind)

---

## 🛠️ Tech Stack

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- Plain CSS for styling

---

## 🧑‍💻 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/bottom-sheet-app.git
cd bottom-sheet-app

```
### 2. Install dependencies


```bash
npm install


```

### 3. Run the app locally

```bash
npm run dev


```

The app will be available at http://localhost:5173

---

### 🧠 Concepts Used
React useState, useRef, and useEffect

Mouse and touch gesture tracking

Custom spring physics (stiffness, damping)

Animation loop using requestAnimationFrame

CSS transitions and responsive layout

---

### 🖼️ Preview


Drag the handle or use the buttons to smoothly control the bottom sheet.

---

### ✨ Future Enhancements
⌨️ Add keyboard accessibility

📜 Make content inside the sheet scrollable

🧪 Add unit testing (e.g., using Vitest)

🎨 Add dark mode and customizable themes

---

### 📃 License
This project is licensed under the MIT License.

---

### 🧑‍🎓 Author
Shashank

---

Built with ❤️ using React + Vite
