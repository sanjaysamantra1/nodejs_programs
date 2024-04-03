const fs = require("fs");

fs.access("./content/first.txt", fs.W_OK, (err, res) => {
  if (err) {
    console.log('no write access')
  } else {
    console.log('write access present')
  }
});
fs.access("./content/first.txt", fs.R_OK, (err, res) => {
  if (err) {
    console.log('no Read access')
  } else {
    console.log('Read access present')
  }
});
fs.access("./content/first.txt", fs.X_OK, (err, res) => {
  if (err) {
    console.log('no Execute access')
  } else {
    console.log('Execute access present')
  }
});
