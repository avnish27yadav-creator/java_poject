/**
 * Assignment 2: Operators, Expressions, and Input Handling
 * ---------------------------------------------------------
 * Captures bill amount and tip percentage with prompt(), converts
 * them explicitly with Number(), computes the total using arithmetic
 * and assignment operators, and logs a formatted result.
 *
 * Works in the browser (native prompt) and in Node.js (small shim below).
 * Press Enter on an empty prompt to use the defaults (100 and 15).
 */

// ---- prompt() shim for Node.js (the browser already has prompt) ----
if (typeof prompt === "undefined") {
  const fs = require("fs");
  globalThis.prompt = (message, defaultValue = "") => {
    process.stdout.write(`${message} [${defaultValue}]: `);
    const byte = Buffer.alloc(1);
    let line = "";
    try {
      while (fs.readSync(0, byte, 0, 1, null) === 1) {
        const ch = byte.toString("utf8");
        if (ch === "\n") break;
        if (ch !== "\r") line += ch;
      }
    } catch (e) {
      /* no stdin available -> fall back to default */
    }
    const answer = line.trim() || String(defaultValue);
    if (!line.trim()) process.stdout.write(`${answer}\n`);
    return answer;
  };
}

// ---- 1. Capture input (prompt always returns a string) ----
const billInput = prompt("Enter the bill amount ($):", "100");
const tipInput = prompt("Enter the tip percentage (%):", "15");

// ---- 2. Explicit type conversion ----
const subtotal = Number(billInput);
const tipPercentage = Number(tipInput);

if (Number.isNaN(subtotal) || Number.isNaN(tipPercentage)) {
  console.log("Invalid input: please enter numbers only.");
} else {
  // ---- 3. Arithmetic and assignment operators ----
  const calculatedTip = (subtotal * tipPercentage) / 100; // * and /
  let total = subtotal; // assignment
  total += calculatedTip; // compound assignment

  // ---- 4. Formatted output ----
  console.log(`\nSubtotal: $${subtotal}`);
  console.log(`Tip Percentage: ${tipPercentage}%`);
  console.log(`Calculated Tip: $${calculatedTip}`);
  console.log(`Total Amount to Pay: $${total}`);
}
