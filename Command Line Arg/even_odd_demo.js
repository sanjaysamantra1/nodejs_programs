let args = process.argv.slice(2);

if (args.length === 0 || isNaN(args[0])) {
  console.log("Please provide a number as the first argument");
  process.exit(1);
}

if (args[0] % 2 === 0) {
  console.log(`${num} is Even`);
} else {
  console.log(`${num} is Odd`);
}
