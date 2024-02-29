let str = "Hello, world!";
let substring = "Hello";
let replacedStr = "Goodbye, world!";
let searchString = "world";
let regex = /lo/g;
let splitStr = "apple,banana,orange";

// length: Returns the length of the string
console.log("Length:", str.length);

// toUpperCase(): Converts the string to uppercase
console.log("Uppercase:", str.toUpperCase());

// toLowerCase(): Converts the string to lowercase
console.log("Lowercase:", str.toLowerCase());

// indexOf(): Returns the index of the first occurrence of a substring
console.log("Index of 'Hello':", str.indexOf(substring));

// lastIndexOf(): Returns the index of the last occurrence of a substring
console.log("Last index of 'l':", str.lastIndexOf("l"));

// includes(): Checks if a substring is present in the string
console.log("Includes 'world':", str.includes(searchString));

// startsWith(): Checks if the string starts with a substring
console.log("Starts with 'He':", str.startsWith("He"));

// endsWith(): Checks if the string ends with a substring
console.log("Ends with 'world!':", str.endsWith("world!"));

// replace(): Replaces a substring with another substring
console.log("Replace 'Hello' with 'Goodbye':", str.replace(substring, replacedStr));

// slice(): Extracts a portion of the string
console.log("Slice:", str.slice(7));

// substring(): Extracts characters between two indices
console.log("Substring:", str.substring(0, 5));

// substr(): Extracts a specified number of characters starting from a specified index
console.log("Substr:", str.substr(7, 5));

// match(): Searches a string for a pattern and returns an array of matches
console.log("Match:", str.match(regex));

// search(): Searches a string for a specified value and returns the position of the match
console.log("Search:", str.search("world"));

// split(): Splits a string into an array of substrings
console.log("Split:", splitStr.split(","));

// trim(): Removes whitespace from both ends of a string
console.log("Trim:", "   Hello, world!   ".trim());
