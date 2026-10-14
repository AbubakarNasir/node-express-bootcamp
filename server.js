import { createServer } from "node:http";

const server = createServer((req, res) => {

    console.log("URL:", req.url);
    console.log("Method:", req.method);

    const url = new URL(req.url, "http://localhost:3000");
    console.log("Pathname:", url.pathname);

    if (url.pathname === "/") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Welcome to my server!");
    } else if (url.pathname === "/about" && req.method === "GET") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("This is abubakar's about page.");
    } else if (url.pathname === "/about") {
        res.writeHead(405, { "Content-Type": "text/plain" });
        res.end("Method Not Allowed");
    } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 Not Found");
    }

});

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
