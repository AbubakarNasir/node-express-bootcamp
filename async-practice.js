async function main() {
    try {
        async function getUser() {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    reject(new Error("Failed to load user"));
                }, 1000);
            });
        }

        console.log('Requesting user data...');
        const user = await getUser();
        console.log(user);
    } catch (error) {
        console.error('Error fetching user data:', error.message);
    }
}

main();
