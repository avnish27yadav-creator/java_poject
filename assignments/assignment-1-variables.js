/**
 * Assignment 1: Variables, Data Types, and Console Operations
 * ------------------------------------------------------------
 * Declares variables using var, let and const, then checks each
 * variable's type with typeof and logs the result.
 */

// var  -> function scoped, can be re-declared and re-assigned (older style)
var userName = "Alice";

// let  -> block scoped, can be re-assigned but not re-declared
let age = 25;

// const -> block scoped, cannot be re-assigned
const isEmployed = true;
const skills = ["HTML", "CSS", "JavaScript"];

// Helper: arrays are printed in the exact style of the expected output
const formatArray = (arr) => `[${arr.map((item) => `"${item}"`).join(", ")}]`;

console.log(`Name: ${userName} (Type: ${typeof userName})`);
console.log(`Age: ${age} (Type: ${typeof age})`);
console.log(`Is Employed: ${isEmployed} (Type: ${typeof isEmployed})`);
console.log(`Skills: ${formatArray(skills)} (Type: ${typeof skills})`);

// Bonus: shows that let can change but const cannot
age = 26;
console.log(`\nAge updated with let: ${age}`);
try {
  // eslint-disable-next-line no-const-assign
  isEmployed = false;
} catch (error) {
  console.log(`Cannot reassign const -> ${error.name}: ${error.message}`);
}
