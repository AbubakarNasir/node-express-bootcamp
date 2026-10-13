async function getUser() {
    return new Promise((resolve) => {
        setTimeout(() => {
        resolve("User loaded successfully");
        }, 1000);
    });
}

console.log('Requesting user data...');
const user = await getUser();
console.log(user);
