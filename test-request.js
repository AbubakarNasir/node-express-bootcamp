const response = await fetch("http://localhost:3000/about", {
  method: "POST"
});

console.log("Status:", response.status);
console.log("Response:", await response.text());