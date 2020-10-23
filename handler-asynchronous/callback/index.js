const fs = require('fs');

// Module http để gửi request
const superagent = require("superagent");

// Dog ceo API
// https://dog.ceo/dog-api/

// Đọc file để lấy dữ liệu => gửi API
fs.readFile(`${__dirname}/dog.txt`, 'utf-8', (err, data) => {

    // Kiểm soát lỗi
    if(err) { return console.log(err.message); }
    console.log(data);

    // Gọi API để lấy ảnh random
    superagent.get(`https://dog.ceo/api/breed/${data}/images/random`).end((err, res) => {

        // Kiểm soát lỗi
        if(err) { return console.log(err.message); }

        // Check data trả về trong body.message của res
        console.log(res.body.message);

        // Tạo file để lưu kết quả của res trả về
        fs.writeFile('./dog-image.txt', res.body.message, (err) => {

            // Kiểm soát lỗi
            if(err) { return console.log(err.message); }

            console.log('Random image dog and save file');
        })
    })
})