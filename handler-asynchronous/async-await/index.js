const fs = require('fs');

// Module http để gửi request
const superagent = require("superagent");

// Dog ceo API
// https://dog.ceo/dog-api/

// Định nghĩa hàm để đọc file
// Hàm này sẽ trả về promise
// Thành công thì trả về data thông qua resolve
// Thất bại sẽ trả về message error thông qua reject

const readFilePro = (file) => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, 'utf-8', (err, data) => {
            if(err) return reject('Không đọc được file =))');
            resolve(data);
        })
    })
};

// Định nghĩa hàm để ghi file
const writeFilePro = (file, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, (err) => {
            if(err) return reject('Không thể ghi file');
            resolve('Ghi file thành công')
        })
    })
}

// Định nghĩa function với từ khóa 'async' ở đầu fuction
// Kiểm soát lỗi đặt trong try/catch
const getImageDog = async () => {
    try {
        const data = await readFilePro(`${__dirname}/dog.txt`);
        console.log(data);
    
        const res = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        console.log(res.body.message);
    
        const mes = await writeFilePro('./dog-image.txt', res.body.message);
        console.log(mes);
    } catch(err) {
        console.log(err);
    }
}

getImageDog();

// Đọc file để lấy dữ liệu => gửi API
// readFilePro(`${__dirname}/dog.txt`)
//     .then(data => {
//         console.log(data);
//         // Trả về promise để có thể chaining promise
//         return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//     })
//     .then(res => {
//         console.log(res.body.message);
//         // Trả về promise để có thể chaining promise
//         return writeFilePro('./dog-image.txt', res.body.message);
//     })
//     .then(mes => {
//         console.log(mes);
//     })
//     .catch(err => {
//         console.log(err);
//     })




// fs.readFile(`${__dirname}/dog.txt`, 'utf-8', (err, data) => {

//     // Kiểm soát lỗi
//     if(err) { return console.log(err.message); }
//     console.log(data);

//     // Gọi API để lấy ảnh random
//     superagent.get(`https://dog.ceo/api/breed/${data}/images/random`).end((err, res) => {

//         // Kiểm soát lỗi
//         if(err) { return console.log(err.message); }

//         // Check data trả về trong body.message của res
//         console.log(res.body.message);

//         // Tạo file để lưu kết quả của res trả về
//         fs.writeFile('./dog-image.txt', res.body.message, (err) => {

//             // Kiểm soát lỗi
//             if(err) { return console.log(err.message); }

//             console.log('Random image dog and save file');
//         })
//     })
// })