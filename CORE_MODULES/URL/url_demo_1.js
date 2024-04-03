var url = require("url");
var urlStr = "http://localhost:8080/default.htm?year=2023&month=february";
var urlObj = url.parse(urlStr, true);
console.log(urlObj);

let obj = {
  protocol: "https",
  hostname: "example.com",
  pathname: "/some/path",
  query: {
    country: "india",
    state: "karnataka",
  },
}
let urlString = url.format(obj);
console.log(urlString);
