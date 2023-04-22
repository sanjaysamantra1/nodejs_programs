console.log(this, module.exports); // {} , this === module.exports which is an empty object for now

module.exports.name = "sanjay";
module.exports.add = function (a, b) {
  return a + b;
};

console.log(this); // { name:sanjay }
