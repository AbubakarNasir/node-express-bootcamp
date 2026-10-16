
// const response = await fetch("http://localhost:3000/users", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json"
//   },
//   body: JSON.stringify({
//     name: "Abubakar",
//     email: "abubakar@example.com"
//   })
// });

// const data = await response.text();

// console.log("Status:", response.status);
// console.log("Response:", data);

const response = await fetch("http://localhost:3000/api/users/2", {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    name: "Amina Yusuf",
    email: "amina.yusuf@example.com"
  })
});

console.log("Status:", response.status);
console.log("Response:", await response.text());