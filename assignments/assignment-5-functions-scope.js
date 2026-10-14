/**
 * Assignment 5: Function Architecture and Scope
 * ----------------------------------------------
 * - Standard function with default parameter values
 * - Arrow function with custom values
 * - Function scope and block scope demonstrations
 */

// ---- Standard function (defaults: length = 5, width = 4) ----
function rectangleArea(length = 5, width = 4) {
  return length * width;
}

// ---- Arrow function ----
const rectangleAreaArrow = (length = 5, width = 4) => length * width;

console.log(`Standard Function Area (Default 5x4): ${rectangleArea()}`);
console.log(`Arrow Function Area (Custom 10x3): ${rectangleAreaArrow(10, 3)}`);

// ---- Block scope: let/const live only inside { } ----
{
  let blockVar = "I only exist inside this block";
  const blockConst = "Me too";
  void blockConst;
  void blockVar;
}

try {
  console.log(blockVar); // ReferenceError: blockVar is outside its block
} catch (error) {
  console.log(
    `Scope Test Error: ${error.name}: ${error.message} (when accessed outside block)`
  );
}

// ---- Function scope: variables inside a function are private to it ----
function functionScopeDemo() {
  const secret = "only visible inside the function";
  return secret;
}
functionScopeDemo();

try {
  console.log(secret);
} catch (error) {
  console.log(
    `Function Scope Error: ${error.name}: ${error.message} (when accessed outside function)`
  );
}
