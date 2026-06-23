const fs = require('fs');
const path = require('path');
const files = [
  'data/catalog/fish-catalog.json',
  'data/catalog/omamori-catalog.json',
];
for (const file of files) {
  const fullPath = path.join(__dirname, '..', file);
  let text = fs.readFileSync(fullPath, 'utf8');
  if (text.charCodeAt(0) === 0xfeff) {
    text = text.slice(1);
    fs.writeFileSync(fullPath, text, 'utf8');
    console.log('cleaned', fullPath);
  } else {
    console.log('no BOM found', fullPath);
  }
}
