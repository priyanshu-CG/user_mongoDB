const http = require("http");

const server = http.createServer((req, res) => {
  console.log(req)
  if (req.url === "/home") {
    // Check if the request URL is "/home"
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h1>Welcome to the home page!</h1>");
  } 
  else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("<h1>Page not found</h1>");
  }
});

server.listen(4000, () => {
  console.log("Server is running on http://localhost:4000");
});

// const fs = require("fs");
// const add = require("./add");
// const data1 = "hello worldhelllo";

// const appendToFile = (filePath, data) => {
//   return new Promise((resolve, reject) => {
//     fs.appendFile(filePath, data, "utf8", (err) => {
//       if (err) {
//         reject(err);
//         return;
//       }
//       resolve();
//     });
//   });
// };

// const d = async () => {
//   try {
//     await appendToFile("file.txt", data1);
//     console.log("File has been written");

//     const c = add.add(2, 4);
//     console.log(c);
//   } catch (error) {
//     console.log(error);
//   }
// };

// d();
