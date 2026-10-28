# 🧮 Simple Calculator (CI/CD Practice)

[![Calculator CI Pipeline](https://github.com/vilas08/simple-calculator/actions/workflows/ci.yml/badge.svg)](https://github.com/vilas08/simple-calculator/actions/workflows/ci.yml)

A lightweight, modern web calculator with automated unit tests designed for learning and practicing **Git**, **GitHub Actions**, and **CI/CD pipelines**.

---

## 📁 Project Structure

```text
calculator/
├── .github/
│   └── workflows/
│       └── ci.yml          # GitHub Actions CI workflow (Automated testing on push)
├── src/
│   └── calculator.js       # Core math logic (Add, Subtract, Multiply, Divide)
├── test/
│   └── calculator.test.js  # Automated unit tests (Node.js test runner)
├── index.html              # Modern glassmorphism UI
├── style.css               # Dark theme styles & micro-interactions
├── script.js               # Interactive calculator events & keyboard handlers
├── package.json            # NPM scripts for running tests
├── .gitignore              # Files ignored by Git
└── README.md               # Documentation & learning guide
```

---

## 🧪 Local Testing & Linting

You can run your checks locally before committing:

```bash
# Check syntax of all JavaScript files (no extra packages needed!)
npm run lint

# Run automated unit tests
npm test
```

---

## 🔄 CI/CD Pipeline Stages

When you push code to GitHub, the pipeline runs 4 stages automatically:

1. **Lint** (`node --check`): Validates JavaScript syntax and structure.
2. **Test** (`node --test`): Runs 10 automated unit tests.
3. **Build** (`dist/`): Packages production web assets into a release artifact.
4. **Deploy**: Automatically deploys the production build (runs on `main` branch).

---

## 🚀 Hands-On Guide: Connect & Push to GitHub

Follow these steps in your terminal to practice Git and observe the CI/CD pipeline in action:

### Step 1: Initialize Git and Check Status
```bash
git init
git status
```

### Step 2: Stage and Commit the Code
```bash
git add .
git commit -m "feat: initial commit with calculator UI, unit tests, and GitHub Actions CI"
```

### Step 3: Link to your GitHub Repository
```bash
git branch -M main
git remote add origin https://github.com/vilas08/simple-calculator.git
```

### Step 4: Push to GitHub
```bash
git push -u origin main
```

*(If your repo already has a README on GitHub, run `git pull origin main --rebase` before pushing).*

---

## 🔍 How to See Your CI/CD Pipeline in Action

1. Open your repository: [https://github.com/vilas08/simple-calculator](https://github.com/vilas08/simple-calculator)
2. Click on the **"Actions"** tab at the top.
3. You will see **"Calculator CI Pipeline"** running!
4. Click on the workflow run to see the live console running the tests:
   - ✅ Checkout Repository
   - ✅ Set up Node.js
   - ✅ Run Automated Unit Tests
5. Once complete, you will see a green checkmark indicating successful integration.
