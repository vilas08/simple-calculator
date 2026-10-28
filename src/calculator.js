/**
 * Core mathematical functions for calculator.
 * Supports both CommonJS (for Node.js testing/CI) and Browser environments.
 */

function add(a, b) {
  return Number(a) + Number(b);
}

function subtract(a, b) {
  return Number(a) - Number(b);
}

function multiply(a, b) {
  return Number(a) * Number(b);
}

function divide(a, b) {
  if (Number(b) === 0) {
    throw new Error("Cannot divide by zero");
  }
  return Number(a) / Number(b);
}

function calculate(a, operator, b) {
  switch (operator) {
    case '+':
      return add(a, b);
    case '-':
      return subtract(a, b);
    case '*':
    case '×':
      return multiply(a, b);
    case '/':
    case '÷':
      return divide(a, b);
    default:
      throw new Error(`Unsupported operator: ${operator}`);
  }
}

// Export for Node.js test environment if available
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { add, subtract, multiply, divide, calculate };
}
