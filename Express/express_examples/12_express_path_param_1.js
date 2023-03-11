const express = require("express");
const app = express();

app.get("/:id", function (req, res) {
  res.send(`id is ${req.params.id}`);
});

app.get("/courses/:coursename/:topicname", function (req, res) {
  res.send(`Course name: ${req.params.coursename} & Topic name: ${req.params.topicname}`);
});

// Pattern matching routes
app.get('/things/:id([0-9]{5})', function(req, res){
    res.send('id: ' + req.params.id);
});

//Other routes here
app.get('*', function(req, res){
    res.send('Sorry, this is an invalid URL.');
});

app.listen(5000, () => {
  console.log("Server is listening on port 5000....");
});
