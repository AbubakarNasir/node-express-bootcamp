function waitTwoSeconds() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Operation completed");
    }, 2000);
  });
}

async function main() {
  console.log("1. Start");

  const message = await waitTwoSeconds();

  console.log(message);
  console.log("3. End");
}

main();