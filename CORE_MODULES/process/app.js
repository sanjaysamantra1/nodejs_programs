const env = require("dotenv")
env.config()

console.log(process.env.NODE_ENV);
console.log(process.env.DB_URL);
console.log(process.env.PORT);