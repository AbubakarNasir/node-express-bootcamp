import argon2d from "argon2";

const password = "mySecurePassword123";

const hash = await argon2d.hash(password);

console.log("Password Hashed Successfully:", hash);