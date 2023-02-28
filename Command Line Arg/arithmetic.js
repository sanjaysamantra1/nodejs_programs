// To trim first 2 elements
const arg = process.argv.slice(2);

if (process.argv.length === 2) {
  console.error("Please provide 1 operator and 2 operand values");
  process.exit(1);
}

const op = arg[0];
const num1 = Number(arg[1]);
const num2 = Number(arg[2]);

switch (op) {
  case "+":
    console.log(`Result of ${num1} + ${num2} = ${num1 + num2}`);
    break;

  case "-":
    console.log(`Result of ${num1} - ${num2} = ${num1 - num2}`);
    break;

  case "*":
    console.log(`Result of ${num1} * ${num2} = ${num1 * num2}`);
    break;

  case "/":
    if (num2 == 0) {
      console.log("cannot be divided by zero!!");
    } else {
      console.log(`Result of ${num1} / ${num2} = ${num1 / num2}`);
    }
    break;

  default:
    console.log(`operation cannot be performed!!`);
}
