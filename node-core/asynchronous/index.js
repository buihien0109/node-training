// Import module fs vào file
const fs = require('fs');

// Đọc file asynchronous
fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
    fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
        console.log(data2);
        fs.readFile(`./txt/append.txt`, 'utf-8', (err, data3) => {
            fs.writeFile('./txt/final.txt', `${data2} \n${data3}`, () => {
                console.log('Thanh cong');
            })
        })
    })
})

console.log("Bat dau");