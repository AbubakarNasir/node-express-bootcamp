import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;

if(!secret) {
    throw new Error("JWT_SECRET is not configured");
}

const token = jwt.sign(
    { sub: "12" },
    secret,
    { expiresIn: "1h" }
);

console.log("JWT created successfully:", token);