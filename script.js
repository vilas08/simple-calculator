/**
 * Interactive controller for Calculator UI
 * Connects buttons & keyboard events to src/calculator.js
 */

const previousOperandEl = document.getElementById('previous-operand');
const currentOperandEl = document.getElementById('current-operand');
const keypad = document.querySelector('.keypad-grid');

let currentOperand = '0';
let previousOperand = '';
let operation = undefined;
let shouldResetScreen = false;

function updateDisplay() {
  currentOperandEl.textContent = formatDisplayNumber(currentOperand);
  if (operation != null) {
    previousOperandEl.textContent = `${formatDisplayNumber(previousOperand)} ${operation}`;
  } else {
    previousOperandEl.textContent = '';
  }
}

function formatDisplayNumber(number) {
  if (number === 'Error' || number === 'Cannot divide by zero') return number;
  const stringNumber = number.toString();
  const integerDigits = parseFloat(stringNumber.split('.')[0]);
  const decimalDigits = stringNumber.split('.')[1];
  let integerDisplay;

  if (isNaN(integerDigits)) {
    integerDisplay = '';
  } else {
    integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
  }

  if (decimalDigits != null) {
    return `${integerDisplay}.${decimalDigits}`;
  } else {
    return integerDisplay || '0';
  }
}

function appendNumber(number) {
  if (shouldResetScreen) {
    currentOperand = '';
    shouldResetScreen = false;
  }
  if (currentOperand === '0' && number !== '.') {
    currentOperand = number.toString();
    return;
  }
  if (number === '.' && currentOperand.includes('.')) return;
  currentOperand = currentOperand.toString() + number.toString();
}

function chooseOperation(selectedOp) {
  if (currentOperand === '') return;
  if (previousOperand !== '') {
    compute();
  }
  operation = selectedOp;
  previousOperand = currentOperand;
  shouldResetScreen = true;
}

function compute() {
  if (operation == null || previousOperand === '' || currentOperand === '') return;
  
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return;

  try {
    let computation;
    // Map UI operators to calculation functions
    if (typeof calculate === 'function') {
      computation = calculate(prev, operation, current);
    } else {
      // Fallback if script loaded standalone
      switch (operation) {
        case '+': computation = prev + current; break;
        case '-': computation = prev - current; break;
        case '×':
        case '*': computation = prev * current; break;
        case '÷':
        case '/': 
          if (current === 0) throw new Error("Cannot divide by zero");
          computation = prev / current; 
          break;
        default: return;
      }
    }

    // Format clean float output without crazy JS floating decimals
    computation = Math.round((computation + Number.EPSILON) * 100000000) / 100000000;
    currentOperand = computation.toString();
    operation = undefined;
    previousOperand = '';
    shouldResetScreen = true;
  } catch (err) {
    currentOperand = 'Error';
    operation = undefined;
    previousOperand = '';
    shouldResetScreen = true;
  }
}

function clearAll() {
  currentOperand = '0';
  previousOperand = '';
  operation = undefined;
  shouldResetScreen = false;
}

function deleteDigit() {
  if (shouldResetScreen || currentOperand === 'Error') {
    clearAll();
    return;
  }
  if (currentOperand.length === 1) {
    currentOperand = '0';
  } else {
    currentOperand = currentOperand.slice(0, -1);
  }
}

function calculatePercent() {
  const current = parseFloat(currentOperand);
  if (isNaN(current)) return;
  currentOperand = (current / 100).toString();
}

// Click Event Delegation
keypad.addEventListener('click', (e) => {
  const target = e.target.closest('button');
  if (!target) return;

  if (target.dataset.number != null) {
    appendNumber(target.dataset.number);
    updateDisplay();
  } else if (target.dataset.operator != null) {
    chooseOperation(target.dataset.operator);
    updateDisplay();
  } else if (target.dataset.action != null) {
    const action = target.dataset.action;
    switch (action) {
      case 'clear':
        clearAll();
        break;
      case 'delete':
        deleteDigit();
        break;
      case 'percent':
        calculatePercent();
        break;
      case 'decimal':
        appendNumber('.');
        break;
      case 'calculate':
        compute();
        break;
    }
    updateDisplay();
  }
});

// Keyboard Support
window.addEventListener('keydown', (e) => {
  if ((e.key >= '0' && e.key <= '9')) {
    appendNumber(e.key);
    updateDisplay();
  } else if (e.key === '.') {
    appendNumber('.');
    updateDisplay();
  } else if (e.key === '=' || e.key === 'Enter') {
    e.preventDefault();
    compute();
    updateDisplay();
  } else if (e.key === 'Backspace') {
    deleteDigit();
    updateDisplay();
  } else if (e.key === 'Escape') {
    clearAll();
    updateDisplay();
  } else if (e.key === '+') {
    chooseOperation('+');
    updateDisplay();
  } else if (e.key === '-') {
    chooseOperation('-');
    updateDisplay();
  } else if (e.key === '*') {
    chooseOperation('×');
    updateDisplay();
  } else if (e.key === '/') {
    e.preventDefault();
    chooseOperation('÷');
    updateDisplay();
  } else if (e.key === '%') {
    calculatePercent();
    updateDisplay();
  }
});

// Initial render
updateDisplay();
