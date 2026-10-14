/**
 * Assignment 3: Conditional Logic Implementation
 * -----------------------------------------------
 * - if...else  : validates the score
 * - switch     : determines the letter grade
 * - ternary    : prints Passed / Failed
 */

const score = 85;

if (typeof score !== "number" || Number.isNaN(score)) {
  console.log("Invalid score: must be a number.");
} else if (score < 0 || score > 100) {
  console.log("Invalid score: must be between 0 and 100.");
} else {
  // Turn the score into a "band" (10 = 100, 9 = 90s, 8 = 80s ...)
  const band = Math.floor(score / 10);
  let grade;

  switch (band) {
    case 10:
    case 9:
      grade = "A";
      break;
    case 8:
      grade = "B";
      break;
    case 7:
      grade = "C";
      break;
    case 6:
      grade = "D";
      break;
    default:
      grade = "F";
  }

  const status = score >= 40 ? "Passed" : "Failed";

  console.log(`Score: ${score}`);
  console.log(`Grade: ${grade}`);
  console.log(`Status: ${status}`);
}
