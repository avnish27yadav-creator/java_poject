/* =====================================================================
   script.js : the LOGIC of the Capstone Mini Project
   ---------------------------------------------------------------------
   Concepts used (all explained next to the code):
     1. Variables, prompt(), explicit type conversion
     2. if...else and switch
     3. Loops with break / continue
     4. Regular + arrow functions, scope
     5. forEach, filter, map
     6. DOM (changing the web page from JavaScript)
   ===================================================================== */


/* ---------------------------------------------------------------------
   STEP 0: DATA
   An ARRAY of OBJECTS. Each object is one product: { name, price }.
   "const" for the starting list so we can always reset back to it.
--------------------------------------------------------------------- */
const startingItems = [
  { name: "Laptop", price: 800 },
  { name: "Mouse", price: 25 },
];

// The live inventory. We copy the starting list ( ...spread ) so that
// adding items does not change startingItems.
let inventory = [...startingItems];

// A place to collect console lines so we can show them on the page too.
let outputLines = [];


/* ---------------------------------------------------------------------
   DOM = Document Object Model.
   It is how JavaScript finds and changes things on the web page.
   getElementById finds an element using its id from index.html.
--------------------------------------------------------------------- */
const outputBox  = document.getElementById("output");
const tableBody  = document.getElementById("tableBody");
const countCard  = document.getElementById("countCard");
const totalCard  = document.getElementById("totalCard");
const affordCard = document.getElementById("affordCard");


/* ---------------------------------------------------------------------
   HELPER: log()
   Prints a line in the browser console AND in the black box on the page.
--------------------------------------------------------------------- */
function log(...parts) {
  // Turn arrays like ["Mouse","Monitor"] into readable text
  const text = parts
    .map((p) => (Array.isArray(p) ? JSON.stringify(p).replace(/,/g, ", ") : p))
    .join(" ");
  console.log(text);        // browser console (F12)
  outputLines.push(text);   // remember it for the page
}


/* =====================================================================
   STEP 2: CATEGORY BADGES using switch
   ---------------------------------------------------------------------
   switch(true) trick: each "case" holds a condition and the first
   one that is true wins.
        below 50      -> Budget
        50 to 499     -> Standard
        500 and above -> Premium
   Variables inside a function are LOCAL (scope): outside code cannot
   change them by mistake.
===================================================================== */
function getCategory(price) {
  switch (true) {
    case price < 50:
      return "Budget";
    case price < 500:
      return "Standard";
    default:
      return "Premium";
  }
}


/* =====================================================================
   STEP 4: FUNCTIONS FOR ANALYTICS (regular + arrow)
   ---------------------------------------------------------------------
   reduce() goes through the array and combines everything into ONE
   value. Here it keeps a running sum, starting from 0.
   Arrow function syntax:  (inputs) => result
   Default parameters (taxPercent = 0) are used if no value is passed.
===================================================================== */

// Regular function: total value of all items
function calculateTotalValue(items) {
  return items.reduce((sum, item) => sum + item.price, 0);
}

// Arrow functions with custom tax / discount (defaults to 0%)
const applyTax = (amount, taxPercent = 0) => amount + (amount * taxPercent) / 100;
const applyDiscount = (amount, discountPercent = 0) => amount - (amount * discountPercent) / 100;
// Example: applyTax(applyDiscount(975, 10), 5)  ->  10% off, then 5% tax


/* =====================================================================
   STEP 1 + 3: ASK THE USER (with a validation LOOP)
   ---------------------------------------------------------------------
   - prompt() always returns TEXT, so we convert the price with Number().
   - A loop gives the user up to 3 tries.
       continue -> bad input, skip the rest, try again
       break    -> good input, stop asking
   Returns the new product, or null if the user never gave valid input.
===================================================================== */
function askForProduct() {
  const MAX_ATTEMPTS = 3;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    const nameInput = prompt("Enter new product name:");

    // prompt returns null if the user presses Cancel -> stop completely
    if (nameInput === null) {
      return null;
    }

    // Empty name? Complain and ask again.
    if (nameInput.trim() === "") {
      alert("Name cannot be empty. Please try again.");
      continue;
    }

    const priceInput = prompt("Enter new product price:");
    if (priceInput === null) {
      return null;
    }

    // Explicit type conversion: text -> number
    const priceNumber = Number(priceInput);

    // Number("abc") is NaN (Not a Number). Also reject empty, zero, negative.
    if (priceInput.trim() === "" || isNaN(priceNumber) || priceNumber <= 0) {
      alert("Price must be a number greater than 0. Please try again.");
      continue;
    }

    // Both inputs are good -> return the new product object
    return { name: nameInput.trim(), price: priceNumber };
  }

  // Loop finished without good input
  return null;
}


/* =====================================================================
   SHOW EVERYTHING: build the console text + table + cards
   ---------------------------------------------------------------------
   forEach -> do something for EVERY item (print / add table row)
   filter  -> keep only items that pass a test
   map     -> turn every item into something new
===================================================================== */
function render(addedProduct) {
  outputLines = [];

  log("--- Initializing Inventory System ---");
  if (addedProduct) {
    log(`[Prompt executed: User adds "${addedProduct.name}" at "$${addedProduct.price}"]`);
  }

  // ----- forEach: print roster to console box AND build table rows -----
  log("--- Processing Inventory Roster (forEach) ---");
  tableBody.innerHTML = "";                       // clear old rows first
  inventory.forEach((item, index) => {
    const category = getCategory(item.price);
    log(`* Item: ${item.name} ($${item.price}) -> Category: ${category}`);

    // Create a table row using a template string and add it to the page
    tableBody.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${item.name}</td>
        <td>$${item.price}</td>
        <td><span class="badge ${category}">${category}</span></td>
      </tr>`;
  });

  // ----- Analytics -----
  log("--- Financial Analytics ---");
  const total = calculateTotalValue(inventory);
  log(`Total Inventory Value: $${total}`);

  // filter keeps items under $200, then map picks only their names
  const affordable = inventory.filter((item) => item.price < 200);
  const affordableNames = affordable.map((item) => item.name);
  log("Filtered Affordable Items (Under $200):", affordableNames);

  // map: make a new array of formatted strings, e.g. "LAPTOP: $800"
  const report = inventory.map((item) => `${item.name.toUpperCase()}: $${item.price}`);
  log("Formatted Report List:", report);

  // ----- Update the cards and the black console box on the page -----
  countCard.textContent  = inventory.length;
  totalCard.textContent  = "$" + total;
  affordCard.textContent = affordable.length;
  outputBox.textContent  = outputLines.join("\n");
}


/* =====================================================================
   BUTTONS: connect clicks to our functions
   ---------------------------------------------------------------------
   addEventListener("click", function) means:
   "when this button is clicked, run this function".
===================================================================== */
document.getElementById("addBtn").addEventListener("click", () => {
  const newProduct = askForProduct();

  if (newProduct) {
    inventory.push(newProduct);   // push adds an item to the END of the array
    render(newProduct);
  } else {
    alert("No valid product was added.");
  }
});

document.getElementById("resetBtn").addEventListener("click", () => {
  inventory = [...startingItems];  // go back to the original two items
  render(null);
});


/* ---------------------------------------------------------------------
   FIRST LOAD: show the starting inventory when the page opens.
--------------------------------------------------------------------- */
render(null);
