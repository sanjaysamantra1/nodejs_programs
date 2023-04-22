let args = process.argv.slice(2);
let num = args[0];

if (args.length === 0 || isNaN(num)) {
  console.log("Please provide a number as the first argument");
  process.exit(1);
}

if (num % 2 === 0) {
  console.log(`${num} is Even`);
} else {
  console.log(`${num} is Odd`);
}
