/**
 * Assignment 6: Arrays, Objects, and Core Methods
 * ------------------------------------------------
 * - forEach() : print every product
 * - filter()  : products under a price limit
 * - map()     : formatted name-price strings
 */

const products = [
  { name: "Laptop", price: 800 },
  { name: "Mouse", price: 25 },
  { name: "Keyboard", price: 45 },
];

// ---- forEach ----
console.log("-- All Products (forEach) --");
products.forEach((product) => {
  console.log(`Item: ${product.name} - Price: $${product.price}`);
});

// ---- filter ----
const priceLimit = 50;
const affordable = products.filter((product) => product.price < priceLimit);

console.log(`\n-- Filtered Products (Price < $${priceLimit}) --`);
console.log(affordable);

// ---- map ----
const tags = products.map(
  (product) => `${product.name.toUpperCase()} costs $${product.price}`
);

console.log("\n-- Mapped Product Tags (map) --");
console.log(`[ ${tags.map((tag) => `"${tag}"`).join(", ")} ]`);
