// app.js
const express = require('express');
const app = express();
const port = 3000;

app.get('/user', (req, res) => {
  const user = { name: 'Sanjay', age: 30 };

  // This will look for a callback query param, e.g. ?callback=myFunction
  res.jsonp(user);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


/*
<script>
function myCallback(data) {
  console.log('Received:', data);
}
</script>

<script src="http://localhost:3000/user?callback=myCallback"></script>
*/
