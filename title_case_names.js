
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'lib', 'products.js');

// Helper function to convert string to title case
function toTitleCase(str) {
  return str
    .trim()
    .replace(/\s+/g, ' ') // Replace multiple spaces with single
    .replace(/\w\S*/g, function(txt) {
      // Keep words like "eggless", "no added sugar" lowercase if they're not start of word? Wait, no—title case every word
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

// 1. Read the file
let fileContent = fs.readFileSync(filePath, 'utf8');

// 2. Extract the array part
const startMarker = 'export const products = [';
const endMarker = '];';

const startIndex = fileContent.indexOf(startMarker);
if (startIndex === -1) {
    console.error('Could not find products array start');
    process.exit(1);
}

let openBrackets = 0;
let arrayEndIndex = -1;
let arrayStartIndex = startIndex + startMarker.length - 1;

for (let i = arrayStartIndex; i < fileContent.length; i++) {
    if (fileContent[i] === '[') openBrackets++;
    if (fileContent[i] === ']') openBrackets--;
    
    if (openBrackets === 0) {
        arrayEndIndex = i + 1;
        break;
    }
}

if (arrayEndIndex === -1) {
    console.error('Could not find products array end');
    process.exit(1);
}

const arrayString = fileContent.substring(startIndex + 'export const products = '.length, arrayEndIndex);

// 3. Parse the array
let products;
try {
    products = eval('(' + arrayString + ')');
} catch (e) {
    console.error('Failed to parse products array:', e);
    process.exit(1);
}

// 4. Convert product names to title case
products.forEach(p => {
    if (!p || !p.name) return;
    p.name = toTitleCase(p.name);
});

// 5. Generate Output
function stringifyProduct(obj) {
    const entries = Object.entries(obj).map(([key, value]) => {
        let valStr;
        if (typeof value === 'string') {
            // Escape single quotes in strings
            const escaped = value.replace(/'/g, "\\'");
            valStr = `'${escaped}'`;
        } else if (Array.isArray(value)) {
            valStr = `[\n      ${value.map(v => {
                if (typeof v === 'string') {
                    return `'${v.replace(/'/g, "\\'")}'`;
                }
                return v;
            }).join(',\n      ')}\n    ]`;
        } else {
            valStr = value;
        }
        return `${key}: ${valStr}`;
    });
    return `  {\n    ${entries.join(',\n    ')},\n  }`;
}

const newArrayString = `[\n${products.map(stringifyProduct).join(',\n')}\n]`;

const newFileContent = fileContent.substring(0, startIndex + 'export const products = '.length) + 
                       newArrayString + 
                       fileContent.substring(arrayEndIndex);

fs.writeFileSync(filePath, newFileContent, 'utf8');
console.log(`Successfully processed ${products.length} products. All names are now title cased!`);

