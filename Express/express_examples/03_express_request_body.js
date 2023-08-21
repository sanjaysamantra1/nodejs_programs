const express = require("express");
const app = express();

app.use(express.json());

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  res.send("POST Request Received on /login");
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
