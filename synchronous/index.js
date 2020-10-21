// Import module fs vào file
const fs = require('fs');

// Đọc file synchronous
let textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
console.log(textIn);

// Viết dữ liệu vào file khác
fs.writeFileSync('./txt/output.txt', `${textIn}`, 'utf-8');