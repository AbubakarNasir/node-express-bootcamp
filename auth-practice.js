import argon2d from "argon2";

const password = "mySecurePassword123";

const hash = await argon2d.hash(password);

console.log("Password Hashed Successfully:", hash);

const isValid = await argon2d.verify(hash, "WrongPassword123!");

console.log("Correct password:", isValid);