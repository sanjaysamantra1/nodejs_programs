let express = require("express");
let cors = require("cors");
const { newPayment, checkStatus } = require("./payment");
let app = express();
app.use(express.json());
app.use(cors())

app.post('/payment', newPayment);
app.post('/status/:txnId', checkStatus);

app.listen(5000, () => {
    console.log("Server Listening on port 5000");
});
