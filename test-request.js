
const response = await fetch("http://localhost:3000/users", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    name: "Abubakar",
    email: "abubakar@example.com"
  })
});

const data = await response.text();

console.log("Status:", response.status);
console.log("Response:", data);
