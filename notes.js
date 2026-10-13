import { writeFile, readFile } from "node:fs/promises";

async function main() {
  await writeFile("notes.txt", "I'm learning Node.js!");

  const content = await readFile("notes.txt", "utf8");

  console.log(content);
}

main().catch(console.error);