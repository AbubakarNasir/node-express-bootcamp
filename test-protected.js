const response = await fetch("http://localhost:3000/protected", {
  headers: {
    "x-access-key": "my-test-key"
  }
});

console.log("Status:", response.status);
console.log("Response:", await response.text());