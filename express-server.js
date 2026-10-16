import express from "express";

const app = express();
app.use(express.static("public"));
app.use(express.json());

const port = Number(process.env.PORT || 3000);

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error("PORT must be a valid port number");
}

const users = [
  {
    id: 1,
    name: "Abubakar",
    email: "abubakar@example.com"
  },
  {
    id: 2,
    name: "Amina",
    email: "amina@example.com"
  }
];

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

app.get("/api/users", (req, res) => {
  res.json(users);
});

app.get("/api/users/:id", (req, res) => {
    const userId = Number(req.params.id, 10);
    const user = users.find(user => user.id === userId);

    if (!Number.isInteger(userId) || userId < 1) {
        return res.status(400).send("Invalid user ID");
    }

    if (!user) {
        return res.status(404).send("User not found");
    }

    res.json(user);
});

app.post("/api/users", (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).send("Name and email are required");
    }

    const newUser = {
        id: users[users.length - 1].id + 1,
        name,
        email
    };

    users.push(newUser);
    res.status(201).json(newUser);
});

app.put("/api/users/:id", (req, res) => {
    const userId = Number(req.params.id);
    const { name, email } = req.body;
    const userIndex = users.findIndex(user => user.id === userId);

    if (!Number.isInteger(userId) || userId < 1) {
        return res.status(400).send("Invalid user ID");
    }

    if (userIndex === -1) {
        return res.status(404).send("User not found");
    }

    if (!name || !email) {
        return res.status(400).send("Name and email are required");
    }

    users[userIndex] = { id: userId, name, email };
    res.json(users[userIndex]);
});

app.delete("/api/users/:id", (req, res) => {
    const userId = Number(req.params.id);
    const userIndex = users.findIndex(user => user.id === userId);

    if (!Number.isInteger(userId) || userId < 1) {
        return res.status(400).send("Invalid user ID");
    }

    if (userIndex === -1) {
        return res.status(404).send("User not found");
    }

    users.splice(userIndex, 1);
    res.status(204).send();
});

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

app.get("/error", (req, res, next) => {
  next(new Error("Something failed!"));
});

app.use((req, res) => {
  res.status(404).send("404 Not Found");
});

app.use((err, req, res, next) => {
  console.error(err.message);

  res.status(500).send("Something went wrong!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});