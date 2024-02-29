let fruits = ['apple', 'banana', 'orange', 'kiwi'];
console.log("Original array:", fruits);

// push(): Add 'grape' to the end
fruits.push('grape');
console.log(fruits);

// pop(): Remove the last element ('grape')
let removedFruit = fruits.pop();
console.log("Removed from last fruit:", removedFruit);

// unshift(): Add 'mango' to the beginning
fruits.unshift('mango');
console.log(fruits);

// shift(): Remove the first element ('mango')
let shiftedFruit = fruits.shift();
console.log("Shifted fruit:", shiftedFruit);

// slice(): Create a slice containing elements at index 1 and 2
let citrus = fruits.slice(1, 3);
console.log("Citrus fruits:", citrus);

// splice(): Replace 'banana' with 'grape' and add 'cherry'
fruits.splice(1, 1, 'grape', 'cherry');
console.log( "Spliced fruits: ",fruits);

// forEach(): Print each fruit with its index
fruits.forEach((fruit, index) => {
  console.log(`Index ${index}: ${fruit}`);
});

// map(): Create a new array with the lengths of each fruit name
let fruitLengths = fruits.map((fruit) => fruit.length);
console.log("Fruit lengths:", fruitLengths);
