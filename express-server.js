import express from "express";

const app = express();
app.use(express.json());
const PORT = 3000;

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

function checkAccessKey(req, res, next) {
  const accessKey = req.headers["x-access-key"];

  if (accessKey !== "my-test-key") {
    return res.status(401).send("Access denied");
  }

  next();
}

app.get("/", (req, res) => {
  res.send("Hello from express!");
});

app.get("/about", (req, res) => {
    res.send("This is my about page");
});

app.get("/products", (req, res) => {
  const category = req.query.category;
  const sort = req.query.sort;

  res.send(`Category: ${category}, Sort: ${sort}`);
});

app.post("/users", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;

  if (!name || !email) {
    return res.status(400).send("Name and email are required");
  }

  res.send(`User created: ${name}, ${email}`);
});

app.get("/protected", checkAccessKey, (req, res) => {
  res.send("Welcome to the protected route!");
});

app.use((req, res) => {
  res.status(404).send("404 Not Found");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});