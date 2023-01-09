import { readFile, writeFile } from "fs/promises";

console.log("start");
try {
  const firstFileContent = await readFile("./content/first.txt");
  const secondFileContent = await readFile("./content/first.txt");
  await writeFile(
    "./content/result-async.txt",
    `2 files content:: ${firstFileContent} & ${secondFileContent}`
  );
} catch (err) {
  console.error("there was an error:", err.message);
}
console.log("end");
