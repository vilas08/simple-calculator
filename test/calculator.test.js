const { test, describe } = require('node:test');
const assert = require('node:assert');
const { add, subtract, multiply, divide, calculate } = require('../src/calculator');

describe('Calculator Core Unit Tests', () => {

  describe('Addition', () => {
    test('adds 5 + 3 to equal 8', () => {
      assert.strictEqual(add(5, 3), 8);
    });

    test('adds negative and positive number', () => {
      assert.strictEqual(add(-10, 4), -6);
    });

    test('adds decimal numbers accurately', () => {
      assert.strictEqual(add(0.1, 0.2).toFixed(1), '0.3');
    });
  });

  describe('Subtraction', () => {
    test('subtracts 10 - 4 to equal 6', () => {
      assert.strictEqual(subtract(10, 4), 6);
    });

    test('subtracts resulting in negative number', () => {
      assert.strictEqual(subtract(5, 12), -7);
    });
  });

  describe('Multiplication', () => {
    test('multiplies 6 * 7 to equal 42', () => {
      assert.strictEqual(multiply(6, 7), 42);
    });

    test('multiplies any number by 0 to equal 0', () => {
      assert.strictEqual(multiply(125, 0), 0);
    });
  });

  describe('Division', () => {
    test('divides 20 / 4 to equal 5', () => {
      assert.strictEqual(divide(20, 4), 5);
    });

    test('throws an error when dividing by zero', () => {
      assert.throws(() => {
        divide(10, 0);
      }, /Cannot divide by zero/);
    });
  });

  describe('Master Calculate Function', () => {
    test('calculates using operator symbol "+"', () => {
      assert.strictEqual(calculate(15, '+', 25), 40);
    });

    test('calculates using operator symbol "*"', () => {
      assert.strictEqual(calculate(4, '*', 5), 20);
    });

    test('calculates using operator symbol "÷"', () => {
      assert.strictEqual(calculate(9, '÷', 3), 3);
    });

    test('throws on invalid operator', () => {
      assert.throws(() => {
        calculate(2, '%', 3);
      }, /Unsupported operator/);
    });
  });

});
