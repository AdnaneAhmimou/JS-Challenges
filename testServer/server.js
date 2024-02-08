const http = require("http");
const url = require("url");

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const query = parsedUrl.query;

  if (path === "/users") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("I am a list of users :p");
  } else if (path === "/products") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("I am a list of products :p");
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not found");
  }
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
