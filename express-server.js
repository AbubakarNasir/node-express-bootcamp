import express from "express";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { authenticateToken } from "./middleware/authMiddleware.js";
import { authorizeAdmin } from "./middleware/authorizeMiddleware.js";

const app = express();
app.use(express.static("public"));
app.use(express.json());

const port = Number(process.env.PORT || 3000);

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error("PORT must be a valid port number");
}

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

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.get(
    "/api/admin",
    authenticateToken,
    authorizeAdmin,
    (req, res) => {
        res.status(200).json({
            message: "Welcome, admin.",
        });
    }
);

app.get("/api/protected", authenticateToken, (req, res) => {
    res.json({
        message: "Access granted.",
        user: req.user,
    });
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