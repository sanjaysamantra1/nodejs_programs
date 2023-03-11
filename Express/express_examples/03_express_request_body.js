const express = require("express");
const app = express();

app.use(express.json());

app.post("/login", (req, res) => {
  console.log(req.body.email); // "user@example.com"
  console.log(req.body.password); // "helloworld"
  res.send("POST Request Received");
});

app.listen(5000, () => {
  console.log("server is listening on port 5000...");
});
/* 
    POST https://example.com/login
    {
       "email": "user@example.com",
       "password": "helloworld"
    }
*/
