const argsArr = process.argv.slice(2);
console.log(argsArr);

let argsObj = {};
for (ele of argsArr) {
  let KeyValueArr = ele.split("=");
  argsObj[KeyValueArr[0]] = KeyValueArr[1];
}
console.log(argsObj);
