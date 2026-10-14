/**
 * Assignment 4: Loop Control Structures
 * --------------------------------------
 * - for loop            : multiplication table of 5
 * - while + break       : first number > 10 divisible by 6
 * - do...while+continue : skips numbers using continue
 */

// ---- 1. for loop ----
console.log("-- Multiplication Table of 5 --");
for (let i = 1; i <= 5; i++) {
  console.log(`5 x ${i} = ${5 * i}`);
}

// ---- 2. while loop with break ----
console.log("\n-- First number > 10 divisible by 6 --");
let n = 11;
while (true) {
  if (n % 6 === 0) {
    console.log(`Found: ${n}`);
    break; // stop as soon as we find the first match
  }
  n++;
}

// ---- 3. do...while loop with continue ----
// Prints only the even numbers from 1 to 10 (odd numbers are skipped).
console.log("\n-- Even numbers 1 to 10 (do...while + continue) --");
let k = 0;
do {
  k++; // increment BEFORE continue so the loop never gets stuck
  if (k % 2 !== 0) {
    continue; // skip odd numbers
  }
  console.log(`Even number: ${k}`);
} while (k < 10);
