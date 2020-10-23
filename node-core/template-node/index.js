// import module http
const http = require("http");
// import module url
const url = require("url");
// import module fs
const fs = require("fs");

/////////////////////////////////////////////////**
// Server

// Tạo function replaceTemplate
// Chức năng: Thay thế text trong temp bằng object product
const replaceTemplate = (temp, product) => {

	let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
	output = output.replace(/{%IMAGE%}/g, product.image);
	output = output.replace(/{%PRICE%}/g, product.price);
	output = output.replace(/{%FROM%}/g, product.from);
	output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
	output = output.replace(/{%QUANTITY%}/g, product.quantity);
	output = output.replace(/{%DESCRIPTION%}/g, product.description);
	output = output.replace(/{%ID%}/g, product.id);

	if(!product.organic) {
		output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
	}

	return output

}

// Khai báo các template sử dụng trong trang
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, "utf-8");
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, "utf-8");
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, "utf-8");

// Read file đúng 1 lần
// Sử dụng method readFileSync
// __dirname : Đường dẫn tuyệt đối đến thư mục làm việc
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

// Tao server và trả về 1 res
const server = http.createServer((req, res) => {
	// Overview
	if (req.url === "/" || req.url === "/overview") {
		res.writeHead(200, {"Content-type": "text/html"});

		// Gọi hàm thay thế
		// Cuối cùng join mảng thành chuỗi và trả về cho front end đê hiển thị
		const cardsHtml = dataObj.map(ele => replaceTemplate(tempCard, ele)).join('');
		const output = tempOverview.replace(/{%PRODUCT_CARDS%}/g, cardsHtml)

		res.end(output);

	// product
	} else if (req.url === "/product") {
		res.end("Page Product");

	// API
	} else if (req.url === "/api") {
		// Bảo với browser là hiển thị ra json
		res.writeHead(200, {"Content-type": "application/json"});
		// Gửi Json ra ngoài browser
		res.end(data);

	// 404
	} else {
		res.writeHead(404);
		res.end("Page not found");
	}
});

// Lắng nghe server ở cổng 8000
// host 127.0.0.1
server.listen("8000", "127.0.0.1", () => {
	console.log("Server ready");
});