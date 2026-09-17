// Copies src/index.html into www/ and wires in Capacitor's runtime for the Android build.
const fs = require('fs');
fs.mkdirSync('www', { recursive: true });
const html = fs.readFileSync('src/index.html', 'utf8')
  .replace('<!--CAPACITOR-->', '<script src="capacitor.js"></script>');
fs.writeFileSync('www/index.html', html);
fs.copyFileSync('node_modules/@capacitor/core/dist/capacitor.js', 'www/capacitor.js');
console.log('www/ ready');
