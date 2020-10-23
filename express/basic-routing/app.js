const express = require('express');

// Khởi tạo app
const app = express();

app.get('/', (req, res) => {
    res.status(200).send('Home Page');
})

app.get('/about', (req, res) => {
    res.status(200).json({
        name : "Bùi Hiên",
        age : "23"
    });
})

app.get('/contact', (req, res) => {
    res.status(200).send('<h1>Contact Page</h1>')
})

// Khai báo port
const port = 3000;
// Lắng nghe
app.listen(port, (req, res) => {
    console.log(`Server start in port : ${port}...`);
})